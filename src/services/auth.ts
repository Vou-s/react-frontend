import api from './api';


export const login = (payload: { email: string; password: string }) => api.post('/login', payload);
export const register = (payload: { name: string; email: string; password: string }) => api.post('/register', payload);
export const me = () => api.get('/me');