import assert from 'node:assert/strict'
import { test } from 'vitest'

import { extractProcreate, normalizeProcreateDocument } from '../src/procreateExtraction.jsx'

test('TC-073 normalizes valid metadata into the expected fields', () => {
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

test('TC-074 rejects nonnumeric canvas dimension data', () => {
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

test('TC-075 rejects a zero canvas dimension', () => {
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

test('TC-076 rejects negative tracked time', () => {
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

test('TC-077 requires a file before extracting a document', async () => {
  await assert.rejects(
    () => extractProcreate(null),
    /Please select a Procreate file/
  )
})

test('TC-078 preserves emoji and punctuation in an artwork name', () => {
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

test('TC-046 normalizes valid canvas metadata and rejects invalid dimensions or tracked time', () => {
  const validDocument = {
    name: 'Test artwork',
    size: '{120,90}',
    strokeCount: 42,
    SilicaDocumentArchiveDPIKey: 300,
    SilicaDocumentTrackedTimeKey: 3661,
  }

  assert.deepEqual(
    normalizeProcreateDocument(validDocument, value => value),
    {
      name: 'Test artwork',
      width: 120,
      height: 90,
      dpi: 300,
      strokeCount: 42,
      trackedTime: '1 hours 1 minutes',
      trackedTimeSeconds: 3661,
    },
  )

  assert.throws(
    () => normalizeProcreateDocument(
      { ...validDocument, size: '{0,90}' },
      value => value,
    ),
    /Invalid canvas dimensions/,
  )

  assert.throws(
    () => normalizeProcreateDocument(
      { ...validDocument, SilicaDocumentTrackedTimeKey: -1 },
      value => value,
    ),
    /Invalid tracked time/,
  )
})

test('normalizeProcreateDocument accepts whitespace around canvas dimensions', () => {
  const document = {
    name: 'Whitespace',
    size: '{ 120, 90 }',
    strokeCount: 1,
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.equal(
    normalizeProcreateDocument(document, value => value).width,
    120,
  )
  assert.equal(
    normalizeProcreateDocument(document, value => value).height,
    90,
  )
})

test('normalizeProcreateDocument rejects a malformed canvas size', () => {
  const document = {
    name: 'Malformed size',
    size: '{120x90}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid canvas dimensions/,
  )
})

test('normalizeProcreateDocument rejects a negative canvas width', () => {
  const document = {
    name: 'Negative width',
    size: '{-1,90}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid canvas dimensions/,
  )
})

test('normalizeProcreateDocument rejects a negative canvas height', () => {
  const document = {
    name: 'Negative height',
    size: '{120,-1}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid canvas dimensions/,
  )
})

test('normalizeProcreateDocument rejects a missing DPI', () => {
  const document = {
    name: 'Missing DPI',
    size: '{120,90}',
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid or missing canvas DPI/,
  )
})

test('normalizeProcreateDocument rejects a non-positive DPI', () => {
  const document = {
    name: 'Zero DPI',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: 0,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid or missing canvas DPI/,
  )
})

test('normalizeProcreateDocument converts time at an hour boundary', () => {
  const document = {
    name: 'Hour boundary',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 3600,
  }

  assert.equal(
    normalizeProcreateDocument(document, value => value).trackedTime,
    '1 hours 0 minutes',
  )
})

test('normalizeProcreateDocument rejects non-numeric tracked time', () => {
  const document = {
    name: 'Invalid time',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 'unknown',
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid tracked time/,
  )
})

test('normalizeProcreateDocument rejects an unresolved document reference', () => {
  const document = {
    name: 'Unresolved reference',
    size: '{120,90}',
    strokeCount: 1,
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(
      document,
      () => { throw new Error('Could not resolve a Procreate document value') },
    ),
    /Could not resolve a Procreate document value/,
  )
})

test('TC-079 rejects a non-string canvas size', () => {
  const document = {
    name: 'Numeric size',
    size: 120,
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Unexpected canvas size format/,
  )
})

test('TC-080 rejects canvas sizes with extra dimensions', () => {
  const document = {
    name: 'Extra dimension',
    size: '{120,90,3}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid canvas dimensions/,
  )
})

test('TC-081 rejects a non-numeric DPI', () => {
  const document = {
    name: 'Invalid DPI',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: 'high',
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid or missing canvas DPI/,
  )
})

test('TC-082 rejects an infinite DPI', () => {
  const document = {
    name: 'Infinite DPI',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: Infinity,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid or missing canvas DPI/,
  )
})

test('TC-083 rejects missing tracked time', () => {
  const document = {
    name: 'Missing time',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: 72,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid tracked time/,
  )
})

test('TC-084 rejects infinite tracked time', () => {
  const document = {
    name: 'Infinite time',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: Infinity,
  }

  assert.throws(
    () => normalizeProcreateDocument(document, value => value),
    /Invalid tracked time/,
  )
})

test('TC-085 floors fractional tracked seconds', () => {
  const document = {
    name: 'Fractional time',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 61.9,
  }

  const result = normalizeProcreateDocument(document, value => value)

  assert.equal(result.trackedTimeSeconds, 61)
  assert.equal(result.trackedTime, '0 hours 1 minutes')
})

test('TC-086 formats the last minute before an hour', () => {
  const document = {
    name: 'Hour boundary minus one second',
    size: '{120,90}',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 3599,
  }

  const result = normalizeProcreateDocument(document, value => value)

  assert.equal(result.trackedTime, '0 hours 59 minutes')
  assert.equal(result.trackedTimeSeconds, 3599)
})

test('TC-087 rejects a missing canvas size returned by the resolver', () => {
  const document = {
    name: 'Missing resolved size',
    size: 'reference',
    SilicaDocumentArchiveDPIKey: 72,
    SilicaDocumentTrackedTimeKey: 0,
  }

  assert.throws(
    () => normalizeProcreateDocument(
      document,
      value => value === 'reference' ? undefined : value,
    ),
    /Unexpected canvas size format/,
  )
})
