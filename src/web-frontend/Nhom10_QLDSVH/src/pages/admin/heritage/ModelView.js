import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

export default function Model(props) {
  var model360url = localStorage.getItem('model360url');
  const { scene } = useGLTF(model360url);
  return <primitive object={scene} {...props} />
}
