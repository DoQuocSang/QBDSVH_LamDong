import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Book1 from "images/book1.png";
import Book2 from "images/book2.jpg";
import Book3 from "images/book3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faCircleNotch,
  faMapLocationDot,
  faPenToSquare,
  faPencil,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import {
  AddOrUpdateText,
  getFileNameFromURL,
} from "../../../components/utils/Utils";
import { generateSlug } from "../../../components/utils/Utils";
import {
  addManagementUnitAndSceneData,
  getFullInfoOfManagementUnitById,
  getManagementUnitById,
  putManagementUnitAndSceneData,
  putManagementUnitImage360,
} from "../../../services/ManagementUnitRepository";

import { addManagementUnit } from "../../../services/ManagementUnitRepository";
import { putManagementUnit } from "../../../services/ManagementUnitRepository";
import NotificationModal from "../../../components/admin/modal/NotificationModal";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";

import { useDropzone } from "react-dropzone";
import { storage } from "../../../firebase.js";
import { v4 as uuidv4 } from "uuid";
import img1 from "../../../images/book1.png";
import img2 from "../../../images/book2.jpg";
import img3 from "../../../images/book3.jpg";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import PanoramaViewer from "./PanoramaViewer";
import HotspotSidebar from "../hotspot/AllHotspot";
import AllHotspot from "../hotspot/AllHotspot";
import ThumbnailDefault from "../../../images/post-default-full.png";
import AddOrUpdateScene from "../scene/AddOrUpdateScene";
import { getLastPanoramaImageId } from "services/PanoramaImageRepository";
import UploadingGif from "../../../images/loading.gif";
import defaultHotspotMapIcon from "../../../images/default_hotspot_map.png";
import "../../../asset/css/hotspot-map.css";

