import axios from "axios";
import axiosInstance from "./axios"

export const validateDoc=(docType:string,file:File,NCid:string)=>{
    const formData= new FormData();
    const newUser=true;
    formData.append("docType", docType);
    formData.append("documentFile", file);
    formData.append("NCid", NCid);
    formData.append("newUser", newUser.toString());

    return axios.post("http://localhost:5000/api/v1/docs/validate-doc",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
    })
}

export const verifyUser=(address:string)=>{
    return axios.post("http://localhost:5000/api/v1/auth/verify-user",{address},{
        withCredentials:true
    })
}

export const appendCID=(address:string)=>{
    return axios.post("http://localhost:5000/api/v1/auth/append-cid",{address},{
        withCredentials:true
    })
}