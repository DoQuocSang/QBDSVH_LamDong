import React, { useRef, useState } from "react";
import { PresentationControls, Stage } from "@react-three/drei";
import Model from "pages/admin/heritage/ModelView";
import { Canvas } from "react-three-fiber";

const ModelViewer = () => {
  return (
    <>
      <Canvas dpr={[1,2]} shadows camera={{ fov:45 }} style={{ "position" : "absolute" }}>
        <color attach={"background"} args={["#706a61"]}/>
        <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
        <Stage environment={null} >
          <Model scale={0.01} /> 
        </Stage>
        </PresentationControls>
      </Canvas>
    </>
  );
};

export default ModelViewer;