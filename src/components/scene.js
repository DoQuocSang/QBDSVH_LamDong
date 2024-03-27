import React, { useState, useRef, useEffect } from "react";
import { Pannellum } from "pannellum-react";
import dataScene from "../helpers/dataScene";
import useModel from "../hooks/useModel";
import Model from "./model3D";
import ModelContainer from "./modelContainer";

import hoverHandler from "./scene";

import { gsap } from 'gsap';

import Taskbar from "./mediaTaskbar";

export default function Scene() {

  const { isOpen, openModel, closeModel } = useModel(false);

  const [scene, setScene] = useState(dataScene["outsideOne"]);

  const [model, setModel] = useState(null);
  
  const mountRef = useRef(null);

  const animateTransition = (newScene) => {
    // First, perform the scene transition with a smooth easing function
    gsap.to(scene, {
      duration: 1, // duration of the transition in seconds
      pitch: 0,
      ease: "power1.in", // smooth transition easing
      onUpdate: () => setScene({ ...scene }),
      onComplete: () => {
        // Once the transition is complete, start the zoom-in animation
        gsap.to(scene, {
          duration: 1, // duration of the zoom-in in seconds
          hfov: 50, // target field of view for the zoom
          ease: "power1.out", // smooth zoom easing
          onUpdate: () => setScene({ ...scene }),
          onComplete: () => setScene(newScene), // set the new scene once the animation is complete
        });
      },
    });
  };

  useEffect(() => {
    const currentRef = mountRef.current;

    if (currentRef) {
      for (let i = currentRef.children.length - 1; i >= 0; i--) {
        const child = currentRef.children[i];
        currentRef.removeChild(child);
      }
    }
  },);

  const hotSpots = (Element, i) => {
    if (Element.cssClass === "hotSpotElement")
      return (
        <Pannellum.Hotspot
          key={i}
          type={Element.type}
          yaw={Element.yaw}
          text={Element.text}
          pitch={Element.pitch}
          cssClass={Element.cssClass}
          handleClick={() => {
            openModel();
            setModel(Element.nameModel);
          }}
        ></Pannellum.Hotspot>
      );
    else if (Element.cssClass === "hotSpotElementImg")
      return (
        <Pannellum.Hotspot
          key={i}
          type={Element.type}
          yaw={Element.yaw}
          text={Element.text}
          pitch={Element.pitch}
          hoverContents={<img src={Element.image} alt="Map Tour" />}
          //hoverHandler={(hotSpotDiv) => hoverHandler(hotSpotDiv, Element.image)}
          cssClass={Element.cssClass}
        ></Pannellum.Hotspot>
      );

//  else if (Element.cssClass === "customIcon")
//   return (
//     <Pannellum.Hotspots
//       key={i}
//       type={Element.type}
//       yaw={Element.yaw}
//       text={Element.text}
//       pitch={Element.pitch}
//       hoverContents={<img src={Element.image} alt="Map Tour" />}
//       handleClick={() => animateTransition(dataScene[Element.scene])}
//       hoverHandler={(hotSpotDiv) => hoverHandler(hotSpotDiv, Element.image)}
//       cssClass={Element.cssClass}
//     ></Pannellum.Hotspots>
//   );

      
else if (Element.cssClass === "moveScene")
return (
  <Pannellum.Hotspot
    key={i}
    type={Element.type}
    yaw={Element.yaw}
    pitch={Element.pitch}
    cssClass={Element.cssClass}
    handleClick={() => animateTransition(dataScene[Element.scene])}
  />
);

      else if (Element.cssClass === "videoHotspot")
        return (
        <Pannellum.Video
          video={Element.video}
          loop
          
          // width="100%"
          // height="60px"
          pitch={Element.pitch}
          yaw={Element.yaw}
          hfov={140}
          minHfov={50}
          maxHfov={180}
        />);
  };

  return (
    <div>
      <Pannellum
        width="100%"
        height="100vh"
        title={scene.title}
        image={scene.image}
        pitch={scene.pitch}
        yaw={scene.yaw}
        hfov={110}
        autoLoad={true}
        autoRotate={-2}
        draggable={true}
        compass={true}
        showControls={false}
        showZoomCtrl={false}
        showFullscreenCtrl={false}
        closeButtonTitle="Close"
        doubleClickZoom={true}
        // closeHandler={closeAction}
        orientationOnByDefault={true}
        hotspotDebug={true}

      >
        {Object.values(scene.hotSpots).map((Element, i) =>
          hotSpots(Element, i)
        )}
      </Pannellum>

      <Model isOpen={isOpen} isClose={() => closeModel()}>
        {isOpen && <ModelContainer nameModel={model} />}
      </Model>
      
      <Taskbar/>
    </div>
    

  );
}
