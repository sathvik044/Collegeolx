import axios from 'axios';

const API_URL = 'http://localhost:8085/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const productApi = {
  getAllProducts: () => api.get('/products').catch(error => {
    console.error('Error fetching products:', error);
    return { data: [] };
  }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (product) => api.post('/products', product),
  updateProduct: (id, product) => api.put(`/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/products/${id}`)
};