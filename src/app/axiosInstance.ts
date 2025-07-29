// src/shared/api/http.ts
import axios from "axios";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../../store";
// import { logoutUser } from "../../../features/auth/authActions";

// Tạo instance chung cho toàn app
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://staging-api.swa-pay.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: tự gắn token vào mọi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Interceptor: xử lý lỗi 401 (tuỳ chọn)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // const dispatch = useDispatch<AppDispatch>()

    // Có thể xử lý logout, redirect nếu bị 401
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Token may be expired.");
      // TODO: dispatch(logout()), redirect, hoặc refresh token
      // dispatch(logoutUser())
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
