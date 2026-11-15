import Gallery, { ArtworkCanvas } from "./Gallery";
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Text} from '@react-three/drei';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload.jsx";
import { supabase } from "./supabase";
import { getImages } from "./Artwork.jsx";
import envelopeIcon from "./envelope-fill.svg";
import { getDisplayedArtworks } from "./sampleArtworks.js";
import toast from "react-hot-toast";

export function getOnly2DArtworks(artworks){
  return artworks.filter(artwork =>
    artwork.gallery_type === "2D" || artwork.gallery_type === "both"
  );
}

export function getOnly3DArtworks(artworks){
  return artworks.filter(artwork =>
    artwork.gallery_type === "3D" || artwork.gallery_type === "both"
  );
}

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/upload" element={<Upload />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
  );
}

const Home = () => {
  
  const [controlsEnabled, setControlsEnabled] =  useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [images, setImages] = useState([])
  const [databaseUnavailable, setDatabaseUnavailable] = useState(false)
  const [isLoadingImages, setIsLoadingImages] = useState(true)
  const displayedArtworks = getDisplayedArtworks(images, databaseUnavailable)
  const showingSampleArtworks = databaseUnavailable && images.length === 0
  const threeDArtworks = getOnly3DArtworks(displayedArtworks);
  const frontWallArtworks = threeDArtworks.filter((_, index) => index % 2 === 0);
  const leftWallArtworks = threeDArtworks.filter((_, index) => index % 2 === 1);

  useEffect(() => {
      loadImages()
    }, [])
  
    async function loadImages() {
      setIsLoadingImages(true)
      try {
        const data = await getImages()
        if (data === null) {
          setDatabaseUnavailable(true)
          return
        }
        setImages(data);
        setDatabaseUnavailable(false)
      } catch (error) {
        setDatabaseUnavailable(true)
        toast.error(error.message || "Failed to retrieve artwork")
      } finally {
        setIsLoadingImages(false)
      }
    }

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
    <div>
      <div  style={{ width: '100%', height: '85vh' }}>
        <div className="navigation">
          <Link className="navigation-button rounded-[20px]" to="upload" style={{background:'#b6bfc1', color:'#111314'}}>
              Upload
          </Link>
        </div>

        {databaseUnavailable && (
          <div role="alert" className="fixed left-4 top-4 z-20 max-w-sm rounded-[20px] bg-[#111314] p-4 text-white">
            <p>
              The artwork database is unavailable. {showingSampleArtworks
                ? "Showing sample artwork for demonstration only."
                : "Showing the artwork already loaded."}
            </p>
            <button
              type="button"
              className="button-hover mt-3 rounded-[20px] border px-3 py-1"
              onClick={loadImages}
              disabled={isLoadingImages}
            >
              {isLoadingImages ? "Retrying..." : "Retry connection"}
            </button>
          </div>
        )}

        <Canvas className="button-hover"
          camera={{ position: [5, 0, 5], fov: 30, zoom: .6}}
          onPointerMissed={() => {
            setSelectedArtwork(null);
            setControlsEnabled(true);
          }}
        >
          
          <OrbitControls enabled={controlsEnabled} target = {[0,0,0]} />

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Gallery />
              {frontWallArtworks.map((artwork, index, artworks) => {
                const imageUrl = artwork.image_url || supabase.storage
                  .from('artworks')
                  .getPublicUrl(artwork.png_path).data.publicUrl;

                return (
                  <ArtworkCanvas
                    key={artwork.id}
                    artwork={artwork}
                    imageUrl={imageUrl}
                    position={[0 + (index - (artworks.length - 1) / 2) * 1.2, 2, -3.35]}
                    width={1}
                    height={5}
                    onSelect={(selected) => {
                      setSelectedArtwork(selected);
                      setControlsEnabled(false);
                    }}
                  />
                );
              })}
              {leftWallArtworks.map((artwork, index, artworks) => {
                const imageUrl = artwork.image_url || supabase.storage
                  .from('artworks')
                  .getPublicUrl(artwork.png_path).data.publicUrl;

                return (
                  <group
                    key={artwork.id}
                    position={[-3.35, 2, 0 + (index - (artworks.length - 1) / 2) * 1.2]}
                    rotation={[0, Math.PI / 2, 0]}
                  >
                    <ArtworkCanvas
                      artwork={artwork}
                      imageUrl={imageUrl}
                      position={[0, 0, 0]}
                      width={1}
                      height={5}
                      onSelect={(selected) => {
                        setSelectedArtwork(selected);
                        setControlsEnabled(false);
                      }}
                    />
                  </group>
                );
              })}
            </Stage>
          </Suspense>
          <Text position={[5, 0, 5]} rotation={[0,.75,0]}>Gallery</Text>
        </Canvas>
        
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-10 grid place-items-center bg-black/70 p-4 button-hover"
          onClick={() => {
            setSelectedArtwork(null);
            setControlsEnabled(true);
          }}
        >
          <div
            className="smooth-load relative grid max-h-[85vh] w-[calc(100vw-2rem)] max-w-[1100px] grid-cols-1 items-center justify-items-center gap-6 overflow-y-auto p-6 text-[#111314] button-default md:grid-cols-[minmax(0,1fr)_320px] md:overflow-y-visible"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-2 top-2 z-10 h-7 w-7 rounded-[20px] font-extrabold button-hover"
              onClick={() => {
                setSelectedArtwork(null);
                setControlsEnabled(true);
              }}
              style={{position:'absolute', right:'8px', top:'8px', background:'#b6bfc170'}}
            >
              x
            </button>
            <img
              className="max-h-[45vh] w-full max-w-full object-contain button-default md:max-h-[70vh] md:max-w-[50vw]"
              src={selectedArtwork.image_url || supabase.storage.from('artworks').getPublicUrl(selectedArtwork.png_path).data.publicUrl}
              alt={selectedArtwork.png_name}
            />
            <div className="flex w-full shrink-0 flex-col gap-3 break-words rounded-[20px] px-6 py-10 text-base button-default md:w-[320px]" style={{background:'#b6bfc1'}}>
              {selectedArtwork.procreate_data ? (
                <>
                  <p>Title: {displayValue(selectedArtwork.procreate_data.artwork_name)}</p>
                  <p>Canvas Size: {displayValue(selectedArtwork.procreate_data.width)} x {displayValue(selectedArtwork.procreate_data.height)}</p>
                  <p>DPI: {displayValue(selectedArtwork.procreate_data.dpi)}</p>
                  <p>Strokes: {displayValue(selectedArtwork.procreate_data.stroke_count)}</p>
                  <p>Time: {displayValue(selectedArtwork.procreate_data.tracked_time)}</p>
                </>
              )
            :
            (
                  <h2 className=" flex items-center justify-center text-[16px]"> No canvas information</h2>
            )}
            </div>
          </div>
        </div>
      )}


        <div className="flex justify-center">
          <h1 className="text text-4xl font-extrabold absolute mt-25">
              2D Overview
          </h1>
        </div>

        <div className="min-h-screen pt-50 text-white flex items-center justify-center background " style={{overflowX: 'hidden'}}>
          
          
          <ul className='mt-6 grid grid-cols-3 gap-20 gap-y-20'>
                    {getOnly2DArtworks(displayedArtworks)
                    .map(artworks => {
                      const imageUrl = artworks.image_url || supabase.storage
                        .from('artworks')
                        .getPublicUrl(artworks.png_path).data.publicUrl
                       
                      const extractedInfo = artworks.procreate_data

                      
                    return (
                      <li key={artworks.id} className='relative'>
          
                        <div className='flex flex-col items-center'>
                        <img src={imageUrl} alt={artworks.png_name} className='w-90'></img>
                        
                        </div>
                        {
                        <div className='font-medium text-[18px]' >
                            
                            {extractedInfo ? (
                              <div className='py-5 mt-7 flex items-center justify-center' style={{background:'#b6bfc1'}}>
                              <div className='py-10 px-18 ' style={{background:'#111314'}}>
                                <p className="flex items-center justify-center text-[24px] pb-5">{displayValue(extractedInfo.artwork_name)}</p>
                                <p>Canvas Size: {displayValue(extractedInfo.width)} x {displayValue(extractedInfo.height)}</p>
                                <p>DPI: {displayValue(extractedInfo.dpi)}</p>
                                <p>Strokes: {displayValue(extractedInfo.stroke_count)}</p>
                                <p>Time: {displayValue(extractedInfo.tracked_time)}</p>
                              </div>
                              </div>
                            )
                            :
                            (
                              <h2 className="pt-5 flex items-center justify-center text-[16px]"> No canvas information</h2>
                            )}
                            
                          </div> }
                      </li>
                    )
                  })}
                  </ul>
           
        </div>

        <div className="px-125 py-20 pt-50 font-medium" style={{background:'#111314'}}>
          <div className='py-20 grid place-items-center rounded-[20px] ' style={{background:'#b6bfc1'}}>
                  <h2 className="text-[28px] font-black" >Contact Me!</h2>
                  <h2 className="pt-10">G-Mail:</h2>
                  <a href='mailto:jspencer0709@gmail.com'>
                    <img className="w-15 button-hover" src={envelopeIcon}/>
                  </a>
          </div>
                  
        </div>
        </div>
      </div>
  );
}

export default App