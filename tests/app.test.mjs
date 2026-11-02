import assert from 'node:assert/strict'
import { test } from 'vitest'

import { getOnly2DArtworks } from '../src/App.jsx'

test('Returns only the artworks for the 2D gallery', () => {
    const artworks = [
        {id: '1', gallery_type: '2D'},
        {id: '2', gallery_type: '3D'},
        {id: '3', gallery_type: 'both'},
    ]

  const actual = getOnly2DArtworks(artworks)

  assert.deepEqual(actual, [{id: '1', gallery_type: '2D'}])
})

test('Returns no artworks for an empty gallery', () => {
  const actual = getOnly2DArtworks([])

  assert.deepEqual(actual, [])
})