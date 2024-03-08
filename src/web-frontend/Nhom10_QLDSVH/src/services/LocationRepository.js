import axios from 'axios';
import { get_api } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getLocationById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/location/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getLocationBySlug(
    slug = "",
    ) {    
    return get_api(`http://localhost:8080/api/v1/location/slug/${slug}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getLocations(
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/location?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`http://localhost:3000/v1/location?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function deleteLocationById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/location/${id}`)
}

export function addLocation(
    formData
    ) {
    return post_api(`http://localhost:8080/api/v1/location`, formData);
}

export function putLocation(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/location/${id}`, formData);
}

export function getLocationsByQuerySearch(
    key = "",
    column = "name",
    page = 1,
    limit = 30
    ) {    
    return get_api(`http://localhost:8080/api/v1/location/search?Key=${key}&page=${page}&limit=${limit}&column=${column}`)
}

export function getHeritagesByLocationSlug(
    slug = "",
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/location/slug/${slug}/heritages/paged?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`http://localhost:3000/v1/location?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}


