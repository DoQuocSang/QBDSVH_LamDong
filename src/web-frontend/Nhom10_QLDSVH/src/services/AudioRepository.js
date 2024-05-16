import axios from 'axios';
import { get_api, post_api_return_data } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getAudioById(
    id = 0,
    ) {    
    return get_api(`http://localhost:8080/api/v1/audio/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getAudios() {    
    return get_api(`http://localhost:8080/api/v1/audio/group`)
}

export function deleteAudioById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:8080/api/v1/audio/${id}`)
}

export function addAudio(
    formData
    ) {
    return post_api_return_data(`http://localhost:8080/api/v1/audio`, formData);
}

export function putAudio(
    id = 0,
    formData
    ) {
    return put_api(`http://localhost:8080/api/v1/audio/${id}`, formData);
}

