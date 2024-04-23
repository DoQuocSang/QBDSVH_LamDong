import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faTrash,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faImage } from "@fortawesome/free-solid-svg-icons";

import { useParams } from "react-router-dom";
import {
  AddOrUpdateText,
  getFileNameFromURL,
} from "../../../components/utils/Utils";

import { isEmptyOrSpaces } from "../../../components/utils/Utils";

import { useDropzone } from "react-dropzone";
import { storage } from "../../../firebase.js";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import PanoramaViewer from "../management-unit/PanoramaViewer";
import SimplePanoramaViewer from "./SimplePanoramaViewer";
import {
  addPanoramaImage,
  deletePanoramaImageById,
  putPanoramaImage,
} from "services/PanoramaImageRepository";
import UploadingGif from "../../../images/loading.gif";
import { getLastSceneId } from "services/SceneRepository";
import HotspotMap from "components/user/vr/HotspotMap";
import { Scene } from "three";
import defaultHotspotMapIcon from "../../../images/default_hotspot_map.png";
import "../../../asset/css/hotspot-map.css";

export default ({
  isOpen,
  onSave,
  onUpdate,
  handleClose,
  action,
  editingScene,
  managementUnitId,
  newSceneIndex,
  map_url,
  hotspotsMap,
}) => {
  const defaultScene = {
    id: 0,
    name: "",
    pitch: 0,
    yaw: 0,
    management_unit_id: parseInt(managementUnitId, 10),
  };

  const defaultHotspotMap = {
    id: 0,
    top: 0,
    left: 0,
    scene_id: 0,
  };

  const defaultPanoramaFile = {
    id: 0,
    name: "",
    file_url: "",
    size: 0,
    user_id: 1,
    upload_date: "2023-06-07T12:00:00Z",
    extension: "",
    scene_id: 0,
    thumbnail_url: "",
    is_current_use: 0,
  };

  const initialState = {
      scene: {
        ...defaultScene,
      },
      panorama_image: defaultPanoramaFile,
      hotspot_map: defaultHotspotMap,
    },
    [sceneData, setSceneData] = useState(initialState);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgressVisible, setUploadProgressVisible] = useState(false);
  const [isPanoramaViewerOpen, setIsPanoramaViewerOpen] = useState(false);
  const [uploadSectionVisible, setUploadSectionVisible] = useState(true);
  const [mainAction, setMainAction] = useState("");
  const [thumbnailUploadFile, setThumbnailUploadFile] = useState(null);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [isThumbnailViewerOpen, setIsThumbnailViewerOpen] = useState(false);
  const [isMapViewerOpen, setIsMapViewerOpen] = useState(false);
  const [loggedInUserID, setLoggedInUserID] = useState(
    parseInt(localStorage.getItem("loggedInUserID"), 10) || 1
  );
  const [newSceneId, setNewSceneId] = useState(0);
  const [inputNumberStep, setInputNumberStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Drop zone (file upload)
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("fileInput");

    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("border-blue-500", "border-2");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("border-blue-500", "border-2");
    });

    // Form chỉnh sửa
    const buttons = document.getElementsByClassName(
      "open_scene_form_buttonmodal"
    );
    const closebutton = document.getElementById("close_scene_buttonmodal");
    const closeSceneSpace = document.getElementById("close_scene_space");
    const cancelSceneButton = document.getElementById(
      "cancel_scene_buttonmodal"
    );

    const modal = document.getElementById("scene_modal");
    Array.from(buttons).forEach((button) => {
      button.addEventListener("click", () => {
        modal.classList.add("scale-100");
      });
    });

    cancelSceneButton.addEventListener("click", () => {
      handleClose();
      ResetUploadFileStates();
      modal.classList.remove("scale-100");
      handleCloseMapViewer();
    });

    closeSceneSpace.addEventListener("click", () => {
      handleClose();
      ResetUploadFileStates();
      modal.classList.remove("scale-100");
      handleCloseMapViewer();
    });

    closebutton.addEventListener("click", () => {
      handleClose();
      ResetUploadFileStates();
      modal.classList.remove("scale-100");
    });

    if (isOpen) {
      modal.classList.add("scale-100");
    }

    // Xử lý logic
    if (action === "add") {
      setMainAction("Thêm");
      setSceneData(initialState);
    }

    if (action === "edit") {
      setMainAction("Cập nhật");
      if (editingScene) {
        setSceneData(editingScene);
      }
    }

    if (newSceneId === 0) {
      getLastSceneId().then((data) => {
        if (data) {
          setNewSceneId(data.last_inserted_id + 1);
        } else setNewSceneId(0);
      });
    }

    setIsSuccess(false);
  }, [isOpen]);

  //validate lỗi bổ trống
  const validateAllInput = () => {
    const validationErrors = {};
    const validationEmpty = {};

    if (sceneData.scene.name.trim() === "") {
      validationErrors.name = "Vui lòng nhập tên khu vực";
    }

    if (sceneData.panorama_image.file_url.trim() === "") {
      validationErrors.file_url = "Vui lòng tải ảnh khu vực";
    }

    if (sceneData.panorama_image.thumbnail_url.trim() === "") {
      validationErrors.thumbnail_url = "Vui lòng tải ảnh minh họa";
    }

    setErrors(validationErrors);
    // Kiểm tra nếu có lỗi
    if (Object.keys(validationErrors).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const ResetUploadFileStates = () => {
    // Panorama
    setUploadProgress(0);
    setUploadedFiles([]);
    setUploadProgressVisible(false);
    setIsPanoramaViewerOpen(false);
    setUploadSectionVisible(true);

    // Thumbnail
    setThumbnailUploadFile(null);
    setIsThumbnailViewerOpen(false);
    setThumbnailUploadProgress(0);

    // Error
    setErrors({});
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    console.log(files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleRemoveAllFiles = () => {
    setUploadedFiles([]);
  };

  function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  const canvasRef = useRef(null);

  const export360Image = async () => {
    setUploadProgressVisible(true);
    setUploadSectionVisible(false);
    // Replace these paths with the paths to your input images
    const imagePaths = uploadedFiles.map((file) => URL.createObjectURL(file));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load images
    const images = await Promise.all(
      imagePaths.map(async (path) => {
        const img = new Image();
        img.src = path;
        await img.decode(); // Ensure the image is fully loaded
        return img;
      })
    );

    // Set canvas size based on the total width of the images
    const totalWidth = images.reduce((acc, img) => acc + img.width, 0);
    canvas.width = totalWidth;
    const minHeight = Math.min(...images.map((img) => img.height));
    canvas.height = minHeight;
    canvas.height = images[0].height;

    // Draw images on the canvas
    let offsetX = 0;
    images.forEach((img) => {
      ctx.drawImage(img, offsetX, 0);
      offsetX += img.width;
    });

    // Convert canvas to data URL
    const panoramaDataURL = canvas.toDataURL("image/jpeg");

    // Create a Blob from the data URL
    const panoramaBlob = await fetch(panoramaDataURL).then((res) => res.blob());

    // File size
    const fileSizeInBytes = panoramaBlob.size;

    // Generate a unique filename
    const uniqueId = uuidv4();
    const normalFileName = `panorama_${uniqueId}`;
    const modifiedFileName = `panorama_${uniqueId}.jpg`;

    // Set the reference path in Firebase Storage
    const storageRef = ref(storage, `panoramas/${modifiedFileName}`);

    // Upload the file and manually track the progress
    const uploadTask = uploadBytesResumable(storageRef, panoramaBlob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      async () => {
        try {
          // Get the download URL after successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          setSceneData((prevData) => ({
            ...prevData,
            panorama_image: {
              ...prevData.panorama_image,
              name: normalFileName,
              file_url: downloadURL,
              size: fileSizeInBytes,
              user_id: loggedInUserID,
              scene_id: newSceneId,
              upload_date: new Date().toISOString(),
              extension: "jpg",
            },
          }));

          handleAddOrUpdateUploadFile({
            name: normalFileName,
            file_url: downloadURL,
            size: fileSizeInBytes,
            user_id: loggedInUserID,
            scene_id: newSceneId,
            upload_date: new Date().toISOString(),
            extension: "jpg",
          });

          // alert("Upload file thành công");
          console.log("Panorama uploaded to Firebase Storage:", downloadURL);

          //   putsceneImage360(id, { setSceneData: downloadURL }).then(
          //     (data) => {
          //       console.log(data);
          //     }
          //   );

          localStorage.setItem("image360url", downloadURL);
        } catch (error) {
          alert("Có lỗi khi upload file");
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  const clearImageFile = () => {
    setIsPanoramaViewerOpen(false);
    setUploadSectionVisible(true);
    setUploadProgressVisible(false);
    setUploadProgress(0);
    // Check if there is a modifiedFileName
    // var ModelName = getFileNameFromURL(sceneData.panorama_image.file_url, "panoramas%2F");
    // if (ModelName) {
    //   // Create a reference to the file in storage
    //   const storageRef = ref(storage, `panoramas/${ModelName}`);
    //   console.log("File hiện tại: " + ModelName);

    //   // Delete the file from storage
    //   deleteObject(storageRef)
    //     .then(() => {
    //       alert("Xóa file thành công");
    //       console.log("File deleted successfully");

    //       // Remove the item from localStorage
    //       // localStorage.removeItem("yourLocalStorageKey");
    //     })
    //     .catch((error) => {
    //       alert("Có lỗi khi xóa file");
    //       console.error("Error deleting file:", error);
    //     });
    // }

    // Clear the uploaded file and reset model_360_url in state
    setUploadedFiles([]);
    setSceneData((prevData) => ({
      ...prevData,
      panorama_image: {
        ...prevData.panorama_image,
        name: "",
        file_url: "",
        size: 0,
        user_id: 1,
        scene_id: 0,
        extension: "",
      },
    }));

    putPanoramaImage(sceneData.panorama_image.id, {
      name: "",
      file_url: "",
      size: 0,
      user_id: loggedInUserID,
      scene_id: 0,
      extension: "",
    }).then((data) => {
      console.log(data);
    });

    if (sceneData.panorama_image.thumbnail_url === "") {
      deletePanoramaImageById(sceneData.panorama_image.id).then((data) => {
        console.log(data);
      });
      setSceneData((prevData) => ({
        ...prevData,
        panorama_image: {
          ...defaultPanoramaFile,
        },
      }));
    }

    // putsceneImage360(id, { setSceneData: "" }).then((data) => {
    //   console.log(data);
    // });

    // localStorage.setItem("image360url", "");
  };

  const handleOpenPanoramaViewer = () => {
    setIsPanoramaViewerOpen(true);
  };

  const handleClosePanoramaViewer = () => {
    setIsPanoramaViewerOpen(false);
  };

  const handleOpenMapViewer = () => {
      setIsMapViewerOpen(true);
  };

  const handleCloseMapViewer = () => {
    setIsMapViewerOpen(false);
  };

  const handleSubmitScene = () => {
    if (validateAllInput() === false) {
      if (action === "add") {
        // Cập nhật lại id (tạm thời) và tăng id lên 1 cho item kế tiếp
        sceneData.scene.id = newSceneId;
        sceneData.hotspot_map.scene_id = newSceneId;
        onSave(sceneData);
        setNewSceneId((prevId) => prevId + 1);
      } else if (action === "edit") {
        onUpdate(sceneData);
      }
      setSceneData(initialState);
      ResetUploadFileStates();
      setIsSuccess(true);
      handleCloseMapViewer();
    }
  };

  const clearThumbnailFile = () => {
    // Clear the uploaded file and reset model_360_url in state
    setThumbnailUploadFile(null);
    setIsThumbnailViewerOpen(false);
    setThumbnailUploadProgress(0);
    setSceneData((prevData) => ({
      ...prevData,
      panorama_image: {
        ...prevData.panorama_image,
        thumbnail_url: "",
      },
    }));

    putPanoramaImage(sceneData.panorama_image.id, {
      thumbnail_url: "",
    }).then((data) => {
      console.log(data);
    });

    if (sceneData.panorama_image.file_url === "") {
      deletePanoramaImageById(sceneData.panorama_image.id).then((data) => {
        console.log(data);
      });
      setSceneData((prevData) => ({
        ...prevData,
        panorama_image: {
          ...defaultPanoramaFile,
        },
      }));
    }
  };

  const handleAddOrUpdateUploadFile = (val) => {
    console.log(val);
    if (sceneData.panorama_image.id === 0) {
      addPanoramaImage(val).then((data) => {
        setSceneData((prevData) => ({
          ...prevData,
          panorama_image: {
            ...prevData.panorama_image,
            id: data.data.id,
          },
        }));
      });
    } else {
      putPanoramaImage(sceneData.panorama_image.id, val).then((data) => {
        console.log(sceneData.panorama_image.id);
      });
    }
  };

  const handleThumbnailFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setThumbnailUploadFile(file);

    if (file) {
      // Xóa tất cả các khoảng trắng trong tên tệp
      const fileNameWithoutSpaces = file.name.replace(/\s/g, "");

      const extension = fileNameWithoutSpaces.split(".").pop(); // Get the file extension
      const uniqueId = uuidv4();
      const modifiedFileName = `${
        fileNameWithoutSpaces.split(".")[0]
      }_${uniqueId}.${extension}`;

      const storageRef = ref(
        storage,
        `panorama_thumbnails/${modifiedFileName}`
      );

      // Upload the file and manually track the progress
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setThumbnailUploadProgress(progress);
        },
        (error) => {
          console.error("Lỗi trong quá trình upload:", error);
        },
        async () => {
          try {
            // Get the download URL after successful upload
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // alert("Upload file thành công");

            handleAddOrUpdateUploadFile({
              user_id: loggedInUserID,
              scene_id: newSceneId,
              thumbnail_url: downloadURL,
              upload_date: new Date().toISOString(),
            });

            // putUploadFile({
            //     scene_id: id,
            //     thumbnail_url: downloadURL
            // }).then(data => {
            //     console.log(data);
            // });

            setSceneData((prevData) => ({
              ...prevData,
              panorama_image: {
                ...prevData.panorama_image,
                user_id: loggedInUserID,
                scene_id: newSceneId,
                thumbnail_url: downloadURL,
                upload_date: new Date().toISOString(),
              },
            }));
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        }
      );
    }
  };

  const handleOpenThumbnailViewer = () => {
    setIsThumbnailViewerOpen(true);
  };

  const handleCloseThumbnailViewer = () => {
    setIsThumbnailViewerOpen(false);
  };

  // Thêm điểm hotspots trên map
  const AddHotspotInMap = (elem, i) => {
    return (
      <div
        key={i}
        style={{
          top: `${elem.hotspot_map.top}%`,
          left: `${elem.hotspot_map.left}%`,
        }}
        className="group w-10 h-10 absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center"
      >
        <img
          src={defaultHotspotMapIcon}
          alt="Hotspot Map"
          class="filter hue-rotate-[160deg] w-full h-full rounded-full border-0 border-red-500 group-hover:border-4 transition-all duration-300"
        />
        <p className="tfilter hue-rotate-[160deg] text-xs font-semibold text-white bg-red-500 px-0 py-0 rounded-full whitespace-nowrap transfrom -translate-x-full transition-all duration-300 w-0 opacity-0 group-hover:opacity-100 group-hover:px-4 overflow-hidden group-hover:overflow-visible group-hover:py-2 group-hover:w-56 group-hover:translate-x-0 group-hover:mx-2">
          {elem.scene.name}
        </p>
      </div>
    );
  };

  return (
    <>
      <div
        id="scene_modal"
        className="py-10 transform scale-0 transition-transform duration-300 min-w-screen h-screen animated fadeIn fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none"
      >
        <div
          id="close_scene_space"
          className="absolute bg-black opacity-50 inset-0 z-0"
        ></div>

        <div className="flex justify-center items-center gap-4 w-full h-screen mx-auto my-4 p-4">
          <div className="bg-white editor max-h-full overflow-auto relative flex w-10/12 max-w-lg flex-col p-6 text-gray-800 shadow-lg rounded-lg">
            <div className="flex items-center justify-between mx-4 mb-4">
              <h2 className="text-xl font-semibold text-red-500 pl-4 border-l-4 border-red-500">
                {mainAction} khu vực
              </h2>
              <button
                id="close_scene_buttonmodal"
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            {Object.keys(errors).length > 0 && (
              <div className="flex items-center mx-4 mb-4 text-red-500 bg-red-100 py-4 px-4 text-sm font-semibold rounded-md">
                <p className="">Vui lòng kiểm tra lại các ô nhập liệu</p>
              </div>
            )}
            {isSuccess && (
              <div className="flex items-center mx-4 mb-4 text-emerald-500 bg-emerald-100 py-4 px-4 text-sm font-semibold rounded-md">
                <p className="">{mainAction} thành công</p>
              </div>
            )}
            <div className="overflow-auto px-4">
              <h2 className="font-semibold text-sm text-teal-500">
                Tên khu vực
              </h2>
              <input
                name="name"
                required
                type="text"
                value={sceneData.scene.name}
                onChange={(e) =>
                  setSceneData((sceneData) => ({
                    ...sceneData,
                    scene: {
                      ...sceneData.scene,
                      name: e.target.value,
                    },
                  }))
                }
                placeholder="Nhập tên khu vực"
                className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
              />
              {errors.name && (
                <p className="text-red-500 mb-6 text-sm font-semibold">
                  <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                  {errors.name}
                </p>
              )}

              <h2 className="font-semibold text-sm text-teal-500">
                Góc nhìn (trục dọc)
              </h2>
              <input
                name="pitch"
                required
                type="number"
                value={sceneData.scene.pitch}
                onChange={(e) =>
                  setSceneData((sceneData) => ({
                    ...sceneData,
                    scene: {
                      ...sceneData.scene,
                      pitch: parseInt(e.target.value, 10),
                    },
                  }))
                }
                placeholder="Nhập giá trị góc nhìn"
                className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
              />

              <h2 className="font-semibold text-sm text-teal-500">
                Góc quay (trục ngang)
              </h2>
              <input
                name="yaw"
                required
                type="number"
                value={sceneData.scene.yaw}
                onChange={(e) =>
                  setSceneData((sceneData) => ({
                    ...sceneData,
                    scene: {
                      ...sceneData.scene,
                      yaw: parseInt(e.target.value, 10),
                    },
                  }))
                }
                placeholder="Nhập giá trị góc quay"
                className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
              />

              <h2 className="font-semibold text-sm text-teal-500">
                Ảnh Thumbnail
              </h2>
              <div className="mb-6 pt-4">
                {/* Hiển thị thông tin file đã tải lên nếu có */}
                <div className="flex justify-center items-center gap-4">
                  {thumbnailUploadFile && (
                    <div className="flex-1 w-full relative mt-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          {thumbnailUploadProgress < 100 ? (
                            <span className="inline-block rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold uppercase text-orange-600">
                              Đang tải lên server
                            </span>
                          ) : (
                            <span className="inline-block rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold uppercase text-white">
                              Đã tải xong
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="inline-block text-sm font-bold text-blue-600">
                            {Math.round(thumbnailUploadProgress)}%
                          </span>
                        </div>
                      </div>
                      <div className="mb-4 flex h-2 overflow-hidden rounded bg-gray-200 text-xs">
                        <style>
                          {`
                        /* WebKit (Safari, Chrome) */
                        ::-webkit-progress-bar {
                        background-color: #E5E7EB; /* Set the background color */
                        border-radius: 4px; /* Optional: Set the border radius */
                        }

                        ::-webkit-progress-value {
                        background-color: #4CAF50; /* Set the progress bar color */
                        border-radius: 4px; /* Optional: Set the border radius */
                        }

                        /* Firefox */
                        ::-moz-progress-bar {
                        background-color: #4CAF50; /* Set the progress bar color */
                        border-radius: 4px; /* Optional: Set the border radius */
                        }
                    `}
                        </style>
                        <progress
                          value={thumbnailUploadProgress}
                          max="100"
                          className="flex flex-col justify-center bg-teal-500 text-white shadow-none w-full"
                        ></progress>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center w-full mb-4">
                  <div className="overflow-hidden relative flex items-center justify-between w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                    <div className="flex-1 w-full h-full">
                      <input
                        type="file"
                        name="thumbnail_file"
                        id="thumbnail_file"
                        className="sr-only"
                        onChange={handleThumbnailFileUpload}
                      />
                      <label
                        for="thumbnail_file"
                        className="flex flex-col items-center justify-center text center pt-5 pb-6 h-full px-10 cursor-pointer"
                      >
                        {thumbnailUploadFile ||
                        (sceneData.panorama_image &&
                          sceneData.panorama_image.thumbnail_url) ? (
                          <>
                            {/* <svg className="w-10 h-10 mb-3 text-emerald-400">
                            <FontAwesomeIcon icon={faCircleCheck} />
                          </svg>
                          <p className="mb-2 text-emerald-400 dark:text-gray-400 font-semibold">
                            <span className="font-semibold"></span> Đã tải lên
                            thumbnail{" "}
                          </p> */}

                            {thumbnailUploadProgress < 100 && (
                              <>
                                <div className="absolute inset-0 w-full h-full bg-[#e5dddb]"></div>
                                <img src={UploadingGif} className="relative" />
                              </>
                            )}

                            {(thumbnailUploadProgress === 100 ||
                              (sceneData.panorama_image &&
                                sceneData.panorama_image.thumbnail_url)) && (
                              <img
                                className="absolute inset-0 w-full h-full  object-cover object-center"
                                src={
                                  sceneData.panorama_image &&
                                  sceneData.panorama_image.thumbnail_url
                                    ? sceneData.panorama_image.thumbnail_url
                                    : thumbnailUploadFile.name
                                }
                              />
                            )}
                          </>
                        ) : (
                          <>
                            <svg className="w-10 h-10 mb-3 text-gray-400">
                              <FontAwesomeIcon icon={faImage} />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click tại đây
                              </span>{" "}
                              để tải lên thumbnail
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              (Các file được phép: jpg, png, jpeg)
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {(thumbnailUploadFile ||
                  (sceneData.panorama_image &&
                    sceneData.panorama_image.thumbnail_url)) && (
                  <div className="mb-5 rounded-lg bg-[#F5F7FB] py-4 pl-8 pr-8 border-l-4 border-purple-400">
                    <div className="flex items-center justify-between">
                      <FontAwesomeIcon
                        icon={faImage}
                        className="text-gray-500 mr-2"
                      />
                      <span className="flex-1 truncate pr-3 text-base font-medium text-[#07074D]">
                        {sceneData.panorama_image.thumbnail_url
                          ? getFileNameFromURL(
                              sceneData.panorama_image.thumbnail_url,
                              "model_thumbnails%2F"
                            )
                          : thumbnailUploadFile.name}
                        {/* modelUploadFile.name */}
                      </span>
                      <button
                        className="text-[#07074D]"
                        onClick={clearThumbnailFile}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {isThumbnailViewerOpen && (
                  <img
                    className="mt-4 flex justify-cent items-center h-auto w-full rounded-md"
                    src={
                      sceneData.panorama_image &&
                      sceneData.panorama_image.thumbnail_url
                        ? sceneData.panorama_image.thumbnail_url
                        : thumbnailUploadFile.name
                    }
                  />
                )}
              </div>
              {errors.thumbnail_url && (
                <p className="text-red-500 mb-6 text-sm font-semibold">
                  <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                  {errors.thumbnail_url}
                </p>
              )}

              <h2 className="font-semibold text-sm text-teal-500">Ảnh 360</h2>
              <div>
                <div
                  className=""
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {!uploadSectionVisible && uploadedFiles.length > 0 && (
                    <h2 className="font-semibold mt-4 text-xs text-gray-500 bg-gray-100 px-4 py-2 border-l-4 border-amber-500">
                      Các ảnh ban đầu
                    </h2>
                  )}
                  <div
                    className={
                      uploadSectionVisible && !sceneData.panorama_image.file_url
                        ? "mt-4 bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                        : "hidden"
                    }
                    id="dropzone"
                  >
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      <span className="text-gray-600">
                        Kéo thả file tại đây
                      </span>
                      <span className="text-gray-500 text-sm">
                        (hoặc click để chọn ảnh)
                      </span>
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      multiple
                      onChange={handleFileInputChange}
                    />
                  </div>

                  <div className="mt-6 text-center" id="fileList">
                    <div className="grid-container grid grid-cols-4 gap-4">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="grid-item relative pt-[100%] overflow-hidden relative flex flex-col items-center text-center bg-gray-100 border rounded"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Image ${index}`}
                            className="absolute inset-0 z-0 w-full h-full object-cover border-4 border-white"
                          />
                          <button
                            className="absolute top-0 z-10 right-0 px-2 py-1 cursor-pointer text-white bg-white rounded"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <FontAwesomeIcon
                              className="text-xs text-gray-500"
                              icon={faTrash}
                            />
                          </button>
                          <div class="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                            <span
                              class="w-full font-bold text-gray-900 truncate"
                              x-text="files[index].name"
                            >
                              {file.name}
                            </span>
                            <span class="text-xs text-gray-900">
                              {formatBytes(file.size)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <>
                      <div className="flex justify-between items-center mb-4 border-t-2 border-gray-100 mt-4 py-2">
                        <span className="font-semibold text-gray-600 text-sm">
                          Tổng số file: {uploadedFiles.length}
                        </span>
                        <div className="flex gap-4 items-center">
                          <button
                            className="btn rounded-md text-xs transition duration-300 bg-teal-500 ease-in-out cursor-pointer hover:bg-teal-600 p-2 px-5 font-semibold text-white"
                            onClick={export360Image}
                          >
                            Tạo ảnh 360
                          </button>
                          <button
                            className="btn rounded-md text-xs transition duration-300 bg-red-500 ease-in-out cursor-pointer hover:bg-red-600 p-2 px-5 font-semibold text-white"
                            onClick={handleRemoveAllFiles}
                          >
                            Xóa tất cả
                          </button>
                        </div>
                      </div>
                      {uploadProgressVisible && (
                        <div className="relative mt-3">
                          {/* <h2 className="font-semibold my-4 text-xs text-gray-500 bg-gray-100 px-4 py-2 border-l-4 border-amber-500">
                                                Upload và tạo ảnh 360
                                            </h2> */}
                          <div className="mb-2 flex items-center justify-between">
                            <div>
                              {uploadProgress < 100 ? (
                                <span className="inline-block rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold uppercase text-orange-600">
                                  Đang tải lên server
                                </span>
                              ) : (
                                <span className="inline-block rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold uppercase text-white">
                                  Đã tải xong
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="inline-block text-sm font-bold text-blue-600">
                                {Math.round(uploadProgress)}%
                              </span>
                            </div>
                          </div>
                          <div className="mb-4 flex h-2 overflow-hidden rounded bg-gray-200 text-xs">
                            <style>
                              {`
                                                /* WebKit (Safari, Chrome) */
                                                ::-webkit-progress-bar {
                                                background-color: #E5E7EB; /* Set the background color */
                                                border-radius: 4px; /* Optional: Set the border radius */
                                                }

                                                ::-webkit-progress-value {
                                                background-color: #4CAF50; /* Set the progress bar color */
                                                border-radius: 4px; /* Optional: Set the border radius */
                                                }

                                                /* Firefox */
                                                ::-moz-progress-bar {
                                                background-color: #4CAF50; /* Set the progress bar color */
                                                border-radius: 4px; /* Optional: Set the border radius */
                                                }
                                            `}
                            </style>
                            <progress
                              value={uploadProgress}
                              max="100"
                              className="flex flex-col justify-center bg-teal-500 text-white shadow-none w-full"
                            ></progress>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {(sceneData.panorama_image.file_url ||
                  !uploadSectionVisible) && (
                  <div className="mb-5 rounded-lg bg-[#F5F7FB] py-4 px-8 border-l-4 border-purple-400">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                        {sceneData.panorama_image.file_url
                          ? getFileNameFromURL(
                              sceneData.panorama_image.file_url,
                              "panoramas%2F"
                            )
                          : "Đang tạo ảnh 360..."}
                      </span>
                      <button
                        className="text-[#07074D]"
                        onClick={clearImageFile}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden"></canvas>

                {sceneData.panorama_image.file_url &&
                  (isPanoramaViewerOpen ? (
                    <button
                      onClick={handleClosePanoramaViewer}
                      className="btn mx-auto text-sm flex justify-center rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500"
                    >
                      Thu gọn
                    </button>
                  ) : (
                    <button
                      onClick={handleOpenPanoramaViewer}
                      className="btn mx-auto mb-4 text-sm flex justify-center rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500"
                    >
                      Xem ảnh 360 hiện tại
                    </button>
                  ))}

                <SimplePanoramaViewer
                  isOpen={isPanoramaViewerOpen}
                  sceneData={sceneData}
                />
                {/* <MyPanorama /> */}
                {/* <PanoramaDemo imagePath={sceneData.panorama_image.file_url} /> */}

                {errors.file_url && (
                  <p className="text-red-500 mb-6 text-sm font-semibold">
                    <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                    {errors.file_url}
                  </p>
                )}
              </div>

              {map_url && (
                <>
                  <div className="flex items-center justify-center mt-8 mb-4">
                    <div className="h-0.5 flex-grow bg-red-500 rounded-full" />
                    <h2 className="px-5 font-semibold text-sm text-red-500 text-center">
                      Vị trí trên bản đồ
                    </h2>
                    <div className="h-0.5 flex-grow bg-red-500 rounded-full" />
                  </div>

                  <h2 className="font-semibold text-sm text-teal-500">
                    Top (tính từ viền trên)
                  </h2>
                  <input
                    name="top"
                    required
                    type="number"
                    min="0"
                    max="100"
                    step={inputNumberStep}
                    value={sceneData.hotspot_map.top}
                    onChange={(e) =>{
                      handleOpenMapViewer();
                      setSceneData((sceneData) => ({
                        ...sceneData,
                        hotspot_map: {
                          ...sceneData.hotspot_map,
                          top: parseFloat(e.target.value),
                        },
                      }))
                    }}
                    placeholder="Nhập giá trị top"
                    className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                  />

                  <h2 className="font-semibold text-sm text-teal-500">
                    Left (tính từ viền trái)
                  </h2>
                  <input
                    name="left"
                    required
                    type="number"
                    min="0"
                    max="100"
                    step={inputNumberStep}
                    value={sceneData.hotspot_map.left}
                    onChange={(e) => {
                      handleOpenMapViewer();
                      setSceneData((sceneData) => ({
                        ...sceneData,
                        hotspot_map: {
                          ...sceneData.hotspot_map,
                          left: parseFloat(e.target.value),
                        },
                      }))
                    }}
                    placeholder="Nhập giá trị left"
                    className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base  transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                  />

                  <h2 className="font-semibold text-sm text-teal-500">
                    Step (mức độ tăng giảm cho input)
                  </h2>
                  <input
                    name="top"
                    required
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={inputNumberStep}
                    onChange={(e) =>
                      setInputNumberStep(parseFloat(e.target.value))
                    }
                    placeholder="Nhập giá trị top"
                    className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                  />

                  {isMapViewerOpen ? (
                    <>
                      <button
                        onClick={handleCloseMapViewer}
                        className="btn mb-4 mx-auto text-sm flex justify-center rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500"
                      >
                        Thu gọn
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleOpenMapViewer}
                      className="btn mx-auto mb-4 text-sm flex justify-center rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500"
                    >
                      Xem bản đồ
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="buttons flex items-center pt-6 px-4">
              <hr className="mt-4" />
              <button
                id="cancel_scene_buttonmodal"
                className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500"
              >
                Hủy
              </button>
              <button
                // id="notification_buttonmodal"
                type="submit"
                onClick={handleSubmitScene}
                className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white"
              >
                {mainAction}
              </button>
            </div>
          </div>

          {isMapViewerOpen && (
            <>
              <div className="relative max-w-3xl flex flex-col gap-4 mx-4 justify-center items-center">
                <button
                  onClick={handleCloseMapViewer}
                  className="btn absolute z-[100] top-4 right-4 flex justify-center transition duration-300 ease-in-out cursor-pointer hover:text-white text-gray-500"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
                </button>
                <img
                  className="w-full h-auto rounded-lg"
                  src={map_url}
                  alt="map"
                />
                {hotspotsMap.length > 0 &&
                  Object.values(hotspotsMap).map((elem, i) =>
                    AddHotspotInMap(elem, i)
                  )}
                {sceneData.hotspot_map && (
                  <div
                    style={{
                      top: `${sceneData.hotspot_map.top}%`,
                      left: `${sceneData.hotspot_map.left}%`,
                    }}
                    className="group w-10 h-10 absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center transition-all ease-out"
                  >
                    <div className="group-hover:hidden circle-animate w-full h-full border-4 border-red-500 rounded-full top-0 left-0 absolute transform -translate-x-1/2 -translate-y-1/2"/>
                    <img
                      src={defaultHotspotMapIcon}
                      alt="Hotspot Map"
                      class="w-full h-full rounded-full border-0 border-red-500 group-hover:border-4 transition-all duration-300"
                    />
                    <p className="text-xs font-semibold text-white bg-red-500 px-0 py-0 rounded-full whitespace-nowrap transfrom -translate-x-full transition-all duration-300 w-0 opacity-0 group-hover:opacity-100 group-hover:px-4 overflow-hidden group-hover:overflow-visible group-hover:py-2 group-hover:w-56 group-hover:translate-x-0 group-hover:mx-2">
                      {sceneData.scene.name}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
