import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../../../images/loading-pano.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getHeritageById } from "services/HeritageRepository";
import ReactPlayer from "react-player";
import CatError from "../../../images/cat-404-full-2.png";

const UserVideoViewerOverlay = ({ heritageId }) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const button = document.getElementById("video_buttonmodal");
    const closebutton = document.getElementById("close_video_button");
    const modal = document.getElementById("video_overlay");
    const mainvideo = document.getElementById("main_video");
    const closeModalSpace = document.getElementById("close_space_video");

    button.addEventListener("click", () => {
      modal.classList.add("scale-100");
      setTimeout(() => {
        mainvideo.classList.remove("top-0");
        mainvideo.classList.add("top-1/2");
        mainvideo.classList.remove("-translate-y-full");
        mainvideo.classList.add("-translate-y-1/2");
      }, 200);
    });

    closebutton.addEventListener("click", () => {
      setTimeout(() => {
        modal.classList.remove("scale-100");
      }, 200);
      mainvideo.classList.add("top-0");
      mainvideo.classList.remove("top-1/2");
      mainvideo.classList.add("-translate-y-full");
      mainvideo.classList.remove("-translate-y-1/2");
    });

    closeModalSpace.addEventListener("click", () => {
      setTimeout(() => {
        modal.classList.remove("scale-100");
      }, 200);
      mainvideo.classList.add("top-0");
      mainvideo.classList.remove("top-1/2");
      mainvideo.classList.add("-translate-y-full");
      mainvideo.classList.remove("-translate-y-1/2");
    });

    // Xử lý logic
    getHeritageById(heritageId).then((data) => {
      if (data) {
        setVideoUrl(data.video_url);
      } else setVideoUrl();
      console.log(data.video_url);
    });
  }, []);

  return (
    <>
      <div
        id="video_overlay"
        className="transform scale-0 transition-transform duration-300 w-full h-screen animated fadeIn fixed left-0 top-0 z-[100]"
      >
        <button
          id="close_video_button"
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
          id="close_space_video"
          className="w-full h-screen fixed z-[90] inset-0"
        />
        <div
          id="main_video"
          className="fixed z-[100] relative w-1/2 h-0 rounded-lg shadow-lg overflow-hidden top-0 left-1/2 transform -translate-x-1/2 -translate-y-full transition-all duration-300"
          style={{ paddingTop: "28.125%" }}
        >
          {videoUrl ? (
            <div className="absolute inset-0">
              <ReactPlayer
                className="w-full h-full"
                controls={true}
                url={videoUrl}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <img className="absolute inset-0 w-full h-auto" src={CatError} />
          )}
        </div>
      </div>
    </>
  );
};

export default UserVideoViewerOverlay;
