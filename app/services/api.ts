import axios from "axios";
import { getToken } from "../utils/storage";

const api = axios.create({
  baseURL: "http://192.168.1.112:4000/api",
  headers: {
    "Content-Type": "application/json", // ✅ ensures JSON requests
  },
  timeout: 10000, // optional, recommended
});

// 🔐 Request interceptor: attach token
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    console.log("Attaching token to request:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚫 Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - 401: token invalid or expired");
      // Optional: redirect to login or clear token
    }
    return Promise.reject(error);
  }
);

export default api;