export default ({ type = "" }) => {
  document.title = "Thêm/Cập nhật đơn vị quản lý";

  let mainText = AddOrUpdateText(type, "đơn vị quản lý");
  const defaultManagementUnit = {
    id: 0,
    name: "",
    urlslug: "",
    image_url: "",
    image_360_url: "",
    note: "",
    address: "",
    description: "",
    short_description: "",
    map_url: "",
  };

  const defaultScenes = [
    // {
    //   id: 0,
    //   name: "",
    //   image_url: "",
    //   pitch: 0,
    //   yaw: 0,
    // }
  ];

  const initialState = {
      management_unit: {
        ...defaultManagementUnit,
      },
      scenes: defaultScenes,
    },
    [managementUnitData, setManagementUnitData] = useState(initialState);

  const [successFlag, SetSuccessFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgressVisible, setUploadProgressVisible] = useState(false);
  const [isPanoramaViewerOpen, setIsPanoramaViewerOpen] = useState(false);
  const [isOpenSceneForm, setIsOpenSceneForm] = useState(false);
  const [uploadSectionVisible, setUploadSectionVisible] = useState(false);
  const [currentScene, setCurrentScene] = useState(null);
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [editingScene, setEditingScene] = useState(null);
  const [editingIndex, setEditingIndex] = useState(0);
  const [sceneAction, setSceneAction] = useState("add");
  const [sceneIndexToUpdate, setSceneIndexToUpdate] = useState(0);
  const [isBackToMainScene, setIsBackToMainScene] = useState(false);
  const [mapUploadFile, setMapUploadFile] = useState(null);
  const [mapUploadProgress, setMapUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // sessionStorage.setItem(
  //   "image360url",
  //   managementUnitData.management_unit.image_360_url
  // );

  let { id } = useParams();
  id = id ?? 0;
  //console.log(id);

  let maintAction = "";
  if (id === 0) {
    maintAction = "thêm";
  } else {
    maintAction = "cập nhật";
  }

  useEffect(() => {
    document.title = "Thêm/ cập nhật đơn vị quản lý";

    if (
      managementUnitData.management_unit.image_360_url === "" ||
      managementUnitData.management_unit.image_360_url === null
    ) {
      setUploadSectionVisible(true);
      console.log(uploadSectionVisible);
    }

    if (id !== 0) {
      getFullInfoOfManagementUnitById(id).then((data) => {
        if (data)
          setManagementUnitData((prevState) => ({
            ...prevState,
            management_unit: {
              ...prevState.management_unit,
              ...data.management_unit,
            },
            scenes: data.scenes !== null ? data.scenes : [],
          }));
        else setManagementUnitData(initialState);
        console.log(data);
      });
    }
  }, []);

  //validate lỗi bổ trống
  const validateAllInput = () => {
    const validationErrors = {};
    const validationEmpty = {};

    if (managementUnitData.management_unit.name.trim() === "") {
      validationErrors.name = "Vui lòng nhập tên đơn vị quản lý";
    }

    if (managementUnitData.management_unit.urlslug.trim() === "") {
      validationErrors.urlslug = "Slug chưa được tạo";
    }

    // if (managementUnitData.management_unit.image_url.trim() === '') {
    //     validationErrors.image_url = 'Vui lòng nhập link ảnh';
    // }

    if (managementUnitData.management_unit.address.trim() === "") {
      validationErrors.address = "Vui lòng nhập địa chỉ";
    }

    // if (managementUnitData.management_unit.note.trim() === '') {
    //     validationErrors.note = 'Vui lòng nhập ghi chú';
    // }

    if (managementUnitData.management_unit.short_description.trim() === "") {
      validationErrors.short_description = "Vui lòng nhập mô tả ngắn";
    }

    if (managementUnitData.management_unit.description.trim() === "") {
      validationErrors.description = "Vui lòng nhập mô tả chi tiết";
    }

    setErrors(validationErrors);
    // Kiểm tra nếu có lỗi
    if (Object.keys(validationErrors).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    console.log(managementUnitData);
    setIsLoading(true);

    // Nếu không có lỗi mới xóa hoặc cập nhật
    if (validateAllInput() === false) {
      if (id === 0) {
        addManagementUnitAndSceneData(managementUnitData).then((data) => {
          SetSuccessFlag(data);
          setIsLoading(false);
        });
      } else {
        putManagementUnitAndSceneData(id, managementUnitData).then((data) => {
          SetSuccessFlag(data);
          setIsLoading(false);
          //console.log(data);
        });
      }
    } else {
      setIsLoading(false);
    }
  };

  //Xử lý khi bấm xóa bên component con NotificationModal
  const childToParent = (isContinue) => {
    if (isContinue === true && id === 0) {
      setManagementUnitData(initialState);
      // Reset flag sau khi thêm thành công
      setTimeout(() => {
        SetSuccessFlag(false);
      }, 1000);
    }
  };

  const canvasRef = useRef(null);

  const handleOpenPanoramaViewer = (index) => {
    setCurrentScene(managementUnitData.scenes[index]);
    setIsPanoramaViewerOpen(true);
    setEditingIndex(index);
    setIsBackToMainScene(true);
  };

  const handleClosePanoramaViewer = () => {
    setIsPanoramaViewerOpen(false);
    setIsBackToMainScene(false);
  };

  const handleOpenAddSceneForm = () => {
    setSceneAction("add");
    setIsOpenSceneForm(true);

    // Tắt view hiện tại
    setIsPanoramaViewerOpen(false);
  };

  const handleOpenEditSceneForm = (index) => {
    setSceneAction("edit");
    setEditingIndex(index);
    const editingScene = managementUnitData.scenes[index];
    setEditingScene(editingScene);
    setIsOpenSceneForm(true);

    // Tắt view hiện tại
    setIsPanoramaViewerOpen(false);
  };

  const handleCloseAddSceneForm = () => {
    setIsOpenSceneForm(false);
  };

  const handleAddScene = (newScene) => {
    setManagementUnitData((prevState) => ({
      ...prevState,
      scenes: [
        ...prevState.scenes,
        {
          ...newScene,
        },
      ],
    }));
  };

  const handleUpdateScene = (updatedScene) => {
    const updatedScenes = managementUnitData.scenes.map((scene, index) =>
      index === editingIndex ? updatedScene : scene
    );
    setManagementUnitData((prevState) => ({
      ...prevState,
      scenes: updatedScenes,
    }));

    // alert(editingIndex)
    // alert(updatedScene.hotspots ? updatedScene.hotspots.length : "ko co" )
  };

  const handleUpdateHotspotScene = (updatedScene) => {
    // Check if updatedScene is different from currentScene
    if (updatedScene !== currentScene) {
      const updatedScenes = managementUnitData.scenes.map((scene, index) =>
        scene.scene.id === updatedScene.scene.id ? updatedScene : scene
      );
      setManagementUnitData((prevState) => ({
        ...prevState,
        scenes: updatedScenes,
      }));

      // alert(editingIndex)
      // alert(updatedScene.hotspots ? updatedScene.hotspots.length : "ko co" )
      setCurrentScene(updatedScene);
    }
  };

  const handleChangeCurrentScene = (updatedScene) => {
    setCurrentScene(updatedScene);
  };

  const handleDeleteSceneByIndex = (index) => {
    setManagementUnitData((prevState) => {
      const updatedScenes = [...prevState.scenes];
      updatedScenes.splice(index, 1);
      return {
        ...prevState,
        scenes: updatedScenes,
      };
    });

    // Tắt view hiện tại
    setIsPanoramaViewerOpen(false);
  };

  //  const updateManagementUnitData = (updatedData) => {
  //   const updatedScene = managementUnitData.scenes.map((scene, index) =>
  //     index === editingIndex ? updatedData : scene
  //   );
  //   setManagementUnitData((prevState) => ({
  //     ...prevState,
  //     scenes: updatedScene,
  //   }));
  // };

  const clearMapFile = () => {
    // Clear the uploaded file and reset model_360_url in state
    setMapUploadFile(null);
    setMapUploadProgress(0);
    setManagementUnitData((managementUnitData) => ({
      ...managementUnitData,
      management_unit: {
        ...managementUnitData.management_unit,
        map_url: "",
      },
    }));
  };

  const handleMapUploadFile = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setMapUploadFile(file);

    if (file) {
      // Xóa tất cả các khoảng trắng trong tên tệp
      const fileNameWithoutSpaces = file.name.replace(/\s/g, "");

      const extension = fileNameWithoutSpaces.split(".").pop(); // Get the file extension
      const uniqueId = uuidv4();
      const modifiedFileName = `${
        fileNameWithoutSpaces.split(".")[0]
      }_${uniqueId}.${extension}`;

      const storageRef = ref(storage, `maps/${modifiedFileName}`);

      // Upload the file and manually track the progress
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setMapUploadProgress(progress);
        },
        (error) => {
          console.error("Lỗi trong quá trình upload:", error);
        },
        async () => {
          try {
            // Get the download URL after successful upload
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // alert("Upload file thành công");

            setManagementUnitData((managementUnitData) => ({
              ...managementUnitData,
              management_unit: {
                ...managementUnitData.management_unit,
                map_url: downloadURL,
              },
            }));
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        }
      );
    }
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
          class="w-full h-full rounded-full border-0 border-red-500 group-hover:border-4 transition-all duration-300"
        />
        <p className="text-xs font-semibold text-white bg-red-500 px-0 py-0 rounded-full whitespace-nowrap transfrom -translate-x-full transition-all duration-300 w-0 opacity-0 group-hover:opacity-100 group-hover:px-4 overflow-hidden group-hover:overflow-visible group-hover:py-2 group-hover:w-56 group-hover:translate-x-0 group-hover:mx-2">
          {elem.scene.name}
        </p>
      </div>
    );
  };

  const FilterScenesForLoađEitHotspotsMap = (scenes) => {
    // Nếu không có editingScene hoặc sceneAction không phải 'edit', trả về scenes nguyên thủy
    if (!editingScene || sceneAction !== "edit") {
      return scenes;
    }

    // Nếu có editingScene và sceneAction là 'edit', lọc scenes để loại bỏ scene đang được chỉnh sửa
    return scenes.filter((scene) => scene.scene.id !== editingScene.scene.id);
  };

  return (
    <main>
      <div className="mt-12 px-4">
        <div className="bg-white editor mx-auto flex w-10/12 max-w-2xl flex-col p-6 text-gray-800 shadow-lg mb-12 rounded-lg border-t-4 border-purple-400">
          <div className="flex mb-4 items-center space-x-5">
            <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
              i
            </div>
            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 className="leading-relaxed">{mainText.headingText}</h2>
              <p className="text-sm text-gray-500 font-normal leading-relaxed">
                Vui lòng điền vào các ô bên dưới
              </p>
            </div>
          </div>
          <h2 className="font-semibold text-sm text-teal-500">
            Tên đơn vị quản lý
          </h2>
          <input
            name="name"
            required
            type="text"
            value={managementUnitData.management_unit.name || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                management_unit: {
                  ...managementUnitData.management_unit,
                  name: e.target.value,
                  urlslug: generateSlug(e.target.value),
                },
              }))
            }
            placeholder="Nhập tên di sản"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />
          {errors.name && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {errors.name}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">UrlSlug</h2>
          <input
            name="urlslug"
            required
            type="text"
            value={managementUnitData.management_unit.urlslug || ""}
            // onChange={e => setHeritage({
            //     ...heritage,
            //     UrlSlug: e.target.value
            // })}
            placeholder="Nhập định danh slug"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />
          {errors.urlslug && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {errors.urlslug}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Địa chỉ</h2>
          <input
            name="address"
            required
            type="text"
            value={managementUnitData.management_unit.address || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                management_unit: {
                  ...managementUnitData.management_unit,
                  address: e.target.value,
                },
              }))
            }
            placeholder="Nhập địa chỉ"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />
          {errors.address && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {errors.address}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Mô tả ngắn</h2>
          <textarea
            name="short_description"
            required
            type="text"
            value={managementUnitData.management_unit.short_description || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                management_unit: {
                  ...managementUnitData.management_unit,
                  short_description: e.target.value,
                },
              }))
            }
            placeholder="Nhập mô tả ngắn"
            className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
            spellcheck="false"
          ></textarea>
          {errors.short_description && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {errors.short_description}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">
            Mô tả chi tiết
          </h2>
          <textarea
            name="description"
            required
            type="text"
            value={managementUnitData.management_unit.description || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                management_unit: {
                  ...managementUnitData.management_unit,
                  description: e.target.value,
                },
              }))
            }
            placeholder="Nhập mô tả chi tiết"
            className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
            spellcheck="false"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {errors.description}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Ghi chú</h2>
          <input
            name="note"
            required
            type="text"
            value={managementUnitData.management_unit.note || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                management_unit: {
                  ...managementUnitData.management_unit,
                  note: e.target.value,
                },
              }))
            }
            placeholder="Nhập ghi chú"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />
          {/* {errors.note &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
                            {errors.note}
                        </p>
                    } */}

          <h2 className="font-semibold text-sm text-teal-500">Hình ảnh</h2>
          <input
            name="image_url"
            required
            type="text"
            value={managementUnitData.management_unit.image_url || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                management_unit: {
                  ...managementUnitData.management_unit,
                  image_url: e.target.value,
                },
              }))
            }
            placeholder="Nhập link ảnh"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />
          {/* {errors.image_url &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.image_url}
                        </p>
                    } */}

          {!isEmptyOrSpaces(managementUnitData.management_unit.image_url) && (
            <>
              <p className="text-gray-600 mb-4 text-center text-sm">
                Ảnh hiện tại
              </p>
              <img
                src={managementUnitData.management_unit.image_url}
                className="w-full h-auto mb-6 rounded-lg"
              />
            </>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Bản đồ</h2>
          <div className="mb-6 pt-4">
            {/* Hiển thị thông tin file đã tải lên nếu có */}
            <div className="flex justify-center items-center gap-4">
              {mapUploadFile && (
                <div className="flex-1 w-full relative mt-0">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      {mapUploadProgress < 100 ? (
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
                        {Math.round(mapUploadProgress)}%
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
                      value={mapUploadProgress}
                      max="100"
                      className="flex flex-col justify-center bg-teal-500 text-white shadow-none w-full"
                    ></progress>
                  </div>
                </div>
              )}
            </div>

            {mapUploadFile || managementUnitData.management_unit.map_url ? (
              <>
                {(mapUploadProgress === 100 ||
                  managementUnitData.management_unit.map_url) && (
                  <div className="relative w-full mb-4 flex flex-col gap-4 justify-center items-center">
                    <img
                      className="w-full h-auto rounded-lg"
                      src={
                        managementUnitData.management_unit.map_url
                          ? managementUnitData.management_unit.map_url
                          : mapUploadFile.name
                      }
                    />
                    {managementUnitData.scenes &&
                      Object.values(managementUnitData.scenes).map((elem, i) =>
                        AddHotspotInMap(elem, i)
                      )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full mb-4">
                <div className="overflow-hidden relative flex items-center justify-between w-full min-h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                  <div className="flex-1 w-full h-auto">
                    <input
                      type="file"
                      name="map_file"
                      id="map_file"
                      className="sr-only"
                      onChange={handleMapUploadFile}
                    />
                    <label
                      for="map_file"
                      className="flex flex-col items-center justify-center text center cursor-pointer"
                    >
                      <svg className="w-10 h-10 mb-3 text-gray-400">
                        <FontAwesomeIcon icon={faMapLocationDot} />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click tại đây</span> để
                        tải lên bản đồ
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        (Các file được phép: jpg, png, jpeg)
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {(mapUploadFile || managementUnitData.management_unit.map_url) && (
              <div className="rounded-lg bg-[#F5F7FB] py-4 pl-8 pr-8 border-l-4 border-purple-400">
                <div className="flex items-center justify-between">
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className="text-gray-500 mr-2"
                  />
                  <span className="flex-1 truncate pr-3 text-base font-medium text-[#07074D]">
                    {managementUnitData.management_unit.map_url
                      ? getFileNameFromURL(
                          managementUnitData.management_unit.map_url,
                          "maps%2F"
                        )
                      : mapUploadFile.name}
                    {/* modelUploadFile.name */}
                  </span>
                  <button className="text-[#07074D]" onClick={clearMapFile}>
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
          </div>
          {errors.map_url && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {errors.map_url}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Khu vực</h2>

          {/* {JSON.stringify(managementUnitData.scenes)} */}

          <div className="mt-4 mb-6">
            <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
              {managementUnitData.scenes.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col rounded shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm"
                >
                  <div className="h-auto overflow-hidden">
                    <div
                      onClick={() => {
                        handleOpenPanoramaViewer(index);
                      }}
                      className="group relative pb-[50%] cursor-pointer"
                    >
                      <div className="absolute top-0 right-0 inset-0 z-20 p-5 flex flex-col justify-center items-center w-full h-full rounded">
                        <div className="absolute top-0 right-0 inset-0 bg-amber-500 w-full h-full rounded opacity-0 transition-all duration-300 group-hover:opacity-75"></div>
                        <span className="relative text-white text-sm font-semibold mb-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                          Thêm/Sửa Hotspot
                        </span>
                      </div>
                      <img
                        src={
                          item.panorama_image.thumbnail_url
                            ? item.panorama_image.thumbnail_url
                            : ThumbnailDefault
                        }
                        alt=""
                        className="absolute top-0 right-0 inset-0 z-10 object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="bg-white px-4 py-2">
                    <h3 className="text-sm mb-1 font-semibold text-teal-500 cursor-pointer line-clamp-1">
                      {item.scene.name ? item.scene.name : "Không có tên"}
                    </h3>
                    <div className="flex justify-between items-center pb-1">
                      {/* <p className="text-xs text-gray-600">Số hotspot: {item.scene.scene_index} {item.scene.management_unit_id}</p> */}
                      <p className="text-xs text-gray-600">
                        {item.hotspots
                          ? `Số hotspot: ${item.hotspots.length}`
                          : "Chưa có hotspot"}
                      </p>

                      <div className="relative z-40 flex items-center gap-2 text-sm">
                        <button
                          onClick={() => {
                            handleOpenEditSceneForm(index);
                          }}
                          className="text-gray-500 transition-all duration-300 hover:text-amber-500 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button
                          onClick={() => handleDeleteSceneByIndex(index)}
                          className="text-gray-500 transition-all duration-300 hover:text-amber-500 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div
                onClick={() => {
                  handleOpenAddSceneForm();
                }}
                className="open_scene_form_buttonmodal flex flex-col overflow-hidden rounded p-2 group shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <div className="w-full h-full p-4 rounded flex flex-col justify-center items-center bg-gray-100 group-hover:bg-gray-200  transition-all duration-300 ">
                  <svg
                    className="w-10 h-10 text-gray-400"
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
                  <span className="text-gray-500 text-sm font-semibold mb-1">
                    Thêm khu vực
                  </span>
                  <span className="text-gray-500 text-xs text-center">
                    (Bấm vào đây để thêm khu vực)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <AddOrUpdateScene
            isOpen={isOpenSceneForm}
            onSave={handleAddScene}
            onUpdate={handleUpdateScene}
            handleClose={handleCloseAddSceneForm}
            action={sceneAction}
            editingScene={editingScene}
            editingIndex={editingIndex}
            managementUnitId={id}
            newSceneIndex={managementUnitData.scenes.length}
            map_url={managementUnitData.management_unit.map_url}
            hotspotsMap={FilterScenesForLoađEitHotspotsMap(
              managementUnitData.scenes
            )}
          />

          {/* --------------------------------------------------------------------------------------------------------- */}

          {managementUnitData.management_unit.image_360_url &&
            isPanoramaViewerOpen && (
              <h2 className="font-semibold text-sm text-teal-500">
                Thêm/Sửa Hotspot
              </h2>
            )}

          <div>
            {/* <canvas ref={canvasRef} className="hidden"></canvas> */}

            <PanoramaViewer
              title={managementUnitData.management_unit.name}
              isOpen={isPanoramaViewerOpen}
              image360Url={managementUnitData.management_unit.image_360_url}
              scene={currentScene}
              scenes={managementUnitData.scenes}
              onChange={handleUpdateHotspotScene}
              onClickMoveScene={handleChangeCurrentScene}
              isBackToMainScene={isBackToMainScene}
              // sceneIndexToUpdate={editingIndex}
            />

            {currentScene &&
              currentScene.panorama_image &&
              currentScene.panorama_image.file_url &&
              isPanoramaViewerOpen && (
                <button
                  onClick={handleClosePanoramaViewer}
                  className="btn mx-auto text-sm flex justify-center rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500"
                >
                  Thu gọn
                </button>
              )}
            {/* <MyPanorama /> */}
            {/* <PanoramaDemo imagePath={managementUnitData.management_unit.image_360_url} /> */}
          </div>

          <div className="buttons flex mt-4">
            <hr className="mt-4" />
            <Link
              to="/admin/dashboard/all-management-unit"
              className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500"
            >
              Hủy
            </Link>
            <button
              id="notification_buttonmodal"
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
              className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white"
            >
              {mainText.buttonText}
            </button>
          </div>

          <NotificationModal
            mainAction={maintAction}
            isSuccess={successFlag}
            isContinue={childToParent}
            type="management-unit"
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};
