import assert from 'node:assert/strict'
import { test } from 'vitest'

import { getOnly2DArtworks } from '../src/App.jsx'

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