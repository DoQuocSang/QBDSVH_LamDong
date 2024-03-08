import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getHeritageCategories } from "services/HeritageCategoryRepository";

import { isEmptyOrSpaces } from "../../../components/utils/Utils";
import DefaultImage from "images/post-default.png"
import Error404 from "../../../components/admin/other/Error404";
import DeleteModal from "../../../components/admin/modal/DeleteModal";
import SearchInput from "../../../components/admin/other/SearchInput";
import { getHeritageCategoriesByQuerySearch } from "../../../services/HeritageCategoryRepository";

export default () => {
    document.title = 'Quản lý hình thức';

    const [heritageCategoryList, setHeritageCategoryList] = useState([]);
    const [deleteId, setDeleteId] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const [searchColumn, setSearchColumn] = useState("name");


    //Xử lý khi bấm xóa bên component con DeleteModal
    const childToParent = (isDelete) => {
        if (isDelete === true && deleteId !== 0) {
            setHeritageCategoryList(heritageCategoryList.filter(item => item.id !== deleteId));
        }
        console.log(heritageCategoryList.length)
    }

    const handleSearch = () => {
        if (isEmptyOrSpaces(searchKey)) {
            getHeritageCategories(1, 30)
                .then(data => {
                    if (data) {
                        setHeritageCategoryList(data.data);
                    } else {
                        setHeritageCategoryList([]);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setHeritageCategoryList([]);
                });
        } else {
            getHeritageCategoriesByQuerySearch(searchKey, searchColumn, 1, 30)
                .then(data => {
                    if (data) {
                        setHeritageCategoryList(data.data);
                    } else {
                        setHeritageCategoryList([]);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setHeritageCategoryList([]);
                });
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        getHeritageCategories().then(data => {
            if (data) {
                setHeritageCategoryList(data.data);
            }
            else
                setHeritageCategoryList([]);
            console.log(data)
        })
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id)
    }

    return (
        <>
            <main>
                <div className="pt-6 px-4">
                    {/* <div className="mb-4 w-full grid grid-cols-4 gap-4">
                        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full shadow-sm rounded-xl">
                            <div className="px-6">
                                <div className="text-center py-6">
                                    <FontAwesomeIcon className="text-3xl" icon={faChartPie} />
                                    <h3 className="text-2xl text-slate-600 font-bold leading-normal my-1">12</h3>
                                    <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                                        Tổng số di sản
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full shadow-sm rounded-xl">
                            <div className="px-6">
                                <div className="text-center py-6">
                                    <FontAwesomeIcon className="text-emerald-500 text-3xl" icon={faLaughBeam} />
                                    <h3 className="text-2xl text-slate-600 font-bold leading-normal my-1">03</h3>
                                    <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                                        Di sản đang bảo tồn
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full shadow-sm rounded-xl">
                            <div className="px-6">
                                <div className="text-center py-6">
                                    <FontAwesomeIcon className="text-amber-500 text-3xl" icon={faTired} />
                                    <h3 className="text-2xl text-slate-600 font-bold leading-normal my-1">02</h3>
                                    <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                                        Di sản bị đe dọa
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full shadow-sm rounded-xl">
                            <div className="px-6">
                                <div className="text-center py-6">
                                    <FontAwesomeIcon className="text-red-500 text-3xl" icon={faDizzy} />
                                    <h3 className="text-2xl text-slate-600 font-bold leading-normal my-1">04</h3>
                                    <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                                        Di sản có nguy cơ biến mất
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> */}
                    <div className="w-full mb-8">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Quản lý hình thức di sản
                                    </h3>
                                    <span className="text-base font-normal text-gray-500">Các hình thức di sản hiện có trong database</span>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="/admin/dashboard/add-heritage-category">
                                        <a className="hidden transition duration-300 sm:inline-flex ml-5 text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                                            <FontAwesomeIcon icon={faPlus} className="text-base mr-3" />
                                            Thêm
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="overflow-x-auto rounded-lg">
                                    <div className="align-middle inline-block min-w-full">
                                        <div className="shadow overflow-hidden sm:rounded-lg">
                                            <div className="mb-6 bg-white">
                                                <div className="flex items-center justify-start">
                                                    <SearchInput
                                                        searchKey={searchKey}
                                                        setSearchKey={setSearchKey}
                                                        handleSearch={handleSearch}
                                                        handleKeyPress={handleKeyPress}
                                                    />
                                                </div>
                                            </div>
                                            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                                                <thead className="bg-gray-200">
                                                    <tr>
                                                        <th scope="col" className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            STT
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Tên hình thức di sản
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Mô tả
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Sửa
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Xóa
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                    {heritageCategoryList.map((item, index) => (
                                                        <tr className={index % 2 !== 0 && "bg-gray-100"}>
                                                            <td className="p-4 text-center text-sm font-bold text-gray-500">
                                                                {index + 1}
                                                            </td>
                                                            <td className="p-4 text-sm font-semibold text-gray-500">
                                                                {item.name}
                                                            </td>
                                                            <td className="p-4 text-sm font-normal text-gray-500 align-middle">
                                                                {item.description}
                                                            </td>
                                                            <th scope="col" className="p-4 text-left text-xl font-semibold text-emerald-400 uppercase tracking-wider hover:text-emerald-600 transition duration-75">
                                                                <Link to={`/admin/dashboard/update-heritage-category/${item.id}`}>
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </Link>
                                                            </th>
                                                            <th scope="col" onClick={() => handleDelete(item.id)} className="delete_buttonmodal cursor-pointer p-4 text-left text-xl font-semibold text-red-400 uppercase tracking-wider hover:text-red-600 transition duration-75">
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </th>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {heritageCategoryList.length === 0 ?
                                                <Error404 />
                                                :
                                                <DeleteModal deleteId={deleteId} isDelete={childToParent} type="heritage-category" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

