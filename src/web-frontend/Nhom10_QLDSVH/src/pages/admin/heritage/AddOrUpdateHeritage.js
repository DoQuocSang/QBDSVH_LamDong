import React, { useEffect, useState, useRef, createRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCircle,
  faCircleCheck,
  faCircleInfo,
  faCircleNotch,
  faCirclePlus,
  faCloudArrowUp,
  faCube,
  faEye,
  faHourglass,
  faHourglassHalf,
  faImage,
  faPenToSquare,
  faPencil,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  AddOrUpdateText,
  getFileNameFromURL,
  truncateString,
} from "../../../components/utils/Utils";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";
import { generateSlug } from "../../../components/utils/Utils";

import { getHeritageById, putHeritageModel } from "services/HeritageRepository";
import { getHeritageTypes } from "services/HeritageTypeRepository";
import { getLocations } from "../../../services/LocationRepository";
import { getManagementUnits } from "../../../services/ManagementUnitRepository";
import { addHeritage } from "../../../services/HeritageRepository";
import { putHeritage } from "../../../services/HeritageRepository";
import NotificationModal from "../../../components/admin/modal/NotificationModal";

import DefaultImage from "images/post-default-full.png";
import { getHeritageCategories } from "../../../services/HeritageCategoryRepository";
import { getHeritageWithDetailById } from "../../../services/HeritageRepository";
import { addHeritageWithParagraphs } from "../../../services/HeritageRepository";
import { putHeritageWithParagraphs } from "../../../services/HeritageRepository";
import { splitImageUrls } from "../../../components/utils/Utils";
import { storage } from "../../../firebase.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import ModelViewer from "./ModelViewer";
import {
  addUploadFile,
  deleteUploadFileById,
  patchUploadFile,
  putUploadFile,
} from "services/UploadFileRepository";
import DefaultModel1 from "../../../images/default-model-1.png";
import DefaultModel2 from "../../../images/default-model-2.png";
import DefaultModel3 from "../../../images/default-model-3.png";
import DefaultThumbnail from "../../../images/cat-404-full-2.png";

