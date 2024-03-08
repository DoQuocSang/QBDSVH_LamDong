import React, { useEffect, useState } from "react";
import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle, faCircleNotch, faPenToSquare, faPencil, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { AddOrUpdateText } from "../../../components/utils/Utils";
import { generateSlug } from "../../../components/utils/Utils";
import { getManagementUnitById } from "../../../services/ManagementUnitRepository";

import { addManagementUnit } from "../../../services/ManagementUnitRepository";
import { putManagementUnit } from "../../../services/ManagementUnitRepository";
import NotificationModal from "../../../components/admin/modal/NotificationModal";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";



export default ({ type = "" }) => {
    document.title = 'Thêm/Cập nhật đơn vị quản lý';

    let mainText = AddOrUpdateText(type, "đơn vị quản lý");
    const initialState = {
        id: 0,
        name: '',
        urlslug: '',
        image_url: '',
        note: '',
        address: '',
        description: '',
        short_description: '',
    }, [managementUnit, setManagementUnit] = useState(initialState);
    const [successFlag, SetSuccessFlag] = useState(false);
    const [errors, setErrors] = useState({});

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
    }, [])

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


                    <div className="buttons flex">
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
