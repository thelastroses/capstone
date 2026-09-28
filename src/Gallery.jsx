import { useGLTF } from '@react-three/drei';

function Gallery() {
  const { scene } = useGLTF('/models/EmptyGalleryScene.glb');
  return <primitive object={scene} scale={1} />;
}

export default Gallery