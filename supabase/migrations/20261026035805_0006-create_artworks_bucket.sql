INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow anonymous PNG uploads"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'artworks'
  AND storage.extension(name) = 'png'
  AND lower((storage.foldername(name))[1]) = 'public'
);