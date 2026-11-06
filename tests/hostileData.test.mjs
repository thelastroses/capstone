import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'vitest'

import { uploadArtwork } from '../src/artworkPersistence.mjs'
import { normalizeProcreateDocument } from '../src/procreateExtraction.jsx'

const hostileUrl = new URL('./fixtures/hostile.json', import.meta.url)
const hostileRecords = JSON.parse(await readFile(hostileUrl, 'utf8'))
const hostileTextCases = new Set([
  'unicode',
  'emoji',
  'apostrophes',
  'long-text',
  'injection',
])

function makeDocument(name) {
  return {
    name,
    size: '{120,90}',
    strokeCount: 1,
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }
}

function unexpectedBackendCall() {
  throw new Error('Hostile file name reached the backend')
}

test('TC-083 preserves hostile artwork names as text', () => {
  const records = hostileRecords.filter(({ case: name }) => hostileTextCases.has(name))

  assert.equal(records.length, hostileTextCases.size)
  for (const record of records) {
    const normalized = normalizeProcreateDocument(
      makeDocument(record.artwork_name),
      value => value,
    )
    assert.equal(normalized.name, record.artwork_name, record.case)
  }
})

test('TC-084 rejects traversal and non-PNG names before backend calls', async () => {
  const records = hostileRecords.filter(({ case: name }) =>
    ['path-traversal', 'wrong-file-type'].includes(name),
  )
  const client = {
    from: unexpectedBackendCall,
    storage: { from: unexpectedBackendCall },
  }

  for (const record of records) {
    const file = new File(
      [Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10])],
      record.png_name,
      { type: record.mime_type },
    )
    await assert.rejects(
      uploadArtwork(client, {
        id: record.id,
        file,
        galleryType: record.gallery_type,
      }),
      /valid file name/,
      record.case,
    )
  }
})

test('the checked-in hostile dataset contains the intended long-text boundary', () => {
  const record = hostileRecords.find(({ case: name }) => name === 'long-text')

  assert.equal(record.artwork_name.length, 10_000)
})
