import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { test } from 'node:test'
import {
  createLocalSupabaseClient,
  insertArtwork,
  makePngBuffer,
  removeArtworks,
} from './supabase-test-support.mjs'
import {
  removeArtworkAndFile,
  saveProcreateInfo,
  uploadArtwork,
} from '../src/artworkPersistence.mjs'

const supabase = createLocalSupabaseClient()

function pngFile(name, bytes = makePngBuffer()) {
  return new File([bytes], name, { type: 'image/png' })
}

async function assertArtworkAbsent(id) {
  const { data, error } = await supabase.from('artwork').select('id').eq('id', id)
  assert.ifError(error)
  assert.deepEqual(data, [])
}

async function assertStorageAbsent(path) {
  const { error } = await supabase.storage.from('artworks').download(path)
  assert.ok(error, `Expected ${path} to be absent from Storage`)
}

test('TC-027 persists each Procreate record against its matching artwork', async () => {
  const png = makePngBuffer()
  const artworks = [
    {
      id: randomUUID(),
      png_name: `integration-${randomUUID()}.png`,
      gallery_type: '2D',
      path: null,
    },
    {
      id: randomUUID(),
      png_name: `integration-${randomUUID()}.png`,
      gallery_type: 'both',
      path: null,
    },
  ]

  try {
    for (const artwork of artworks) {
      artwork.path = await insertArtwork(supabase, artwork, png)
    }

    const metadata = [
      {
        id: randomUUID(),
        artwork_id: artworks[0].id,
        artwork_name: 'First integration artwork',
        width: 120,
        height: 90,
        dpi: 300,
        stroke_count: 7,
        tracked_time_seconds: 45,
        tracked_time: '0 hours 0 minutes',
      },
      {
        id: randomUUID(),
        artwork_id: artworks[1].id,
        artwork_name: 'Second integration artwork',
        width: 240,
        height: 180,
        dpi: 600,
        stroke_count: 19,
        tracked_time_seconds: 120,
        tracked_time: '0 hours 2 minutes',
      },
    ]

    const { error: metadataError } = await supabase
      .from('procreate_data')
      .insert(metadata)
    assert.ifError(metadataError)

    const { data, error } = await supabase
      .from('artwork')
      .select('id,procreate_data(artwork_name,width,height,dpi,stroke_count)')
      .in('id', artworks.map(({ id }) => id))
    assert.ifError(error)

    assert.equal(data.length, 2)
    for (const expected of metadata) {
      const artwork = data.find(({ id }) => id === expected.artwork_id)
      assert.ok(artwork)
      assert.deepEqual(artwork.procreate_data, {
        artwork_name: expected.artwork_name,
        width: expected.width,
        height: expected.height,
        dpi: expected.dpi,
        stroke_count: expected.stroke_count,
      })
    }

    for (const artwork of artworks) {
      const { data: downloaded, error: downloadError } = await supabase.storage
        .from('artworks')
        .download(artwork.path)
      assert.ifError(downloadError)
      assert.deepEqual(Buffer.from(await downloaded.arrayBuffer()), png)
    }
  } finally {
    await removeArtworks(supabase, artworks)
  }
})

test('TC-004 deletes artwork, metadata, and PNG after a failed delete can be retried', async () => {
  const artwork = {
    id: randomUUID(),
    png_name: `delete-retry-${randomUUID()}.png`,
    gallery_type: '2D',
    png_path: null,
  }

  try {
    const stored = await uploadArtwork(supabase, {
      id: artwork.id,
      file: pngFile(artwork.png_name),
      galleryType: artwork.gallery_type,
    })
    artwork.png_path = stored.png_path
    const { error: metadataError } = await supabase.from('procreate_data').insert({
      id: randomUUID(),
      artwork_id: artwork.id,
      artwork_name: 'Retry delete metadata',
      width: 1,
      height: 1,
      dpi: 72,
      stroke_count: 0,
      tracked_time_seconds: 0,
      tracked_time: '0 hours 0 minutes',
    })
    assert.ifError(metadataError)

    await assert.rejects(
      removeArtworkAndFile(supabase, { ...artwork, id: 'not-a-uuid' }),
      /Could not remove artwork record/,
    )
    const { data: retained, error: retainedError } = await supabase
      .from('artwork')
      .select('id,procreate_data(id)')
      .eq('id', artwork.id)
      .single()
    assert.ifError(retainedError)
    assert.equal(retained.id, artwork.id)
    assert.ok(retained.procreate_data)

    await removeArtworkAndFile(supabase, artwork)
    artwork.png_path = null
    await assertArtworkAbsent(artwork.id)
    await assertStorageAbsent(stored.png_path)
  } finally {
    await removeArtworks(supabase, [{ ...artwork, path: artwork.png_path }])
  }
})

