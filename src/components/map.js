import React from "react";
// import dataScene from "../helpers/dataScene.js";
// import HotspotInMapData from "../helpers/dataHotspotInMap.js";
import HotspotInMap from "../helpers/dataHotspotInMap.js";

export default function Map({ imageUrl, changeImage, closeMap, checkSceneAnimHotspot }) {
  const AddHotspotInMap = (elem, i) => {
    // If the hotspot is the current scene, don't display it
    if (elem.scene === checkSceneAnimHotspot) {
      return null;
    }
    
    return (
      <div
        key={i}
        className={checkSceneAnimHotspot(elem) ? "set-hotspot-map" : "hotspot-map"}
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
