import { faCube, faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import CatNull from "images/cat-hotspot-null.png";
import { isEmptyOrSpaces } from "components/utils/Utils";
import { getHeritagesForCombobox } from "services/HeritageRepository";

export default ({
  Hotspots = [],
  updateItem,
  onDelete,
  addHospotInfo,
  closeEditHospotOverlay,
  newHotspotNeedAddInfo,
  scenes,
}) => {
  const [tempValue, setTempValue] = useState(0);
  const [heritageList, setHeritageList] = useState([]);
  const [HotspotList, setHotspotList] = useState([]);

  const initialState = {
      name: "",
      type: 0,
      pitch: 0,
      yaw: 0,
      name_model: "New Hotspot",
      model_url: "",
      css_class: "hotSpotElement",
      model_id: 0,
      scene_id: 0,
      move_scene_id: 0,
    },
    [currentHotspot, setCurrentHotspot] = useState(initialState);

  function openEditHotspotForm(hotSpot, index) {
    const editHotspot = document.getElementById("edit_hotspot");
    editHotspot.classList.remove("translate-y-full");
    editHotspot.classList.add("my-10");
    setTempValue(hotSpot.id);
    // console.log(hotSpot);
    setCurrentHotspot(hotSpot);
    // alert(hotSpot.id)
  }

  useEffect(() => {
    setHotspotList(Hotspots);
    const button = document.getElementById("hotspot_buttonmodal");
    const closebutton = document.getElementById("close_button");
    const closeEditHotspotButton = document.getElementById(
      "close_edit_hotspot_button"
    );
    const modal = document.getElementById("hotspot_modal");
    const modalSidebar = document.getElementById("hotspot_sidebar");
    const editHotspot = document.getElementById("edit_hotspot");

    const modalBackground = document.getElementById("modal_background");
    const closeModalSpace = document.getElementById("close_modal_space");

    if (addHospotInfo) {
      modal.classList.remove("hidden");

      setCurrentHotspot(newHotspotNeedAddInfo);

      setTempValue(newHotspotNeedAddInfo.id);

      setTimeout(() => {
        modalBackground.classList.remove("bg-opacity-0");
        modalBackground.classList.add("bg-opacity-50");
      }, 100);

      setTimeout(() => {
        modalSidebar.classList.remove("translate-x-full");
        modalSidebar.classList.add("translate-x-0");

        editHotspot.classList.remove("translate-y-full");
        editHotspot.classList.add("my-10");
      }, 200);
    }

    button.addEventListener("click", () => {
      modal.classList.remove("hidden");

      setTimeout(() => {
        modalBackground.classList.remove("bg-opacity-0");
        modalBackground.classList.add("bg-opacity-50");
      }, 100);

      setTimeout(() => {
        modalSidebar.classList.remove("translate-x-full");
        modalSidebar.classList.add("translate-x-0");
      }, 200);
    });

    closebutton.addEventListener("click", () => {
      closeEditHospotOverlay();
      setTimeout(() => {
        modalSidebar.classList.add("translate-x-full");
        modalSidebar.classList.remove("translate-x-0");

        editHotspot.classList.remove("my-10");
        editHotspot.classList.add("translate-y-full");
      }, 200);

      setTimeout(() => {
        modalBackground.classList.add("bg-opacity-0");
        modalBackground.classList.remove("bg-opacity-50");

        modal.classList.add("hidden");
      }, 300);
    });

    closeModalSpace.addEventListener("click", () => {
      closeEditHospotOverlay();
      setTimeout(() => {
        modalSidebar.classList.add("translate-x-full");
        modalSidebar.classList.remove("translate-x-0");

        editHotspot.classList.remove("my-10");
        editHotspot.classList.add("translate-y-full");
      }, 200);

      setTimeout(() => {
        modalBackground.classList.add("bg-opacity-0");
        modalBackground.classList.remove("bg-opacity-50");

        modal.classList.add("hidden");
      }, 300);
    });

    closeEditHotspotButton.addEventListener("click", () => {
      editHotspot.classList.remove("my-10");
      editHotspot.classList.add("translate-y-full");
    });

    // ======================================================
    getHeritagesForCombobox().then((data) => {
      if (data) {
        setHeritageList(data);
      } else setHeritageList([]);
      console.log(data);
    });
  }, [addHospotInfo]);

  const handleSubmit = (updatedValue) => {
    updateItem(updatedValue);

    const updatedHotspotArr = [...Hotspots];

    const indexToUpdate = updatedHotspotArr.findIndex(
      (item) => item.id === updatedValue.id
    );

    if (indexToUpdate !== -1) {
      updatedHotspotArr[indexToUpdate] = updatedValue;
      setHotspotList(updatedHotspotArr);
    }
  };

  const handleDelete = (deletedValue) => {
    onDelete(deletedValue);

    const updatedHotspotArr = [...Hotspots];

    const filteredHotspotArr = updatedHotspotArr.filter(
      (item) => item.id !== deletedValue.id
    );

    setHotspotList(filteredHotspotArr);
  };

  return (
    <>
      <div
        id="hotspot_modal"
        className="hidden transform transition-transform duration-300 animated fadeIn fixed left-0 top-0 inset-0 flex justify-center items-center min-w-screen h-screen z-[100]"
      >
        <div>
          <div x-show="open" className="fixed inset-0 z-50 overflow-hidden">
            <div
              id="modal_background"
              className="absolute inset-0 bg-black transform transition-transform duration-300 animated fadeIn bg-opacity-0 transition-opacity"
            ></div>
            <section className="absolute inset-y-0 right-0 w-full">
              <div className="w-full h-screen flex items-center ">
                <div className="relative flex-1 w-screen h-full p-10 ">
                  <div
                    id="edit_hotspot"
                    className="transform transition-transform duration-300 animated fadeIn z-50 absolute inset-0 left-1/2 -translate-x-1/2 translate-y-full flex justify-center items-center"
                  >
                    <div className="flex-1 max-h-full bg-white editor mx-auto flex max-w-md flex-col py-4 px-2 text-gray-800 shadow-lg rounded-lg">
                      <div className="flex items-center justify-between mx-4 pb-4">
                        <h2 className="text-xl font-semibold text-red-500 pl-4 border-l-4 border-red-500">
                          Chỉnh sửa Hotspot
                        </h2>
                        <button
                          id="close_edit_hotspot_button"
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
                      <div className="overflow-auto px-4">
                        <h2 className="font-semibold text-sm text-teal-500">
                          Tên Hotspot
                        </h2>
                        <input
                          name="name"
                          required
                          type="text"
                          value={
                            currentHotspot.name
                              ? currentHotspot.name
                              : `Hotspot ${tempValue}`
                          }
                          onChange={(e) => {
                            setCurrentHotspot({
                              ...currentHotspot,
                              name: e.target.value,
                            });
                          }}
                          placeholder="Nhập tên Hotspot"
                          className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                        />

                        <h2 className="font-semibold text-sm text-teal-500">
                          Loại Hotspot
                        </h2>
                        <select
                          name="category"
                          required
                          onChange={(e) =>
                            setCurrentHotspot((currentHotspot) => ({
                              ...currentHotspot,
                              category: parseInt(e.target.value, 10),
                            }))
                          }
                          value={currentHotspot.category}
                          className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none"
                        >
                          <option value={0}>--- Chọn loại Hotspot ---</option>
                          <option value={1}>Hotspot hiện vật</option>
                          <option value={2}>Hotspot chuyển cảnh</option>
                        </select>
                       
                        {currentHotspot.category === 1 && (
                          <>
                            <h2 className="font-semibold text-sm text-teal-500">
                              Di sản hiển thị
                            </h2>
                            <select
                              name="heritage_type_id"
                              required
                              value={currentHotspot.model_id}
                              onChange={(e) => {
                                const selectedTypeId = parseInt(
                                  e.target.value,
                                  10
                                );
                                const selectedType = heritageList.find(
                                  (item) => item.id === selectedTypeId
                                );
                                const modelUrl = selectedType
                                  ? selectedType.upload_file.file_url
                                  : ""; // Set imageUrl to the selected type's imageUrl or an empty string if not found
                                setCurrentHotspot({
                                  ...currentHotspot,
                                  model_url: modelUrl,
                                  model_id: selectedTypeId,
                                });
                              }}
                              className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none"
                            >
                              <option value={0}>
                                --- Chọn loại di sản ---
                              </option>
                              {heritageList.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.id} {item.name}
                                </option>
                              ))}
                            </select>
                          </>
                        )}

                        {currentHotspot.category === 2 && (
                          <>
                            <h2 className="font-semibold text-sm text-teal-500">
                              Khu vực (chuyển cảnh)
                            </h2>
                            <select
                              name="scene_id"
                              required
                              onChange={(e) =>
                                setCurrentHotspot((currentHotspot) => ({
                                  ...currentHotspot,
                                  move_scene_id: parseInt(e.target.value, 10),
                                }))
                              }
                              value={currentHotspot.move_scene_id}
                              className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none"
                            >
                              <option value={0}>--- Chọn khu vực ---</option>
                              {scenes.map((item, index) => (
                                <option key={index} value={item.scene.id}>
                                  {item.id} {item.scene.name}
                                </option>
                              ))}
                            </select>
                          </>
                        )}

                        <h2 className="font-semibold text-sm text-teal-500">
                          Góc nhìn (trục dọc)
                        </h2>
                        <input
                          name="pitch"
                          required
                          type="number"
                          value={currentHotspot.pitch}
                          onChange={(e) => {
                            setCurrentHotspot({
                              ...currentHotspot,
                              pitch: e.target.value,
                            });
                          }}
                          placeholder="Nhập giá trị góc nhìn"
                          className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                        />

                        <h2 className="font-semibold text-sm text-teal-500">
                          Góc quay (trục ngang)
                        </h2>
                        <input
                          name="yaw"
                          required
                          value={currentHotspot.yaw}
                          onChange={(e) => {
                            setCurrentHotspot({
                              ...currentHotspot,
                              yaw: e.target.value,
                            });
                          }}
                          type="number"
                          placeholder="Nhập giá trị góc quay"
                          className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                        />


                        {/* <h2 className="font-semibold text-sm text-teal-500">
                        Hình ảnh
                    </h2>
                    <input
                        name="image_url"
                        required
                        type="text"
                        value={''}
                        placeholder="Nhập link ảnh"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" /> */}
                        {/* {errors.image_url &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.image_url}
                        </p>
                    } */}

                        {/* {!isEmptyOrSpaces(managementUnit.image_url) && <>
                        <p className="text-gray-600 mb-4 text-center">Ảnh hiện tại</p>
                        <img src={managementUnit.image_url} className="w-full h-auto mb-4 rounded-lg" />
                    </>} */}
                      </div>
                      <div className="buttons flex items-center pt-6 px-4">
                        <hr className="mt-4" />
                        <button
                          onClick={() => {
                            handleDelete(currentHotspot);
                          }}
                          className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer bg-red-400 hover:bg-red-500 p-2 px-5 font-semibold text-white"
                        >
                          Xóa
                        </button>
                        <button
                          id="notification_buttonmodal"
                          type="submit"
                          onClick={() => {
                            handleSubmit(currentHotspot);
                          }}
                          className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white"
                        >
                          Lưu thay đổi
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    id="close_modal_space"
                    className="z-30 absolute inset-0 bg-black transform transition-transform duration-300 animated fadeIn bg-opacity-0 transition-opacity"
                  ></div>
                </div>
                <div className="w-screen h-full max-w-md">
                  <div
                    id="hotspot_sidebar"
                    className="transform transition-transform duration-300 animated fadeIn translate-x-full h-full flex flex-col py-4 bg-white shadow-xl"
                  >
                    <div className="flex items-center justify-between px-4 pb-4 border-b-2 border-gray-100">
                      <h2 className="text-lg font-semibold text-red-500">
                        Quản lý hotspot
                      </h2>
                      <button
                        id="close_button"
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

                    {Hotspots.length > 0 ? (
                      <>
                        <div className="mt-4 px-4 h-full overflow-auto">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Hotspots.map((element, i) => (
                              <div
                                onClick={() => openEditHotspotForm(element, i)}
                                className="relative flex flex-grow !flex-row justify-center items-center border-1 border-slate-100 shadow-md rounded-md bg-white gap-3 p-4 hover:bg-red-400 group transition-all duration-300 cursor-pointer"
                              >
                                <div className="flex flex-row items-center">
                                  <div className="rounded-full bg-amber-100 p-3 group-hover:bg-white transition-all duration-300">
                                    <span className="flex items-center">
                                      <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 512 512"
                                        className="h-6 w-6 text-amber-400 group-hover:text-red-400 transition-all duration-300"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <FontAwesomeIcon icon={faCube} />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-1 w-auto flex-col justify-center gap-1">
                                  <p className="font-dm text-sm font-semibold text-teal-500 group-hover:text-white transition-all duration-300">
                                    {element.name
                                      ? element.name
                                      : `Hotspot ${element.id}`}
                                  </p>
                                  <p className="text-xs text-gray-600 group-hover:text-white transition-all duration-300">
                                    {element.name
                                      ? element.name
                                      : "Chưa có tên"}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="px-10 h-full flex justify-center items-center">
                        <img src={CatNull} />
                      </div>
                    )}

                    <div className="mt-6 px-4">
                      <button className="flex justify-center items-center bg-teal-500 text-white rounded-md text-sm p-2 gap-1">
                        <svg
                          width="1rem"
                          height="1rem"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                              fill="currentColor"
                            ></path>
                          </g>
                        </svg>{" "}
                        Tổng số hotspot{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
