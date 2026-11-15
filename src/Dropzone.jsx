import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { supabase } from './supabase.js';
import { generateUUID } from 'three/src/math/MathUtils.js';
import { extractProcreate } from "./procreateExtraction.jsx";
import toast from 'react-hot-toast';
import deleteIcon from "./trash3-fill.svg";
import { getArtworkLoadErrorMessage, getImages } from "./Artwork.jsx";
import artworkCompression from 'browser-image-compression';
import {
  removeArtworkAndFile,
  saveProcreateInfo as persistProcreateInfo,
  uploadArtwork as persistArtwork,
} from './artworkPersistence.mjs';
import { SAMPLE_ARTWORKS } from './sampleArtworks.js';

//Got permission to use code from Hamed Bahram's repo for the dropzone/upload section of the Art Gallery: https://github.com/HamedBahram/dropzone.git
//src/repo-permission-image/DropzoneRepoPermission.png

export function getUploudArtworkError({artworkId, pngFile})
{
  if(!artworkId && !pngFile)
  {
    return 'Upload the artwork PNG before adding its Procreate file'
  }
  return null
}

export function getCheckLimit(images)
{
  if(images >= 20)
  {
    return 'The artwork limit has been reached (20)'
  }
  return null
}

export function getGalleryType(selectedGalleryType)
{
  if(!['2D', '3D', 'both'].includes(selectedGalleryType))
  {
    return 'Please select a gallery type'
  }
  return null
}

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [rejected, setRejected] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [loadErrorMessage, setLoadErrorMessage] = useState(null)
  const [isLoadingImages, setIsLoadingImages] = useState(true)
  const databaseUnavailable = loadErrorMessage !== null
  const [activeArtworkId, setActiveArtworkId] = useState(null)
  const [extractedInfo, setExtractedInfo] = useState(null)
  const [selectedGalleryType, setSelectedGalleryType] = useState('');

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    
    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
      toast.error("Failed to upload canvas information upload a .procreate file");
    }
    
    //Extraction

    const pngFile = acceptedFiles.find(file =>
        file.name.toLowerCase().endsWith('.png')
    )

    const procreateFile = acceptedFiles.find(file =>
        file.name.toLowerCase().endsWith('.procreate')
    )

    if (!pngFile && !procreateFile) {
      return
    }
    
    setIsUploading(true)
      try {
        const info = procreateFile
          ? await extractProcreate(procreateFile)
          : null

        if (procreateFile) {
          if (!info) {
            throw new Error('Could not read Procreate file')
          }
        }

        const artworkId = pngFile
          ? await uploadImage(pngFile, { deferSuccess: Boolean(procreateFile) })
          : activeArtworkId

        if (procreateFile) {
          const uploadError = getUploudArtworkError({ artworkId, pngFile })
          if (uploadError) {
            throw new Error(uploadError)
          }

          if (artworkId) {
            await saveProcreateInfo(info, artworkId)
            setExtractedInfo(info)
          }
        }

        if (pngFile && artworkId) {
          setActiveArtworkId(artworkId)
          setFiles(previous => [
            ...previous,
            Object.assign(pngFile, {
              preview: URL.createObjectURL(pngFile), artworkId
            })
          ])
        }
      } catch (error) {
        toast.error(error.message || "Could not process artwork");
      } finally {
        setIsUploading(false)
      }
  }, [activeArtworkId])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: isUploading,
    accept: {
      'image/png': ['.png'],
      'application/x-procreate': ['.procreate']
    },
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
    setIsLoadingImages(true)
    try {
      const data = await getImages()
      setImages(data);
      setLoadErrorMessage(null)
    } catch (error) {
      const message = getArtworkLoadErrorMessage(error)
      setLoadErrorMessage(message)
      toast.error(message)
    } finally {
      setIsLoadingImages(false)
    }
  }

   const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  async function removeFile(file) {
    try {
      await removeArtworkAndFile(supabase, file)
      toast.success("Artwork removed successfully!");
      await loadImages()
    } catch (error) {
      toast.error(error.message || "Could not remove file");
    }
  }

    async function uploadImage(file, { deferSuccess = false } = {})
    {
      const limitError = getCheckLimit(images.length)

      if(limitError)
      {
        toast.error(limitError);
        return null;
      }

      const options = {
        maxSizeMB: 2,
        useWebWorker: true,
      };

      const compressedFile = await artworkCompression(
        file, options
      );

      try {
        const artwork = await persistArtwork(supabase, {
          id: generateUUID(),
          file: compressedFile,
          galleryType: selectedGalleryType || '2D',
        })

        if (!deferSuccess) {
          toast.success("Artwork successfully uploaded!");
          await loadImages()
        }
        return artwork.id
      } catch (error) {
        toast.error(error.message || "Failed to upload artwork")
        return null
      }
    }

      async function saveProcreateInfo(info, artworkId)
      {
        await persistProcreateInfo(supabase, artworkId, info)
        toast.success("Canvas information successfully uploaded!");
        await loadImages()
      }

      async function handleSubmit(event) {
        event.preventDefault();

        const galleryError = getGalleryType(selectedGalleryType)

        if(galleryError)
        {
          toast.error(galleryError);
          return;
        }

        if(!activeArtworkId)
        {
          toast.error("Please select a PNG first");
          return;
        }

        const { data: updatedArtwork, error } = await supabase
            .from('artwork')
            .update({
              gallery_type: selectedGalleryType
            })
            .eq('id', activeArtworkId)
            .select('id')
            .maybeSingle();

        if(error)
        {
          toast.error("Failed to change gallery type");
          return null
        }

        if (!updatedArtwork) {
          toast.error("Selected artwork was not found. Please upload the PNG again");
          return;
        }

        await loadImages()
        toast.success("Gallery type successfully choosen!");
      }

      const handleChange = (event) => {
        setSelectedGalleryType(event.target.value);
      }

      
      
  return (
    <div className='mb-15 ' >
      <div className='flex flex-col items-center justify-center gap-4'>
        <div
          {...getRootProps({
            className: className
          })}
        >
        <input {...getInputProps({ accept: '.png,.procreate' })} />
        
            {isUploading ? (
              <div role='status' aria-live='polite' className='w-100 h-25 border-dashed border-4 text font-bold flex flex-col items-center justify-center gap-2'>
                <svg className='h-7 w-7 animate-spin' viewBox='0 0 24 24' aria-hidden='true'>
                  <circle cx='12' cy='12' r='10' fill='none' stroke='currentColor' strokeWidth='4' opacity='0.25' />
                  <path fill='currentColor' opacity='0.75' d='M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z' />
                </svg>
                <span>Uploading artwork...</span>
              </div>
            ) : isDragActive ? (
              <p className='w-100 h-25 border-dashed border-4 text font-bold button-hover flex items-center justify-center'>Drop the files here ...</p>
            ) : (
              <p className='w-100 h-25 border-dashed border-4 text font-bold button-hover flex items-center justify-center'>Drag & drop files here, or click to select files</p>
            )}

        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        
        <div className='flex items-end justify-between'>
          <h2 className='title text-[30px] font-bold pl-5'>Uploaded Artworks - {images.length} </h2>
        </div>
        

        {/* Accepted files */}
        <h3 className='title text-lg font-semibold mt-10 pl-5 border-b pb-3'>
          Accepted Files
        </h3>
        {databaseUnavailable && (
          <div role='alert' className='mx-10 mt-6 rounded-[20px] border p-5'>
            <p>
              {loadErrorMessage} {images.length === 0
                ? 'Showing sample artwork and canvas information for demonstration.'
                : 'Showing artwork already loaded.'}
            </p>
            <button
              type='button'
              className='button-hover mt-3 rounded-[20px] border px-3 py-1'
              onClick={loadImages}
              disabled={isLoadingImages}
            >
              {isLoadingImages ? 'Retrying...' : 'Retry connection'}
            </button>
          </div>
        )}

        {databaseUnavailable && images.length === 0 && (
          <ul className='my-10 px-10 grid gap-10 grid-cols-5' aria-label='Sample artwork and canvas information'>
            {SAMPLE_ARTWORKS.map(artwork => (
              <li key={artwork.id} className='relative flex'>
                <div className='flex flex-col items-center'>
                  <img className='smooth-load' src={artwork.image_url} alt={artwork.png_name} />
                  <p className='text-[12px] font-medium'>{artwork.png_name} (sample)</p>
                </div>
                <div className='pl-3 pt-7 text-[14px]'>
                  <div className='whitespace-nowrap'>
                    <p>Title: {artwork.procreate_data.artwork_name}</p>
                    <p>Canvas Size: {artwork.procreate_data.width} x {artwork.procreate_data.height}</p>
                    <p>DPI: {artwork.procreate_data.dpi}</p>
                    <p>Strokes: {artwork.procreate_data.stroke_count}</p>
                    <p>Time: {artwork.procreate_data.tracked_time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!databaseUnavailable && !isLoadingImages && images.length === 0 && (
      
        <div>
            <h2 className='text-[20px] warning justify-center items-center flex pt-40'>
              To begin uploading choose an artwork and drop it into the dashed box above
            </h2>
        </div>

        )}

        <ul className='my-10 px-10 grid gap-10 grid-cols-5'>
          {images.map(artworks => {
            const { data } = supabase.storage
            .from('artworks')
            .getPublicUrl(artworks.png_path)
             
            const extractedInfo = artworks.procreate_data

            const displayValue = (value) => {
              if(
                value === null ||
                value === undefined ||
                value === "$null" ||
                value === "" ||
                value === " "
              ) {
                return "n/a";
              }

              return value;
            }
          return (
            <li key={artworks.id} className='relative flex'>
              <div className='flex flex-col items-center'>
              <img className="smooth-load" src={data.publicUrl} alt={artworks.png_name}
                onError={() => toast.error("Artwork failed to load.")}
              />
              <p className=' text-[12px] font-medium'>
                {artworks.png_name}
              </p>
              
              </div>

              
              <button
                className='w-7 h-7 border rounded-full flex justify-center items-center absolute button-hover move-trash'
                onClick={() => removeFile(artworks)}
              >
                <img className="w-5 h-5" style={{filter:'invert(1)'}} src={deleteIcon}/>
              </button>

              <div className='pl-3 pt-7 text-[14px]'>
                  {extractedInfo && (
                    <div className='whitespace-nowrap'>
                      <p>Title: {displayValue(extractedInfo.artwork_name)}</p>
                      <p>Canvas Size: {displayValue(extractedInfo.width)} x {displayValue(extractedInfo.height)}</p>
                      <p>DPI: {displayValue(extractedInfo.dpi)}</p>
                      <p>Strokes: {displayValue(extractedInfo.stroke_count)}</p>
                      <p>Time: {displayValue(extractedInfo.tracked_time)}</p>
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
                className='button-hover mt-1 py-1 text-[12px] uppercase tracking-wider font-bold border border-secondary-400 rounded-md px-3'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>

          <form onSubmit={handleSubmit}>
            <h2 className='text-[24px] font-bold flex items-center justify-center my-10 '> Choose Gallery Type</h2>
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