import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default () => {
    useEffect(() => {
        const button = document.getElementById('logout_buttonmodal');
        const closebutton = document.getElementById('logout_closebutton');
        const modal = document.getElementById('logout_modal');

        button.addEventListener('click', () => modal.classList.add('scale-100'));
        closebutton.addEventListener('click', () => modal.classList.remove('scale-100'));
    }, []);

    const navigate = useNavigate();

    const handleContinue = () => {
        localStorage.setItem("loggedInUsername", "");
        navigate("/admin");
    };

    return (
        <>
            <div id="logout_modal" className=" transform scale-0 transition-transform duration-300 min-w-screen h-screen animated fadeIn fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" >
                <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                    <div className="">
                        <div className="text-center p-5 flex-auto justify-center">
                            <span class="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                </svg>
                            </span>
                            <h2 className="text-xl font-bold py-4 ">Đăng xuất</h2>
                            <p className="text-sm text-gray-500 px-8">Bạn có chắc chắc là muốn đăng xuất không?</p>
                            <p className="text-sm text-gray-500 px-8">Vui lòng xác nhận để tiếp tục</p>
                        </div>
                        <div className="p-3 mt-2 text-center space-x-4 md:block">
                            <button id="logout_closebutton" className="mb-2 md:mb-0 bg-white px-10 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Không
                            </button>
                            <button onClick={() => handleContinue()} className="mb-2 md:mb-0 bg-teal-500 border border-teal-500 px-10 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-teal-600">Có</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}