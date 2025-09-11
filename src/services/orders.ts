import api from './api';

export const getOrders = () => api.get('/orders');
export const getOrder = (id: number) => api.get(`/orders/${id}`);
export const createOrder = (payload: { user_id: number; total_amount: number; status?: string }) =>
  api.post('/orders', payload);
export const updateOrder = (id: number, payload: Partial<{ user_id: number; total_amount: number; status: string }>) =>
  api.put(`/orders/${id}`, payload);
export const deleteOrder = (id: number) => api.delete(`/orders/${id}`);
