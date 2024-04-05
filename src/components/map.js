import React, { useState } from "react";
import dataScene from "../helpers/dataScene.js";
import { Pannellum } from "pannellum-react";

import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Map({ imageUrl }) {
  const [scene, setScene] = useState(dataScene["outsideOne"]);

  // function to get the scene object based on scene name
  const getSceneByName = (sceneName) => {
    return dataScene[sceneName]; 
  };

  const hotspotInMap = (elem, i) => {
    if (elem.cssClass === "hotspot-map") {
      return (
        <Pannellum.Hotspot
          key={i}
          type={elem.type}
          pitch={elem.pitch}
          yaw={elem.yaw}
          className={elem.cssClass}
          handleClick={() => {
            setScene(getSceneByName(elem.scene));
          }}
        />
      );
    }
  };

  return (
    // Map component
    <div className="mini-map-container">
      <div className="image-wrapper">
        <h1 className="map_main-title">Bản đồ khu bảo tàng</h1>
        <img className="mini-map" src={imageUrl} alt="map" />
        <div
          className="hotspot-map"
          style={{ bottom: "0%" }}
          onClick={() => setScene(dataScene["LinhAnTour"])}
        ></div>
      </div>
    </div>
  );
}
