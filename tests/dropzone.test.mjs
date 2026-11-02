import assert from 'node:assert/strict'
import { test } from 'vitest'

import { getUploudArtworkError, getCheckLimit, getGalleryType } from '../src/Dropzone.jsx'

test('Wants PNG when no artwork selected', () => {
  const actual = getUploudArtworkError({
    artworkId: null,
    pngFile: null,
  })

  assert.equal(actual, 'Upload the artwork PNG before adding its Procreate file')
})

test('Does not want PNG but one was selected', () => {
  const actual = getUploudArtworkError({
    artworkId: null,
    pngFile: { name: 'aArtworkName.png' },
  })

  assert.equal(actual, null)
})

test('Artwork limit is reached', () => {
  const actual = getCheckLimit(22)

  assert.equal(actual, 'The artwork limit has been reached (20)')
})

test('Artwork limit is not reached', () => {
  const actual = getCheckLimit(19)

  assert.equal(actual, null)
})

test('Wants gallery type', () => {
  const actual = getGalleryType()

  assert.equal(actual, 'Please select a gallery type')
})

test('Accepts gallery type', () => {
  const actual = getGalleryType('2D')

  assert.equal(actual, null)
})