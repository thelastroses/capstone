import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
/* import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid' */

//Got permission to use code from Hamed Bahram's repo for the dropzone/upload section of the Art Gallery: https://github.com/HamedBahram/dropzone.git
//src/repo-permission-image/DropzoneRepoPermission.png

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

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

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

/*   const handleSubmit = async e => {

  } */

  return (
    <div>

      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
        {/*   <ArrowUpTrayIcon className='w-5 h-5 fill-current' /> */}
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Upload Artworks</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 text-[12px] uppercase tracking-wider font-bold border border-secondary-400 rounded-md px-3'
          >
            Remove all files
          </button>
        </div>

        {/* Accepted files */}
        <h3 className='title text-lg font-semibold mt-10 border-b pb-3'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {files.map(file => (
            <li key={file.name} className='relative '>
              
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3'
                onClick={() => removeFile(file.name)}
              >
                x
              </button>
              <p className='mt-2 text-[12px] font-medium'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <h3 className='title text-lg font-semibold mt-24 border-b pb-3'>
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