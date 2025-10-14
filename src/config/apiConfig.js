import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || null;

  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("asd", config);
  return config;
});

export default api;