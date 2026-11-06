import assert from 'node:assert/strict'
import { test } from 'vitest'

import { getUploudArtworkError, getCheckLimit, getGalleryType } from '../src/Dropzone.jsx'

test('TC-067 requires a PNG when no artwork is selected', () => {
  const actual = getUploudArtworkError({
    artworkId: null,
    pngFile: null,
  })

  assert.equal(actual, 'Upload the artwork PNG before adding its Procreate file')
})

test('TC-068 accepts the upload prerequisite when a PNG is selected', () => {
  const actual = getUploudArtworkError({
    artworkId: null,
    pngFile: { name: 'aArtworkName.png' },
  })

  assert.equal(actual, null)
})

test('TC-069 rejects artwork counts above the upload limit', () => {
  const actual = getCheckLimit(22)

  assert.equal(actual, 'The artwork limit has been reached (20)')
})

test('TC-070 accepts artwork counts below the upload limit', () => {
  const actual = getCheckLimit(19)

  assert.equal(actual, null)
})

test('TC-071 requires a gallery type selection', () => {
  const actual = getGalleryType()

  assert.equal(actual, 'Please select a gallery type')
})

test('TC-072 accepts the supported 2D gallery type', () => {
  const actual = getGalleryType('2D')

  assert.equal(actual, null)
})

test('TC-043 rejects a missing gallery selection and accepts every supported option', () => {
  assert.equal(getGalleryType(), 'Please select a gallery type')
  assert.equal(getGalleryType('2D'), null)
  assert.equal(getGalleryType('3D'), null)
  assert.equal(getGalleryType('both'), null)
})

test('TC-044 enforces the 20-artwork limit at its boundary', () => {
  assert.equal(getCheckLimit(19), null)
  assert.equal(getCheckLimit(20), 'The artwork limit has been reached (20)')
  assert.equal(getCheckLimit(21), 'The artwork limit has been reached (20)')
})

test('TC-045 requires a PNG before Procreate artwork information can be added', () => {
  assert.equal(
    getUploudArtworkError({ artworkId: null, pngFile: null }),
    'Upload the artwork PNG before adding its Procreate file',
  )
  assert.equal(
    getUploudArtworkError({
      artworkId: null,
      pngFile: { name: 'artwork.png' },
    }),
    null,
  )
})

test('TC-049 gallery selection validation rejects unsupported values', () => {
  assert.equal(getGalleryType(''), 'Please select a gallery type')
  assert.equal(getGalleryType('invalid'), 'Please select a gallery type')
})

test('TC-050 existing artwork ID satisfies the Procreate upload prerequisite', () => {
  assert.equal(
    getUploudArtworkError({ artworkId: 'artwork-1', pngFile: null }),
    null,
  )
})