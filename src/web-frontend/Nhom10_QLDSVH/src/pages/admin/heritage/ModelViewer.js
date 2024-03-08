import React, { useRef, useState } from "react";
import { PresentationControls, Stage } from "@react-three/drei";
import Model from "pages/admin/heritage/ModelView";
import { Canvas } from "react-three-fiber";
import { ModelLoader } from "./ModelLoader";

const ModelViewer = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "80vh", 
      borderRadius: "10px",  
      overflow: "hidden" }}>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ width: "100%", height: "80vh" }}
      >
        <color attach={"background"} args={["#706a61"]} />
        <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
          <Stage environment={null}>
            <ModelLoader  scale={0.01}/>
            {/* <Model scale={0.01} /> */}
          </Stage>
        </PresentationControls>
      </Canvas>
  </div>
  );
};

export default ModelViewer;