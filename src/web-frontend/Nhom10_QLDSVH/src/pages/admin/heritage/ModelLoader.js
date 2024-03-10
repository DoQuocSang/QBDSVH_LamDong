import React from "react";
import { Canvas } from "react-three-fiber";
import Model from "pages/admin/heritage/ModelView";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

export const ModelLoader = (props) => {
  var model360url = localStorage.getItem('model360url');
  const { scene } = useGLTF(model360url);

  return (
    <>
      {/* Add your loader component here */}
      {scene ? (
        <primitive object={scene} {...props} />
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