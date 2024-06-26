import {
  faAdd,
  faDownload,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  calculateTotalSizePercent,
  convertSize,
  formatDate,
  getFileNameFromURL,
  upperCaseFirstCharacter,
} from "components/utils/Utils";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  deleteUploadFileById,
  getUploadFiles,
} from "services/UploadFileRepository";
import ThumbnailDefault from "../../../images/post-default-full.png";
import { storage } from "../../../firebase.js";
import { ref, deleteObject } from "firebase/storage";
import Error404 from "components/admin/other/Error404";
import DeleteModal from "components/admin/modal/DeleteModal";

export default () => {
  document.title = "Quản lý file phương tiện";
  const [modelList, setModelList] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [totalSizePercent, setTotalSizePercent] = useState(null);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteModelUrl, setDeleteModelUrl] = useState(null);
  const [deleteThumbnailUrl, setDeleteThumbnailUrl] = useState(null);

  //Xử lý khi bấm xóa bên component con DeleteModal
  const childToParent = (isDelete) => {
    if (isDelete === true && deleteId !== 0) {
      // Lọc danh sách và cập nhật lại danh sách chính
      const updatedModelList = modelList.map((item) => {
        item.files = item.files.filter((file) => file.id !== deleteId);
        return item;
      });
      setModelList(updatedModelList);

      // Cập nhật tổng kích thước và % tổng kích thước
      let totalSize = 0;

      updatedModelList.forEach((item) => {
        item.files.forEach((file) => {
          totalSize += file.size;
        });
      });

      setTotalSizePercent(calculateTotalSizePercent(totalSize));
      setTotalSize(totalSize);
    }
    // console.log(convertSize(totalSize))
  };

  const handleDelete = (id, file_url, thumbnail_url) => {
    setDeleteId(id);
    setDeleteModelUrl(file_url);
    setDeleteThumbnailUrl(thumbnail_url);
  };

  useEffect(() => {
    getUploadFiles().then((data) => {
      if (data) {
        if (data.data !== null) {
          setModelList(data.data);
        }

        setTotalSize(data.total_size);
        setTotalSizePercent(calculateTotalSizePercent(data.total_size));
      } else {
        setModelList([]);
      }
      // console.log(Math.round((data.total_size / (1024 * 1024 * 1024)) * 100))
      // console.log(totalSizePercent)
    });
  }, []);
  // console.log(totalSizePercent)

  // const temp = 'w-[30%]';

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex justify-end my-4">
          <div className="w-56 mx-2">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="text-xs font-medium text-gray-600">Đã dùng</p>
                <p className="text-xs font-medium text-gray-600">
                  <span className="text-emerald-500">
                    {convertSize(totalSize)}
                  </span>{" "}
                  / 1 GB
                </p>
              </div>
              <div className="mt-1 flex h-2 w-full items-center rounded-full bg-blue-200">
                <span
                  style={{ width: totalSizePercent }}
                  className="h-full rounded-full bg-blue-500"
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <a className="hidden transition duration-300 sm:inline-flex mx-1 cursor-pointer text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-xs px-4 py-2 text-center items-center">
            <FontAwesomeIcon icon={faUpload} className="text-base mr-3" />
            Thêm file
          </a>
          <a className="hidden transition duration-300 sm:inline-flex mx-1 cursor-pointer text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-xs px-4 py-2 text-center items-center">
            <FontAwesomeIcon icon={faTrash} className="text-base mr-3" />
            Xóa tất cả
          </a>
        </div>
      </div>

      {modelList.length > 0 &&
        modelList.map((item, index) => (
          <div className="mb-10">
            <div className="w-full flex items-center my-4">
              <div className="h-0.5 rounded-full bg-gray-200 flex-1"> </div>
              <span className="text-xs mx-4 text-gray-600 font-semibold">
                {formatDate(item.upload_date)}
              </span>
              <div className="h-0.5 rounded-full bg-gray-200 flex-1"> </div>
            </div>

            <div id="myTabContent">
              {/* <h2 className="mb-4 text-xl font-bold text-gray-600">File đã tải lên hệ thống</h2> */}
              <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4">
                {item.files.map((file, index) => (
                  <div className="flex flex-col overflow-hidden rounded p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative pb-[80%]">
                      {file.thumbnail_url ? (
                        <img
                          src={file.thumbnail_url}
                          alt=""
                          className="absolute top-0 right-0 inset-0 object-cover w-full h-full rounded"
                        />
                      ) : (
                        <img
                          src={ThumbnailDefault}
                          alt=""
                          className="absolute top-0 right-0 inset-0 z-10 object-cover w-full h-full rounded"
                        />
                      )}
                      <div className="absolute top-0 right-0 m-2 z-20">
                        {file.is_current_use === 1 && (
                          <span className="rounded-lg bg-red-400 px-2 py-1 text-xs font-medium text-white mr-1">
                            Đang dùng
                          </span>
                        )}
                        <span className="rounded-lg bg-blue-500 px-2 py-1 text-xs font-medium text-white mr-1">
                          .{file.extension}
                        </span>
                        <span className="rounded-lg bg-emerald-400 px-2 py-1 text-xs font-medium text-white">
                          {convertSize(file.size)}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 z-20 w-full rounded-b bg-gray-700 bg-opacity-70 px-3 py-2">
                        <h3 className="mb-2 text-sm font-medium text-white">
                          {file.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="mb-1 text-xs text-white">
                            Người tải lên:{" "}
                            {upperCaseFirstCharacter(file.user.user_name)}
                          </p>
                          <div className="relative z-40 flex items-center gap-2">
                            <a
                              className="text-orange-600 transition-all duration-300 hover:text-white cursor-pointer"
                              href={file.file_url}
                            >
                              <FontAwesomeIcon icon={faDownload} />
                            </a>
                            {file.is_current_use === 0 ? (
                              <p
                                className="delete_buttonmodal text-orange-600 transition-all duration-300 hover:text-white cursor-pointer"
                                onClick={() =>
                                  handleDelete(
                                    file.id,
                                    file.file_url,
                                    file.thumbnail_url
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </p>
                            )
                             : 
                             (
                              <p
                                className="text-gray-300 cursor-not-allowed"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

      {modelList.length === 0 ? (
        <Error404 />
      ) : (
        <DeleteModal
          deleteId={deleteId}
          deleteFileUrl={deleteModelUrl}
          deleteThumbnailUrl={deleteThumbnailUrl}
          isDelete={childToParent}
          type="model"
        />
      )}
    </>
  );
};
