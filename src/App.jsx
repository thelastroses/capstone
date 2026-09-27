import Gallery from "./Gallery"
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import { OrbitControls, Stage, Text} from '@react-three/drei';


function App() {
  const [selected, setSelected] = useState(false); 
  const [controlsEnabled, setControlsEnabled] =  useState(true);
  const [view, setView] = useState(false);

  return (
    <div style={{ width: '100vw', height: '90vh' }}>
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
              <img className="w-50 h-80" src="src/eye.jpg"/>
              
              <h2 color="black">Canvas Information</h2>
                <button className="absolute top-170 ">  x </button>
            </div>)}


      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-4xl font-extrabold">
          2D Scene
        </h1>
        <Gallery /> 
      </div>
    </div>
  ); 
}

export default App