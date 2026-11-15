export const SAMPLE_ARTWORKS = [
  {
    id: 'offline-sample-artwork',
    png_name: 'sample-artwork.png',
    png_path: 'sample-artwork.png',
    image_url: '/sample-artwork.png',
    gallery_type: 'both',
    procreate_data: {
      artwork_name: 'Sample artwork',
      width: 2048,
      height: 2048,
      dpi: 300,
      stroke_count: 128,
      tracked_time: '1 hour 24 minutes',
    },
  },
]

export function getDisplayedArtworks(artworks, databaseUnavailable) {
  if (databaseUnavailable && artworks.length === 0) {
    return SAMPLE_ARTWORKS
  }

  return artworks
}
