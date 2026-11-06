import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'
import { loadEnv } from 'vite'

const { VITE_SUPABASE_URL: supabaseUrl, VITE_SUPABASE_ANON_KEY: supabaseKey } =
  loadEnv('development', process.cwd())

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL and anon key are missing. Run ./script/setup first to start local Supabase and create .env.local.',
  )
}

const imagePath = fileURLToPath(new URL('../src/pumpkinpie.png', import.meta.url))
const image = await readFile(imagePath)
const supabase = createClient(supabaseUrl, supabaseKey)

const { error } = await supabase.storage
  .from('artworks')
  .upload('public/pumpkinpie.png', image, {
    contentType: 'image/png',
    upsert: true,
  })

if (error) {
  throw new Error(`Could not seed artwork image in Supabase Storage: ${error.message}`)
}

console.log('Seeded public/pumpkinpie.png in the artworks bucket')
