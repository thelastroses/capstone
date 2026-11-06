const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10]
const ARTWORK_LIMIT = 20

function throwOnError(error, operation) {
  if (error) {
    throw new Error(`${operation}: ${error.message}`, { cause: error })
  }
}

async function removeStoredArtwork(client, path) {
  const { error } = await client.storage.from('artworks').remove([path])
  throwOnError(error, 'Could not clean up uploaded artwork')
}

export async function removeArtworkAndFile(client, artwork) {
  const { error: deleteError } = await client
    .from('artwork')
    .delete()
    .eq('id', artwork.id)
  throwOnError(deleteError, 'Could not remove artwork record')
  await removeStoredArtwork(client, artwork.png_path)
}

export async function uploadArtwork(client, { id, file, galleryType }) {
  if (
    typeof file?.name !== 'string' ||
    !file.name.toLowerCase().endsWith('.png') ||
    /[\\/]/.test(file.name)
  ) {
    throw new Error('The selected file must be a PNG with a valid file name')
  }

  const bytes = new Uint8Array(await file.arrayBuffer())
  if (!PNG_SIGNATURE.every((byte, index) => bytes[index] === byte)) {
    throw new Error('The selected file is not a valid PNG')
  }

  const { count, error: countError } = await client
    .from('artwork')
    .select('id', { count: 'exact', head: true })
  throwOnError(countError, 'Could not check the artwork limit')
  if (count >= ARTWORK_LIMIT) {
    throw new Error('The artwork limit has been reached (20)')
  }

  const { data: duplicates, error: duplicateError } = await client
    .from('artwork')
    .select('id')
    .eq('png_name', file.name)
    .limit(1)
  throwOnError(duplicateError, 'Could not check for duplicate artwork')
  if (duplicates.length) {
    throw new Error('An artwork with this file name already exists')
  }

  const path = `public/${file.name}`
  const { data: uploaded, error: uploadError } = await client.storage
    .from('artworks')
    .upload(path, file, {
      contentType: 'image/png',
      upsert: false,
    })
  throwOnError(uploadError, 'Failed to upload artwork')

  const { error: insertError } = await client.from('artwork').insert({
    id,
    png_name: file.name,
    gallery_type: galleryType,
    png_path: uploaded.path,
  })

  if (insertError) {
    await removeStoredArtwork(client, uploaded.path)
    throwOnError(insertError, 'Failed to save artwork')
  }

  return { id, png_path: uploaded.path }
}

export async function saveProcreateInfo(client, artworkId, info) {
  const { error } = await client.from('procreate_data').insert({
    id: crypto.randomUUID(),
    artwork_id: artworkId,
    artwork_name: info.name,
    width: info.width,
    height: info.height,
    dpi: info.dpi,
    stroke_count: info.strokeCount,
    tracked_time_seconds: info.trackedTimeSeconds,
    tracked_time: info.trackedTime,
  })

  if (error) {
    const { data: artwork, error: lookupError } = await client
      .from('artwork')
      .select('id,png_path')
      .eq('id', artworkId)
      .maybeSingle()
    throwOnError(lookupError, 'Could not find artwork to clean up')
    if (artwork) {
      await removeArtworkAndFile(client, artwork)
    }
    throwOnError(error, 'Failed to upload canvas information')
  }
}
