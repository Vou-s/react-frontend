import api from './api';

export const getUsers = () => api.get('/users');
export const getUser = (id: number) => api.get(`/users/${id}`);
export const createUser = (payload: { name: string; email: string; password: string }) =>
  api.post('/users', payload);
export const updateUser = (id: number, payload: Partial<{ name: string; email: string; password: string }>) =>
  api.put(`/users/${id}`, payload);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);
