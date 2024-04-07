import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import DataScene from "./DataScene.js";
import AllHotspot from "../hotspot/AllHotspot.js";
import loadingGif from "../../../images/loading-pano.gif";
import ModelViewerOverlay from "./ModelViewerOverlay.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleQuestion, faRotate, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import MainLogo from '../../../images/logo2.png';

const PanoramaViewer = ({ title, isOpen, image360Url }) => {
  var image360url = localStorage.getItem("image360url");
  const [mainImage, setMainImage] = useState(image360url);
  const [scene, setScene] = useState(DataScene["insideOne"]);
  const [totalConsoleContent, setTotalConsoleContent] = useState("");
  const [hotspotArrChange, setHotspotArrChange] = useState(false);
  // const [curentPitch, setCurentPitch] = useState(0);
  // const [curentYaw, setCurentYaw] = useState(0);
  const [hotspotArr, setHotspotArr] = useState([]);

  const initialState = {
    id: 0,
    type: "",
    pitch: 0,
    yaw: 0,
    cssClass: "",
    modelId: 0,
    modelUrl: "",
  }, [currentModel, setCurrentModel] = useState(initialState);

  const [isOpenModelView, setIsOpenModelView] = useState(false);
  const closeModeView = () => setIsOpenModelView(false);
  const OpenModelView = () => setIsOpenModelView(true);

  let lastId = hotspotArr.length;

  //Xử lý khi bấm xóa bên component con DeleteModal
  const childToParent = (updatedValue) => {
    const updatedHotspotArr = [...hotspotArr];

    const indexToUpdate = updatedHotspotArr.findIndex(
      (item) => item.id === updatedValue.id
    );
    alert(indexToUpdate);
    if (indexToUpdate !== -1) {
      updatedHotspotArr[indexToUpdate] = updatedValue;
      setHotspotArr(updatedHotspotArr);
      setHotspotArrChange(true);
    }
  };

  useEffect(() => {
    var consoleFrame = document.getElementById("console-frame");
    if (consoleFrame) {
      var consoleContent = "";

      function appendLog(msg) {
        const timestamp = new Date().getTime();
        consoleContent = msg + consoleContent;
        // consoleContent += msg;
        setTotalConsoleContent(consoleContent);
        consoleFrame.contentDocument.body.innerHTML = consoleContent;
        consoleFrame.contentWindow.scrollTo(0, 0);
        // consoleFrame.contentWindow.scrollTo(0, consoleFrame.contentDocument.body.scrollHeight);
      }

      console.log = function (msg) {
        msg = msg.toString();
        const matches = msg.match(/Pitch:\s+([-\d.]+).*Yaw:\s+([-\d.]+)/);
        if (matches && matches.length >= 3) {
          // const pitch = parseFloat(matches[1]).toFixed(1);
          // const yaw = parseFloat(matches[2]).toFixed(1);
          const pitch = parseFloat(matches[1]);
          const yaw = parseFloat(matches[2]);
          localStorage.setItem("pitch", matches[1]);
          localStorage.setItem("yaw", matches[2]);
          // setCurentPitch(pitch);
          // setCurentYaw(yaw);
          const timestamp = new Date().getTime();

          appendLog(
            `<div className="console-msg" style="    
                box-shadow: 0 0 10px #d8d8d8;
                display: flex;
                background-color: #ffffff;
                align-items: center;
                gap: 8px;
                margin: 10px 0px;
                padding: 10px 10px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
                font-size: 14px;
                color: #516f87;
                font-weight: 500;
                border-left: 5px solid #00cae1;
                border-radius: 5px;">
            <svg style="    
              color: #00cae1;
              width: 24px;
              height: 24px; 
              flex-shrink: 0;"
              ria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd"/>
            </svg>
            <div style="    
              display: flex;
              align-items: start;
              gap: 4px;
              flex-direction: column;">
            <div style="    
              color: #559aed;
              font-size: 10px;">
              ${formatTimestamp(timestamp)}
            </div>
            <div>
            Góc nhìn: ${pitch}, Góc quay: ${yaw}
            </div>
            </div> 
            </div>
            `
          );
        }
      };
    }
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const hotspots = (element, i) => {
    if (element.cssClass === "hotspotElement")
      return (
        <Pannellum.Hotspot
          key={i}
          type="custom"
          pitch={element.pitch}
          yaw={element.yaw}
          cssClass={element.cssClass}
          handleClick={() => {
            // alert(element.id + " " + element.modelUrl);
            OpenModelView();
            setCurrentModel(element);
            
            handleOpenModelView();
          }}
        />
      );
    else if (element.cssClass === "moveScene")
      return (
        <Pannellum.Hotspot
          key={i}
          type="custom"
          pitch={element.pitch}
          yaw={element.yaw}
          cssClass={element.cssClass}
          handleClick={() => {
            setScene(DataScene["insideTwo"]);
          }}
        />
      );
  };

  const addHotspot = () => {
    lastId++;
    const newHotspot = {
      id: lastId,
      type: 2,
      pitch: localStorage.getItem("pitch"),
      yaw: localStorage.getItem("yaw"),
      modelId: 31,
      modelUrl: "",
      cssClass: "hotspotElement",
    };

    setHotspotArr((prevHotspots) => [...prevHotspots, newHotspot]);
  };

  const pannellumRef = useRef(null);

  // console.log(Object.values(scene.hotspot))
  // console.log(hotspotArr)

  const removeLastHotspot = () => {
    setHotspotArr((prevHotspots) => prevHotspots.slice(0, -1));
  };

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
          <div className="flex items-center justify-center mt-4">
            <div className="h-0.5 flex-grow bg-red-500 rounded-full" />
            <h2 className="px-5 font-semibold text-base text-red-500 text-center">
              Hướng dẫn sử dụng
            </h2>
            <div className="h-0.5 flex-grow bg-red-500 rounded-full" />
          </div>
          <ul className="bg-amber-50 rounded-xl py-5 px-10 space-y-1 my-2 text-gray-500 list-disc font-semibold text-xs ">
            <li>
              <p>
                Để thêm hotspot chính xác, sau khi di chuyển tâm đến vị trí mong
                muốn, bạn cần phải nhấn chuột thêm 1-2 lần vào khung ảnh 360 rồi
                mới bấm nút thêm
              </p>
            </li>
            <li>
              <p>
                Phần thông số hotspot hiển thị góc nhìn (pitch) và góc quay
                (yaw) tương ứng với tâm màn hình trong khung ảnh 360
              </p>
            </li>
          </ul>
          <div className="relative mt-4 rounded-lg overflow-hidden shadow-md">
            {/* {isLoading && <div className='z-50 flex justify-center items-center font-semibold absolute top-0 left-0 bg-red-400 h-full w-full text-2xl text-white'>Loading...</div>} */}
            <div className="relative w-full h-full">
              <Pannellum
                key={hotspotArrChange}
                width="100%"
                height="50vh"
                title={scene.title}
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
                image={image360url}
                hotspotDebug={true}
                ref={pannellumRef}
              >
                {/* {Object.values(scene.hotspot).map((element, i) => (hotspots(element, i)))} */}
                {hotspotArr.length > 0 ? (
                  hotspotArr.map((element, i) => hotspots(element, i))
                ) : (
                  <></>
                )}
              </Pannellum>
              {isOpenModelView && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 h-3/4 w-3/4">
                  <div className="relative w-full h-full">
                    <button
                      onClick={() => {
                        handleCloseModelView();
                      }}
                      className="absolute top-0 right-0 z-50 m-2 transition-all duration-300 text-[#a9a9a9] hover:text-white "
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>

                    <div
                      className="absolute bottom-0 left-0 z-50 m-2 w-20"
                    >
                      <img src={MainLogo} />
                    </div>

                    <div className="absolute bottom-0 right-0 z-50 m-2 flex item-center gap-2">
                    <button
                      className="transition-all duration-300 text-[#a9a9a9] hover:text-white"
                    >
                      <FontAwesomeIcon icon={faRotate} className="w-5 h-5" />
                    </button>
                    <button
                      className="transition-all duration-300 text-[#a9a9a9] hover:text-white"
                    >
                      <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5" />
                    </button>
                    <button
                      className="transition-all duration-300 text-[#a9a9a9] hover:text-white"
                    >
                      <FontAwesomeIcon icon={faCircleQuestion} className="w-5 h-5" />
                    </button>
                    </div>
                    <button
                      onClick={() => {
                        handleCloseModelView();
                      }}
                      className="absolute top-0 right-0 z-50 m-2 transition-all duration-300 text-[#a9a9a9] hover:text-white "
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>
                    {currentModel.modelUrl ? (
                      <ModelViewerOverlay
                      ModelUrl={currentModel.modelUrl}
                    />
                    )
                    :
                    (
                      <div 
                      style={{
                        backgroundColor: "#4d4d4d8c", // Mờ đục với độ trong suốt 0.6
                        backdropFilter: "blur(2px)", // Hiệu ứng mờ đục
                      }}
                      className="h-full w-full bg-red-500">
                      </div>
                    )
                    }
                 
                  </div>
                </div>
              )}
            </div>

            <div className={totalConsoleContent ? "" : "hidden"}>
              <div className="flex justify-between items-center px-8 py-4 border border-gray-100">
                <div className="font-semibold text-gray-700 text-sm">
                  Số hotspot đã tạo: {hotspotArr.length}
                </div>
                <div className="flex justify-end gap-2 items-center">
                  <button
                    className="px-2 py-2 bg-teal-400 rounded-md inline-block text-white font-semibold text-xs"
                    onClick={addHotspot}
                  >
                    Tạo Hotspot
                  </button>
                  <button
                    id="hotspot_buttonmodal"
                    onClick={(e) => {
                      setHotspotArrChange(false);
                    }}
                    className="px-2 py-2 bg-amber-500 rounded-md inline-block text-white font-semibold text-xs"
                  >
                    Sửa Hotspot
                  </button>
                  <button
                    className="px-2 py-2 bg-red-500 rounded-md inline-block text-white font-semibold text-xs"
                    onClick={removeLastHotspot}
                  >
                    Xóa Hotspot
                  </button>
                </div>
              </div>
            </div>
          </div>
          <AllHotspot Hotspots={hotspotArr} updateItem={childToParent} />
        </>
      )}

      <div className={isOpen ? "" : "hidden"}>
        <div className={totalConsoleContent ? "" : "hidden"}>
          <div className="bg-gray-100 rounded-lg mt-8 mb-4 shadow-md">
            <span className="bg-teal-400 font-semibold text-white text-xs top-0 left-0 px-4 py-2 rounded-tl-lg rounded-br-lg">
              {" "}
              Thông số hotspot{" "}
            </span>
            <div className="px-4 py-2 my-4">
              <iframe
                id="console-frame"
                className="bg-gray-100 rounded-lg"
                width="100%"
                height="300"
              ></iframe>
            </div>
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
      </div>
    </>
  );
};

export default PanoramaViewer;
