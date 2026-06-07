import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 AUTO ATTACH TOKEN
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // ✅ FIXED

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;