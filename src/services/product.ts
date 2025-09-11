import api from './api';

export const getProducts = () => api.get('/products');
export const getProduct = (id: number) => api.get(`/products/${id}`);
export const createProduct = (payload: { name: string; description?: string; price: number; stock: number }) =>
  api.post('/products', payload);
export const updateProduct = (id: number, payload: Partial<{ name: string; description?: string; price: number; stock: number }>) =>
  api.put(`/products/${id}`, payload);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
