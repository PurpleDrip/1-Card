import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://localhost",
    withCredentials:true,
});

export default axiosInstance;