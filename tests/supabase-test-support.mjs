import assert from 'node:assert/strict'
import { createClient } from '@supabase/supabase-js'
import { deflateSync } from 'node:zlib'

const localHosts = new Set(['127.0.0.1', 'localhost', '::1'])

export function createLocalSupabaseClient() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY

  assert.ok(url, 'VITE_SUPABASE_URL is missing; run ./script/setup first')
  assert.ok(key, 'VITE_SUPABASE_ANON_KEY is missing; run ./script/setup first')

  const parsedUrl = new URL(url)
  assert.ok(
    localHosts.has(parsedUrl.hostname.replace(/^\[|\]$/g, '')),
    'Integration tests are restricted to a local Supabase URL',
  )

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export function makePngBuffer() {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(1, 0)
  ihdr.writeUInt32BE(1, 4)
  ihdr[8] = 8
  ihdr[9] = 6

  const chunk = (type, data) => {
    const typeBuffer = Buffer.from(type, 'ascii')
    const crcInput = Buffer.concat([typeBuffer, data])
    const output = Buffer.alloc(12 + data.length)
    output.writeUInt32BE(data.length, 0)
    typeBuffer.copy(output, 4)
    data.copy(output, 8)
    output.writeUInt32BE(crc32(crcInput), 8 + data.length)
    return output
  }

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(Buffer.from([0, 40, 120, 200, 255]))),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

export async function insertArtwork(client, artwork, pngBuffer = makePngBuffer()) {
  const path = `public/${artwork.id}.png`
  const { error: storageError } = await client.storage
    .from('artworks')
    .upload(path, pngBuffer, { contentType: 'image/png', upsert: false })
  assert.ifError(storageError)

  const { error: insertError } = await client.from('artwork').insert({
    id: artwork.id,
    png_name: artwork.png_name,
    png_path: path,
    gallery_type: artwork.gallery_type,
  })

  if (insertError) {
    const { error: cleanupError } = await client.storage.from('artworks').remove([path])
    assert.ifError(cleanupError)
    throw insertError
  }

  return path
}

export async function removeArtworks(client, artworks) {
  const paths = [...new Set(artworks.map(({ path }) => path).filter(Boolean))]
  if (paths.length) {
    const { error } = await client.storage.from('artworks').remove(paths)
    assert.ifError(error)
  }

  const ids = artworks.map(({ id }) => id).filter(Boolean)
  if (ids.length) {
    const { error } = await client.from('artwork').delete().in('id', ids)
    assert.ifError(error)
  }
}

export async function removeArtworkByName(client, name) {
  const { data, error } = await client
    .from('artwork')
    .select('id,png_path')
    .eq('png_name', name)
  assert.ifError(error)

  if (!data.length) return

  const paths = [...new Set(data.map(({ png_path }) => png_path))]
  if (paths.length) {
    const { error: storageError } = await client.storage
      .from('artworks')
      .remove(paths)
    assert.ifError(storageError)
  }

  const { error: deleteError } = await client
    .from('artwork')
    .delete()
    .in('id', data.map(({ id }) => id))
  assert.ifError(deleteError)
}
