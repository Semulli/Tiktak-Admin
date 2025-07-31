// services/api.ts
import axios from "axios";
import { refreshToken } from "./login";

const api = axios.create({
  baseURL: "https://api.sarkhanrahimli.dev/api/tiktak",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest); 
    }

    return Promise.reject(error);
  }
);

export default api;
