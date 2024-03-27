import React, { useState, useRef, useEffect } from 'react';

function Taskbar() {
  const audioRef = useRef(new Audio('../audio/copyleft-introbaotangld.mp3'));
  const bgAudio = useRef(new Audio('../audio/bgmusic.mp3'));

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPicture, setShowPicture] = useState(false); // New state to track whether to show the picture

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
    setShowPicture(true); // When map-button is clicked, show the picture
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
    <div className="bottom-taskbar ">
      <button className={`audio-button ${isPlaying ? 'playing' : ''}`} onClick={handleAudioClick}></button>
      <button className={`map-button ${isPlaying ? 'playing' : ''}`} onClick={handleMapButtonClick}></button>
      {showPicture && <img src="/src/images/mapedit.png" alt="Bản đồ bảo tàng" />} 
    </div>
  );
}

export default Taskbar;
