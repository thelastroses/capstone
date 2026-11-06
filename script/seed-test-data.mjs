import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const fixtureDirectory = new URL('../tests/fixtures/', import.meta.url)
const seedFile = new URL('../tests/fixtures/test-data.seed.json', import.meta.url)
const { seed } = JSON.parse(await readFile(seedFile, 'utf8'))
const setNames = ['happy', 'boundary', 'hostile']
const setArgumentIndex = process.argv.indexOf('--set')
const requestedSet = setArgumentIndex < 0
  ? 'all'
  : process.argv[setArgumentIndex + 1]

if (requestedSet !== 'all' && !setNames.includes(requestedSet)) {
  throw new Error(`Unknown data set "${requestedSet}". Choose happy, boundary, hostile, or all.`)
}

function randomGenerator(offset) {
  let state = (seed ^ offset) >>> 0
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return state >>> 0
  }
}

function createId(random) {
  const bytes = Array.from({ length: 16 }, () => random() & 0xff)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = bytes.map(byte => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function createHappySet() {
  const random = randomGenerator(1)
  return Array.from({ length: 10 }, (_, index) => {
    const id = createId(random)
    return {
      id,
      png_name: `happy-${id.slice(0, 8)}.png`,
      artwork_name: `Happy artwork ${String(index + 1).padStart(2, '0')}`,
      gallery_type: ['2D', '3D', 'both'][random() % 3],
      mime_type: 'image/png',
    }
  })
}

function createBoundarySet() {
  const random = randomGenerator(2)
  const cases = [
    { case: 'empty', input: [], expectedCount: 0 },
    { case: 'one', input: { artworkCount: 1 }, expectedCount: 1 },
    { case: 'max', input: { artworkCount: 20 }, expectedCount: 20 },
    { case: 'zero', input: { value: 0 }, expectedValue: 0 },
    { case: 'negative', input: { value: -1 }, expectedValue: -1 },
    { case: 'earliest', input: { date: '0001-01-01T00:00:00.000Z' } },
    { case: 'latest', input: { date: '9999-12-31T23:59:59.999Z' } },
  ]

  return cases.map(entry => ({
    id: createId(random),
    ...entry,
  }))
}

function createHostileSet() {
  const random = randomGenerator(3)
  const records = [
    {
      case: 'unicode',
      artwork_name: '雪の庭 — café — Ελληνικά',
      png_name: 'unicode-art.png',
    },
    {
      case: 'emoji',
      artwork_name: '🌈🖼️🫡',
      png_name: 'emoji-art.png',
    },
    {
      case: 'apostrophes',
      artwork_name: "Artist's 'quoted' artwork",
      png_name: "artist's-art.png",
    },
    {
      case: 'long-text',
      artwork_name: 'A'.repeat(10_000),
      png_name: 'long-text.png',
    },
    {
      case: 'injection',
      artwork_name: `'; DROP TABLE artwork; -- <img src=x onerror=alert(1)>`,
      png_name: 'injection.png',
    },
    {
      case: 'path-traversal',
      artwork_name: 'Path traversal filename',
      png_name: '../../outside.png',
    },
    {
      case: 'wrong-file-type',
      artwork_name: 'Unsupported file extension',
      png_name: 'not-an-image.jpg',
    },
  ]

  return records.map(record => ({
    id: createId(random),
    gallery_type: '2D',
    mime_type: record.png_name.endsWith('.png') ? 'image/png' : 'image/jpeg',
    ...record,
  }))
}

const dataSets = {
  happy: createHappySet(),
  boundary: createBoundarySet(),
  hostile: createHostileSet(),
}

await mkdir(fixtureDirectory, { recursive: true })
for (const name of requestedSet === 'all' ? setNames : [requestedSet]) {
  const output = new URL(`${name}.json`, fixtureDirectory)
  await writeFile(output, `${JSON.stringify(dataSets[name], null, 2)}\n`)
  console.log(`${name}: ${dataSets[name].length} records -> ${fileURLToPath(output)}`)
}
