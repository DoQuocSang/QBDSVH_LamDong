import axios from 'axios';
import { get_api, post_api_return_data } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getPanoramaImageById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/panorama-image/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getPanoramaImages(
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    // return get_api(`http://localhost:8080/api/v1/panorama-image?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    return get_api(`http://localhost:8080/api/v1/panorama-image/group`)
}

export function deletePanoramaImageById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/panorama-image/${id}`)
}

export function addPanoramaImage(
    formData
    ) {
    return post_api_return_data(`http://localhost:8080/api/v1/panorama-image`, formData);
}

export function putPanoramaImage(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/panorama-image/${id}`, formData);
}

