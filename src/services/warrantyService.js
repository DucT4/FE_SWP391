import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getWarrantyLookup = (vin) => API.get("/warranty/lookup", { params: { vin } });
export const getWarrantyHistory = (vin, page = 0, size = 5) =>
  API.get("/warranty/history", { params: { vin, page, size } });
