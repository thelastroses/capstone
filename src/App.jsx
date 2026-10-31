import Gallery from "./Gallery"
import pumpkinPieImage from "./pumpkinpie.png";
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Text} from '@react-three/drei';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload.jsx";
import { supabase } from "./supabase";
import { getImages } from "./Artwork.jsx";

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
  
  const [selected, setSelected] = useState(false);
  const [controlsEnabled, setControlsEnabled] =  useState(true);
  const [view, setView] = useState(false);
  const [images, setImages] = useState([])

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

  return (
      <div  style={{ width: '100%', height: '85vh' }}>
        <div className="navigation">
          <Link className="navigation-button rounded-[20px]" to="upload" style={{background:'#111314', color:'#b6bfc1'}}>
              Upload
          </Link>
        </div>

        <Canvas camera={{ position: [5, 0, 5], fov: 30, zoom: .6}}>
          
          <OrbitControls enabled={controlsEnabled} target = {[0,0,0]} />

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Gallery />
              <mesh position = {[2, 2, -3.35]} scale = {selected ? 2 : 1} onClick ={() => {setSelected(true), setControlsEnabled(false), setView(true)}} onPointerMissed={() => { setSelected(false), setControlsEnabled(true), setView(false)}}>
                  <boxGeometry attach="geometry" args={[.5, .75, .1]} />
                    <meshStandardMaterial attach="material" color={"#85948a"} />
              </mesh>
            </Stage>
          </Suspense>
          <Text position={[5, 0, 5]} rotation={[0,.75,0]}>Gallery</Text>
        </Canvas>
        
      {view && (
              <div className="absolute inset-0 flex items-center justify-center" style={{position: 'center'}}  onClick={() => {setSelected(false), setControlsEnabled(true), setView(false)}}>
                <img className="w-50 h-80" src={pumpkinPieImage}/>
                
                <h2 color="black">Canvas Information</h2>
                  <button className="absolute top-170 ">  x </button>
              </div>)}


        <div className="flex justify-center">
          <h1 className="text text-4xl font-extrabold absolute mt-25">
              2D Overview
          </h1>
        </div>

        <div className="min-h-screen pt-50 pb-30  text-white flex items-center justify-center background " style={{overflowX: 'hidden'}}>
          
          
          <ul className='mt-6 grid grid-cols-3 gap-20 gap-y-20'>
                    {images.filter(artwork => artwork.gallery_type === "2D")
                    .map(artworks => {
                      const { data } = supabase.storage
                      .from('artworks')
                      .getPublicUrl(artworks.png_path)
                       
                      const extractedInfo = artworks.procreate_data
                    return (
                      <li key={artworks.id} className='relative'>
          
                        <div className='flex flex-col items-center'>
                        <img src={data.publicUrl} alt={artworks.png_name} className='w-90'></img>
                        
                        {/* <p className=' text-[12px] font-medium'>
                          {artworks.png_name}
                        </p> */}
                        
                        </div>
                        {
                        <div className='font-medium text-[18px]' >
                            
                            {extractedInfo ? (
                              <div className='py-5 mt-7 flex items-center justify-center' style={{background:'#b6bfc1'}}>
                              <div className='py-10 px-18 ' style={{background:'#111314'}}>
                                <p className="flex items-center justify-center text-[24px] pb-5">{extractedInfo.artwork_name}</p>
                                <p>Canvas Size: {extractedInfo.width} x {extractedInfo.height}</p>
                                <p>DPI: {extractedInfo.dpi}</p>
                                <p>Strokes: {extractedInfo.stroke_count}</p>
                                <p>Time: {extractedInfo.tracked_time}</p>
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
      </div>
  );
}

export default App