test('TC-005 preserves artwork after delete failure and removes it on retry', async () => {
  const artwork = {
    id: randomUUID(),
    png_name: `delete-failure-${randomUUID()}.png`,
    gallery_type: '2D',
    path: null,
  }

  try {
    artwork.path = await insertArtwork(supabase, artwork)
    await assert.rejects(
      removeArtworkAndFile(supabase, { ...artwork, id: 'not-a-uuid' }),
      /Could not remove artwork record/,
    )
    const { data: retained, error } = await supabase
      .from('artwork')
      .select('id')
      .eq('id', artwork.id)
    assert.ifError(error)
    assert.equal(retained.length, 1)

    await removeArtworkAndFile(supabase, {
      id: artwork.id,
      png_path: artwork.path,
    })
    artwork.path = null
    await assertArtworkAbsent(artwork.id)
  } finally {
    await removeArtworks(supabase, [artwork])
  }
})

test('TC-010 cleans up Storage when the artwork database save fails', async () => {
  const artworkId = randomUUID()
  const name = `failed-save-${randomUUID()}.png`
  const path = `public/${name}`

  await assert.rejects(
    uploadArtwork(supabase, {
      id: artworkId,
      file: pngFile(name),
      galleryType: 'invalid',
    }),
    /Failed to save artwork/,
  )
  await assertArtworkAbsent(artworkId)
  await assertStorageAbsent(path)
})

test('TC-011 creates no artwork when Storage rejects the PNG upload', async () => {
  const artworkId = randomUUID()
  const name = `${artworkId}.png`
  const path = `public/${name}`
  const { error: storageError } = await supabase.storage
    .from('artworks')
    .upload(path, makePngBuffer(), {
      contentType: 'image/png',
      upsert: false,
    })
  assert.ifError(storageError)

  try {
    await assert.rejects(
      uploadArtwork(supabase, {
        id: artworkId,
        file: pngFile(name),
        galleryType: '2D',
      }),
      /Failed to upload artwork/,
    )
    await assertArtworkAbsent(artworkId)
    const { error: retainedStorageError } = await supabase.storage
      .from('artworks')
      .download(path)
    assert.ifError(retainedStorageError)
  } finally {
    const { error: cleanupError } = await supabase.storage
      .from('artworks')
      .remove([path])
    assert.ifError(cleanupError)
  }
})

test('TC-011 rolls back artwork and PNG when Procreate metadata save fails', async () => {
  const artwork = {
    id: randomUUID(),
    png_name: `metadata-failure-${randomUUID()}.png`,
    gallery_type: '2D',
    png_path: null,
  }

  try {
    const stored = await uploadArtwork(supabase, {
      id: artwork.id,
      file: pngFile(artwork.png_name),
      galleryType: artwork.gallery_type,
    })
    artwork.png_path = stored.png_path
    await assert.rejects(
      saveProcreateInfo(supabase, artwork.id, {
        name: 'Invalid metadata',
        width: -1,
        height: 1,
        dpi: 72,
        strokeCount: 0,
        trackedTimeSeconds: 0,
        trackedTime: '0 hours 0 minutes',
      }),
      /Failed to upload canvas information/,
    )
    await assertArtworkAbsent(artwork.id)
    await assertStorageAbsent(artwork.png_path)
    artwork.png_path = null
  } finally {
    await removeArtworks(supabase, [{ ...artwork, path: artwork.png_path }])
  }
})

test('TC-013 stores the twentieth artwork in local Supabase', async () => {
  const { data: initial, error: initialError } = await supabase
    .from('artwork')
    .select('id')
  assert.ifError(initialError)
  assert.ok(initial.length < 20, 'The local gallery must have room for a twentieth artwork')

  const artworks = Array.from({ length: 20 - initial.length }, () => ({
    id: randomUUID(),
    png_name: `limit-${randomUUID()}.png`,
    gallery_type: '2D',
    png_path: null,
  }))

  try {
    for (const artwork of artworks) {
      const stored = await uploadArtwork(supabase, {
        id: artwork.id,
        file: pngFile(artwork.png_name),
        galleryType: artwork.gallery_type,
      })
      artwork.png_path = stored.png_path
    }

    const { data: stored, error: storedError } = await supabase
      .from('artwork')
      .select('id')
    assert.ifError(storedError)
    assert.equal(stored.length, 20)

    const rejectedId = randomUUID()
    const rejectedName = `over-limit-${randomUUID()}.png`
    await assert.rejects(
      uploadArtwork(supabase, {
        id: rejectedId,
        file: pngFile(rejectedName),
        galleryType: '2D',
      }),
      /artwork limit has been reached/,
    )
    await assertArtworkAbsent(rejectedId)
    await assertStorageAbsent(`public/${rejectedName}`)
  } finally {
    await removeArtworks(supabase, artworks.map(artwork => ({
      ...artwork,
      path: artwork.png_path,
    })))
  }
})

test('TC-035 rejects data without a PNG signature before uploading it', async () => {
  const name = `corrupt-${randomUUID()}.png`
  await assert.rejects(
    uploadArtwork(supabase, {
      id: randomUUID(),
      file: pngFile(name, Buffer.from('not a PNG')),
      galleryType: '2D',
    }),
    /not a valid PNG/,
  )
})

