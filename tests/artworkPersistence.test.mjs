import assert from 'node:assert/strict'
import { test } from 'vitest'
import { makePngBuffer } from './supabase-test-support.mjs'
import { uploadArtwork } from '../src/artworkPersistence.mjs'

test('TC-011 does not create artwork when Storage rejects the PNG upload', async () => {
  let uploadAttempts = 0
  let insertAttempts = 0
  const artworkTable = {
    select(_columns, options) {
      if (options?.head) {
        return Promise.resolve({ count: 0, error: null })
      }

      return {
        eq() {
          return {
            limit: async () => ({ data: [], error: null }),
          }
        },
      }
    },
    async insert() {
      insertAttempts += 1
      return { error: null }
    },
  }
  const client = {
    from(table) {
      assert.equal(table, 'artwork')
      return artworkTable
    },
    storage: {
      from(bucket) {
        assert.equal(bucket, 'artworks')
        return {
          async upload() {
            uploadAttempts += 1
            return { data: null, error: { message: 'Storage rejected upload' } }
          },
        }
      },
    },
  }

  await assert.rejects(
    uploadArtwork(client, {
      id: 'artwork-id',
      file: new File([makePngBuffer()], 'artwork.png', { type: 'image/png' }),
      galleryType: '2D',
    }),
    /Failed to upload artwork: Storage rejected upload/,
  )

  assert.equal(uploadAttempts, 1)
  assert.equal(insertAttempts, 0)
})
