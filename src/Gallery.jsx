import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

function Gallery() {

  useEffect(() => {
    console.log("Gallery mounted:", performance.now(), "ms");
  }, []);


  const { scene } = useGLTF('/models/EmptyGalleryScene.glb');
  return <primitive object={scene} scale={1} />;
}

export default Gallery