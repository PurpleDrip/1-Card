import axios from "axios";
import axiosInstance from "./axios"

export const validateDoc=(docType:string,file:File)=>{
    const formData= new FormData();
    formData.append("docType", docType);
    formData.append("documentFile", file);

    return axios.post("http://localhost:5000/api/v1/docs/validate-doc",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
    })
}

export const verifyUser=(address:string)=>{
    return axiosInstance.post(":5000/api/v1/auth/verify-user",address)
}

export const appendCID=(address:string)=>{
    return axiosInstance.post(":5000/api/v1/auth/append-cid",address)
}