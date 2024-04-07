import axios from 'axios';

export async function get_api(your_api) {
    try {
        const response = await axios.get(your_api); 
        //console.log(response);
        if(response.status === 200){
          return response.data.data
        }
        else{
          return null
        }
        
      } catch (error) {
        console.log('Error', error.message);
      }
}

export async function delete_api(your_api) {
  try {
      const response = await axios.delete(your_api); 
      return response.data.success;
      
    } catch (error) {
      console.log('Error', error.message);
    }
}

export async function post_api(your_api, formData) {
  try {
      const response = await axios.post(your_api, formData); 
      console.log(response)
      return response.data.success;

    } catch (error) {
      console.log('Error', error.message);
    }
}

export async function put_api(your_api, formData) {
  try {
      const response = await axios.put(your_api, formData); 
      // console.log(formData);
      // console.log(response);
      return response.data.success;
      
    } catch (error) {
      console.log('Error', error.message);
    }
}

//==========================================================
export async function simple_get_api(your_api) {
    try {
        const response = await axios.get(your_api); 
        if(response.request.status === 200){
          return response.data
        }
        else{
          return null
        }
        
      } catch (error) {
        console.log('Error', error.message);
      }
}

export async function post_api_return_data(your_api, formData) {
  try {
      const response = await axios.post(your_api, formData); 
      console.log(response)
      return response.data;

    } catch (error) {
      console.log('Error', error.message);
    }
}