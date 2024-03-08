import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { upperCaseFirstCharacter } from "../../utils/Utils";

export default ({mainAction='text', mainText = 'item', type = '', isSuccess, isContinue }) => {
    useEffect(() => {
        const button = document.getElementById('notification_buttonmodal')
        const closebuttons = document.getElementsByClassName('notification_closebutton')
        const modal = document.getElementById('notification_modal')
        button.addEventListener('click', () => modal.classList.add('scale-100'))
        Array.from(closebuttons).forEach((button) => {
            button.addEventListener('click', () => modal.classList.remove('scale-100'))
        })
        //console.log(closebuttons)
    }, []);

    let page = '';
    if(type === 'heritage'){
        page = 'all-heritage';
    }
    if(type === 'heritage-type'){
        page = 'all-heritage-type';
    }
    if(type === 'heritage-category'){
        page = 'all-heritage-category';
    }
    if(type === 'location'){
        page = 'all-location';
    }
    if(type === 'management-unit'){
        page = 'all-management-unit';
    }
    if(type === 'user'){
        page = 'all-user';
    }

    const handleContinue = () => {
        isContinue(true);
    }

    return (
        <>
            <div id="notification_modal" className=" transform scale-0 transition-transform duration-300 min-w-screen h-screen animated fadeIn fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" >
                <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                    <div className="">
                        {isSuccess === true ? (
                            <>
                                <div className="text-center p-5 flex-auto justify-center">
                                    <FontAwesomeIcon icon={faCircleCheck} className="w-10 h-auto flex items-center text-teal-500 mx-auto" />
                                    <h2 className="text-xl font-bold py-4 ">Thông báo</h2>
                                    <p className="text-sm text-gray-500 px-8">Đã {mainAction} {mainText} thành công!</p>
                                    <p className="text-sm text-gray-500 px-8">Bạn có muốn tiếp tục {mainAction} {mainText} không?</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-center p-5 flex-auto justify-center">
                                    <FontAwesomeIcon icon={faCircleXmark} className="w-10 h-auto flex items-center text-red-500 mx-auto" />
                                    <h2 className="text-xl font-bold py-4 ">Thông báo</h2>
                                    <p className="text-sm text-gray-500 px-8">{upperCaseFirstCharacter(mainAction)} {mainText} không thành công!</p>
                                </div>
                            </>
                        )}
                        <div className="p-3 mt-2 text-center md:block">
                            <div className={isSuccess === true ? "space-x-4" : "hidden"}>
                                <Link to={`/admin/dashboard/${page}`} className="notification_closebutton mb-2 md:mb-0 bg-white px-10 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                    Xem danh sách
                                </Link>
                                <button onClick={() => handleContinue()} className="notification_closebutton mb-2 md:mb-0 bg-teal-500 border border-teal-500 px-10 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-teal-600">
                                    Tiếp tục {mainAction}
                                </button>
                            </div>
                            <div className={isSuccess === false ? "" : "hidden"}>
                                <button className="notification_closebutton mb-2 md:mb-0 bg-red-500 border border-red-500 px-10 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}