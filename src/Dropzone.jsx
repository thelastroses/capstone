import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { supabase } from './supabase';
import { generateUUID } from 'three/src/math/MathUtils.js';
import { extractProcreate } from "./procreateExtraction.jsx";
import toast from 'react-hot-toast';
import deleteIcon from "./trash3-fill.svg";
import { getImages } from "./Artwork.jsx";
import artworkCompression from 'browser-image-compression';

//Got permission to use code from Hamed Bahram's repo for the dropzone/upload section of the Art Gallery: https://github.com/HamedBahram/dropzone.git
//src/repo-permission-image/DropzoneRepoPermission.png

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [rejected, setRejected] = useState([])
  const [activeArtworkId, setActiveArtworkId] = useState(null)
  const [extractedInfo, setExtractedInfo] = useState(null)
  const [selectedGalleryType, setSelectedGalleryType] = useState('');

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
    loadImages()
  }, [])

  async function loadImages() {
    const data = await getImages();

    if (data != null)
    {
      setImages(data);
    }
  }

   const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  async function removeFile(file) {
    const {error} = await supabase.storage
      .from('artworks')
      .remove([file.png_path])

    const { error: databasError } = await supabase
      .from('artwork')
      .delete()
      .eq('id', file.id)

    if (error) {
      alert(error)
    } else {
      await loadImages()
    }
  }

    async function uploadImage(file)
    {
      if(images.length >= 20)
      {
        toast.error("The artwork limit has been reached (20)");
        return null;
      }

      const options = {
        maxSizeMB: 2,
        useWebWorker: true,
      };

      const compressedFile = await artworkCompression(
        file, options
      );

      const { data: upload, error: uploadError } = await supabase
        .storage
        .from('artworks')
        .upload(`public/${file.name}`, compressedFile, {
          contentType: 'image/png',
          upsert: true,
        });

      if(uploadError)
        {
          console.log(uploadError);
          toast.error("Failed to upload artwork");
          return null;
        }

      const artworkId = generateUUID()

        const { error: insertError } = await supabase
            .from('artwork')
            .insert({
              id: artworkId,
              png_name: file.name,
              gallery_type: selectedGalleryType || '2D',
              png_path: upload.path
            })

        if(insertError)
        {
          console.log(insertError);
          toast.error("Upload Failed");
          return null
        }

        toast.success("Artwork successfully uploaded!");

        await loadImages()
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
          toast.error("Failed to upload canvas information");
          console.log(procreateError);
          return;
        } else {
          toast.success("Canvas information successfully uploaded!");
          await loadImages()
        }
      }

      async function handleSubmit(event) {
        event.preventDefault();

        if(!selectedGalleryType)
        {
          toast.error("Please select a gallery type");
          return;
        }

        if(!activeArtworkId)
        {
          toast.error("Please select a PNG first");
          return;
        }

        const { error: error } = await supabase
            .from('artwork')
            .update({
              gallery_type: selectedGalleryType
            })
            .eq('id', activeArtworkId);

        if(error)
        {
          console.log(error);
          toast.error("Failed to change gallery type");
          return null
        }

        await loadImages()
        toast.success("Gallery type successfully choosen!");
      }

      const handleChange = (event) => {
        setSelectedGalleryType(event.target.value);
      }
      
  return (
    <div className='mb-15 '>
      <div className='flex flex-col items-center justify-center gap-4 '>
        <div
          {...getRootProps({
            className: className
          })}
        >
        <input {...getInputProps()} />
        
          {isDragActive ? (
            <p >Drop the files here ...</p>
          ) : (
            <p className='w-100 h-15 border-dashed border-2 text button-hover flex items-center justify-center'>Drag & drop files here, or click to select files</p>
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
              

        <ul className='my-10 px-10 grid gap-10 grid-cols-5'>
          {images.map(artworks => {
            const { data } = supabase.storage
            .from('artworks')
            .getPublicUrl(artworks.png_path)
             
            const extractedInfo = artworks.procreate_data
          return (
            <li key={artworks.id} className='relative flex'>
              <div className='flex flex-col items-center'>
              <img src={data.publicUrl} alt={artworks.png_name}></img>
              
              <p className=' text-[12px] font-medium'>
                {artworks.png_name}
              </p>
              
              </div>

              
              <button
                type='button'
                className='w-7 h-7 border rounded-full flex justify-center items-center absolute button-hover move-trash'
                onClick={() => removeFile(artworks)}
              >
                <img className="w-5 h-5" style={{filter:'invert(1)'}} src={deleteIcon}/>
              </button>

              <div className='pl-3 pt-7 text-[14px]'>
                  {extractedInfo && (
                    <div className='whitespace-nowrap'>
                      <p>Title: {extractedInfo.artwork_name}</p>
                      <p>Canvas Size: {extractedInfo.width} x {extractedInfo.height}</p>
                      <p>DPI: {extractedInfo.dpi}</p>
                      <p>Strokes: {extractedInfo.stroke_count}</p>
                      <p>Time: {extractedInfo.tracked_time}</p>
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
        <ul className='mt-6 flex flex-col px-10'>
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

          <form onSubmit={handleSubmit}>
              <div className='flex items-center justify-center'>
                  <label>
                      <input className='button-hover ml-1' type="radio" value="2D" name="galleryType" checked={ selectedGalleryType === '2D' } onChange={handleChange}/>
                      <div className="pr-10">
                          2D
                      </div>
                  </label>
                  <label>
                      <input className='button-hover ml-1' type="radio" value="3D" name="galleryType" checked={ selectedGalleryType === '3D' } onChange={handleChange}/>
                      <div className="pr-10">
                          3D
                      </div>
                  </label>
                  <label>
                      <input className='button-hover ml-2' type="radio" value="both" name="galleryType" checked={ selectedGalleryType === 'both' } onChange={handleChange}/>
                      <div>
                          Both
                      </div>
                  </label>
              </div>
              
              <div className='flex items-center justify-center pt-10' >
                <button type='submit' className='button-hover rounded-[20px] px-5 py-2' style={{background:'#b6bfc1', color:'#111314'}}>Submit</button>
              </div>
            </form>
            
      </section>
   </div>
  )
}

export default Dropzone