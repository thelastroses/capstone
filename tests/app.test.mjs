import assert from 'node:assert/strict'
import { test } from 'vitest'

import { getOnly2DArtworks, getOnly3DArtworks } from '../src/App.jsx'
import { getDisplayedArtworks, SAMPLE_ARTWORKS } from '../src/sampleArtworks.js'
import { getImages } from '../src/Artwork.jsx'

function createArtworkClient(response) {
  return {
    from() {
      return {
        select() {
          return {
            abortSignal() {
              return Promise.resolve(response)
            },
          }
        },
      }
    },
  }
}

test('TC-047 returns 2D and both-gallery artworks for the 2D gallery', () => {
    const artworks = [
        {id: '1', gallery_type: '2D'},
        {id: '2', gallery_type: '3D'},
        {id: '3', gallery_type: 'both'},
    ]

  const actual = getOnly2DArtworks(artworks)

  assert.deepEqual(actual, [
    {id: '1', gallery_type: '2D'},
    {id: '3', gallery_type: 'both'},
  ])
})

test('TC-065 returns no artworks for an empty gallery', () => {
  const actual = getOnly2DArtworks([])

  assert.deepEqual(actual, [])
})

test('TC-066 includes artworks selected for both galleries in the 2D overview', () => {
  const actual = getOnly2DArtworks([
    { id: '2d', gallery_type: '2D' },
    { id: '3d', gallery_type: '3D' },
    { id: 'both', gallery_type: 'both' },
  ])

  assert.deepEqual(actual, [
    { id: '2d', gallery_type: '2D' },
    { id: 'both', gallery_type: 'both' },
  ])
})

test('TC-048 does not mutate the source artwork list while filtering', () => {
  const artworks = [
    { id: '3d', gallery_type: '3D' },
    { id: 'both', gallery_type: 'both' },
  ]
  const original = [...artworks]

  getOnly2DArtworks(artworks)

  assert.deepEqual(artworks, original)
})

test('3D gallery includes 3D and both-gallery artworks exactly once', () => {
  const artworks = [
    { id: '2d', gallery_type: '2D' },
    { id: '3d', gallery_type: '3D' },
    { id: 'both', gallery_type: 'both' },
  ]

  assert.deepEqual(getOnly3DArtworks(artworks), [
    { id: '3d', gallery_type: '3D' },
    { id: 'both', gallery_type: 'both' },
  ])
})

test('offline gallery uses sample artwork only when no real artworks are available', () => {
  assert.deepEqual(getDisplayedArtworks([], true), SAMPLE_ARTWORKS)

  const savedArtworks = [{ id: 'saved-artwork', gallery_type: 'both' }]
  assert.equal(getDisplayedArtworks(savedArtworks, true), savedArtworks)
  assert.deepEqual(getDisplayedArtworks([], false), [])
})

test('artwork request times out and can fall back instead of waiting indefinitely', async () => {
  const client = {
    from() {
      return {
        select() {
          return {
            abortSignal(signal) {
              return new Promise(resolve => {
                signal.addEventListener(
                  'abort',
                  () => resolve({ data: null, error: { name: 'AbortError' }, status: 0 }),
                  { once: true },
                )
              })
            },
          }
        },
      }
    },
  }

  await assert.rejects(
    getImages({ client, timeoutMs: 5 }),
    error => error.kind === 'timeout',
  )
})

test('artwork rate limits produce a distinct retryable error', async () => {
  const client = createArtworkClient({
    data: null,
    error: { message: 'Too many requests' },
    status: 429,
  })

  await assert.rejects(
    getImages({ client }),
    error => error.kind === 'rate-limited',
  )
})

test('unexpected artwork response shape is rejected for the sample fallback', async () => {
  const client = createArtworkClient({
    data: [{
      id: 'artwork-1',
      png_name: 'artwork.png',
      gallery_type: '2D',
      procreate_data: null,
    }],
    error: null,
    status: 200,
  })

  await assert.rejects(
    getImages({ client }),
    error => error.kind === 'invalid-response',
  )
})

test('a removed database column is reported as a changed response', async () => {
  const client = createArtworkClient({
    data: null,
    error: { code: '42703', message: 'column artwork.png_path does not exist' },
    status: 400,
  })

  await assert.rejects(
    getImages({ client }),
    error => error.kind === 'invalid-response',
  )
})

test('missing optional canvas metadata is accepted for n/a display', async () => {
  const artwork = {
    id: 'artwork-1',
    png_name: 'artwork.png',
    png_path: 'artwork.png',
    gallery_type: '2D',
    procreate_data: { artwork_name: 'Artwork' },
  }
  const client = createArtworkClient({ data: [artwork], error: null, status: 200 })

  assert.deepEqual(await getImages({ client }), [artwork])
})