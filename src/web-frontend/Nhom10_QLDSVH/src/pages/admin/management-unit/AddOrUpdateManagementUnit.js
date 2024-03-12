import React, { useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle, faCircleNotch, faPenToSquare, faPencil, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { AddOrUpdateText, getFileNameFromURL } from "../../../components/utils/Utils";
import { generateSlug } from "../../../components/utils/Utils";
import { getManagementUnitById, putManagementUnitImage360 } from "../../../services/ManagementUnitRepository";

import { addManagementUnit } from "../../../services/ManagementUnitRepository";
import { putManagementUnit } from "../../../services/ManagementUnitRepository";
import NotificationModal from "../../../components/admin/modal/NotificationModal";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";

import { useDropzone } from "react-dropzone";
import { storage } from "../../../firebase.js"
import { v4 as uuidv4 } from 'uuid';
import img1 from "../../../images/book1.png"
import img2 from "../../../images/book2.jpg"
import img3 from "../../../images/book3.jpg"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import PanoramaViewer from "./PanoramaViewer";

export default ({ type = "" }) => {
    document.title = 'Thêm/Cập nhật đơn vị quản lý';

    let mainText = AddOrUpdateText(type, "đơn vị quản lý");
    const initialState = {
        id: 0,
        name: '',
        urlslug: '',
        image_url: '',
        image_360_url: '',
        note: '',
        address: '',
        description: '',
        short_description: '',
    }, [managementUnit, setManagementUnit] = useState(initialState);
    const [successFlag, SetSuccessFlag] = useState(false);
    const [errors, setErrors] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadProgressVisible, setUploadProgressVisible] = useState(false);
    const [isPanoramaViewerOpen, setIsPanoramaViewerOpen] = useState(false);
    const [uploadSectionVisible, setUploadSectionVisible] = useState(false);
    localStorage.setItem('image360url', managementUnit.image_360_url);

    let { id } = useParams();
    id = id ?? 0;
    //console.log(id);

    let maintAction = '';
    if (id === 0) {
        maintAction = 'thêm';
    }
    else {
        maintAction = 'cập nhật';
    }

    useEffect(() => {
        document.title = "Thêm/ cập nhật đơn vị quản lý";

        if(managementUnit.image_360_url === "" || managementUnit.image_360_url === null){
            setUploadSectionVisible(true);
            console.log(uploadSectionVisible)
        }

        if (id !== 0) {
            getManagementUnitById(id).then(data => {
                if (data)
                    setManagementUnit({
                        ...data,
                    });
                else
                    setManagementUnit(initialState);
                console.log(data);
            })
        }

        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('fileInput');

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('border-blue-500', 'border-2');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('border-blue-500', 'border-2');
        });

    }, [])

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
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    //validate lỗi bổ trống
    const validateAllInput = () => {
        const validationErrors = {};
        const validationEmpty = {};

        if (managementUnit.name.trim() === '') {
            validationErrors.name = 'Vui lòng nhập tên đơn vị quản lý';
        }

        if (managementUnit.urlslug.trim() === '') {
            validationErrors.urlslug = 'Slug chưa được tạo';
        }

        // if (managementUnit.image_url.trim() === '') {
        //     validationErrors.image_url = 'Vui lòng nhập link ảnh';
        // }

        if (managementUnit.address.trim() === '') {
            validationErrors.address = 'Vui lòng nhập địa chỉ';
        }

        // if (managementUnit.note.trim() === '') {
        //     validationErrors.note = 'Vui lòng nhập ghi chú';
        // }

        if (managementUnit.short_description.trim() === '') {
            validationErrors.short_description = 'Vui lòng nhập mô tả ngắn';
        }

        if (managementUnit.description.trim() === '') {
            validationErrors.description = 'Vui lòng nhập mô tả chi tiết';
        }

        setErrors(validationErrors);
        // Kiểm tra nếu có lỗi
        if (Object.keys(validationErrors).length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleSubmit = () => {
        // Nếu không có lỗi mới xóa hoặc cập nhật
        if (validateAllInput() === false) {
            if (id === 0) {
                addManagementUnit(managementUnit).then(data => {
                    SetSuccessFlag(data);
                    //console.log(data);
                });
            }
            else {
                putManagementUnit(id, managementUnit).then(data => {
                    SetSuccessFlag(data);
                    //console.log(data);
                });
            }
        }
    }

    //Xử lý khi bấm xóa bên component con NotificationModal
    const childToParent = (isContinue) => {
        if (isContinue === true && id === 0) {
            setManagementUnit(initialState);
            // Reset flag sau khi thêm thành công
            setTimeout(() => { SetSuccessFlag(false); }, 1000)
        }
    }

    const canvasRef = useRef(null);

    const export360Image = async () => {
        setUploadProgressVisible(true);
        setUploadSectionVisible(false);
        // Replace these paths with the paths to your input images
        const imagePaths = uploadedFiles.map((file) => URL.createObjectURL(file));

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load images
        const images = await Promise.all(imagePaths.map(async (path) => {
            const img = new Image();
            img.src = path;
            await img.decode(); // Ensure the image is fully loaded
            return img;
        }));

        // Set canvas size based on the total width of the images
        const totalWidth = images.reduce((acc, img) => acc + img.width, 0);
        canvas.width = totalWidth;
        const minHeight = Math.min(...images.map(img => img.height));
        canvas.height = minHeight;
        canvas.height = images[0].height;

        // Draw images on the canvas
        let offsetX = 0;
        images.forEach((img) => {
            ctx.drawImage(img, offsetX, 0);
            offsetX += img.width;
        });

        // Convert canvas to data URL
        const panoramaDataURL = canvas.toDataURL('image/jpeg');

        // Create a Blob from the data URL
        const panoramaBlob = await fetch(panoramaDataURL).then((res) => res.blob());

        // Generate a unique filename
        const uniqueId = uuidv4();
        const modifiedFileName = `panorama_${uniqueId}.jpg`;

        // Set the reference path in Firebase Storage
        const storageRef = ref(storage, `panoramas/${modifiedFileName}`);

        // Upload the file and manually track the progress
        const uploadTask = uploadBytesResumable(storageRef, panoramaBlob);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Error during upload:', error);
            },
            async () => {
                try {
                    // Get the download URL after successful upload
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    setManagementUnit((prevManagementUnit) => ({
                        ...prevManagementUnit,
                        image_360_url: downloadURL,
                    }));

                    alert('Upload file thành công');
                    console.log('Panorama uploaded to Firebase Storage:', downloadURL);

                    putManagementUnitImage360(id, { image_360_url: downloadURL }).then(data => {
                        console.log(data);
                    });
                } catch (error) {
                    alert('Có lỗi khi upload file');
                    console.error('Error getting download URL:', error);
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
        var ModelName = getFileNameFromURL(managementUnit.image_360_url, 'panoramas%2F');
        if (ModelName) {
            // Create a reference to the file in storage
            const storageRef = ref(storage, `panoramas/${ModelName}`);
            console.log("File hiện tại: " + ModelName);

            // Delete the file from storage
            deleteObject(storageRef)
                .then(() => {
                    alert("Xóa file thành công");
                    console.log('File deleted successfully');

                    // Remove the item from localStorage
                    // localStorage.removeItem("yourLocalStorageKey");
                })
                .catch((error) => {
                    alert("Có lỗi khi xóa file");
                    console.error('Error deleting file:', error);
                });
        }

        // Clear the uploaded file and reset model_360_url in state
        setUploadedFiles([]);
        setManagementUnit((prevData) => ({
            ...prevData,
            image_360_url: '',
        }));

        putManagementUnitImage360(id, { image_360_url: '' }).then(data => {
            console.log(data);
        });
    };

    const handleOpenPanoramaViewer = () => {
        setIsPanoramaViewerOpen(true);
    };

    const handleClosePanoramaViewer = () => {
        setIsPanoramaViewerOpen(false);
    };

    return (
        <main>
            <div className="mt-12 px-4">
                <div className="bg-white editor mx-auto flex w-10/12 max-w-2xl flex-col p-6 text-gray-800 shadow-lg mb-12 rounded-lg border-t-4 border-purple-400">
                    <div className="flex mb-4 items-center space-x-5">
                        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                            <h2 className="leading-relaxed">{mainText.headingText}</h2>
                            <p className="text-sm text-gray-500 font-normal leading-relaxed">Vui lòng điền vào các ô bên dưới</p>
                        </div>
                    </div>
                    <h2 className="font-semibold text-sm text-teal-500">
                        Tên đơn vị quản lý
                    </h2>
                    <input
                        name="name"
                        required
                        type="text"
                        value={managementUnit.name || ''}
                        onChange={e => setManagementUnit({
                            ...managementUnit,
                            name: e.target.value,
                            urlslug: generateSlug(e.target.value),
                        })}
                        placeholder="Nhập tên di sản"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.name &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.name}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        UrlSlug
                    </h2>
                    <input
                        name="urlslug"
                        required
                        type="text"
                        value={managementUnit.urlslug || ''}
                        // onChange={e => setHeritage({
                        //     ...heritage,
                        //     UrlSlug: e.target.value
                        // })}
                        placeholder="Nhập định danh slug"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.urlslug &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.urlslug}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Địa chỉ
                    </h2>
                    <input
                        name="address"
                        required
                        type="text"
                        value={managementUnit.address || ''}
                        onChange={e => setManagementUnit({
                            ...managementUnit,
                            address: e.target.value
                        })}
                        placeholder="Nhập địa chỉ"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.address &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.address}
                        </p>
                    }


                    <h2 className="font-semibold text-sm text-teal-500">
                        Mô tả ngắn
                    </h2>
                    <textarea
                        name="short_description"
                        required
                        type="text"
                        value={managementUnit.short_description || ''}
                        onChange={e => setManagementUnit({
                            ...managementUnit,
                            short_description: e.target.value
                        })}
                        placeholder="Nhập mô tả ngắn"
                        className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" spellcheck="false" ></textarea>
                    {errors.short_description &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.short_description}
                        </p>
                    }


                    <h2 className="font-semibold text-sm text-teal-500">
                        Mô tả chi tiết
                    </h2>
                    <textarea
                        name="description"
                        required
                        type="text"
                        value={managementUnit.description || ''}
                        onChange={e => setManagementUnit({
                            ...managementUnit,
                            description: e.target.value
                        })}
                        placeholder="Nhập mô tả chi tiết"
                        className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" spellcheck="false" ></textarea>
                    {errors.description &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.description}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Ghi chú
                    </h2>
                    <input
                        name="note"
                        required
                        type="text"
                        value={managementUnit.note || ''}
                        onChange={e => setManagementUnit({
                            ...managementUnit,
                            note: e.target.value
                        })}
                        placeholder="Nhập ghi chú"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {/* {errors.note &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
                            {errors.note}
                        </p>
                    } */}

                    <h2 className="font-semibold text-sm text-teal-500">
                        Hình ảnh
                    </h2>
                    <input
                        name="image_url"
                        required
                        type="text"
                        value={managementUnit.image_url || ''}
                        onChange={e => setManagementUnit({
                            ...managementUnit,
                            image_url: e.target.value,
                        })}
                        placeholder="Nhập link ảnh"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {/* {errors.image_url &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.image_url}
                        </p>
                    } */}

                    {!isEmptyOrSpaces(managementUnit.image_url) && <>
                        <p className="text-gray-600 mb-4 text-center">Ảnh hiện tại</p>
                        <img src={managementUnit.image_url} className="w-full h-auto mb-4 rounded-lg" />
                    </>}

                    <h2 className="font-semibold text-sm text-teal-500">
                        Ảnh 360
                    </h2>
                    <div>
                        <div className="" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                            {!uploadSectionVisible && uploadedFiles.length > 0 &&
                                (
                                    <h2 className="font-semibold mt-4 text-xs text-gray-500 bg-gray-100 px-4 py-2 border-l-4 border-amber-500">
                                        Các ảnh ban đầu
                                    </h2>
                                )
                            }
                            <div className={(uploadSectionVisible && !managementUnit.image_360_url) ? "mt-4 bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md" : "hidden"} id="dropzone">
                                <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
                                    <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    <span className="text-gray-600">Kéo thả file tại đây</span>
                                    <span className="text-gray-500 text-sm">(hoặc click để chọn ảnh)</span>
                                </label>
                                <input type="file" id="fileInput" className="hidden" multiple onChange={handleFileInputChange} />
                            </div>

                            <div className="mt-6 text-center" id="fileList">
                                <div className="grid-container grid grid-cols-5 gap-4">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="grid-item relative pt-[100%] overflow-hidden relative flex flex-col items-center text-center bg-gray-100 border rounded">
                                            <img src={URL.createObjectURL(file)} alt={`Image ${index}`} className="absolute inset-0 z-0 w-full h-full object-cover border-4 border-white" />
                                            <button
                                                className='absolute top-0 z-10 right-0 px-2 py-1 cursor-pointer text-white bg-white rounded'
                                                onClick={() => handleRemoveFile(index)}
                                            >
                                                <FontAwesomeIcon className="text-xs text-gray-500" icon={faTrash} />
                                            </button>
                                            <div class="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                                                <span class="w-full font-bold text-gray-900 truncate"
                                                    x-text="files[index].name">{file.name}</span>
                                                <span class="text-xs text-gray-900">{formatBytes(file.size)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {uploadedFiles.length > 0 && (
                                <>
                                    <div className="flex justify-between items-center mb-4 border-t-2 border-gray-100 mt-4 py-2">
                                        <span className="font-semibold text-gray-600 text-sm">Tổng số file: {uploadedFiles.length}</span>
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
                        {(managementUnit.image_360_url || !uploadSectionVisible) && (
                                <div className="mb-5 rounded-lg bg-[#F5F7FB] py-4 px-8 border-l-4 border-purple-400">
                                    <div className="flex items-center justify-between">
                                        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                                            {managementUnit.image_360_url ? getFileNameFromURL(managementUnit.image_360_url, 'panoramas%2F') : "Đang tạo ảnh 360..."}
                                        </span>
                                        <button className="text-[#07074D]" onClick={clearImageFile}>
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

                        {managementUnit.image_360_url && (
                            isPanoramaViewerOpen ? (
                                <button
                                    onClick={handleClosePanoramaViewer}
                                    className="btn mx-auto text-sm flex justify-center rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                                    Thu gọn
                                </button>
                            )
                                :
                                (
                                    <button
                                        onClick={handleOpenPanoramaViewer}
                                        className="btn mx-auto text-sm flex justify-center rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                                        Xem ảnh 360 hiện tại
                                    </button>
                                )
                        )}

                        <PanoramaViewer title={managementUnit.name} isOpen={isPanoramaViewerOpen}/>
                    </div>

                    <div className="buttons flex mt-4">
                        <hr className="mt-4" />
                        <Link to="/admin/dashboard/all-management-unit" className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                            Hủy
                        </Link>
                        <button id="notification_buttonmodal" onClick={() => { handleSubmit() }} type="submit" className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white">
                            {mainText.buttonText}
                        </button>
                    </div>

                    <NotificationModal mainAction={maintAction} isSuccess={successFlag} isContinue={childToParent} type="management-unit" />
                </div>

            </div>
        </main>
    );
}
