import React, { Suspense, startTransition, useEffect, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getHeritageById } from "services/HeritageRepository";

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

const ModelViewerOverlay = ({
  currentModel,
  showModelInfo,
  closeModelInfo,
}) => {
  startTransition(() => {
    useGLTF.preload(currentModel.modelUrl);
  });

  const handleCloseModelView = () => {
    closeModelInfo();
  };

  const initialState = {
    id: 0,
    name: '',
    short_description: '',
    time: '',
    model_360_url: '',
    urlslug: '',
    video_url: '',
    location_id: 0,
    management_unit_id: 0,
    heritage_type_id: 0,
    heritage_category_id: 0,
    view_count: 0,
  }, [heritage, setHeritage] = useState(initialState);

  useEffect(() => {
    if (currentModel.model_id !== 0) {
        getHeritageById(currentModel.model_id).then(data => {
            if (data)
                setHeritage({
                    ...data,
                });
            else
            setHeritage(initialState);
        })
    }
}, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.35)",
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
            <ModelView url={currentModel.model_url} />
          </Stage>
        </Suspense>
      </Canvas>
      {showModelInfo && (
        <div className="relative w-full px-10 py-4 text-white text-xl">
          <div 
          onClick={() => {
            handleCloseModelView();
          }}
          className="flex justify-center gap-2 hover:text-lg group text-sm z-50 w-full absolute pb-2 top-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 text-white cursor-pointer">
          <FontAwesomeIcon
            icon={faCaretDown}
            className=""
          />
          <p className="text-xs text-center hidden group-hover:inline group-hover:text-sm transition-all duration-300">Đóng</p>
          </div>
          <div className="z-20 absolute top-0 left-0 inset-0 w-full h-full bg-gradient-to-tr from-amber-800 to-amber-400 opacity-75"></div>
          <div className="text-white z-30 relative flex flex-col gap-2 justify-center">
            <h4 className="font-semi-bold text-base">
              {heritage.name}
            </h4>
            <p className="text-xs overflow-auto max-h-16 pr-2 scrollbar">
              <style>
                {`
                  .scrollbar::-webkit-scrollbar {
                    width: 10px;
                  }
                
                  .scrollbar::-webkit-scrollbar-track {
                    border-radius: 10px;
                    background: #efe3d0;
                  }
                
                  .scrollbar::-webkit-scrollbar-thumb {
                    background: #cd9e2d;
                    border-radius: 100vh;
                    border: 3px solid #efe3d0;
                  }
                
                  .scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #c0a0b9;
                  }
                `}
              </style>
              {heritage.short_description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelViewerOverlay;
