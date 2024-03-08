import React, { useEffect, useState } from "react";
import { deleteHeritageById } from "../../../services/HeritageRepository";
import { deleteHeritageTypeById } from "../../../services/HeritageTypeRepository";
import { deleteLocationById } from "../../../services/LocationRepository";
import { deleteManagementUnitById } from "../../../services/ManagementUnitRepository";
import { deleteUserById } from "../../../services/UserRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { deleteHeritageCategoryById } from "../../../services/HeritageCategoryRepository";

export default ({ mainText = 'item', deleteId = 0, type='', isDelete }) => {
    const [changeContent, setChangeContent] = useState(false);

    useEffect(() => {
        const buttons = document.getElementsByClassName('delete_buttonmodal')
        const closebutton = document.getElementById('delete_closebutton')
        const modal = document.getElementById('delete_modal')
        Array.from(buttons).forEach((button) => {
            button.addEventListener('click', () => modal.classList.add('scale-100'))
        })
        closebutton.addEventListener('click', () => modal.classList.remove('scale-100'))
    }, []);

    const handleDelete = () => {
        if(type === 'heritage'){
            deleteHeritageById(deleteId).then(data => {
                //Ở đây Data có kiểu trả về là boolean
                //Gọi hàm isDelete để thực thi bên component cha AllHeritage  
                isDelete(data);
    
                //Thay đổi nội dung thông báo nếu xóa thành công
                setChangeContent(true);
                
                //console.log('di san van hoa')
            })
        }
        if(type === 'heritage-type'){
            deleteHeritageTypeById(deleteId).then(data => {
                //Ở đây Data có kiểu trả về là boolean
                //Gọi hàm isDelete để thực thi bên component cha AllHeritage  
                isDelete(data);
    
                //Thay đổi nội dung thông báo nếu xóa thành công
                setChangeContent(true);
            })
            //console.log('loai di san')
        }
        if(type === 'heritage-category'){
            deleteHeritageCategoryById(deleteId).then(data => {
                //Ở đây Data có kiểu trả về là boolean
                //Gọi hàm isDelete để thực thi bên component cha AllHeritage  
                isDelete(data);
    
                //Thay đổi nội dung thông báo nếu xóa thành công
                setChangeContent(true);
            })
            //console.log('loai di san')
        }
        if(type === 'location'){
            deleteLocationById(deleteId).then(data => {
                //Ở đây Data có kiểu trả về là boolean
                //Gọi hàm isDelete để thực thi bên component cha AllHeritage  
                isDelete(data);
    
                //Thay đổi nội dung thông báo nếu xóa thành công
                setChangeContent(true);
            })
            //console.log('loai di san')
        }
        if(type === 'management-unit'){
            deleteManagementUnitById(deleteId).then(data => {
                //Ở đây Data có kiểu trả về là boolean
                //Gọi hàm isDelete để thực thi bên component cha AllHeritage  
                isDelete(data);
    
                //Thay đổi nội dung thông báo nếu xóa thành công
                setChangeContent(true);
            })
            //console.log('loai di san')
        }
        if(type === 'user'){
            deleteUserById(deleteId).then(data => {
                //Ở đây Data có kiểu trả về là boolean
                //Gọi hàm isDelete để thực thi bên component cha AllHeritage  
                isDelete(data);
    
                //Thay đổi nội dung thông báo nếu xóa thành công
                setChangeContent(true);
            })
            //console.log('loai di san')
        }
    }

    return (
        <>
            <div id="delete_modal" className="transform scale-0 transition-transform duration-300 min-w-screen h-screen animated fadeIn fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" >
                <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                    <div className="">
                        <div className="text-center p-5 flex-auto justify-center">

                            {changeContent === false ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <h2 className="text-xl font-bold py-4 ">Xác nhận xóa</h2>
                                    <p className="text-sm text-gray-500 px-8">Bạn có chắc chắc là muốn xóa {mainText} này không?</p>
                                    <p className="text-sm text-gray-500 px-8">Vui lòng xác nhận để tiếp tục</p>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faCircleCheck} className="w-10 h-auto flex items-center text-teal-500 mx-auto" />
                                    <h2 className="text-xl font-bold py-4 ">Thông báo</h2>
                                    <p className="text-sm text-gray-500 px-8">Đã xóa thành công!</p>
                                </>
                            )}
                        </div>
                        <div className="p-3  mt-2 text-center space-x-4 md:block">
                            {changeContent === false ? (
                                <>
                                    <button id="delete_closebutton" className="mb-2 md:mb-0 bg-white px-10 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                        Hủy
                                    </button>
                                    <button onClick={() => handleDelete()} className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-10 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Xóa</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setTimeout(() => { setChangeContent(false); }, 500)} id="delete_closebutton" className="mb-2 md:mb-0 bg-teal-500 border border-teal-500 px-10 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-teal-600">
                                        Tiếp tục
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}