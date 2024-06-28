import { faAdd, faDownload, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calculateTotalSizePercent, convertSize, getFileNameFromURL, upperCaseFirstCharacter } from "components/utils/Utils";
import React, { useEffect, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { deleteUploadFileById, getUploadFiles } from "services/UploadFileRepository";
import ThumbnailDefault from '../../../images/post-default-full.png'
import { storage } from "../../../firebase.js"
import { ref, deleteObject } from 'firebase/storage';
import Error404 from "components/admin/other/Error404";
import DeleteModal from "components/admin/modal/DeleteModal";

export default () => {
    document.title = 'Quản lý file phương tiện';
    const [activeBtn, setActiveBtn] = useState(1);
    const location = useLocation().pathname; // React Hook

    useEffect(() => {
        if (location.includes('/model')) {
            setActiveBtn(1)
        }
        if (location.includes('/panorama-image')) {
            setActiveBtn(2)
        }
        if (location.includes('/audio')) {
            setActiveBtn(3)
        }

        window.scrollTo(0, 0);

    }, [])
    // console.log(totalSizePercent)
  
    // const temp = 'w-[30%]';

    return (
        <>
            <main>
                <div className="pt-6 px-4">
                    <div className="w-full mb-8">
                        <div className="bg-white shadow rounded-lg relative flex min-h-screen flex-col justify-start overflow-hidden p-4 sm:p-6 xl:p-8">
                            <div className="mx-auto w-full max-w-screen-xl">
                                <div className="border-b border-gray-200 dark:border-gray-700 mb-4 flex items-center justify-between">
                                    <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                        <li className="mr-2" role="presentation">
                                            <Link to="/admin/dashboard/all-media/model" onClick={() => setActiveBtn(1)}>
                                                <button className={activeBtn === 1 ? "inline-block text-red-500 hover:text-red-600 border-red-300 rounded-t-lg py-4 px-4 text-sm font-semibold text-center border-transparent border-b-2" : "inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-semibold text-center border-transparent border-b-2"}>
                                                    Model hiện vật
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="mr-2" role="presentation">
                                            <Link to="/admin/dashboard/all-media/panorama-image" onClick={() => setActiveBtn(2)}>
                                                <button className={activeBtn === 2 ? "inline-block text-red-500 hover:text-red-600 border-red-300 rounded-t-lg py-4 px-4 text-sm font-semibold text-center border-transparent border-b-2" : "inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-semibold text-center border-transparent border-b-2 active"}>
                                                    Ảnh 360
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="mr-2" role="presentation">
                                            <Link to="/admin/dashboard/all-media/audio" onClick={() => setActiveBtn(3)}>
                                                <button className={activeBtn === 3 ? "inline-block text-red-500 hover:text-red-600 border-red-300 rounded-t-lg py-4 px-4 text-sm font-semibold text-center border-transparent border-b-2" : "inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-semibold text-center border-transparent border-b-2 active"}>
                                                    Audio
                                                </button>
                                            </Link>
                                        </li>
                                    </ul>


                                </div>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

