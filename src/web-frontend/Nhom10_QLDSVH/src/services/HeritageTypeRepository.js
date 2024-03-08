import axios from 'axios';
import { get_api } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getHeritageTypeById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-type/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritageTypeBySlug(
    slug = "",
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-type/slug/${slug}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritageTypes(
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-type?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function deleteHeritageTypeById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/heritage-type/${id}`)
}

export function addHeritageType(
    formData
    ) {
    return post_api(`http://localhost:8080/api/v1/heritage-type`, formData);
}

export function patchHeritageType(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/heritage-type/${id}`, formData);
}

export function getHeritagesByTypeSlug(
    slug = "",
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-type/slug/${slug}/heritages/paged?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
}

export function getHeritageTypesByQuerySearch(
    key = "",
    column = "name",
    page = 1,
    limit = 30
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-type/search?Key=${key}&page=${page}&limit=${limit}&column=${column}`)
}
