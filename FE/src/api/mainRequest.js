import axios from "axios";

const mainRequest = axios.create({
    baseURL: "http://localhost:8080/identity/",
    headers: {
        "Content-Type": "application/json",
    },
});

mainRequest.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default mainRequest;

