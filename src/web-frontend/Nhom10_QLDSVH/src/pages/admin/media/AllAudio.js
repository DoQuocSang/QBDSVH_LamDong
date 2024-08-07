import {
  faAdd,
  faDownload,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  calculateTotalSizePercent,
  convertSize,
  formatDate,
  getFileNameFromURL,
  upperCaseFirstCharacter,
} from "components/utils/Utils";
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  deleteUploadFileById,
  getUploadFiles,
} from "services/UploadFileRepository";
import AudioPlayImg from "../../../images/audio-play-img.png";
import AudioStopImg from "../../../images/audio-stop-img.png";
import { storage } from "../../../firebase.js";
import { ref, deleteObject } from "firebase/storage";
import Error404 from "components/admin/other/Error404";
import DeleteModal from "components/admin/modal/DeleteModal";
import { getAudios } from "services/AudioRepository";
import { handleDownload } from "services/Method";

export default () => {
  document.title = "Quản lý file phương tiện";
  const [audioList, setAudioList] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [totalSizePercent, setTotalSizePercent] = useState(null);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteAudioUrl, setDeleteAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioSrc, setCurrentAudioSrc] = useState("");
  const [currentAudioId, setCurrentAudioId] = useState(0);
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  //Xử lý khi bấm xóa bên component con DeleteModal
  const childToParent = (isDelete) => {
    if (isDelete === true && deleteId !== 0) {
      // Lọc danh sách và cập nhật lại danh sách chính
      const updatedAudioList = audioList.map((item) => {
        item.audio = item.audio.filter((audio) => audio.id !== deleteId);
        return item;
      });
      setAudioList(updatedAudioList);

      // Cập nhật tổng kích thước và % tổng kích thước
      let totalSize = 0;

      updatedAudioList.forEach((item) => {
        item.audio.forEach((audio) => {
          totalSize += audio.size;
        });
      });

      setTotalSizePercent(calculateTotalSizePercent(totalSize));
      setTotalSize(totalSize);
    }
    // console.log(convertSize(totalSize))
  };

  const handleDelete = (id, audio_url) => {
    setDeleteId(id);
    setDeleteAudioUrl(audio_url);
  };

  useEffect(() => {
    getAudios().then((data) => {
      if (data) {
        if (data.data !== null) {
          setAudioList(data.data);
        }

        setTotalSize(data.total_size);
        setTotalSizePercent(calculateTotalSizePercent(data.total_size));
      } else {
        setAudioList([]);
      }
      // console.log(Math.round((data.total_size / (1024 * 1024 * 1024)) * 100))
      // console.log(totalSizePercent)
    });
  }, []);

  const playAudio = (audioUrl, id) => {
    if (currentAudio) {
      if (currentAudioId === id) {
        if (isPlaying) {
          currentAudio.pause();
        } else {
          currentAudio.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        currentAudio.pause();
        const newAudio = new Audio(audioUrl);
        setCurrentAudio(newAudio);
        setCurrentAudioId(id);
        newAudio.play();
        setIsPlaying(true);
      }
    } else {
      const newAudio = new Audio(audioUrl);
      setCurrentAudio(newAudio);
      setCurrentAudioId(id);
      newAudio.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex justify-end my-4">
          <div className="w-56 mx-2">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="text-xs font-medium text-gray-600">Đã dùng</p>
                <p className="text-xs font-medium text-gray-600">
                  <span className="text-emerald-500">
                    {convertSize(totalSize)}
                  </span>{" "}
                  / 1 GB
                </p>
              </div>
              <div className="mt-1 flex h-2 w-full items-center rounded-full bg-blue-200">
                <span
                  style={{ width: totalSizePercent }}
                  className="h-full rounded-full bg-blue-500"
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <a className="hidden transition duration-300 sm:inline-flex mx-1 cursor-pointer text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-xs px-4 py-2 text-center items-center">
            <FontAwesomeIcon icon={faUpload} className="text-base mr-3" />
            Thêm audio
          </a>
          <a className="hidden transition duration-300 sm:inline-flex mx-1 cursor-pointer text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-xs px-4 py-2 text-center items-center">
            <FontAwesomeIcon icon={faTrash} className="text-base mr-3" />
            Xóa tất cả
          </a>
        </div>
      </div>

      {audioList.length > 0 &&
        audioList.map((item, index) => (
          <div className="mb-10">
            <div className="w-full flex items-center my-4">
              <div className="h-0.5 rounded-full bg-gray-200 flex-1"> </div>
              <span className="text-xs mx-4 text-gray-600 font-semibold">
                {formatDate(item.upload_date)}
              </span>
              <div className="h-0.5 rounded-full bg-gray-200 flex-1"> </div>
            </div>
            {currentAudioSrc && (
              <audio
                ref={audioRef}
                src={currentAudioSrc}
                onEnded={() => setIsPlaying(false)}
              />
            )}
            <div id="myTabContent">
              {/* <h2 className="mb-4 text-xl font-bold text-gray-600">File đã tải lên hệ thống</h2> */}
              <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4">
                {item.audio.map((audio, index) => (
                  <div className="flex flex-col overflow-hidden rounded p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative pb-[80%]">
                      <img
                        src={
                          isPlaying && currentAudioId === audio.id
                            ? AudioStopImg
                            : AudioPlayImg
                        }
                        onClick={() => playAudio(audio.audio_url, audio.id)}
                        alt=""
                        className="absolute top-0 right-0 inset-0 object-cover w-full h-full rounded cursor-pointer"
                      />
                      <div className="absolute top-0 right-0 m-2 z-20">
                        {audio.is_current_use === 1 && (
                          <span className="rounded-lg bg-red-400 px-2 py-1 text-xs font-medium text-white mr-1">
                            Đang dùng
                          </span>
                        )}
                        <span className="rounded-lg bg-blue-500 px-2 py-1 text-xs font-medium text-white mr-1">
                          .{audio.extension}
                        </span>
                        <span className="rounded-lg bg-emerald-400 px-2 py-1 text-xs font-medium text-white">
                          {convertSize(audio.size)}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 z-20 w-full rounded-b bg-gray-700 bg-opacity-70 px-3 py-2">
                        <h3 className="mb-2 text-sm font-medium text-white">
                          {audio.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="mb-1 text-xs text-white">
                            Người tải lên:{" "}
                            {upperCaseFirstCharacter(audio.user.user_name)}
                          </p>
                          <div className="relative z-40 flex items-center gap-2">
                            <button
                              className="text-orange-600 transition-all duration-300 hover:text-white cursor-pointer"
                              onClick={() =>
                                handleDownload(
                                  audio.audio_url,
                                  audio.name + "." + audio.extension
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faDownload} />
                            </button>
                            {audio.is_current_use === 0 ? (
                              <p
                                className="delete_buttonmodal text-orange-600 transition-all duration-300 hover:text-white cursor-pointer"
                                onClick={() =>
                                  handleDelete(audio.id, audio.audio_url)
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </p>
                            ) : (
                              <p
                                className="text-gray-300 cursor-not-allowed"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

      {audioList.length === 0 ? (
        <Error404 />
      ) : (
        <DeleteModal
          deleteId={deleteId}
          deleteFileUrl={deleteAudioUrl}
          isDelete={childToParent}
          type="audio"
        />
      )}
    </>
  );
};
