import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/employees'

export const listOfEmployees =()=> axios.get(REST_API_BASE_URL)

export const createEmployee = (formData) =>
  axios.post(REST_API_BASE_URL+'/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  
export const getEmployee=(id, formData) => axios.get(REST_API_BASE_URL+'/'+id)


export const updateEmployee =(id,formData) => {
   return axios.put(`${REST_API_BASE_URL}/${id}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        },
    })
}


export const deleteEmployee =(id)=> axios.delete(REST_API_BASE_URL+'/'+id)
  