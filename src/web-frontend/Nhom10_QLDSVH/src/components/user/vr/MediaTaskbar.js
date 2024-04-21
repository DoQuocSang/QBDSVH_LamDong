import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../../../images/loading-pano.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
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
import SceneHorizontalList from "./SceneHorizontalList";
import { translate } from "react-range/lib/utils";

const MediaTaskbar = ({ pannellumRef, increaseStep = 10, getSceneById, currentSceneID }) => {
  const audioRef = useRef(new Audio("../audio/copyleft-introbaotangld.mp3"));
  const bgAudio = useRef(new Audio("../audio/bgmusic.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowSceneList, setIsShowSceneList] = useState(false);
  const [showTaskbar, setShowTaskbar] = useState(0);
  const [showTaskbarViewButton, setShowTaskbarViewButton] = useState(150);

  const handleAudioClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
      bgAudio.current.pause();
    } else {
      bgAudio.current.play();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Custom pannellum control
  const handleMoveUp = () => {
    const viewer = pannellumRef.current.getViewer();
    viewer.setPitch(viewer.getPitch() + increaseStep);
  };

  const handleMoveDown = () => {
    const viewer = pannellumRef.current.getViewer();
    viewer.setPitch(viewer.getPitch() - increaseStep);
  };

  const handleMoveLeft = () => {
    const viewer = pannellumRef.current.getViewer();
    viewer.setYaw(viewer.getYaw() - increaseStep);
  };

  const handleMoveRight = () => {
    const viewer = pannellumRef.current.getViewer();
    viewer.setYaw(viewer.getYaw() + increaseStep);
  };

  const handleZoomIn = () => {
    const viewer = pannellumRef.current.getViewer();
    viewer.setHfov(viewer.getHfov() - increaseStep);
  };

  const handleZoomOut = () => {
    const viewer = pannellumRef.current.getViewer();
    viewer.setHfov(viewer.getHfov() + increaseStep);
  };

  const handleFullscreenToggle = () => {
    const viewer = pannellumRef.current.getViewer();
    viewer.toggleFullscreen();
  };

  const handleSceneListToggle = () => {
    setIsShowSceneList(!isShowSceneList);
  };

  const handleHideTaskbar = () => {
    setShowTaskbar(150);
    setShowTaskbarViewButton(0);
  };

  const handleShowTaskbar = () => {
    setShowTaskbar(0);
    setShowTaskbarViewButton(150);
  };

  return (
    <>
      <div
        onClick={handleShowTaskbar}
        style={{
          transform: `translateY(${showTaskbarViewButton}%)`,
          zIndex: 60,
        }}
        className="group absolute bottom-0 bg-gradient-to-t from-[#454545bd] to-[#ffffff00] flex justity-center items-center w-screen text-white transition-all duration-300 cursor-pointer"
      >
        <div className="w-full py-4 flex justify-center items-center gap-2 group-hover:scale-125 transition-all duration-300">
         <FontAwesomeIcon icon={faCaretUp} className="text-xl "/>
         <p className="text-sm hidden group-hover:inline">Hiển thị thanh công cụ</p>
        </div>
      </div>
      <div
        style={{
          transform: `translateY(${showTaskbar}%)`,
          zIndex: 50,
        }}
        className="absolute bottom-6 w-3/4 flex flex-col justify-center items-center transform transition-all duration-300"
      >
        <SceneHorizontalList
          isShowSceneList={isShowSceneList}
          handleShowSceneList={handleSceneListToggle}
          getSceneById={getSceneById}
          currentSceneID={currentSceneID}
        />
        <div
          style={{
            backgroundColor: "#52aea391",
            backdropFilter: "blur(3px)",
            boxShadow: "rgb(49 49 49 / 35%) 0px 0px 15px",
          }}
          className="flex-1 text-white font-semibold text-xl rounded-md px-4 py-2 flex justify-between items-center w-full"
        >
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handleSceneListToggle}
              className="hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faLayerGroup} />
            </button>
            <button
              onClick={handleAudioClick}
              className="audio-button hover:scale-125 transition-all duration-300"
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={faVolumeHigh} />
              ) : (
                <FontAwesomeIcon icon={faVolumeMute} />
              )}
            </button>
            <button
              id="hotspot_map_buttonmodal"
              className=" hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faMapLocationDot} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handleMoveUp}
              className="hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCircleUp} />
            </button>
            <button
              onClick={handleMoveDown}
              className="hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCircleDown} />
            </button>
            <button
              onClick={handleMoveLeft}
              className="hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCircleLeft} />
            </button>
            <button
              onClick={handleMoveRight}
              className="hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCircleRight} />
            </button>
            <button
              onClick={handleZoomIn}
              className="hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              onClick={handleZoomOut}
              className="hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handleFullscreenToggle}
              className=" hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
            <button
              onClick={handleHideTaskbar}
              className=" hover:scale-125 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>
        </div>
      </div>
      <HotspotMap getSceneById={getSceneById}/>
    </>
  );
};

export default MediaTaskbar;
