import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { supabase } from './supabase';
import { generateUUID } from 'three/src/math/MathUtils.js';
import { extractProcreate } from "./procreateExtraction.jsx";
import toast from 'react-hot-toast';

//Got permission to use code from Hamed Bahram's repo for the dropzone/upload section of the Art Gallery: https://github.com/HamedBahram/dropzone.git
//src/repo-permission-image/DropzoneRepoPermission.png

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [rejected, setRejected] = useState([]) 
  const [activeArtworkId, setActiveArtworkId] = useState(null)
  const [extractedInfo, setExtractedInfo] = useState(null)

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    
    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
    
    //Extraction

    const pngFile = acceptedFiles.find(file =>
        file.name.toLowerCase().endsWith('.png')
    )

    const procreateFile = acceptedFiles.find(file =>
        file.name.toLowerCase().endsWith('.procreate')
    )
    
      const artworkPromise = pngFile
      ? uploadImage(pngFile)
      : Promise.resolve(activeArtworkId)

      const extractionPromise = procreateFile
      ? extractProcreate(procreateFile)
      : Promise.resolve(null)

      try {
        const [artworkId, info] = await Promise.all([
          artworkPromise,
          extractionPromise
        ])

        if (pngFile) {
          setActiveArtworkId(artworkId)
          setFiles(previous => [
            ...previous,
            Object.assign(pngFile, {
              preview: URL.createObjectURL(pngFile), artworkId
            })
          ])
        }

        if (procreateFile) {
          if (!artworkId || !info) {
            throw new Error('Upload the artwork PNG before adding its Procreate file.')
          }

          if(procreateFile && info && artworkId)
          {
            setExtractedInfo(info)
            await saveProcreateInfo(info, artworkId)
          }
        }
      } catch (error) {
        console.error('Could not process artwork:', error)
      }
  }, [activeArtworkId])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'application/octet-stream': ['.procreate']
    },
   /*  maxSize: 1024 * 1000, */
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  useEffect(() => {
    getImages()
  }, [])

   const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  } 

    async function getImages()
    {
      const { data, error } = await supabase
        .from('artwork')
        .select(`id, png_name, png_path, 
          procreate_data (
          artwork_name, width, height, dpi, stroke_count, tracked_time
          )`);

      if(data != null)
      {
        setImages(data);
        
      }
      else
      {
        console.log(error);
      }
    }


    async function uploadImage(file)
    {
      const { data: upload, error: uploadError } = await supabase
        .storage
        .from('artworks')
        .upload(`public/${file.name}`, file)

      if(uploadError)
        {
          console.log(uploadError);
          toast.error("Failed to Upload");
        }

      const artworkId = generateUUID()

        const { error: insertError } = await supabase
            .from('artwork')
            .insert({
              id: artworkId,
              png_name: file.name,
              gallery_type: '2D',
              png_path: upload.path
            })

        

        toast.success("Artwork successfully uploaded!");

        await getImages()
        return artworkId
      }

      async function saveProcreateInfo(info, artworkId)
      {
        const { error: procreateError } = await supabase
            .from('procreate_data')
            .insert({
              id: generateUUID(),
              artwork_id: artworkId,
              artwork_name: info.name,
              width: info.width,
              height: info.height,
              dpi: info.dpi,
              stroke_count: info.strokeCount,
              tracked_time_seconds: info.trackedTimeSeconds,
              tracked_time: info.trackedTime,
            })

        if(procreateError)
        {
          console.log(procreateError);
        } else {
          await getImages()
        }
      }
      
  return (
    <div >
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        
        <div className='flex items-end justify-between'>
          <h2 className='title text-3xl font-semibold pl-5'>Uploaded Artworks - {images.length} </h2>
        </div>
        

        {/* Accepted files */}
        <h3 className='title text-lg font-semibold mt-10 pl-5 border-b pb-3'>
          Accepted Files
        </h3> 
              

        <ul className='mt-6 flex gap-10 pl-5'>
          {images.map(artworks => {
            const { data } = supabase.storage
            .from('artworks')
            .getPublicUrl(artworks.png_path)
             
            const extractedInfo = artworks.procreate_data
          return (
            <li key={artworks.id} className='relative flex'>

              <div className='flex flex-col items-center'>
              <img src={data.publicUrl} alt={artworks.png_name} className='h-75'></img>
              
              <p className=' text-[12px] font-medium'>
                {artworks.png_name}
              </p>
              
              </div>
              <div className='flex pl-3 pt-50 text-[14px]'>
                  {extractedInfo && (
                    <div>
                      <p>{extractedInfo.artwork_name}</p>
                      <p>{extractedInfo.width} x {extractedInfo.height}</p>
                      <p>{extractedInfo.dpi}</p>
                      <p>{extractedInfo.stroke_count}</p>
                      <p>{extractedInfo.tracked_time}</p>
                    </div>
                  )}
                </div>
            </li>
          )
        })}
        </ul>

        {/* Rejected Files */}
        <h3 className='title text-lg font-semibold mt-24 pl-5 border-b pb-3'>
          Rejected Files
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-sm font-medium'>
                  {file.name}
                </p>
                <ul className='text-[12px] warning'>
                  {errors.map(error => (
                    <li key={error.code}>Must be a .png or .procreate file</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold border border-secondary-400 rounded-md px-3'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
   </div>
  )
}

export default Dropzone