import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

export default function Model(props) {
  var image360url = localStorage.getItem('image360url');
  const { scene } = useGLTF(image360url);
  return <primitive object={scene} {...props} />
}
