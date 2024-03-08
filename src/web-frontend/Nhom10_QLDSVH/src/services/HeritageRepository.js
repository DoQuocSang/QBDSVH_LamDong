import axios from 'axios';
import { get_api } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getHeritageById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritageWithDetailBySlug(
    slug = '',
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage/full-info/slug/${slug}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}


export function getHeritageWithDetailById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage/full-info/id/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function increaseViewCount(
    slug = '',
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage/increase-view-count/${slug}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritages(
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`http://localhost:3000/v1/heritage?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getRelatedHeritagesBySlug(
    slug = '',
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage/related/${slug}?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`http://localhost:3000/v1/heritage?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritagesForGallery(
    page = 1,
    limit = 30,
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage/gallery?page=${page}&limit=${limit}`)
    // return get_api(`http://localhost:3000/v1/heritage?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getRandomHeritages(
    limit = 3
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage/random?limit=${limit}`)
    // return get_api(`http://localhost:3000/v1/heritage?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}


export function deleteHeritageById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/heritage/${id}`)
}

export function addHeritage(
    formData
    ) {
    return post_api(`http://localhost:8080/api/v1/heritage`, formData);
}

export function addHeritageWithParagraphs(
    formData
    ) {
    return post_api(`http://localhost:8080/api/v1/heritage/full-info`, formData);
}

export function putHeritage(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/heritage/${id}`, formData);
}

export function putHeritageWithParagraphs(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/heritage/full-info/${id}`, formData);
}

export function getHeritagesByQuerySearch(
    key = "",
    column = "name",
    page = 1,
    limit = 30
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage/search?Key=${key}&page=${page}&limit=${limit}&column=${column}`)
}




