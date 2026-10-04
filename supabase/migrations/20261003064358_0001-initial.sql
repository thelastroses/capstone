CREATE TABLE artwork
(
    id uuid PRIMARY KEY,
    png_name text NOT NULL,
    gallery_type text NOT NULL,
    png_path text NOT NULL,

    CONSTRAINT gallery_type_check
        CHECK (gallery_type IN ('2D', '3D', 'both'))
);

CREATE TABLE procreate_data
(
    id uuid PRIMARY KEY,
    artwork_id uuid NOT NULL,
    width integer,
    height integer,
    dpi integer,
    procreate_path text NOT NULL,

    CONSTRAINT procreate_data_artwork_fk
        FOREIGN KEY (artwork_id)
        REFERENCES artwork(id)
        ON DELETE CASCADE,


    CONSTRAINT width_check
        CHECK (width IS NULL OR width >= 0),

    CONSTRAINT one_artwork_check
        UNIQUE (artwork_id),
    
    CONSTRAINT height_check
        CHECK (height IS NULL OR height >= 0),
    
    CONSTRAINT dpi_check
        CHECK (dpi IS NULL OR dpi >= 0)
);