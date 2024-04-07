import React, { Suspense, startTransition } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  PresentationControls,
  Stage,
  useTexture,
  PointLight,
} from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useThree } from "react-three-fiber";
import { ModelLoader } from "./ModelLoader";
import { Html } from "@react-three/drei";
import loading from "../../../images/loading.gif";
import BackgroundModel from "../../../images/bg-model.jpg";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";

const LoadingScreen = () => {
  return (
    <Html>
      <div className="z-10 flex flex-col justify-center items-center w-screen h-screen bg-[#e5dddb] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img className="h-32 " src={loading} />
        <p className="text-[#8b6565] text-2xl font-bold">Đang tải model 3D</p>
        <p className="text-[#8b6565] mt-2 text-base font-semibold">
          Vui lòng chờ trong giây lát...
        </p>
      </div>
    </Html>
  );
};

// Component để hiển thị model đã preload
const ModelView = ({ url }) => {
  const { scene } = useGLTF(url);
  return scene ? <primitive scale={0.01} object={scene} /> : null;
};

const ModelViewerOverlay = ({ ModelUrl = "" }) => {
  startTransition(() => {
    useGLTF.preload(ModelUrl);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 30,
        position: "relative",
        backgroundColor: "#0000004f", 
        backdropFilter: "blur(3px)", 
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.35)" 
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <Suspense fallback={null}>
        <Background />
      </Suspense> */}

        {/* <color attach={"background"} args={["#aa916a"]} /> */}
        <Suspense fallback={<LoadingScreen />}>
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minPolarAngle={0}
            autoRotate={true}
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 2}
          />
          <Stage environment="apartment">
            <ModelView url={ModelUrl} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewerOverlay;
