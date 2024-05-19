import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../../../images/loading-pano.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediaTaskbar from "./MediaTaskbar";
import MapImage from "../../../images/minimap.jpg";
import CompassIcon from "../../../images/compass-icon.png";
import { getFullInfoOfManagementUnitById } from "services/ManagementUnitRepository";
import { useParams, Link } from "react-router-dom";
import ModelViewerOverlay from "../../../pages/admin/management-unit/ModelViewerOverlay";
import UserModelContainer from "./UserModelContainer";
import MainLogo from "../../../images/logo-btld-3.png";
import HotspotGif from "../../../images/trans.gif";
import SceneGif from "../../../images/icon_scene.gif";
import TourGuide from "../../../images/tour-guide-3d-corner.png";
import TourGuideHotspot from "../../../images/tour-guide-3d-hotspot.png";
import {
  faCaretUp,
  faStop,
  faVolumeHigh,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

const UserPanoramaViewer = ({ isOpen, sceneData }) => {
  // const [sceneData, setsceneData] = useState();
  const [currentScene, setCurrentScene] = useState(null);
  const [isOpenModelView, setIsOpenModelView] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(true);
  const [isPlaySceneAudio, setIsPlaySceneAudio] = useState(false);
  const OpenModelView = () => setIsOpenModelView(true);

  const initialCameraState = {
      pitch: 0,
      yaw: 0,
    },
    [currentCamera, setCurrentCamera] = useState(initialCameraState);

  const pannellumRef = useRef(null);
  let { id } = useParams();
  id = id ?? 0;

  const initialModelState = {
      id: 0,
      category: 1,
      type: "",
      pitch: 0,
      yaw: 0,
      css_class: "",
      heritage_id: 0,
      model_url: "",
      scene_id: 0,
    },
    [currentModel, setCurrentModel] = useState(initialModelState);

  const defaultManagementUnit = {
    id: 0,
    name: "",
    urlslug: "",
    image_url: "",
    image_360_url: "",
    note: "",
    address: "",
    description: "",
    short_description: "",
  };

  const defaultScenes = [
    // {
    //   id: 0,
    //   name: "",
    //   image_url: "",
    //   pitch: 0,
    //   yaw: 0,
    // }
  ];

  const initialManagementUnitState = {
      management_unit: {
        ...defaultManagementUnit,
      },
      scenes: defaultScenes,
    },
    [managementUnitData, setManagementUnitData] = useState(
      initialManagementUnitState
    );

  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;

    //   img.onload = () => {
    //     console.log("Image loaded:", img);
    //     // Here you can view the `img` object and its properties
    // };

    img.onerror = () => {
      console.log("Image failed to load");
    };
  };

  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const audioRef = useRef(null);

  const handleSceneChange = (newSceneId) => {
    handleMuteAudio();

    setOpacity(0);
    setScale(1.5);

    setTimeout(() => {
      getSceneById(newSceneId);
      // setCurrentScene(newScene);
      setOpacity(1);
      setScale(1);
    }, 1000);
  };

  useEffect(() => {
    if (id !== 0) {
      getFullInfoOfManagementUnitById(id).then((data) => {
        if (data) {
          setManagementUnitData((prevState) => ({
            ...prevState,
            management_unit: {
              ...prevState.management_unit,
              ...data.management_unit,
            },
            scenes: data.scenes !== null ? data.scenes : [],
          }));

          if (data.scenes.length > 0) {
            setCurrentScene(data.scenes[0]);
          }

          data.scenes.forEach((scene) => {
            if (scene.panorama_image && scene.panorama_image.file_url) {
              preloadImage(scene.panorama_image.file_url);
            }
          });
        } else setManagementUnitData(initialManagementUnitState);
        // console.log(data);
      });
    }
  }, []);

  const customStyles = `
    .pnlm-container {
      background: url('${loadingGif}') center center no-repeat;
      background-size: contain;
      background-color: #0f111d;
    }

    .pnlm-compass {
      position: absolute;
      width: 70px;
      height: 70px;
      right: 20px;
      top: 20px;
      border-radius: 50%;
      background-size: contain;
      background-image: url('${CompassIcon}');
      cursor: default;
      display: none;
    }

    .pnlm-compass.pnlm-controls {
      margin-top: 0;
      background-color: #68686840;
      border: 1px solid #9990;
      border-color: rgb(0 0 0 / 0%);
      border-radius: 50%;
      cursor: pointer;
      z-index: 2;
      transform: translateZ(9999px);
    }

    .pnlm-panorama-info {
      position: absolute;
      top: 20px;
      left: 50%;
      height: fit-content;
      background-color: rgb(0 0 0 / 68%);
      border-radius: 0 3px 3px 0;
      padding: 10px 30px;
      border-radius: 50px;
      color: #fff;
      text-align: center;
      display: block;
      z-index: 2;
      transform: translateZ(9999px) translateX(-50%);
      backdrop-filter: blur(3px); 
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
    }

    .pnlm-title-box {
      position: relative;
      font-size: 16px;
      display: inline;
      padding-left: 5px;
      margin-bottom: 3px;
      font-weight: bold;
  }

  .hotspotElement {
    content: url(${HotspotGif});
    width: 4em;
    height: 4em;
    cursor: pointer;
  }

  .custom-hotspot-icon {
    content: url(${SceneGif});
    width: 5em;
    height: 5em;
    filter: hue-rotate(250deg);
    cursor: pointer;
  }

  .hotspot-icon-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .preview-hotspot-container {
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-105%);
    width: 200px;
    height: auto;
    opacity: 0;
    background-color: #ffffffd1;
    padding: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 6px;
    color: #22b472;
    transition: all .3s ease-in;
}

.pnlm-hotspot-base.hotspotMoveScene.pnlm-pointer:hover .preview-hotspot-container {
  top: 0;
  opacity: 100%;
}

// .preview-hotspot-container:hover {
//   background-color: #22b472;
//   color: white
// }

// .preview-hotspot-container:hover span.preview-hotspot-title::before {
//   border-color: #22b472 transparent transparent transparent;
// }

.preview-hotspot-image {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
}

span.preview-hotspot-title::before {
  content: "";
  height: 100%;
  width: 20px;
  bottom: calc(-100% - 6px);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px 10px 0 10px;
  border-style: solid;
  border-color: #ffffffd1 transparent transparent transparent;
  transition: all .3s ease-in;
}
  
span.preview-hotspot-title {
  font-size: 1rem;
  text-align: center;
  display: block;
}

.fade {
  transition: all 1s ease-in;
}

@keyframes move-slightly {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.move-animation {
  animation: move-slightly 2s infinite;
}

@keyframes bounce-slightly {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}

.bounce-animation {
  animation: bounce-slightly 1.5s infinite;
}

.tour-dialog::after {
  content: "";
  position: absolute;
  bottom: 0px;
  right: 30%;
  transform: translateX(50%) translateY(100%);
  border-color: white white transparent transparent;
  border-width: 10px;
  border-style: solid;
}
    `;

  const hotspotTooltip = (hotSpotDiv, args) => {
    // const { name, img_url } = args;
    // console.log(args);
    if (args && args.panorama_image && args.scene) {
      // preview
      var previewImageContainerDiv = document.createElement("div");
      previewImageContainerDiv.classList.add("preview-hotspot-container");
      previewImageContainerDiv.style.position = "absolute";

      var imgDiv = document.createElement("div");
      imgDiv.classList.add("preview-hotspot-image");
      // img.src = args.panorama_image.thumbnail_url;
      imgDiv.style.backgroundImage = `url('${args.panorama_image.thumbnail_url}')`;

      previewImageContainerDiv.appendChild(imgDiv);

      var span = document.createElement("span");
      span.classList.add("preview-hotspot-title");
      span.style.position = "relative";
      span.innerHTML = args.scene.name;

      previewImageContainerDiv.appendChild(span);

      // icon
      var hotspotIconContainerDiv = document.createElement("div");
      hotspotIconContainerDiv.classList.add("hotspot-icon-container");
      hotspotIconContainerDiv.style.position = "relative";

      var hotspotIconDiv = document.createElement("div");
      hotspotIconDiv.classList.add("custom-hotspot-icon");

      hotspotIconContainerDiv.appendChild(hotspotIconDiv);

      hotspotIconContainerDiv.appendChild(previewImageContainerDiv);
      hotSpotDiv.appendChild(hotspotIconContainerDiv);
    }
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
            // OpenModelView();
            setCurrentModel(element);

            setIsOpenModelView(true);
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
          tooltip={hotspotTooltip}
          tooltipArg={getSceneInfoById(element.move_scene_id)}
          handleClick={() => {
            // setScene(DataScene["insideTwo"]);
            handleSceneChange(element.move_scene_id);
            // getSceneById(element.move_scene_id);
            // setCurrentImage(element.image_url)
            setCurrentCamera({
              pitch: element.pitch,
              yaw: element.yaw,
            });
          }}
        />
      );
  };

  const getSceneById = (id) => {
    const scene = managementUnitData.scenes.find(
      (item) => item.scene.id === id
    );
    setCurrentScene(scene);
  };

  const getSceneInfoById = (id) => {
    const scene = managementUnitData.scenes.find(
      (item) => item.scene.id === id
    );
    return scene;
  };

  //Xử lý khi thay đổi hostpot ở component con
  const resetIsOpenModelView = () => {
    setIsOpenModelView(false);
  };

  const handleHideTourGuide = () => {
    setShowTourGuide(false);
    handleMuteAudio();
  };

  const handleShowTourGuide = () => {
    setShowTourGuide(true);
  };

  // const handleAudioToggle = () => {
  //   if (isPlaySceneAudio) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  //   setIsPlaySceneAudio(!isPlaySceneAudio);
  // };

  const handlePlayAudio = () => {
    if(currentScene && currentScene.audio && currentScene.audio.audio_url){
      audioRef.current.play();
      setIsPlaySceneAudio(true);
    }
  };

  const handleMuteAudio = () => {
    if(currentScene && currentScene.audio && currentScene.audio.audio_url){
      audioRef.current.pause();
      setIsPlaySceneAudio(false);
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div
        className="relative w-full h-full fade"
        style={{ opacity: opacity, scale: scale }}
      >
        <Pannellum
          width="100%"
          height="100vh"
          title={
            currentScene && currentScene.scene && currentScene.scene.name
              ? currentScene.scene.name
              : "Khu vực không có tên"
          }
          // yaw={360}
          hfov={110}
          autoLoad={true}
          // autoRotate={-5}
          compass={true}
          showZoomCtrl={false}
          mouseZoom={true}
          // draggable={true}
          showControls={false}
          // doubleClickZoom={true}
          pitch={currentCamera.pitch}
          yaw={currentCamera.yaw}
          image={
            currentScene &&
            currentScene.panorama_image &&
            currentScene.panorama_image.file_url
              ? currentScene.panorama_image.file_url
              : ""
          }
          ref={pannellumRef}
        >
          {currentScene &&
          currentScene.hotspots &&
          currentScene.hotspots.length > 0 ? (
            currentScene.hotspots.map((element, i) => hotspots(element, i))
          ) : (
            <></>
          )}
        </Pannellum>
        <UserModelContainer
          currentModel={currentModel}
          isOpenModelView={isOpenModelView}
          resetIsOpenModelView={resetIsOpenModelView}
        />
      </div>
      <MediaTaskbar
        pannellumRef={pannellumRef}
        increaseStep={15}
        getSceneById={getSceneById}
        currentSceneID={
          currentScene && currentScene.scene ? currentScene.scene.id : 0
        }
      />
      <Link to="/">
        <div className="fixed top-2 left-4 z-50 m-2 w-40 bg-[#4d4d4da1] rounded-full pr-2">
          <img src={MainLogo} />
        </div>
      </Link>
      {/* {currentScene && currentScene.audio && currentScene.audio.audio_url && (
        <audio
          ref={audioRef}
          src={currentScene.audio.audio_url}
          onEnded={() => setIsPlaySceneAudio(false)}
        />
      )} */}

      <audio
        ref={audioRef}
        src={
          currentScene && currentScene.audio && currentScene.audio.audio_url
            ? currentScene.audio.audio_url
            : ""
        }
        onEnded={() => setIsPlaySceneAudio(false)}
      />

      {showTourGuide ? (
        <div className="flex flex-col items-end gap-2 fixed top-1/2 transform -right-4 -translate-y-1/2 z-50 cursor-pointer hover:scale-110 transition duration-300">
          <div className="max-w-52 mr-10">
            <div className="tour-dialog bounce-animation relative bg-white rounded-md px-4 pt-6 pb-4 text-gray-600 font-medium text-sm bg-opacity-100">
              <p className="absolute top-0 left-2 transform -translate-y-1/2 bg-amber-500 text-white font-semibold text-xs px-2 py-1 rounded-md">
                <FontAwesomeIcon icon={faVolumeHigh} className="mr-1" />
                Hướng dẫn viên
              </p>
              <FontAwesomeIcon
                onClick={handleHideTourGuide}
                icon={faXmarkCircle}
                className="text-lg text-red-500 transition duration-300 hover:text-red-600 cursor-pointer absolute -top-2 -right-2 transform -traslate-x-1/2 -traslate-y-1/2 bg-white rounded-full"
              />
              {isPlaySceneAudio ? (
                <div
                  onClick={handleMuteAudio}
                  className="flex justify-center items-center gap-2"
                >
                  <FontAwesomeIcon
                    icon={faStop}
                    className="rounded-full p-2 bg-gray-100"
                  />
                  <p className="font-medium">Dừng nghe giới thiệu</p>
                </div>
              ) : (
                <p onClick={handlePlayAudio}>
                  Bấm vào đây để nghe giới thiệu về{" "}
                  <span className="font-semibold text-teal-500">
                    {currentScene &&
                    currentScene.scene &&
                    currentScene.scene.name
                      ? currentScene.scene.name
                      : "Khu vực không có tên"}
                  </span>
                </p>
              )}
            </div>
          </div>
          <img src={TourGuide} className="w-40" />
        </div>
      ) : (
        <div
          onClick={handleShowTourGuide}
          className="fixed top-1/2 transform right-0 -translate-y-1/2 z-50 cursor-pointer text-white -rotate-90 origin-bottom-right"
        >
          <p className="hover:bg-opacity-90 transition duration-300 bg-teal-500 px-10 py-0.5 rounded-tl-md rounded-tr-md bg-opacity-80">
            <FontAwesomeIcon icon={faCaretUp} className="mr-2" />
            Giới thiệu
          </p>
        </div>
      )}
    </>
  );
};

export default UserPanoramaViewer;
