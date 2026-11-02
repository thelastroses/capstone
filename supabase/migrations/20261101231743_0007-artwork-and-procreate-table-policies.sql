ALTER TABLE public.artwork ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procreate_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon full artwork access"
ON public.artwork
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anon full Procreate access"
ON public.procreate_data
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous PNG uploads"
ON storage.objects;

CREATE POLICY "Allow anon full artwork file access"
ON storage.objects
FOR ALL
TO anon
USING (
  bucket_id = 'artworks'
  AND storage.extension(name) = 'png'
  AND lower((storage.foldername(name))[1]) = 'public'
)
WITH CHECK (
  bucket_id = 'artworks'
  AND storage.extension(name) = 'png'
  AND lower((storage.foldername(name))[1]) = 'public'
);
