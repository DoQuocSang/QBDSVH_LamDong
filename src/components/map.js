import React, { useState } from "react";
import dataScene from "../helpers/dataScene.js";
import HotspotInMapData from "../helpers/dataHotspotInMap.js";
import HotspotInMap from "../helpers/dataHotspotInMap.js";


export default function Map({ imageUrl, changeImage, closeMap }) {
  const [scene, setScene] = useState(dataScene["outsideOne"]);
  const [currentImage, setCurrentImage] = useState("");
  const [hotspotInMap, SetHotspotInMap] = useState(HotspotInMapData);
  // const [scene, setScene] = useState(scenes[0]);

  
  const AddHotspotInMap = (elem, i) => {      // Thêm điểm hotspots trên map
    return (
      <div
        key={i}
        className="hotspot-map"
        onClick={() => {
          changeImage(elem.image, elem.scene);
          closeMap();
          // alert("Move scene");
        }}
        style={{ top: elem.top, left: elem.left }}
      ></div>
    );
  };

  return (
    // Map component
    <div className="mini-map-container">
      <div className="image-wrapper">
        <h1 className="map_main-title">Bản đồ khu bảo tàng</h1>
        <img className="mini-map" src={imageUrl} alt="map" />
        {/* Chuyển cảnh qua các scene */}
        {HotspotInMap &&
          Object.values(HotspotInMap).map((elem, i) =>
            AddHotspotInMap(elem, i)
          )}
      </div>
    </div>
  );
}
