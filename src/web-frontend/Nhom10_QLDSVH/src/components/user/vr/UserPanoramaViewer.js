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


const UserPanoramaViewer = ({ isOpen, sceneData }) => {
  // const [sceneData, setsceneData] = useState();
  const [currentScene, setCurrentScene] = useState(null);
  const [isOpenModelView, setIsOpenModelView] = useState(false);
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
        }
        else setManagementUnitData(initialManagementUnitState);
        console.log(data);
      });
    }
  }, []);

  console.log(currentScene);

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

  .hotspotMoveScene {
    content: url(${SceneGif});
    width: 5em;
    height: 5em;
    overflow: visible;
    filter: hue-rotate(250deg);
    transform: rotate(-450deg);
    cursor: pointer;
  }

//   div.custom-tooltip span {
//     visibility: hidden;
//     position: absolute;
//     border-radius: 3px;
//     background-color: #fff;
//     color: #000;
//     text-align: center;
//     max-width: 200px;
//     padding: 5px 10px;
//     margin-left: -220px;
//     cursor: default;
// }
// div.custom-tooltip:hover span{
//     visibility: visible;
// }
// div.custom-tooltip:hover span:after {
//     content: '';
//     position: absolute;
//     width: 0;
//     height: 0;
//     border-width: 10px;
//     border-style: solid;
//     border-color: #fff transparent transparent transparent;
//     bottom: -20px;
//     left: -10px;
//     margin: 0 50%;
// }

// div.custom-tooltip span {
//   visibility: hidden;
//   position: absolute;
//   border-radius: 3px;
//   background-color: #fff;
//   color: #000;
//   text-align: center;
//   max-width: 200px;
//   padding: 5px 10px;
//   margin-left: -220px;
//   cursor: default;
// }
// div.custom-tooltip:hover span{
//   visibility: visible;
// }
// div.custom-tooltip:hover span:after {
//   content: '';
//   position: absolute;
//   width: 0;
//   height: 0;
//   border-width: 10px;
//   border-style: solid;
//   border-color: #fff transparent transparent transparent;
//   bottom: -20px;
//   left: -10px;
//   margin: 0 50%;
// }
  
    `;

    const hotspotTooltip = (hotSpotDiv, args) => {
      hotSpotDiv.classList.add('custom-tooltip');
      var span = document.createElement('span');
      span.innerHTML = args;
      hotSpotDiv.appendChild(span);
      // Apply styles to the <span> element
    // Position the tooltip above the hotspot
    span.style.position = 'absolute';
    span.style.padding = '5px';
    span.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    span.style.color = 'white';
    span.style.borderRadius = '5px';
    span.style.fontSize = '14px';
    span.style.whiteSpace = 'nowrap';
    span.style.top = '-30px'; // Adjust the position as needed
    span.style.left = '50%';
    span.style.transform = 'translateX(-50%)';

    // Set the visibility of the tooltip
    span.style.visibility = 'visible';
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
        <div className="hotspot-container relative">
        <Pannellum.Hotspot
          key={i}
          type="custom"
          pitch={element.pitch}
          yaw={element.yaw}
          cssClass={element.css_class}
          tooltip={hotspotTooltip}
          tooltipArg={"Hotspot 01230120"}
          handleClick={() => {
            // setScene(DataScene["insideTwo"]);
            getSceneById(element.move_scene_id);
            // setCurrentImage(element.image_url)
            setCurrentCamera({
              pitch: element.pitch,
              yaw: element.yaw,
            })
          }}
        />
        <p className="absolute top-0 left-0">sdaasdsd</p>
        </div>
      );
  };

  const getSceneById = (id) => {
    const scene = managementUnitData.scenes.find(
      (item) => item.scene.id === id
    );
    setCurrentScene(scene);
  };

   //Xử lý khi thay đổi hostpot ở component con
   const resetIsOpenModelView = () => {
    setIsOpenModelView(false);
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="relative w-full h-full">
        <Pannellum
          width="100%"
          height="100vh"
          title={(currentScene && currentScene.scene && currentScene.scene.name) ? currentScene.scene.name : "Khu vực không có tên"}
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
            <div className="hotspot-container">
        <Pannellum.Hotspot
          type="custom"
          pitch={0}
          yaw={0}
          cssClass={"hotspotMoveScene"}
          handleClick={() => {
           
          }}
        />
          <p className="absolute top-0 left-0">sdaasdsd</p>
        </div>
          
        </Pannellum>
        <UserModelContainer currentModel={currentModel} isOpenModelView={isOpenModelView} resetIsOpenModelView={resetIsOpenModelView}/>
      </div>
      <MediaTaskbar pannellumRef={pannellumRef} increaseStep={15} />
      <Link to="/">
        <div className="fixed top-2 left-4 z-50 m-2 w-40 bg-[#4d4d4da1] rounded-full pr-2">
          <img src={MainLogo} />
        </div>
      </Link>
    </>
  );
};

export default UserPanoramaViewer;
