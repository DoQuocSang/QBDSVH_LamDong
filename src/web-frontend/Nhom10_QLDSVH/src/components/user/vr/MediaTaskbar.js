import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../../../images/loading-pano.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import SceneHorizontalList from "./SceneHorizontalList";

const MediaTaskbar = ({ pannellumRef, increaseStep = 10, getSceneById }) => {
  const audioRef = useRef(new Audio("../audio/copyleft-introbaotangld.mp3"));
  const bgAudio = useRef(new Audio("../audio/bgmusic.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowSceneList, setIsShowSceneList] = useState(false);

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

  return (
    <>
      <div className="absolute bottom-6 z-50 w-3/4 flex flex-col justify-center items-center">
        <SceneHorizontalList isShowSceneList={isShowSceneList} handleShowSceneList={handleSceneListToggle} getSceneById={getSceneById}/>
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
              className="hover:scale-125 transition-all duration-300">
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
            className=" hover:scale-125 transition-all duration-300">
              <FontAwesomeIcon icon={faExpand} />
            </button>
            <button className=" hover:scale-125 transition-all duration-300">
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>
        </div>
      </div>
      <HotspotMap />
    </>
  );
};

export default MediaTaskbar;
