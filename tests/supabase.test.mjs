import assert from 'node:assert/strict';
import test from 'node:test';

test('local Supabase contains the seeded artwork', async () => {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  assert.ok(url, 'VITE_SUPABASE_URL is missing; run ./script/setup first');
  assert.ok(key, 'VITE_SUPABASE_ANON_KEY is missing; run ./script/setup first');

  const response = await fetch(
    `${url}/rest/v1/artwork?id=eq.00000000-0000-4000-8000-000000000001&select=id,png_name,gallery_type,png_path`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );

  assert.equal(response.status, 200, `Supabase returned ${response.status}`);
  assert.deepEqual(await response.json(), [{
    id: '00000000-0000-4000-8000-000000000001',
    png_name: 'eye.jpg',
    gallery_type: '2D',
    png_path: 'src/eye.jpg',
  }]);
});
