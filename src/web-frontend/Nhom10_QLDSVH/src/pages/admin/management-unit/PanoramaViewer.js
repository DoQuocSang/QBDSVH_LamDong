import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import DataScene from "./DataScene.js";
import AllHotspot from "../hotspot/AllHotspot.js";
import loadingGif from "../../../images/loading-pano.gif";
import ModelViewerOverlay from "./ModelViewerOverlay.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircleQuestion,
  faRotate,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import MainLogo from "../../../images/logo2.png";
import HotspotNull from "../../../images/hotspot-null.png";

const PanoramaViewer = ({ title, isOpen, image360Url, scene, scenes, onChange, isBackToMainScene, onClickMoveScene }) => {
  // var image360url = localStorage.getItem("image360url");
  const [mainImage, setMainImage] = useState("");
  // const [scene, setScene] = useState(DataScene["insideOne"]);
  const [totalConsoleContent, setTotalConsoleContent] = useState("");
  const [hotspotArrChange, setHotspotArrChange] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(false);
  const [addHospotInfo, setAddHospotInfo] = useState(false);
  // const [curentPitch, setCurentPitch] = useState(0);
  // const [curentYaw, setCurentYaw] = useState(0);
  const [hotspotArr, setHotspotArr] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [currentScene, setCurrentScene] = useState(null);

  const initialState = {
      id: 0,
      category: 1,
      type: "",
      pitch: 0,
      yaw: 0,
      css_class: "",
      model_id: 0,
      model_url: "",
    },
    [currentModel, setCurrentModel] = useState(initialState);

  const [isOpenModelView, setIsOpenModelView] = useState(false);
  const closeModeView = () => setIsOpenModelView(false);
  const OpenModelView = () => setIsOpenModelView(true);

  //Xử lý khi thay đổi hostpot ở component con
  const childToParent = (updatedValue) => {
    // const updatedHotspotArr = [...hotspotArr];

    // const indexToUpdate = updatedHotspotArr.findIndex(
    //   (item) => item.id === updatedValue.id
    // );
    // // alert(indexToUpdate);
    // if (indexToUpdate !== -1) {
    //   updatedHotspotArr[indexToUpdate] = updatedValue;
    //   setHotspotArr(updatedHotspotArr);
    //   setHotspotArrChange(true);
    // }

    const updatedScene = { ...currentScene };

    const indexToUpdate = updatedScene.hotspots.findIndex(
      (item) => item.id === updatedValue.id
    );
    // alert(indexToUpdate);
    if (indexToUpdate !== -1) {
      updatedScene.hotspots[indexToUpdate] = updatedValue;
      // setHotspotArr(updatedHotspotArr);
      setHotspotArrChange(true);
    }

    // Gọi hàm onChange để cập nhật scene mới
    onChange(updatedScene);


    // const updatedScene = { ...scene };
    // updatedScene.hotspots = updatedHotspotArr;
    // // alert(updatedScene.hotspots.length)
    // onChange(updatedScene);
  };

  const handleDeleteHotspot = (deletedValue) => {
    const updatedScene = { ...currentScene };
  
    updatedScene.hotspots = updatedScene.hotspots.filter(item => item.id !== deletedValue.id);
    setHotspotArrChange(true);
  
    alert(updatedScene.hotspots.length);
  
    // Gọi hàm onChange để cập nhật scene mới
    onChange(updatedScene);
  };
  
  useEffect(() => {
    // Custom console log
    var consoleFrame = document.getElementById("console-frame");
    if (consoleFrame) {
      var consoleContent = "";
      var messageCount = 0; // Số lượng tin nhắn

      function appendLog(msg) {
        const timestamp = new Date().getTime();
        consoleContent = msg + consoleContent;
        messageCount++; // Tăng số lượng tin nhắn
        if (messageCount > 10) {
            // Nếu vượt quá 10 tin nhắn, cắt bớt tin nhắn cũ
            const endIndex = consoleContent.lastIndexOf('<div className="console-msg"');
            consoleContent = consoleContent.substring(0, endIndex);
            messageCount = 10; // Đặt lại số lượng tin nhắn
        }
        // consoleContent += msg;
        setTotalConsoleContent(consoleContent);
        consoleFrame.contentDocument.body.innerHTML = consoleContent;
        consoleFrame.contentWindow.scrollTo(0, 0);
        // consoleFrame.contentWindow.scrollTo(0, consoleFrame.contentDocument.body.scrollHeight);
      }

      console.log = function (msg) {
        // msg = msg.toString();
        if (msg !== undefined && msg !== null) {
          msg = msg.toString();
        } else {
            msg = "Undefined or null message";
        }
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

    // //Xử lý logic
    if(isOpen && (!currentScene || isBackToMainScene)){
      setCurrentScene(scene);
    }

    // Lỗi vòng lặp vô hạn, treo web
    // const updatedScene = { ...scene };
    // updatedScene.hotspots = hotspotArr;
    // onChange(updatedScene);

  }, [scene]);

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

  const getSceneById = (id) => {
    const scene = scenes.find(item => item.scene.id === id);
    setCurrentScene(scene);
    onClickMoveScene(scene);
  };

  const hotspots = (element, i) => {
    // Hotspot hiện vật
    if (element.category === 1)
      return (
        <Pannellum.Hotspot
          key={i}
          type="custom"
          pitch={element.pitch}
          yaw={element.yaw}
          cssClass={element.css_class}
          handleClick={() => {
            // alert(element.id + " " + element.modelUrl);
            OpenModelView();
            setCurrentModel(element);

            handleOpenModelView();
          }}
        />
      );
    // Hotspot chuyển cảnh
    else if (element.category === 2)
      return (
        <Pannellum.Hotspot
          key={i}
          type="custom"
          pitch={element.pitch}
          yaw={element.yaw}
          cssClass={element.css_class}
          handleClick={() => {
            // setScene(DataScene["insideTwo"]);
            getSceneById(element.move_scene_id)
            // setCurrentImage(element.image_url)
          }}
        />
      );
  };

  const addHotspot = () => {
    const updatedScene = { ...currentScene };

    let lastId = updatedScene.hotspots ? updatedScene.hotspots.length : 0;
    lastId++;

    const newHotspot = {
      id: lastId,
      name: "",
      type: "custom",
      category: 1,
      pitch: parseFloat(localStorage.getItem("pitch")),
      yaw: parseFloat(localStorage.getItem("yaw")),
      scene_id: currentScene.scene.id,
      model_id: 0,
      model_url: "",
      css_class: "hotspotElement",
      move_scene_id: 0,
    };

    // setHotspotArr((prevHotspots) => [...prevHotspots, newHotspot]);

    if (updatedScene.hotspots && Array.isArray(updatedScene.hotspots)) {
      updatedScene.hotspots.push(newHotspot);
    } else {
      updatedScene.hotspots = [newHotspot];
    }

    // Gọi hàm onChange để cập nhật scene mới
    onChange(updatedScene);

    // const updatedScene = { ...scene };
    // updatedScene.hotspots = hotspotArr;
    // onChange(updatedScene);

    // const updatedScene = { ...scene };
    // updatedScene.hotspots = hotspotArr;
    // // alert(updatedScene.hotspots.length)
    // onChange(updatedScene);
  };

  const pannellumRef = useRef(null);

  // console.log(Object.values(scene.hotspot))
  // console.log(hotspotArr)

  const removeLastHotspot = () => {
    // setHotspotArr((prevHotspots) => prevHotspots.slice(0, -1));
    const updatedScene = { ...currentScene };

    if (updatedScene.hotspots && Array.isArray(updatedScene.hotspots)) {
      // slice ko thay đổi trực tiếp trên mảng nó được gọi
      updatedScene.hotspots = updatedScene.hotspots.slice(0, -1);
    }
    // Gọi hàm onChange để cập nhật scene mới
    onChange(updatedScene);
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

  const handleOpenModelInfo = () => {
    setShowModelInfo(true);
  };

  const handleCloseModelInfo = () => {
    setShowModelInfo(false);
  };

  const handleOpenHospotSidebar = () => {
    setIsOpenModelView(false);
    setHotspotArrChange(false);
  };

  const handleAddHospotInfo = () => {
    setIsOpenModelView(false);
    setAddHospotInfo(true);
    setHotspotArrChange(false);
  };

  const handleChangeHospotToEdit = () => {
    // Reset biến để ko lỗi cập nhật Pannellum
    setHotspotArrChange(false);
  };


  const handleCloseEditHospotOvelay = () => {
    setAddHospotInfo(false);
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
                title={(currentScene && currentScene.scene && currentScene.scene.name) ? currentScene.scene.name : "Khu vực không có tên"}
                yaw={360}
                hfov={110}
                autoLoad={true}
                // autoRotate={-5}
                compass={true}
                showZoomCtrl={true}
                mouseZoom={true}
                showControls={true}
                image={(currentScene && currentScene.panorama_image && currentScene.panorama_image.file_url) ? currentScene.panorama_image.file_url : ""}
                hotspotDebug={true}
                ref={pannellumRef}
              >
                {/* {Object.values(scene.hotspot).map((element, i) => (hotspots(element, i)))} */}
                {/* {hotspotArr.length > 0 ? (
                  hotspotArr.map((element, i) => hotspots(element, i))
                ) : (
                  <></>
                )} */}

                {currentScene && currentScene.hotspots && currentScene.hotspots.length > 0 ? (
                  currentScene.hotspots.map((element, i) => hotspots(element, i))
                ) : (
                  <></>
                )}
              </Pannellum>
              {isOpenModelView && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 h-3/4 w-3/4">
                  <div className="relative w-full h-full">
                    {!showModelInfo && currentModel.model_url && (
                    <>
                      <div className="absolute bottom-0 left-0 z-50 m-2 w-20">
                      <img src={MainLogo} />
                    </div>

                    <div className="absolute bottom-0 right-0 z-50 m-2 flex item-center gap-2">
                      <button className="transition-all duration-300 text-[#a9a9a9] hover:text-white">
                        <FontAwesomeIcon 
                          icon={faRotate} 
                          className="w-5 h-5" 
                        />
                      </button>
                      <button 
                        onClick={() => {
                          handleOpenModelInfo();
                        }}
                        className="transition-all duration-300 text-[#a9a9a9] hover:text-white">
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          className="w-5 h-5"
                        />
                      </button>
                      <button className="transition-all duration-300 text-[#a9a9a9] hover:text-white">
                        <FontAwesomeIcon
                          icon={faCircleQuestion}
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                    </>
                    )}
                    <button
                      onClick={() => {
                        handleCloseModelView();
                      }}
                      className="absolute top-0 right-0 z-50 m-2 transition-all duration-300 text-[#a9a9a9] hover:text-white "
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>
                    
                    {currentModel.model_url ? (
                        <ModelViewerOverlay currentModel={currentModel} showModelInfo={showModelInfo} closeModelInfo={handleCloseModelInfo}/>
                    ) : (
                      <div
                        style={{
                          borderRadius: "10px",
                          overflow: "hidden",
                          backgroundColor: "#4d4d4d8c", // Mờ đục với độ trong suốt 0.6
                          backdropFilter: "blur(2px)", // Hiệu ứng mờ đục
                        }}
                        className="h-full w-full flex flex-col justify-center p-10"
                      >
                        <div className="h-full w-full flex justify-center">
                          <img src={HotspotNull} className="h-full w-auto"/>
                        </div>
                        <div className="w-full flex justify-center">
                         <button
                          onClick={() => {handleAddHospotInfo()}}
                          className="mb-4 px-4 py-2 bg-amber-500 text-white text-xs rounded-md font-semibold transition-all dration-300 ease-in-out hover:bg-amber-600">Thêm thông tin</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={totalConsoleContent ? "" : "hidden"}>
              <div className="flex justify-between items-center px-8 py-4 border border-gray-100">
                <div className="font-semibold text-gray-700 text-sm">
                  Số hotspot đã tạo: {(currentScene && currentScene.hotspots) ? currentScene.hotspots.length : 0}
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
                    onClick={() => {
                      handleOpenHospotSidebar();
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
          <AllHotspot scenes={scenes.filter(scene => scene !== currentScene)} Hotspots={(currentScene && currentScene.hotspots) ? currentScene.hotspots : []} updateItem={childToParent} onDelete={handleDeleteHotspot} addHospotInfo={addHospotInfo} newHotspotNeedAddInfo={currentModel} closeEditHospotOverlay={handleCloseEditHospotOvelay} onChangeHotspotClick={handleChangeHospotToEdit}/>
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
