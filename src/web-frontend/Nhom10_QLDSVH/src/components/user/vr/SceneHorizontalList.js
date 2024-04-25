import { Pannellum } from "pannellum-react";
import React, { useEffect, useRef, useState } from "react";
import loadingGif from "../../../images/loading-pano.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faCaretLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { getScenes } from "services/SceneRepository";
import { useParams } from "react-router-dom";

const SceneHorizontalList = ({
  isShowSceneList,
  handleShowSceneList,
  getSceneById,
  currentSceneID,
}) => {
  const [scenes, setScenes] = useState([]);

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    if (id !== 0) {
      getScenes(id).then((data) => {
        if (data) {
          setScenes(data.data);
        } else setScenes([]);
        console.log(data);
      });
    }
  }, []);

  const handleChangeScene = (id) => {
    getSceneById(id);
  };

  return (
    <>
      <style>
        {`
        .scrollbar::-webkit-scrollbar {
        height: 10px;
        }
    
        .scrollbar::-webkit-scrollbar-track {
        border-radius: 0px;
        background: #ffffff;
        }
    
        .scrollbar::-webkit-scrollbar-thumb {
        background: #799e89;
        border-radius: 100vh;
        border: 3px solid #ffffff;
        transition: all .3s ease;
        }
    
        .scrollbar::-webkit-scrollbar-thumb:hover {
        background: #52aea3;
        cursor: pointer;
        }
    `}
      </style>
      <div
        className={
          isShowSceneList
            ? "flex w-full flex-col overflow-hidden rounded-tl-lg rounded-tr-lg transform translate-y-0 opacity-100 h-auto transition-all duration-300 ease-in-out"
            : "flex w-full flex-col overflow-hidden rounded-tl-lg rounded-tr-lg h-0 opacity-0 transform translate-y-full transition-all duration-300 ease-in-out"
        }
      >
        <div
          style={
            {
              // backgroundColor: "#1d1d1db3",
              // backdropFilter: "blur(3px)",
            }
          }
          className="flex justify-between text-sm font-bold text-white box-border relative bg-[#00000094]"
        >
          <h3 className="rounded-br-lg bg-[#52aea3] box-border px-4 py-2">
            Danh sách các khu vực
          </h3>
          <button
            onClick={handleShowSceneList}
            className="text-xl absolute top-2 right-4 hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} className="" />
          </button>
        </div>
        <div
          style={
            {
              // backgroundColor: "#1d1d1db3",
              // backdropFilter: "blur(3px)",
            }
          }
          className="hide-scroll-bar scrollbar flex overflow-x-scroll py-4 bg-[#00000094] px-3"
        >
          {scenes.map((item, index) => (
            <div className="flex flex-nowrap px-3" key={index}>
              <div className="inline-block flex flex-col justify-center">
                <div className="relative mx-auto flex flex-col justify-center">
                  <a
                    onClick={() => handleChangeScene(item.id)}
                    className="relative inline-block w-56 max-w-xs transform transition-transform duration-300 ease-in-out cursor-pointer"
                  >
                    <div className="rounded-lg shadow">
                      <div className="relative flex h-32 justify-center overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl">
                        <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                            <img
                              src={item.thumbnail_url}
                              alt=""
                              className="object-cover w-full h-full "
                            />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full flex px-4 py-2 bg-gradient-to-t from-[#121212] to-[#ffffff00]">
                          <p className="flex items-center font-medium text-white text-sm shadow-sm">
                            {item.name}
                          </p>
                        </div>

                        {item.id === currentSceneID && (
                          <span className="absolute right-2 top-2 z-10 inline-flex select-none rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                            Đang xem
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SceneHorizontalList;
