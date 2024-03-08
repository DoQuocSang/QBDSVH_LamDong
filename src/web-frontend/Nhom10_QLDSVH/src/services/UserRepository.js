import axios from 'axios';
import { get_api } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getUserById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/user/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getUserByUserName(
    name = "",
    ) {    
    return get_api(`http://localhost:8080/api/v1/user/username/${name}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getUsers(
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/user?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`http://localhost:3000/v1/user?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function deleteUserById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/user/${id}`)
}

export function addUser(
    formData
    ) {
    return post_api(`http://localhost:8080/api/v1/user`, formData);
}

export function putUser(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/user/${id}`, formData);
}

export function getUsersByQuerySearch(
    key = "",
    column = "name",
    page = 1,
    limit = 30
    ) {    
    return get_api(`http://localhost:8080/api/v1/user/search?Key=${key}&page=${page}&limit=${limit}&column=${column}`)
}




