import React, { useState, useRef, useEffect } from "react";
import Map from "./map";

function Taskbar({ OpenMap, MapVisible }) {
  const audioRef = useRef(new Audio("../audio/copyleft-introbaotangld.mp3"));
  const bgAudio = useRef(new Audio("../audio/bgmusic.mp3"));

  const [mapVisible, setMapVisible] = useState(false);
  // const [isMap, setImageMap] = useState(null);
  const [tourMap, setTourMap] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleMapBtnClick = () => {
    setTourMap(!tourMap);
    // setImageMap("/images/mapedit.png");
    // setMapVisible(!mapVisible);
    OpenMap(!MapVisible);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current.pause();
        bgAudio.current.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <div className="bottom-taskbar realative">
        <button
          className={`audio-button ${isPlaying ? "playing" : ""}`}
          onClick={handleAudioClick}
        ></button>
        <button className="map-button" onClick={handleMapBtnClick}></button>
      </div>
      {/* {mapVisible && <Map imageUrl={isMap} />} */}
    </>
  );
}

export default Taskbar;
