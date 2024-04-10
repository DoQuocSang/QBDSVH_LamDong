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
  getManagementUnitById,
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
  };

  const defaultScenes =[
    // {
    //   id: 0,
    //   name: "",
    //   image_url: "",
    //   pitch: 0,
    //   yaw: 0,
    // }
  ]; 

  const initialState = {
      managementUnit: {
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
  localStorage.setItem(
    "image360url",
    managementUnitData.managementUnit.image_360_url
  );

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
      managementUnitData.managementUnit.image_360_url === "" ||
      managementUnitData.managementUnit.image_360_url === null
    ) {
      setUploadSectionVisible(true);
      console.log(uploadSectionVisible);
    }

    if (id !== 0) {
      getManagementUnitById(id).then((data) => {
        if (data)
          setManagementUnitData((managementUnitData) => ({
            ...managementUnitData,
            managementUnit: {
              ...data,
            },
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

    if (managementUnitData.managementUnit.name.trim() === "") {
      validationErrors.name = "Vui lòng nhập tên đơn vị quản lý";
    }

    if (managementUnitData.managementUnit.urlslug.trim() === "") {
      validationErrors.urlslug = "Slug chưa được tạo";
    }

    // if (managementUnitData.managementUnit.image_url.trim() === '') {
    //     validationErrors.image_url = 'Vui lòng nhập link ảnh';
    // }

    if (managementUnitData.managementUnit.address.trim() === "") {
      validationErrors.address = "Vui lòng nhập địa chỉ";
    }

    // if (managementUnitData.managementUnit.note.trim() === '') {
    //     validationErrors.note = 'Vui lòng nhập ghi chú';
    // }

    if (managementUnitData.managementUnit.short_description.trim() === "") {
      validationErrors.short_description = "Vui lòng nhập mô tả ngắn";
    }

    if (managementUnitData.managementUnit.description.trim() === "") {
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
    // Nếu không có lỗi mới xóa hoặc cập nhật
    if (validateAllInput() === false) {
      if (id === 0) {
        addManagementUnit(managementUnitData.managementUnit).then((data) => {
          SetSuccessFlag(data);
          //console.log(data);
        });
      } else {
        putManagementUnit(id, managementUnitData.managementUnit).then(
          (data) => {
            SetSuccessFlag(data);
            //console.log(data);
          }
        );
      }
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
    setCurrentScene(managementUnitData.scenes[index])
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
  

  const handleDeleteSceneByIndex = (index) => {
    setManagementUnitData((prevState) => {
      const updatedScenes = [...prevState.scenes];
      updatedScenes.splice(index, 1);
      return {
        ...prevState,
        scenes: updatedScenes,
      };
    });
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
            value={managementUnitData.managementUnit.name || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                managementUnit: {
                  ...managementUnitData.managementUnit,
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
            value={managementUnitData.managementUnit.urlslug || ""}
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
            value={managementUnitData.managementUnit.address || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                managementUnit: {
                  ...managementUnitData.managementUnit,
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
            value={managementUnitData.managementUnit.short_description || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                managementUnit: {
                  ...managementUnitData.managementUnit,
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
            value={managementUnitData.managementUnit.description || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                managementUnit: {
                  ...managementUnitData.managementUnit,
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
            value={managementUnitData.managementUnit.note || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                managementUnit: {
                  ...managementUnitData.managementUnit,
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
            value={managementUnitData.managementUnit.image_url || ""}
            onChange={(e) =>
              setManagementUnitData((managementUnitData) => ({
                ...managementUnitData,
                managementUnit: {
                  ...managementUnitData.managementUnit,
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

          {!isEmptyOrSpaces(managementUnitData.managementUnit.image_url) && (
            <>
              <p className="text-gray-600 mb-4 text-center text-sm">
                Ảnh hiện tại
              </p>
              <img
                src={managementUnitData.managementUnit.image_url}
                className="w-full h-auto mb-6 rounded-lg"
              />
            </>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Khu vực</h2>

          {JSON.stringify(managementUnitData)}

          <div className="mt-4 mb-6">
            <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
            {managementUnitData.scenes.map((item, index) => (
              <div 
                key={index}
                className="relative flex flex-col rounded shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm">
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
                      src={item.panorama_image.thumbnail_url ? item.panorama_image.thumbnail_url : ThumbnailDefault}
                      alt=""
                      className="absolute top-0 right-0 inset-0 z-10 object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="bg-white px-4 py-2">
                  <h3 className="text-sm mb-1 font-semibold text-teal-500 cursor-pointer line-clamp-1">
                    {item.scene.name ? item.scene.name : "Không có tên"}
                  </h3>
                  <div className="flex justify-between items-center pb-2">
                    {/* <p className="text-xs text-gray-600">Số hotspot: {item.scene.scene_index} {item.scene.management_unit_id}</p> */}
                    <p className="text-xs text-gray-600">{item.hotspots ? `Số hotspot: ${item.hotspots.length}` : "Chưa có hotspot"}</p>

                    <div className="relative z-40 flex items-center gap-2 text-sm">
                      <button 
                       onClick={() => {
                        handleOpenEditSceneForm(index);
                      }}
                      className="text-gray-500 transition-all duration-300 hover:text-amber-500 cursor-pointer">
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSceneByIndex(index)}
                        className="text-gray-500 transition-all duration-300 hover:text-amber-500 cursor-pointer">
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
          />

          {/* --------------------------------------------------------------------------------------------------------- */}

          {managementUnitData.managementUnit.image_360_url &&
            isPanoramaViewerOpen && (
              <h2 className="font-semibold text-sm text-teal-500">
                Thêm/Sửa Hotspot
              </h2>
            )}

          <div>
            {/* <canvas ref={canvasRef} className="hidden"></canvas> */}
            
            <PanoramaViewer
              title={managementUnitData.managementUnit.name}
              isOpen={isPanoramaViewerOpen}
              image360Url={managementUnitData.managementUnit.image_360_url}
              scene={currentScene}
              scenes={managementUnitData.scenes}
              onChange={handleUpdateHotspotScene}
              isBackToMainScene={isBackToMainScene}
              // sceneIndexToUpdate={editingIndex}
            />

            {managementUnitData.managementUnit.image_360_url &&
              isPanoramaViewerOpen && (
                <button
                  onClick={handleClosePanoramaViewer}
                  className="btn mx-auto text-sm flex justify-center rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500"
                >
                  Thu gọn
                </button>
              )}
            {/* <MyPanorama /> */}
            {/* <PanoramaDemo imagePath={managementUnitData.managementUnit.image_360_url} /> */}
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
          />
        </div>
      </div>
    </main>
  );
};
