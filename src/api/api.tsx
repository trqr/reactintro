import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api"});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//api.interceptors.response ...     if (code error/status)   throw toast... (message du back à afficher)
//custom decorator

export default api;