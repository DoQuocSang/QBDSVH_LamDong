import axios from 'axios';
import { get_api, post_api_return_data } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { put_api } from './Method';

export function getAllHotspotsInMapByManagementUnitID(
    id = 0,
    ) {     
    return get_api(`http://localhost:8080/api/v1/hotspots-map/by-management-unit/${id}`)
}
