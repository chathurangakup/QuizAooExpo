// api/auth.api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.8.176:4000/api", // later change
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - 401");
    }
    return Promise.reject(error);
  }
);

export default api;
