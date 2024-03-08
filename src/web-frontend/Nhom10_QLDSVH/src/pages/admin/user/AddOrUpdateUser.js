import React, { useEffect, useState } from "react";
import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleNotch, faPenToSquare, faPencil, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { AddOrUpdateText } from "../../../components/utils/Utils";
import { generateSlug } from "../../../components/utils/Utils";
import { getUserById } from "../../../services/UserRepository";

import { addUser } from "../../../services/UserRepository";
import { putUser } from "../../../services/UserRepository";

import NotificationModal from "../../../components/admin/modal/NotificationModal";



export default ({ type = "" }) => {
    document.title = 'Thêm/Cập nhật tài khoản';

    let mainText = AddOrUpdateText(type, "tài khoản");
    const currentDate = new Date().toISOString().substring(0, 19) + 'Z';
    const initialState = {
        id: 0,
        user_name: '',
        password: '',
        permission: 0,
        subscribe_day: currentDate
    }, [user, setUser] = useState(initialState);
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
        document.title = "Thêm/ cập nhật tài khoản";

        if (id !== 0) {
            getUserById(id).then(data => {
                if (data)
                    setUser({
                        ...data,
                    });
                else
                    setUser(initialState);
                console.log(data);
            })
        }
    }, [])

    //validate lỗi bổ trống
    const validateAllInput = () => {
        const validationErrors = {};

        if (user.user_name.trim() === '') {
            validationErrors.user_name = 'Vui lòng nhập tên tài khoản';
        }

        if (user.password.trim() === '') {
            validationErrors.password = 'Vui lòng nhập mật khẩu';
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
                    console.log(user);

        if (validateAllInput() === false) {
            if (id === 0) {
                addUser(user).then(data => {
                    SetSuccessFlag(data);
                    //console.log(data);
                });
            }
            else {
                putUser(id, user).then(data => {
                    SetSuccessFlag(data);
                    //console.log(data);
                });
            }
        }
    }

    //Xử lý khi bấm xóa bên component con NotificationModal
    const childToParent = (isContinue) => {
        if (isContinue === true && id === 0) {
            setUser(initialState);
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
                        Tên tài khoản
                    </h2>
                    <input
                        name="name"
                        required
                        type="text"
                        value={user.user_name || ''}
                        onChange={e => setUser({
                            ...user,
                            user_name: e.target.value,
                        })}
                        placeholder="Nhập tên tài khoản"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.user_name &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.user_name}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Password
                    </h2>
                    <input
                        name="password"
                        required
                        type="text"
                        value={user.password || ''}
                        onChange={e => setUser({
                            ...user,
                            password: e.target.value
                        })}
                        placeholder="Nhập mật khẩu"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.password &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.password}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Quyền truy cập
                    </h2>
                    <input
                        name="permission"
                        required
                        type="text"
                        disabled
                        placeholder="Người dùng"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-300  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.permission &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.permission}
                        </p>
                    }

                    <div className="buttons flex">
                        <hr className="mt-4" />
                        <Link to="/admin/dashboard/all-user" className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                            Hủy
                        </Link>
                        <button id="notification_buttonmodal" onClick={() => { handleSubmit() }} type="submit" className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white">
                            {mainText.buttonText}
                        </button>
                    </div>

                    <NotificationModal mainAction={maintAction} isSuccess={successFlag} isContinue={childToParent} type="user" />
                </div>

            </div>
        </main>
    );
}
