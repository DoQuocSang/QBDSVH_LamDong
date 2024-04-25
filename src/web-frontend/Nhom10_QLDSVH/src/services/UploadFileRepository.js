import axios from 'axios';
import { get_api, post_api_return_data } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getUploadFileById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/upload-file/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getUploadFiles(
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    // return get_api(`http://localhost:8080/api/v1/upload-file?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    return get_api(`http://localhost:8080/api/v1/upload-file/group`)
}

export function deleteUploadFileById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/upload-file/${id}`)
}

export function addUploadFile(
    formData
    ) {
    return post_api_return_data(`http://localhost:8080/api/v1/upload-file`, formData);
}

export function putUploadFile(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/upload-file/${id}`, formData);
}