test('TC-035 rejects duplicate artwork names without adding a second row', async () => {
  const name = `duplicate-${randomUUID()}.png`
  const first = {
    id: randomUUID(),
    gallery_type: '2D',
    path: null,
  }

  try {
    const stored = await uploadArtwork(supabase, {
      id: first.id,
      file: pngFile(name),
      galleryType: first.gallery_type,
    })
    first.path = stored.png_path
    await assert.rejects(
      uploadArtwork(supabase, {
        id: randomUUID(),
        file: pngFile(name),
        galleryType: '2D',
      }),
      /already exists/,
    )
    const { data, error } = await supabase
      .from('artwork')
      .select('id')
      .eq('png_name', name)
    assert.ifError(error)
    assert.equal(data.length, 1)
  } finally {
    await removeArtworks(supabase, [first])
  }
})

test('TC-036 rolls back Storage when the artwork database insert fails', async () => {
  const artworkId = randomUUID()
  const name = `rollback-${randomUUID()}.png`
  const path = `public/${name}`

  await assert.rejects(
    uploadArtwork(supabase, {
      id: artworkId,
      file: pngFile(name),
      galleryType: 'invalid',
    }),
    /Failed to save artwork/,
  )
  await assertArtworkAbsent(artworkId)
  await assertStorageAbsent(path)
})

test('TC-036 rolls back artwork and Storage when metadata insertion fails', async () => {
  const artwork = {
    id: randomUUID(),
    png_name: `rollback-metadata-${randomUUID()}.png`,
    gallery_type: '2D',
    png_path: null,
  }

  try {
    const stored = await uploadArtwork(supabase, {
      id: artwork.id,
      file: pngFile(artwork.png_name),
      galleryType: artwork.gallery_type,
    })
    artwork.png_path = stored.png_path
    await assert.rejects(
      saveProcreateInfo(supabase, artwork.id, {
        name: 'Invalid metadata',
        width: -1,
        height: 1,
        dpi: 72,
        strokeCount: 0,
        trackedTimeSeconds: 0,
        trackedTime: '0 hours 0 minutes',
      }),
      /Failed to upload canvas information/,
    )
    await assertArtworkAbsent(artwork.id)
    await assertStorageAbsent(artwork.png_path)
    artwork.png_path = null
  } finally {
    await removeArtworks(supabase, [{ ...artwork, path: artwork.png_path }])
  }
})

test('Supabase rejects invalid gallery values', async () => {
  const artworkId = randomUUID()
  const { error: invalidGalleryError } = await supabase.from('artwork').insert({
    id: artworkId,
    png_name: `invalid-${randomUUID()}.png`,
    png_path: `public/${artworkId}.png`,
    gallery_type: 'invalid',
  })
  assert.equal(invalidGalleryError?.code, '23514')
})

test('Supabase rejects orphan Procreate records', async () => {
  const artworkId = randomUUID()
  const { error: orphanError } = await supabase.from('procreate_data').insert({
    id: randomUUID(),
    artwork_id: artworkId,
    artwork_name: 'Orphan record',
    width: 1,
    height: 1,
    dpi: 72,
    stroke_count: 0,
    tracked_time_seconds: 0,
    tracked_time: '0 hours 0 minutes',
  })
  assert.equal(orphanError?.code, '23503')
})

test('TC-034 removes an artwork, its Procreate row, and its stored PNG', async () => {
  const artwork = {
    id: randomUUID(),
    png_name: `delete-${randomUUID()}.png`,
    gallery_type: '2D',
    path: null,
  }

  try {
    artwork.path = await insertArtwork(supabase, artwork)
    const { error: metadataError } = await supabase.from('procreate_data').insert({
      id: randomUUID(),
      artwork_id: artwork.id,
      artwork_name: 'Delete integration fixture',
      width: 1,
      height: 1,
      dpi: 72,
      stroke_count: 0,
      tracked_time_seconds: 0,
      tracked_time: '0 hours 0 minutes',
    })
    assert.ifError(metadataError)

    const { error: storageError } = await supabase.storage
      .from('artworks')
      .remove([artwork.path])
    assert.ifError(storageError)

    const { error: missingStorageError } = await supabase.storage
      .from('artworks')
      .download(artwork.path)
    assert.ok(missingStorageError, 'The removed PNG is still available in Storage')
    artwork.path = null

    const { error: deleteError } = await supabase
      .from('artwork')
      .delete()
      .eq('id', artwork.id)
    assert.ifError(deleteError)

    const { data: artworkRows, error: artworkQueryError } = await supabase
      .from('artwork')
      .select('id')
      .eq('id', artwork.id)
    assert.ifError(artworkQueryError)
    assert.deepEqual(artworkRows, [])

    const { data: metadataRows, error: metadataQueryError } = await supabase
      .from('procreate_data')
      .select('id')
      .eq('artwork_id', artwork.id)
    assert.ifError(metadataQueryError)
    assert.deepEqual(metadataRows, [])
  } finally {
    await removeArtworks(supabase, [artwork])
  }
})
