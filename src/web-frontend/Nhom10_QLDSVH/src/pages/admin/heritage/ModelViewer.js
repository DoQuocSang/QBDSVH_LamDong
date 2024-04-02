import React, { Suspense } from "react";
import { Loader, PerspectiveCamera, PresentationControls, Stage, useTexture, PointLight } from "@react-three/drei";
import * as THREE from 'three'
import { Canvas, useThree } from "react-three-fiber";
import { ModelLoader } from "./ModelLoader";
import { Html } from "@react-three/drei"
import loading from "../../../images/loading.gif"
import BackgroundModel from "../../../images/bg-model.jpg"
import { OrbitControls } from '@react-three/drei'
import { Environment } from '@react-three/drei';

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

const Background = props => {

  const { gl } = useThree();

  const texture = useTexture(BackgroundModel)
  const formatted = new THREE.WebGLCubeRenderTarget(texture.image.height).fromEquirectangularTexture(gl, texture)
  return (
    <primitive attach="background" object={formatted.texture} />
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
      zIndex: 30,
      backgroundImage: `url(${BackgroundModel})`, // Replace 'path/to/your/image.jpg' with the actual path to your image
      backgroundSize: 'cover', // Adjust the background size property as needed
      backgroundPosition: 'center', // Adjust the background position property as needed
    }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45 }}
        style={{ width: "100%", height: "80vh" }}
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
          <Stage environment='apartment'>
            <ModelLoader scale={0.01} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
