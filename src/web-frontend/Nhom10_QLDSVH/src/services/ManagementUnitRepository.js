import axios from 'axios';
import { get_api } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getManagementUnitById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/management-unit/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getManagementUnitBySlug(
    slug = "",
    ) {    
    return get_api(`http://localhost:8080/api/v1/management-unit/slug/${slug}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getManagementUnits(
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/management-unit?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`http://localhost:3000/v1/management-unit?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function deleteManagementUnitById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/management-unit/${id}`)
}

export function addManagementUnit(
    formData
    ) {
    return post_api(`http://localhost:8080/api/v1/management-unit`, formData);
}

export function putManagementUnit(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/management-unit/${id}`, formData);
}

export function getManagementUnitsByQuerySearch(
    key = "",
    column = "name",
    page = 1,
    limit = 30
    ) {    
    return get_api(`http://localhost:8080/api/v1/management-unit/search?Key=${key}&page=${page}&limit=${limit}&column=${column}`)
}

export function getHeritagesByManagementUnitSlug(
    slug = "",
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/management-unit/slug/${slug}/heritages/paged?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`http://localhost:3000/v1/location?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}





