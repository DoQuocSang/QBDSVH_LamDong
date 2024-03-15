import React, { useState, useRef, useEffect } from 'react';

function Taskbar() {
  const audioRef = useRef(new Audio('../audio/copyleft-introbaotangld.mp3'));
  const bgAudio = useRef(new Audio('../audio/bgmusic.mp3'));

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
    </div>
  );
}

export default Taskbar;
