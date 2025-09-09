import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env?.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true,   // ⬅️ ini penting kalau pakai Sanctum / cookie
});


// Rest of your code...
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // console.log("➡️ Request to:", config.baseURL + config.url);
  // console.log("➡️ Using token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api