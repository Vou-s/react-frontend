import api from './api';

export const getOrderItems = () => api.get('/order-items');
export const getOrderItem = (id: number) => api.get(`/order-items/${id}`);
export const createOrderItem = (payload: { order_id: number; product_id: number; quantity: number; price: number }) =>
  api.post('/order-items', payload);
export const updateOrderItem = (id: number, payload: Partial<{ order_id: number; product_id: number; quantity: number; price: number }>) =>
  api.put(`/order-items/${id}`, payload);
export const deleteOrderItem = (id: number) => api.delete(`/order-items/${id}`);
