INSERT INTO public.artwork (id, png_name, gallery_type, png_path)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'pumpkinPieImage.png',
  '3D',
  'src/pumpkinPieImage.png'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.procreate_data (
  id,
  artwork_id,
  width,
  height,
  dpi,
  stroke_count,
  tracked_time_seconds,
  artwork_name,
  tracked_time
)
VALUES (
  '00000000-0000-4000-8000-000000000002',
  '00000000-0000-4000-8000-000000000001',
  4320,
  5400,
  300,
  1000,
  1,
  'daphne',
  '1'
)
ON CONFLICT (id) DO NOTHING;