export default ({ type = "" }) => {
  document.title = "Thêm/Cập nhật di sản";

  let mainText = AddOrUpdateText(type, "di sản");

  const defaultHeritage = {
    id: 0,
    name: "",
    short_description: "",
    time: "",
    model_360_url: "",
    urlslug: "",
    video_url: "",
    location_id: 0,
    management_unit_id: 0,
    heritage_type_id: 0,
    heritage_category_id: 0,
    view_count: 0,
    images: [],
  };

  const defaultParagraphs = [
    {
      id: 0,
      title: "",
      description: "",
      image_description: "",
      image_url: "",
      heritage_id: 0,
    },
  ];

  const defaultUploadFile = {
    id: 0,
    name: "",
    file_url: "",
    size: 0,
    user_id: 1,
    upload_date: "2023-06-07T12:00:00Z",
    extension: "",
    heritage_id: 0,
    thumbnail_url: "",
    is_current_use: 0,
  };

  const initialState = {
      heritage: {
        ...defaultHeritage,
      },
      paragraphs: defaultParagraphs,
      upload_file: defaultUploadFile,
    },
    [heritageData, setHeritageData] = useState(initialState);

  const [heritageTypeList, setHeritageDataTypeList] = useState([]);
  const [heritageCategoryList, setHeritageDataCategoryList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [managementUnitList, setManagementUnitList] = useState([]);
  const [successFlag, SetSuccessFlag] = useState(false);
  const [heritageErrors, setHeritageErrors] = useState({});
  const [paragraphErrors, setParagraphErrors] = useState([]);
  const [modelUploadFile, setModelUploadFile] = useState(null);
  const [thumbnailUploadFile, setThumbnailUploadFile] = useState(null);
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [loggedInUserID, setLoggedInUserID] = useState(
    parseInt(localStorage.getItem("loggedInUserID"), 10) || 1
  );

  const [modelUploadProgress, setModelUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
//   localStorage.setItem("model360url", heritageData.upload_file.file_url);

  const [isModelViewerOpen, setIsModelViewerOpen] = useState(false);
  const [isThumbnailViewerOpen, setIsThumbnailViewerOpen] = useState(false);

  let { id } = useParams();
  id = id ?? 0;

  let maintAction = "";
  if (id === 0) {
    maintAction = "thêm";
  } else {
    maintAction = "cập nhật";
  }

  //console.log(id);
  useEffect(() => {
    document.title = "Thêm/ cập nhật di sản";

    if (id !== 0) {
      getHeritageWithDetailById(id).then((data) => {
        //console.log(data)
        if (data) {
          const { id: ignoredId, ...heritageData } = data;
          setHeritageData({
            ...heritageData,
          });
          //    console.log(data);
        } else {
          setHeritageData(initialState);
        }
      });
    }

    getHeritageTypes().then((data) => {
      if (data) {
        setHeritageDataTypeList(data.data);
      } else setHeritageDataTypeList([]);
      //console.log(data)
    });

    getHeritageCategories().then((data) => {
      if (data) {
        setHeritageDataCategoryList(data.data);
      } else setHeritageDataCategoryList([]);
      //console.log(data)
    });

    getLocations().then((data) => {
      if (data) {
        setLocationList(data.data);
      } else setHeritageDataTypeList([]);
      //console.log(data)
    });

    getManagementUnits().then((data) => {
      if (data) {
        setManagementUnitList(data.data);
      } else setHeritageDataTypeList([]);
      //console.log(data)
    });
  }, []);

  //validate lỗi bổ trống
  const validateAllHeritageInput = () => {
    //console.log(heritageData)
    const validationErrors = {};

    if (heritageData.heritage.heritage_type_id === 0) {
      validationErrors.heritage_type_id = "Vui lòng chọn loại di sản";
    }

    if (heritageData.heritage.name.trim() === "") {
      validationErrors.name = "Vui lòng nhập tên di sản";
    }

    // if (heritageData.heritage.image_url.trim() === '') {
    //     validationErrors.image_url = 'Vui lòng chọn địa chỉ url của ảnh';
    // }

    if (heritageData.heritage.location_id === 0) {
      validationErrors.location_id = "Vui lòng chọn địa điểm";
    }

    if (heritageData.heritage.heritage_category_id === 0) {
      validationErrors.heritage_category_id = "Vui lòng chọn hình thức";
    }

    if (heritageData.heritage.management_unit_id === 0) {
      validationErrors.management_unit_id = "Vui lòng chọn đơn vị quản lý";
    }

    if (heritageData.heritage.time.trim() === "") {
      validationErrors.time = "Vui lòng nhập niên đại";
    }

    if (heritageData.heritage.urlslug.trim() === "") {
      validationErrors.urlslug = "Slug chưa được tạo";
    }

    if (heritageData.heritage.short_description.trim() === "") {
      validationErrors.short_description = "Vui lòng nhập mô tả chi tiết";
    }

    setHeritageErrors(validationErrors);
    // Kiểm tra nếu có lỗi
    if (Object.keys(validationErrors).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  //validate lỗi bổ trống
  const validateAllParagraphInput = () => {
    const validationErrors = [];

    heritageData.paragraphs.forEach((paragraph, index) => {
      const errors = {};

      if (paragraph.title.trim() === "") {
        errors.paragraphs_title = "Vui lòng nhập tiêu đề";
      }

      if (paragraph.description.trim() === "") {
        errors.paragraphs_description = "Vui lòng nhập mô tả chi tiết";
      }

      validationErrors[index] = errors;
    });

    setParagraphErrors(validationErrors);
    // Kiểm tra nếu có lỗi
    if (Object.keys(validationErrors).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    setHeritageData((prevData) => ({
      ...prevData,
      upload_file: {
        ...prevData.upload_file,
        is_current_use: 1,
      },
    }));

    // Nếu không có lỗi mới xóa hoặc cập nhật
    if (validateAllHeritageInput() === false) {
      if (id === 0) {
        addHeritageWithParagraphs(heritageData).then((data) => {
          SetSuccessFlag(data);
          //console.log(data);
        });
      } else {
        putHeritageWithParagraphs(id, heritageData).then((data) => {
          SetSuccessFlag(data);
          console.log(heritageData);
        });
      }
    }
  };

  const ResetUploadFileStates = () => {
    // Panorama
    setModelUploadProgress(0);
    setModelUploadFile(null);
    setIsModelViewerOpen(false);

    // Thumbnail
    setThumbnailUploadProgress(0);
    setThumbnailUploadFile(null);
    setIsThumbnailViewerOpen(false);
  };

  //Xử lý khi bấm xóa bên component con NotificationModal
  const childToParent = (isContinue) => {
    if (isContinue === true && id === 0) {
      setHeritageData(initialState);
      // Reset flag sau khi thêm thành công
      setTimeout(() => {
        SetSuccessFlag(false);
      }, 1000);

      //Reset các state upload file
      ResetUploadFileStates();
    }
  };

  // Xử lý ref khi thêm xóa textarea cho mô tả (để thêm <image> hoặc <br>)
  const [textareaRefs, setTextareaRefs] = useState([]);

  const addTextarea = () => {
    setTextareaRefs((prevRefs) => [...prevRefs, createRef()]);
  };

  const removeTextarea = (index) => {
    setTextareaRefs((prevRefs) => {
      const newRefs = [...prevRefs];
      newRefs.splice(index, 1);
      return newRefs;
    });
  };

  // Xử lý nút thêm <image> <br>
  const addString = (stringToAdd, index) => {
    console.log(textareaRefs);
    const newParagraphs = [...heritageData.paragraphs];
    const currentParagraph = newParagraphs[index];
    const { description } = currentParagraph;

    const inputElement = textareaRefs[index].current;
    const { selectionStart, selectionEnd, value } = inputElement;

    const newValue =
      value.substring(0, selectionStart) +
      stringToAdd +
      value.substring(selectionEnd);

    currentParagraph.description = newValue;
    setHeritageData((prevState) => ({
      ...prevState,
      paragraphs: newParagraphs,
    }));

    inputElement.value = newValue;
    // Đặt ví trí con trỏ chuột sau chuỗi vùa thêm, và không chọn bất kì chuỗi nào sau nó
    // = trỏ chuột đứng sau chuỗi vừa thêm
    inputElement.setSelectionRange(
      selectionStart + stringToAdd.length,
      selectionStart + stringToAdd.length
    );
    inputElement.focus();

    // Cập nhật giá trị của short_description
    // setHeritageData(heritageData => ({
    //     ...heritageData,
    //     heritage: {
    //         ...heritageData.heritage,
    //         short_description: newValue
    //     }
    // }));
  };

  // Xử lý sự kiện khi thay đổi đoạn mô tả
  const handleParagraphChange = (index, e) => {
    const newParagraphs = [...heritageData.paragraphs];
    newParagraphs[index][e.target.name] = e.target.value;
    setHeritageData({ ...heritageData, paragraphs: newParagraphs });
  };

  // Xử lý sự kiện khi thêm đoạn mô tả
  const addParagraph = () => {
    addTextarea();
    setHeritageData({
      ...heritageData,
      paragraphs: [...heritageData.paragraphs, { ...defaultParagraphs[0] }],
    });
    // dùng ...defaultParagraphs[0] vì mảng khởi tạo mặc định có 1 phần tử duy nhất trong initialState
  };

  // Xử lý sự kiện khi xóa đoạn mô tả
  const deleteParagraph = (index) => {
    removeTextarea(index);
    setHeritageData((heritageData) => {
      const updatedParagraphs = [...heritageData.paragraphs];
      // xóa 1 phần tử theo index
      updatedParagraphs.splice(index, 1);
      return {
        ...heritageData,
        paragraphs: updatedParagraphs,
      };
    });
  };

  const handleOpenModelViewer = () => {
    setIsModelViewerOpen(true);
    setIsThumbnailViewerOpen(false);
  };

  const handleCloseModelViewer = () => {
    setIsModelViewerOpen(false);
  };

  const handleOpenThumbnailViewer = () => {
    setIsThumbnailViewerOpen(true);
    setIsModelViewerOpen(false);
  };

  const handleCloseThumbnailViewer = () => {
    setIsThumbnailViewerOpen(false);
  };

  const handleAddOrUpdateUploadFile = (val) => {
    console.log(val);
    if (heritageData.upload_file.id === 0) {
      addUploadFile(val).then((data) => {
        console.log(data);
        setHeritageData((prevData) => ({
          ...prevData,
          upload_file: {
            ...prevData.upload_file,
            id: data.data.id,
          },
        }));
      });
    } else {
      putUploadFile(heritageData.upload_file.id, val).then((data) => {
        console.log(heritageData.upload_file.id);
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

      const storageRef = ref(storage, `model_thumbnails/${modifiedFileName}`);

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
              heritage_id: parseInt(id),
              thumbnail_url: downloadURL,
              upload_date: new Date().toISOString(),
            });
            // putUploadFile({
            //     heritage_id: id,
            //     thumbnail_url: downloadURL
            // }).then(data => {
            //     console.log(data);
            // });

            setHeritageData((prevData) => ({
              ...prevData,
              upload_file: {
                ...prevData.upload_file,
                user_id: loggedInUserID,
                heritage_id: parseInt(id),
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

  const handleModelFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setModelUploadFile(file);

    if (file) {
      // Xóa tất cả các khoảng trắng trong tên tệp
      const fileNameWithoutSpaces = file.name.replace(/\s/g, "");

      const extension = fileNameWithoutSpaces.split(".").pop();
      const uniqueId = uuidv4();
      const modifiedFileName = `${
        fileNameWithoutSpaces.split(".")[0]
      }_${uniqueId}.${extension}`;

      const storageRef = ref(storage, `models/${modifiedFileName}`);

      // Upload the file and manually track the progress
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setModelUploadProgress(progress);
        },
        (error) => {
          console.error("Lỗi trong quá trình upload:", error);
        },
        async () => {
          try {
            // Get the download URL after successful upload
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // alert("Upload file thành công");

            // Use the downloadURL as needed, for example, updating state
            setHeritageData((prevData) => ({
              ...prevData,
              heritage: {
                ...prevData.heritage,
                model_360_url: downloadURL,
              },
            }));

            putHeritageModel(id, { model_360_url: downloadURL }).then(
              (data) => {
                console.log(data);
              }
            );

            handleAddOrUpdateUploadFile({
              name: file.name.split(".")[0],
              file_url: downloadURL,
              size: file.size,
              user_id: loggedInUserID,
              heritage_id: parseInt(id),
              upload_date: new Date().toISOString(),
              extension: extension,
            });

            setHeritageData((prevData) => ({
              ...prevData,
              upload_file: {
                ...prevData.upload_file,
                name: file.name.split(".")[0],
                file_url: downloadURL,
                size: file.size,
                user_id: loggedInUserID,
                heritage_id: parseInt(id),
                upload_date: new Date().toISOString(),
                extension: extension,
              },
            }));
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        }
      );
    }
  };

  const clearModelFile = () => {
    // Check if there is a modifiedFileName
    setIsModelViewerOpen(false);
    // var ModelName = getFileNameFromURL(heritageData.heritage.model_360_url, 'models%2F');
    // if (ModelName) {
    //     // Create a reference to the file in storage
    //     const storageRef = ref(storage, `models/${ModelName}`);
    //     console.log("File hiện tại: " + ModelName);

    //     // Delete the file from storage
    //     deleteObject(storageRef)
    //         .then(() => {
    //             alert("Xóa file thành công");
    //             console.log('File deleted successfully');

    //             // Remove the item from localStorage
    //             // localStorage.removeItem("yourLocalStorageKey");
    //         })
    //         .catch((error) => {
    //             alert("Có lỗi khi xóa file");
    //             console.error('Error deleting file:', error);
    //         });
    // }

    // Clear the uploaded file and reset model_360_url in state
    setModelUploadFile(null);
    setIsModelViewerOpen(false);
    setHeritageData((prevData) => ({
      ...prevData,
      heritage: {
        ...prevData.heritage,
        model_360_url: "",
      },
      upload_file: {
        ...prevData.upload_file,
        name: "",
        file_url: "",
        size: 0,
        user_id: 1,
        heritage_id: 0,
        extension: "",
      },
    }));

    // setUploadFile((prevData) => ({
    //     ...prevData,
    //     name: '',
    //     file_url: '',
    //     size: 0,
    //     user_id: 1,
    //     heritage_id: 0,
    //     extension: '',
    // }
    // ));

    // setUploadFile((prevData) => ({
    //     ...prevData,
    //     name: '',
    //     file_url: '',
    //     size: 0,
    //     user_id: 1,
    //     heritage_id: 0,
    //     extension: '',
    // }
    // ));

    putUploadFile(heritageData.upload_file.id, {
      name: "",
      file_url: "",
      size: 0,
      user_id: loggedInUserID,
      heritage_id: 0,
      extension: "",
    }).then((data) => {
      console.log(data);
    });

    if (heritageData.upload_file.thumbnail_url === "") {
      deleteUploadFileById(heritageData.upload_file.id).then((data) => {
        console.log(data);
      });
      setHeritageData((prevData) => ({
        ...prevData,
        upload_file: {
          ...defaultUploadFile,
        },
      }));
    }
  };

  const clearThumbnailFile = () => {
    // Check if there is a modifiedFileName
    // setIsModelViewerOpen(false);
    // var ThumbnailName = getFileNameFromURL(UploadFile.thumbnail_url, 'model_thumbnails%2F');
    // if (ThumbnailName) {
    //     // Create a reference to the file in storage
    //     const storageRef = ref(storage, `model_thumbnails/${ThumbnailName}`);
    //     console.log("File hiện tại: " + ThumbnailName);

    //     // Delete the file from storage
    //     deleteObject(storageRef)
    //         .then(() => {
    //             alert("Xóa file thành công");
    //             console.log('File deleted successfully');

    //             // Remove the item from localStorage
    //             // localStorage.removeItem("yourLocalStorageKey");
    //         })
    //         .catch((error) => {
    //             alert("Có lỗi khi xóa file");
    //             console.error('Error deleting file:', error);
    //         });
    // }

    // Clear the uploaded file and reset model_360_url in state
    setThumbnailUploadFile(null);
    setIsThumbnailViewerOpen(false);
    setHeritageData((prevData) => ({
      ...prevData,
      heritage: {
        ...prevData.heritage,
        model_360_url: "",
      },
      upload_file: {
        ...prevData.upload_file,
        thumbnail_url: "",
      },
    }));

    // setUploadFile((prevData) => ({
    //     ...prevData,
    //     thumbnail_url: '',
    // }
    // ));

    putUploadFile(heritageData.upload_file.id, {
      thumbnail_url: "",
    }).then((data) => {
      console.log(data);
    });

    if (heritageData.upload_file.file_url === "") {
      deleteUploadFileById(heritageData.upload_file.id).then((data) => {
        console.log(data);
      });
      setHeritageData((prevData) => ({
        ...prevData,
        upload_file: {
          ...defaultUploadFile,
        },
      }));
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    console.log(heritageData);
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
          <h2 className="font-semibold text-sm text-teal-500">Tên di sản</h2>
          <input
            name="name"
            required
            type="text"
            value={heritageData.heritage.name || ""}
            onChange={(e) =>
              setHeritageData((heritageData) => ({
                ...heritageData,
                heritage: {
                  ...heritageData.heritage,
                  name: e.target.value,
                  urlslug: generateSlug(e.target.value),
                },
              }))
            }
            placeholder="Nhập tên di sản"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />
          {heritageErrors.name && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {heritageErrors.name}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">UrlSlug</h2>
          <input
            name="urlslug"
            required
            type="text"
            value={heritageData.heritage.urlslug || ""}
            // onChange={e => setHeritageData({
            //     ...heritageData.heritage,
            //     UrlSlug: e.target.value
            // })}
            placeholder="Nhập định danh slug"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />
          {heritageErrors.urlslug && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {heritageErrors.urlslug}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Loại di sản</h2>
          <select
            name="heritage_type_id"
            value={heritageData.heritage.heritage_type_id}
            required
            onChange={(e) =>
              setHeritageData((heritageData) => ({
                ...heritageData,
                heritage: {
                  ...heritageData.heritage,
                  heritage_type_id: parseInt(e.target.value, 10),
                },
              }))
            }
            className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none"
          >
            <option value={0}>--- Chọn loại di sản ---</option>
            {heritageTypeList.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {heritageErrors.heritage_type_id && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {heritageErrors.heritage_type_id}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">
            Hình thức di sản
          </h2>
          <select
            name="heritage_category_id"
            value={heritageData.heritage.heritage_category_id}
            required
            onChange={(e) =>
              setHeritageData((heritageData) => ({
                ...heritageData,
                heritage: {
                  ...heritageData.heritage,
                  heritage_category_id: parseInt(e.target.value, 10),
                },
              }))
            }
            className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none"
          >
            <option value={0}>--- Chọn hình thức di sản ---</option>
            {heritageCategoryList.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {heritageErrors.heritage_category_id && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {heritageErrors.heritage_category_id}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Địa điểm</h2>
          <select
            name="location_id"
            value={heritageData.heritage.location_id}
            required
            onChange={(e) =>
              setHeritageData((heritageData) => ({
                ...heritageData,
                heritage: {
                  ...heritageData.heritage,
                  location_id: parseInt(e.target.value, 10),
                },
              }))
            }
            className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none"
          >
            <option value={0}>--- Chọn địa điểm ---</option>
            {locationList.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {heritageErrors.location_id && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {heritageErrors.location_id}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">
            Đơn vị quản lý
          </h2>
          <select
            name="management_unit_id"
            value={heritageData.heritage.management_unit_id}
            required
            onChange={(e) =>
              setHeritageData((heritageData) => ({
                ...heritageData,
                heritage: {
                  ...heritageData.heritage,
                  management_unit_id: parseInt(e.target.value, 10),
                },
              }))
            }
            className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none"
          >
            <option value={0}>--- Chọn đơn vị quản lý ---</option>
            {managementUnitList.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {heritageErrors.management_unit_id && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {heritageErrors.management_unit_id}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Niên đại</h2>
          <input
            name="time"
            required
            type="text"
            value={heritageData.heritage.time || ""}
            onChange={(e) =>
              setHeritageData((heritageData) => ({
                ...heritageData,
                heritage: {
                  ...heritageData.heritage,
                  time: e.target.value,
                },
              }))
            }
            placeholder="Nhập thời gian"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />
          {heritageErrors.time && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {heritageErrors.time}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Mô tả ngắn</h2>
          <textarea
            name="short_description"
            required
            type="text"
            value={heritageData.heritage.short_description || ""}
            onChange={(e) =>
              setHeritageData((heritageData) => ({
                ...heritageData,
                heritage: {
                  ...heritageData.heritage,
                  short_description: e.target.value,
                },
              }))
            }
            placeholder="Nhập mô tả chi tiết"
            className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
            spellcheck="false"
          ></textarea>
          {heritageErrors.short_description && (
            <p className="text-red-500 mb-6 text-sm font-semibold">
              <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
              {heritageErrors.short_description}
            </p>
          )}

          <h2 className="font-semibold text-sm text-teal-500">Video</h2>
          <input
            name="video_url"
            required
            type="text"
            value={heritageData.heritage.video_url || ""}
            onChange={(e) =>
              setHeritageData((heritageData) => ({
                ...heritageData,
                heritage: {
                  ...heritageData.heritage,
                  video_url: e.target.value,
                },
              }))
            }
            placeholder="Nhập link video"
            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
          />

          <h2 className="font-semibold text-sm text-teal-500">
            Model VR hiện vật
          </h2>
          {/* <input
                        name="model_360_url"
                        required
                        type="text"
                        value={heritageData.heritage.model_360_url || ''}
                        onChange={e =>
                            setHeritageData(heritageData => ({
                                ...heritageData,
                                heritage: {
                                    ...heritageData.heritage,
                                    model_360_url: e.target.value,
                                }
                            }))
                        }
                        placeholder="Nhập link ảnh 360 độ"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" /> */}
          {/* {JSON.stringify(heritageData)} */}
          <div className="mb-6 pt-4">
            {/* Hiển thị thông tin file đã tải lên nếu có */}
            <div className="flex justify-center items-center gap-4">
              {modelUploadFile && (
                <div className="flex-1 w-1/2 relative mt-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      {modelUploadProgress < 100 ? (
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
                        {Math.round(modelUploadProgress)}%
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
                      value={modelUploadProgress}
                      max="100"
                      className="flex flex-col justify-center bg-teal-500 text-white shadow-none w-full"
                    ></progress>
                  </div>
                </div>
              )}

              {thumbnailUploadFile && (
                <div className="flex-1 w-1/2 relative mt-3">
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
              <div className="flex items-center justify-between w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                <div className="flex-1 w-1/2 h-full">
                  <input
                    type="file"
                    name="model_file"
                    id="model_file"
                    className="sr-only"
                    onChange={handleModelFileUpload}
                  />
                  <label
                    for= {(thumbnailUploadProgress > 0 && thumbnailUploadProgress < 100) ? "" :  "model_file"}
                    className= {(thumbnailUploadProgress > 0 && thumbnailUploadProgress < 100) ? 
                        "text-center flex flex-col items-center justify-center border-dashed pt-5 pb-6 h-full px-10 cursor-wait"
                        :  
                        "text-center flex flex-col items-center justify-center border-dashed pt-5 pb-6 h-full px-10 cursor-pointer"}
                  >
                    <div className={(thumbnailUploadProgress > 0 && thumbnailUploadProgress < 100) ? "cursor-wait" :  "cursor-pointer"}>
                      {modelUploadFile ||
                      (heritageData.upload_file &&
                        heritageData.upload_file.file_url) ? (
                        <>
                          {/* {modelUploadProgress < 100 ? (
                                                    <>
                                                    <div className="flex justify-center">
                                                        <svg className="w-10 h-10 mb-3 text-amber-400">
                                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                                        </svg>
                                                    </div>
                                                        <p className="mb-2 text-amber-400 dark:text-gray-400 font-semibold"><span className="font-semibold"></span> Vui lòng chờ ...</p>
                                                    </>
                                             ) 
                                             :
                                             (
                                                <>
                                                    <div className="flex justify-center mb-3">
                                                        <svg className="w-10 h-10 text-emerald-400">
                                                            <FontAwesomeIcon icon={faCircleCheck} />
                                                        </svg>
                                                    </div>
                                                    <p className="mb-2 text-emerald-400 dark:text-gray-400 font-semibold"><span className="font-semibold"></span>  Đã tải lên Model</p>
                                                </>
                                             )
                                            } */}
                          <div className="flex justify-center mb-3">
                            <svg className="w-10 h-10 text-emerald-400">
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </svg>
                          </div>
                          <p className="mb-2 text-emerald-400 dark:text-gray-400 font-semibold">
                            <span className="font-semibold"></span> Đã tải lên
                            Model
                          </p>

                          {(modelUploadProgress === 100 ||
                            (heritageData.upload_file &&
                              heritageData.upload_file.file_url)) &&
                            (isModelViewerOpen ? (
                              <button
                                onClick={handleCloseModelViewer}
                                className="btn text-xs rounded-md transition duration-300 border-2 border-gray-400 ease-in-out cursor-pointer hover:bg-gray-400 p-2 px-5 font-semibold hover:text-white text-gray-400"
                              >
                                Thu gọn
                              </button>
                            ) : (
                              <button
                                onClick={handleOpenModelViewer}
                                className="btn text-xs rounded-md transition duration-300 border-2 border-emerald-400 ease-in-out cursor-pointer hover:bg-emerald-400 p-2 px-5 font-semibold hover:text-white text-emerald-400"
                              >
                                Xem model hiện tại
                              </button>
                            ))}
                        </>
                      ) : (
                        <>
                          <div className=" flex justify-center mb-3">
                            <svg className="w-10 h-10 text-gray-400">
                              <FontAwesomeIcon icon={faCube} />
                            </svg>
                          </div>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click tại đây</span>{" "}
                            để tải lên model
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            (Các file được phép: glb)
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                <div className="flex-1 w-1/2 h-full">
                  <input
                    type="file"
                    name="thumbnail_file"
                    id="thumbnail_file"
                    className="sr-only"
                    onChange={handleThumbnailFileUpload}
                  />
                  <label
                    for={(modelUploadProgress > 0 && modelUploadProgress < 100) ? "" :  "thumbnail_file"}
                    className={(modelUploadProgress > 0 && modelUploadProgress < 100) ? 
                        "flex flex-col items-center justify-center text center border-l-2 border-dashed border-gray-300 pt-5 pb-6 h-full px-10 cursor-wait" 
                        :  
                        "flex flex-col items-center justify-center text center border-l-2 border-dashed border-gray-300 pt-5 pb-6 h-full px-10 cursor-pointer"}
                  >
                    {thumbnailUploadFile ||
                    (heritageData.upload_file &&
                      heritageData.upload_file.thumbnail_url) ? (
                      <>
                        {/* {(thumbnailUploadProgress < 100 || !heritageData.upload_file.thumbnail_url) ? (
                                                <>
                                                    <>
                                                        <svg className="w-10 h-10 mb-3 text-amber-400">
                                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                                        </svg>
                                                        <p className="mb-2 text-amber-400 dark:text-gray-400 font-semibold"><span className="font-semibold"></span> Vui lòng chờ ...</p>
                                                    </>
                                                </>
                                             ) 
                                             :
                                             (
                                                <>
                                                    <svg className="w-10 h-10 mb-3 text-emerald-400">
                                                        <FontAwesomeIcon icon={faCircleCheck} />
                                                    </svg>
                                                    <p className="mb-2 text-emerald-400 dark:text-gray-400 font-semibold"><span className="font-semibold"></span> Đã tải lên thumbnail </p>
                                                </>
                                             )
                                            } */}

                        <svg className="w-10 h-10 mb-3 text-emerald-400">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </svg>
                        <p className="mb-2 text-emerald-400 dark:text-gray-400 font-semibold">
                          <span className="font-semibold"></span> Đã tải lên
                          thumbnail{" "}
                        </p>

                        {(thumbnailUploadProgress === 100 ||
                          (heritageData.upload_file &&
                            heritageData.upload_file.thumbnail_url)) &&
                          (isThumbnailViewerOpen ? (
                            <button
                              onClick={handleCloseThumbnailViewer}
                              className="btn text-xs rounded-md transition duration-300 border-2 border-gray-400 ease-in-out cursor-pointer hover:bg-gray-400 p-2 px-5 font-semibold hover:text-white text-gray-400"
                            >
                              Thu gọn
                            </button>
                          ) : (
                            <button
                              onClick={handleOpenThumbnailViewer}
                              className="btn text-xs rounded-md transition duration-300 border-2 border-emerald-400 ease-in-out cursor-pointer hover:bg-emerald-400 p-2 px-5 font-semibold hover:text-white text-emerald-400"
                            >
                              Xem thumbnail hiện tại
                            </button>
                          ))}
                      </>
                    ) : (
                      <>
                        <svg className="w-10 h-10 mb-3 text-gray-400">
                          <FontAwesomeIcon icon={faImage} />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click tại đây</span>{" "}
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
            {(modelUploadFile ||
              (heritageData.upload_file &&
                heritageData.upload_file.file_url)) && (
              <div className="mb-5 rounded-lg bg-[#F5F7FB] py-4 pl-8 pr-8 border-l-4 border-purple-400">
                <div className="flex items-center justify-between">
                  <FontAwesomeIcon
                    icon={faCube}
                    className="text-gray-500 mr-2"
                  />
                  <span className="flex-1 truncate pr-3 text-base font-medium text-[#07074D]">
                    {heritageData.upload_file.file_url
                      ? getFileNameFromURL(
                          heritageData.upload_file.file_url,
                          "models%2F"
                        )
                      : modelUploadFile.name}
                    {/* modelUploadFile.name */}
                  </span>
                  <button className="text-[#07074D]" onClick={clearModelFile}>
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

            {(thumbnailUploadFile ||
              (heritageData.upload_file &&
                heritageData.upload_file.thumbnail_url)) && (
              <div className="mb-5 rounded-lg bg-[#F5F7FB] py-4 pl-8 pr-8 border-l-4 border-purple-400">
                <div className="flex items-center justify-between">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-gray-500 mr-2"
                  />
                  <span className="flex-1 truncate pr-3 text-base font-medium text-[#07074D]">
                    {heritageData.upload_file.thumbnail_url
                      ? getFileNameFromURL(
                          heritageData.upload_file.thumbnail_url,
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

            {isModelViewerOpen && (
              <div className="mt-4">
                <ModelViewer modelUrl={ heritageData.upload_file ? heritageData.upload_file.file_url : ""}/>
              </div>
            )}

            {isThumbnailViewerOpen && (
              <img
                className="mt-4 flex justify-cent items-center h-auto w-full rounded-md"
                src={
                  heritageData.upload_file &&
                  heritageData.upload_file.thumbnail_url
                    ? heritageData.upload_file.thumbnail_url
                    : thumbnailUploadFile.name
                }
              />
            )}
          </div>

          {/* Đoan mô tả ============================================================================================================*/}
          <div className="flex items-center justify-center mt-4">
            <div className="h-0.5 flex-grow bg-red-500 rounded-full" />
            <h2 className="px-5 font-semibold text-base text-red-500 text-center">
              Phần mô tả
            </h2>
            <div className="h-0.5 flex-grow bg-red-500 rounded-full" />
          </div>
          <ul className="bg-amber-50 rounded-xl py-5 px-10 space-y-1 my-2 text-gray-500 list-disc font-semibold text-xs ">
            <li>
              <p>
                Phần mô tả của di sản được chia ra làm nhiều đoạn, mỗi đoạn bao
                gồm câu chủ đề, nội dung, hình ảnh và chú thích ảnh
              </p>
            </li>
            <li>
              <p>
                Để lưu nhiều ảnh, bạn phải ngăn cách các link ảnh bằng dấu " ,
                ". Tương tự với phần mô tả ảnh
              </p>
            </li>
            <li>
              <p>{`Để hiển thị ảnh trong phần nội dung bạn cần phải thêm <image> tại vị trí muốn hiển thị`}</p>
            </li>
            <li>
              <p>{`Để ngắt đoạn trong phần nội dung bạn cần phải thêm <br> tại vị trí muốn ngắt đoạn`}</p>
            </li>
          </ul>

          {heritageData.paragraphs.map((paragraph, index) => {
            const ref = textareaRefs[index] || addTextarea();
            return (
              <div
                key={index}
                className="relative bg-gray-50 my-5 px-10 py-5 rounded-xl shadow-md"
              >
                <p className="absolute top-0 right-0 text-white text-xs rounded-bl-xl rounded-tr-xl font-semibold px-4 py-2 bg-teal-500">
                  Đoạn thứ {index + 1}
                </p>
                <h2 className="font-semibold text-sm text-teal-500">Tiêu đề</h2>
                <input
                  name="title"
                  required
                  type="text"
                  value={paragraph.title}
                  placeholder="Nhập câu chủ đề"
                  onChange={(e) => handleParagraphChange(index, e)}
                  className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                />
                {paragraphErrors[index] &&
                  paragraphErrors[index].paragraphs_title && (
                    <p className="text-red-500 mb-6 text-sm font-semibold">
                      <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                      {paragraphErrors[index].paragraphs_title}
                    </p>
                  )}

                <h2 className="font-semibold text-sm text-teal-500">
                  Hình ảnh
                </h2>
                <textarea
                  name="image_url"
                  required
                  value={paragraph.image_url}
                  placeholder="Nhập link ảnh"
                  rows="3"
                  onChange={(e) => handleParagraphChange(index, e)}
                  className="text-black mb-2 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                />

                {!isEmptyOrSpaces(paragraph.image_url) && (
                  <>
                    <p className="text-gray-600 mb-4 text-center">
                      Ảnh hiện tại
                    </p>
                    <div className="mb-4">
                      <div
                        className={
                          splitImageUrls(paragraph.image_url).length > 1 &&
                          "w-full h-auto mb-4 grid grid-cols-3 gap-x-4 gap-y-4"
                        }
                      >
                        {splitImageUrls(paragraph.image_url).map(
                          (imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl}
                              className="rounded-lg"
                              alt={`Ảnh thứ ${index + 1}`}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}

                <h2 className="font-semibold text-sm text-teal-500">
                  Mô tả ảnh
                </h2>
                <textarea
                  name="image_description"
                  required
                  value={paragraph.image_description}
                  placeholder="Nhập mô tả ảnh"
                  rows="3"
                  onChange={(e) => handleParagraphChange(index, e)}
                  className="text-black mb-2 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                />

                <h2 className="font-semibold text-sm text-teal-500">
                  Nội dung
                </h2>
                <textarea
                  ref={ref}
                  name="description"
                  required
                  value={paragraph.description}
                  placeholder="Nhập nội dung"
                  rows="5"
                  onChange={(e) => handleParagraphChange(index, e)}
                  className="text-black mb-2 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400"
                />
                {paragraphErrors[index] &&
                  paragraphErrors[index].paragraphs_description && (
                    <p className="text-red-500 mb-6 text-sm font-semibold">
                      <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                      {heritageErrors.paragraphs_description}
                    </p>
                  )}
                {/* {console.log(paragraphErrors)} */}

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => addString("<image>", index)}
                    className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-emerald-700 bg-emerald-500 p-2 px-3 font-semibold text-white text-xs"
                  >
                    Thêm image
                  </button>
                  <button
                    onClick={() => addString("<br>", index)}
                    className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-amber-500 bg-amber-400 p-2 px-3 font-semibold text-white text-xs"
                  >
                    Thêm line break
                  </button>
                  <button
                    onClick={() => deleteParagraph(index)}
                    className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-red-600 bg-red-500 p-2 px-3 font-semibold text-white text-xs"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-center my-4">
            <button
              onClick={addParagraph}
              className="btn rounded-full transition duration-300 ease-in-out cursor-pointer hover:bg-indigo-600 bg-white-500 p-2 px-5 text-sm font-semibold text-indigo-500 hover:text-white border border-2 border-indigo-500 hover:border-indigo-600"
            >
              Thêm đoạn văn
            </button>
          </div>

          <div className="buttons flex">
            <hr className="mt-4" />
            <Link
              to="/admin/dashboard/all-heritage"
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

          <button
            className="fixed bottom-4 right-4 text-red-500 font-bold px-4 py-2 rounded-lg border-2 border-red-500 transition duration-300 bg-red-500 hover:bg-red-600 text-white"
            onClick={scrollToBottom}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>

          <NotificationModal
            mainAction={maintAction}
            isSuccess={successFlag}
            isContinue={childToParent}
            type="heritage"
          />
        </div>
      </div>
    </main>
  );
};
