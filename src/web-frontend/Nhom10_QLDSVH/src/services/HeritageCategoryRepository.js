import axios from 'axios';
import { get_api } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getHeritageCategoryById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-category/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritageCategoryBySlug(
    slug = "",
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-category/slug/${slug}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritageCategories(
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-category?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function deleteHeritageCategoryById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/heritage-category/${id}`)
}

export function addHeritageCategory(
    formData
    ) {
    return post_api(`http://localhost:8080/api/v1/heritage-category`, formData);
}

export function patchHeritageCategory(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/heritage-category/${id}`, formData);
}

export function getHeritagesByCategorySlug(
    slug = "",
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-category/slug/${slug}/heritages/paged?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
}

export function getHeritageCategoriesByQuerySearch(
    key = "",
    column = "name",
    page = 1,
    limit = 30
    ) {    
    return get_api(`http://localhost:8080/api/v1/heritage-category/search?Key=${key}&page=${page}&limit=${limit}&column=${column}`)
}