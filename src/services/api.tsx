import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Optional: intercept request to add token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token'); // atau session storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
