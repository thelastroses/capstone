ALTER TABLE procreate_data
    DROP COLUMN IF EXISTS procreate_path,
    ADD COLUMN IF NOT EXISTS stroke_count integer,
    ADD COLUMN IF NOT EXISTS tracked_time_seconds integer,
    ADD COLUMN IF NOT EXISTS layer_count integer;
