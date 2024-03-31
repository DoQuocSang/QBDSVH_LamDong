import React, { useState, useRef, useEffect } from 'react';
import DynamicImageComponent from './map'; // Import DynamicImageComponent from map.js

function Taskbar() {
  const audioRef = useRef(new Audio('../audio/copyleft-introbaotangld.mp3'));
  const bgAudio = useRef(new Audio('../audio/bgmusic.mp3'));

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const [imageToShow, setImageToShow] = useState(null); // State to store the image URL
  const [mapVisible, setMapmapVisible] = useState(false); 

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

  const handleMapButtonClick = () => {
    setShowPicture(!showPicture); // Toggle the showPicture state
    // Update imageToShow state with the image URL
    setImageToShow('/images/mapedit.png'); // Set the image URL when the map button is clicked
    setMapmapVisible(!mapVisible);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current.pause();
        bgAudio.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
    <div className="bottom-taskbar relative">
      <button className={`audio-button ${isPlaying ? 'playing' : ''}`} onClick={handleAudioClick}></button>
      <button className={`map-button ${isPlaying ? 'playing' : ''}`} onClick={handleMapButtonClick}></button>
    </div>
      {mapVisible && <DynamicImageComponent imageUrl={imageToShow} />} {/* Pass imageToShow as imageUrl */}
    </>
  );
}

export default Taskbar;
