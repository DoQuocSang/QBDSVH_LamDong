import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../../../images/loading-pano.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import MapImage from "../../../images/mapedit.png";
import { getAllHotspotsInMapByManagementUnitID } from "services/HotspotMapRepository";
import { useParams } from "react-router-dom";
import defaultHotspotMapIcon from '../../../images/default_hotspot_map.png';
import '../../../asset/css/hotspot-map.css'

const HotspotMap = ({ getSceneById, currentSceneID }) => {
  const [mapVisible, setMapVisible] = useState(false);
  const [hotspotsInMap, setHotspotsInMap] = useState([]);

  let { id } = useParams();
  id = id ?? 0;

  const handleMapBtnClick = () => {
    setMapVisible(!mapVisible);
  };

  useEffect(() => {
    const button = document.getElementById("hotspot_map_buttonmodal");
    const closebutton = document.getElementById("close_hotspot_map_button");
    const modal = document.getElementById("hotspot_map_overlay");
    const mainMap = document.getElementById("main_hotspot_map");
    const closeModalSpace = document.getElementById("close_space_hotspot_map");

    button.addEventListener("click", () => {
      modal.classList.add("scale-100");
      setTimeout(() => {
        mainMap.classList.remove("top-0");
        mainMap.classList.add("top-1/2");
        mainMap.classList.remove("-translate-y-full");
        mainMap.classList.add("-translate-y-1/2");
      }, 200);
    });

    closebutton.addEventListener("click", () => {
      setTimeout(() => {
        modal.classList.remove("scale-100");
      }, 200);
      mainMap.classList.add("top-0");
      mainMap.classList.remove("top-1/2");
      mainMap.classList.add("-translate-y-full");
      mainMap.classList.remove("-translate-y-1/2");
    });

    closeModalSpace.addEventListener("click", () => {
      setTimeout(() => {
        modal.classList.remove("scale-100");
      }, 200);
      mainMap.classList.add("top-0");
      mainMap.classList.remove("top-1/2");
      mainMap.classList.add("-translate-y-full");
      mainMap.classList.remove("-translate-y-1/2");
    });

    // Xử lý logic
    getAllHotspotsInMapByManagementUnitID(id).then((data) => {
      if (data) {
        setHotspotsInMap(data);
      } else setHotspotsInMap([]);
      console.log(data);
    });
  }, []);

  // Thêm điểm hotspots trên map
  const AddHotspotInMap = (elem, i) => {    
    return (
      <div 
      key={i}
      onClick={() => {
        if(currentSceneID !== elem.scene_id){
          getSceneById(elem.scene_id);
        }
        handleCloseMap();
      }}
      style={{ top: `${elem.top}%`, left: `${elem.left}%` }}
      className="group w-10 h-10 absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center">
      {elem.scene_id === currentSceneID && (
        <div className="group-hover:hidden circle-animate w-full h-full border-4 border-red-500 rounded-full top-0 left-0 absolute transform -translate-x-1/2 -translate-y-1/2"/>
      )}
      <img 
        src={defaultHotspotMapIcon} alt="Hotspot Map" class="w-full h-full rounded-full border-0 border-red-500 group-hover:border-4 transition-all duration-300" />
        <p className="text-xs font-semibold text-white bg-red-500 px-0 py-0 rounded-full whitespace-nowrap transfrom -translate-x-full transition-all duration-300 w-0 opacity-0 group-hover:opacity-100 group-hover:px-4 overflow-hidden group-hover:overflow-visible group-hover:py-2 group-hover:w-56 group-hover:translate-x-0 group-hover:mx-2">
          {elem.scene_name}
        </p>
      </div>
    );
  };
  
  const handleCloseMap = () => {
    const modal = document.getElementById("hotspot_map_overlay");
    const mainMap = document.getElementById("main_hotspot_map");
    
    setTimeout(() => {
      modal.classList.remove("scale-100");
    }, 200);
    mainMap.classList.add("top-0");
    mainMap.classList.remove("top-1/2");
    mainMap.classList.add("-translate-y-full");
    mainMap.classList.remove("-translate-y-1/2");
  };

  return (
    <>
    <div
      id="hotspot_map_overlay"
      className="transform scale-0 transition-transform duration-300 w-full h-screen animated fadeIn fixed left-0 top-0 z-[100]"
    >
      <button
        id="close_hotspot_map_button"
        className="transition-all duration-300 hover:scale-125 fixed z-[95] top-4 right-4 font-semibold"
      >
        <FontAwesomeIcon icon={faXmark} className="text-white  text-2xl" />
      </button>
      <div
        style={{
          backgroundColor: "#48484866",
          backdropFilter: "blur(3px)",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.35)",
        }}
        id="close_space_hotspot_map"
        className="w-full h-screen fixed z-[90] inset-0"
      />
      <div
        id="main_hotspot_map"
        className="fixed z-[100] top-0 left-1/2 transform -translate-x-1/2 -translate-y-full transition-all duration-300"
      >
        <div className="relative flex flex-col gap-4 justify-center items-center rounded-md ">
          <img className="rounded-lg" src={MapImage} alt="map" />
          {hotspotsInMap &&
          Object.values(hotspotsInMap).map((elem, i) =>
            AddHotspotInMap(elem, i)
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default HotspotMap;
