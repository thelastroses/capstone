import assert from 'node:assert/strict'
import { test } from 'vitest'

import { extractProcreate, normalizeProcreateDocument } from '../src/procreateExtraction.jsx'

test('normalizeProcreateDocument returns formatted metadata for a valid document', () => {
  const document = {
    name: 'Minion Party',
    size: '{120,90}',
    strokeCount: 42,
    SilicaDocumentArchiveDPIKey: 300,
    SilicaDocumentTrackedTimeKey: 3661,
  }

  const result = normalizeProcreateDocument(document, value => value)

  assert.deepEqual(result, {
    name: 'Minion Party',
    width: 120,
    height: 90,
    dpi: 300,
    strokeCount: 42,
    trackedTime: '1 hours 1 minutes',
    trackedTimeSeconds: 3661,
  })
})

test('normalizeProcreateDocument rejects invalid canvas size data', () => {
  const document = {
    name: 'Bad Document',
    size: 'bad canvas size',
    strokeCount: 10,
    SilicaDocumentArchiveDPIKey: 300,
    SilicaDocumentTrackedTimeKey: 120,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid canvas dimensions/
  )
})

test('rejects a zero canvas dimension', () => {
  const document = {
    name: 'Test',
    size: '{0,90}',
    strokeCount: 1,
    SilicaDocumentArchiveDPIKey: 300,
    SilicaDocumentTrackedTimeKey: 60,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid canvas dimensions/
  )
})

test('normalizeProcreateDocument rejects invalid tracked time', () => {
  const document = {
    name: 'Bad Time',
    size: '{800,600}',
    strokeCount: 17,
    SilicaDocumentArchiveDPIKey: 300,
    SilicaDocumentTrackedTimeKey: -15,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid tracked time/
  )
})

test('extractProcreate requires a file before reading a document', async () => {
  await assert.rejects(
    () => extractProcreate(null),
    /Please select a Procreate file/
  )
})

test('Preserves emoji and punctuation in an artwork name', () => {
  const name = "Howdy's '; DROP TABLE 🫡"

  const document = {
    name,
    size: '{120,90}',
    strokeCount: 42,
    SilicaDocumentArchiveDPIKey: 300,
    SilicaDocumentTrackedTimeKey: 3661,
  }

  const actual = normalizeProcreateDocument(document, value => value)

  assert.equal(actual.name, name)
})

