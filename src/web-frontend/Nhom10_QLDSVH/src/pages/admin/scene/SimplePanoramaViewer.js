import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../../../images/loading-pano.gif";


const SimplePanoramaViewer = ({ isOpen, sceneData }) => {
  var image360url = sessionStorage.getItem("image360url");
  // const [sceneData, setsceneData] = useState();
  const [totalConsoleContent, setTotalConsoleContent] = useState("");
  const [hotspotArrChange, setHotspotArrChange] = useState(false);

  const initialState = {
      id: 0,
      category: 1,
      type: "",
      pitch: 0,
      yaw: 0,
      css_class: "",
      heritage_id: 0,
      model_url: "",
    },
  [currentModel, setCurrentModel] = useState(initialState);

  const [isOpenModelView, setIsOpenModelView] = useState(false);

  const pannellumRef = useRef(null);

  const customStyles = `
  .pnlm-container {
    background: url('${loadingGif}') center center no-repeat;
    background-size: cover;
`;

  const handleCloseModelView = () => {
    setIsOpenModelView(false);
  };

  const handleOpenModelView = () => {
    setIsOpenModelView(true);
  };

  return (
    <>
      {isOpen && (
        <>
          <style>{customStyles}</style>
          <div className="relative mt-4 rounded-lg overflow-hidden shadow-md">
            {/* {isLoading && <div className='z-50 flex justify-center items-center font-semibold absolute top-0 left-0 bg-red-400 h-full w-full text-2xl text-white'>Loading...</div>} */}
            <div className="relative w-full h-full">
              <Pannellum
                key={hotspotArrChange}
                width="100%"
                height="40vh"
                title={sceneData.scene.name}
                yaw={360}
                hfov={110}
                autoLoad={true}
                // autoRotate={-5}
                compass={true}
                showZoomCtrl={true}
                mouseZoom={true}
                // draggable={true}
                showControls={true}
                // doubleClickZoom={true}
                image={sceneData.panorama_image.file_url}
                // hotspotDebug={true}
                ref={pannellumRef}
              >
              </Pannellum>
            </div>
          </div>
          <div className={totalConsoleContent ? "hidden" : ""}>
          <div className="px-10 py-6 bg-gray-100 rounded-lg my-4 flex flex-col gap-1 justify-center border-l-4 border-teal-500">
            <p className="font-semibold text-xl text-teal-500">Thông báo</p>
            <p className="font-semibold text-sm text-gray-600">
              Vui lòng di chuyển chuột trong phần ảnh 360 để xem
            </p>
          </div>
      </div>
        </>
      )}
    </>
  );
};

export default SimplePanoramaViewer;
