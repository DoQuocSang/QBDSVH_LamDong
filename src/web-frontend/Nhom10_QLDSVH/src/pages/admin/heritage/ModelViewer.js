import React, { Suspense } from "react";
import { Loader, PresentationControls, Stage } from "@react-three/drei";
import Model from "pages/admin/heritage/ModelView";
import { Canvas } from "react-three-fiber";
import { ModelLoader } from "./ModelLoader";
import { Html } from "@react-three/drei"
import loading from "../../../images/loading.gif"

const LoadingScreen = () => {
  return (
    <Html>
      <div className="z-10 flex flex-col justify-center items-center w-screen h-screen bg-[#e5dddb] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img className="h-52 width-52" src={loading} />
        <p className="text-[#8b6565] text-3xl font-bold">Đang tải model 3D</p>
        <p className="text-[#8b6565] mt-2 text-lg font-semibold">Vui lòng chờ trong giây lát...</p>
      </div>
    </Html>
  )
}

const ModelViewer = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "80vh", 
      borderRadius: "10px",  
      overflow: "hidden", 
      position: "relative",
      zIndex: 30}}>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ width: "100%", height: "80vh" }}
      >
        <color attach={"background"} args={["#706a61"]} />
        <Suspense fallback={<LoadingScreen />}>
          <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
            <Stage environment={null}>
              <ModelLoader scale={0.01} />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
