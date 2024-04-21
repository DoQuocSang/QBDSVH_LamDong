import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../../../images/loading-pano.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLogo from "../../../images/logo-btld-2.png";
import HotspotNull from "../../../images/cat-hotspot-null-2.png";
import {
  faCircleInfo,
  faRotate,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import UserModelViewerOverlay from "./UserModelViewerOverlay";
import {
  faCaretDown,
  faCircleArrowDown,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleArrowUp,
  faCircleDown,
  faCircleLeft,
  faCircleRight,
  faCircleUp,
  faExpand,
  faLayerGroup,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faMapLocationDot,
  faMinus,
  faPlus,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import HotspotMap from "./HotspotMap";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { UilInfoCircle } from '@iconscout/react-unicons'
import { UilQuestionCircle } from '@iconscout/react-unicons'
import { UilRotate360 } from '@iconscout/react-unicons'
import { UilFileAlt } from '@iconscout/react-unicons'
import { getHeritageSlugById } from "services/HeritageRepository";

const UserModelContainer = ({
  currentModel,
  isOpenModelView,
  resetIsOpenModelView,
}) => {
  const [showModelInfo, setShowModelInfo] = useState(false);

  const handleCloseModelView = () => {
    // setIsOpenModelView(false);
    resetIsOpenModelView();
  };

  const handleOpenModelInfo = () => {
    setShowModelInfo(true);
  };

  const handleCloseModelInfo = () => {
    setShowModelInfo(false);
  };

  const HandleGetHeritageSlugById = (id) => {
    if (id !== 0) {
      getHeritageSlugById(id).then((data) => {
        if (data) {
          window.location = `/heritage-detail/${data.slug}`;
        }
      });
    }
  };

  return (
    <>
      {isOpenModelView && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-30 h-4/5 w-1/2">
          <div className="relative w-full h-full">
            {!showModelInfo && currentModel.model_url && (
              <>
                <div className="absolute bottom-0 left-0 z-50 m-2 w-32">
                  <img src={MainLogo} />
                </div>

                <div className="absolute bottom-0 right-0 z-50 m-2 flex item-center gap-2">
                  <button className="transition-all duration-300 text-[#a9a9a9] hover:text-white">
                    {/* <FontAwesomeIcon icon={faRotate} className="w-6 h-6" /> */}
                    <UilRotate360 size="30"/>
                  </button>
                  <button
                    onClick={() => {
                      handleOpenModelInfo();
                    }}
                    className="transition-all duration-300 text-[#a9a9a9] hover:text-white"
                  >
                    {/* <FontAwesomeIcon icon={faCircleInfo} className="w-6 h-6" /> */}
                    <UilInfoCircle size="30"/>
                  </button>
                  <button onClick={() => HandleGetHeritageSlugById(currentModel.heritage_id)} className="transition-all duration-300 text-[#a9a9a9] hover:text-white">
                    {/* <FontAwesomeIcon
                      icon={faCircleQuestion}
                      className="w-6 h-6"
                    /> */}
                    <UilFileAlt size="30"/>
                  </button>
                  <button className="transition-all duration-300 text-[#a9a9a9] hover:text-white">
                    {/* <FontAwesomeIcon
                      icon={faCircleQuestion}
                      className="w-6 h-6"
                    /> */}
                    <UilQuestionCircle size="30"/>
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
              <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
            </button>

            {currentModel.model_url ? (
              <UserModelViewerOverlay
                currentModel={currentModel}
                showModelInfo={showModelInfo}
                closeModelInfo={handleCloseModelInfo}
              />
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
                <div className="w-full flex justify-center">
                  <img src={HotspotNull} className="max-w-[75%] " />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserModelContainer;
