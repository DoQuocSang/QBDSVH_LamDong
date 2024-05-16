import React from "react";
import { Canvas } from "react-three-fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

export const ModelLoader = ({modelUrl = ""}) => {
  // var model360url = sessionStorage.getItem('model360url');
  const { scene } = useGLTF(modelUrl);

  return (
    <>
      {/* Add your loader component here */}
      {scene ? (
        <primitive object={scene} scale={0.01} />
      ) : (
        <Loader />
      )}
    </>
  );
};

const Loader = () => {
  return (
    <div style= {{backgroundColor: "red", width: "100%", height: "80vh", position: "absolute" }}>
      <p>Loading...</p>
    </div>
  );
};