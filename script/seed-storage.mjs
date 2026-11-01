import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and anon key are required to seed Storage')
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
