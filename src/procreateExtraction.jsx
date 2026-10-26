import JSZip from 'jszip'
import { parseBuffer } from 'bplist-parser'
import { Buffer } from 'buffer'

globalThis.Buffer = Buffer

export async function extractProcreate(file) {
  if (!file) {
    throw new Error('Please select a Procreate file')
  }

  const zip = await JSZip.loadAsync(file)
  const documentArchive = zip.file('Document.archive')

  if (!documentArchive) {
    throw new Error('The Procreate file has no Document.archive')
  }

  const archiveBytes = await documentArchive.async('uint8array')
  const parsedPlist = parseBuffer(
    Buffer.from(archiveBytes)
  )

  const objects = parsedPlist?.[0]?.$objects

  if (!Array.isArray(objects) || !objects[1]) {
    throw new Error('Could not read the Procreate document data')
  }

  function getObject(reference) {
    const index =
      reference?.UID ??
      reference?.data ??
      reference

    if (
      !Number.isInteger(index) ||
      index < 0 ||
      objects[index] === undefined
    ) {
      throw new Error(
        'Could not resolve a Procreate document value'
      )
    }

    return objects[index]
  }

  const document = objects[1]

  const name = getObject(document.name)
  const size = getObject(document.size)
  const strokeCount = getObject(document.strokeCount)

  if (typeof size !== 'string') {
    throw new Error(
      'Unexpected canvas size format in Procreate document'
    )
  }

  const dimensions = size
    .replace(/[{}]/g, '')
    .split(',')
    .map(value => Number(value.trim()))

  const [width, height] = dimensions

  if (
    dimensions.length !== 2 ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error('Invalid canvas dimensions')
  }

  const dpi = Number(
    document.SilicaDocumentArchiveDPIKey
  )

  if (!Number.isFinite(dpi) || dpi <= 0) {
    throw new Error('Invalid or missing canvas DPI')
  }

  const trackedTime = Number(
    document.SilicaDocumentTrackedTimeKey
  )

  if (!Number.isFinite(trackedTime) || trackedTime < 0) {
    throw new Error('Invalid tracked time')
  }

  const hours = Math.floor(trackedTime / 3600)
  const minutes = Math.floor((trackedTime % 3600) / 60)

  return {
    name,
    width,
    height,
    dpi,
    strokeCount,
    trackedTime: `${hours} hours ${minutes} minutes`,
    trackedTimeSeconds: Math.floor(trackedTime),
  }
}