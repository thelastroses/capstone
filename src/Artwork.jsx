import { supabase } from "./supabase";

export async function getImages()
{
    const { data, error } = await supabase
        .from('artwork')
        .select(`id, png_name, png_path, gallery_type,
          procreate_data (
          artwork_name, width, height, dpi, stroke_count, tracked_time
          )`);


      if (error)
      {
        toast.error("Failed to retrieve artwork");
        console.log(error);
        return null;
      }

    return data
}