import api from './api';

export const getPayments = () => api.get('/payments');
export const getPayment = (id: number) => api.get(`/payments/${id}`);
export const createPayment = (payload: { order_id: number; amount: number; method: string; status?: string }) =>
  api.post('/payments', payload);
export const updatePayment = (id: number, payload: Partial<{ order_id: number; amount: number; method: string; status: string }>) =>
  api.put(`/payments/${id}`, payload);
export const deletePayment = (id: number) => api.delete(`/payments/${id}`);
