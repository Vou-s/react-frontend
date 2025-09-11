import api from './api';

export const login = (payload: { email: string; password: string }) =>
  api.post('/auth/login', payload);

export const register = (payload: { name: string; email: string; password: string }) =>
  api.post('/auth/register', payload);

export const logout = () => api.post('/auth/logout');

export const refresh = () => api.post('/auth/refresh');

export const me = () => api.get('/auth/me');
