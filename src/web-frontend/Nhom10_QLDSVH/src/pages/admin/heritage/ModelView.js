import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

export default function Model(props) {
  const { scene } = useGLTF("https://firebasestorage.googleapis.com/v0/b/qbdsvhlamdong.appspot.com/o/models%2FSteengoed%20potje_30ac374b-092b-4b69-abad-2af4434332c8.glb?alt=media&token=0415971e-a691-4147-9b9f-263ad856e0f1");
  return <primitive object={scene} {...props} />
}
