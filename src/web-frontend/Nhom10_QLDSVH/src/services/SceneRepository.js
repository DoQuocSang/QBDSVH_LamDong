import axios from 'axios';
import { get_api, post_api_return_data } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getLastSceneId() {    
    return get_api(`http://localhost:8080/api/v1/scene/last-inserted-id`)
}

export function getScenes(
    id = 0,
    page = 1,
    limit = 30,
    columnName = "id",
    sortOrder = "DESC"
    ) {    
    return get_api(`http://localhost:8080/api/v1/scene/${id}?page=${page}&limit=${limit}&columnName=${columnName}&sortOrder=${sortOrder}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}
