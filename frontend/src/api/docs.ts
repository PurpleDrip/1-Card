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