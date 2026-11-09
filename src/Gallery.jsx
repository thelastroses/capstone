import { useGLTF, useTexture } from '@react-three/drei';

function Gallery() {
  const { scene } = useGLTF('/models/EmptyGalleryScene.glb');
  return <primitive object={scene} scale={1} />;
}

export function ArtworkCanvas({ artwork, imageUrl, position, width, height, onSelect }) {
  const texture = useTexture(imageUrl);
  const aspectRatio = texture.image.width / texture.image.height;
  const imageWidth = Math.min(width * 0.9, height * 0.9 * aspectRatio);
  const imageHeight = imageWidth / aspectRatio;

  return (
    <mesh
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(artwork);
      }}
    >
      <boxGeometry args={[imageWidth, imageHeight, 0.06]} />
      <meshStandardMaterial attach="material-0" color="#473c33" />
      <meshStandardMaterial attach="material-1" color="#473c33" />
      <meshStandardMaterial attach="material-2" color="#473c33" />
      <meshStandardMaterial attach="material-3" color="#473c33" />
      <meshBasicMaterial attach="material-4" map={texture} />
      <meshStandardMaterial attach="material-5" color="#473c33" />
    </mesh>
  );
}

export default Gallery;