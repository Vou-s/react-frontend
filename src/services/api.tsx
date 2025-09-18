import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  // baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const getSnapToken = async (orderId: number) => {
  const res = await api.get(`/midtrans/token/${orderId}`);
  return res.data.token;
};

export const fetchCategories = () => api.get("/categories");
export const fetchSubcategories = (categoryId: number) => api.get(`/categories/${categoryId}/subcategories`);
export const fetchProducts = () => api.get("/products");

export default api;
