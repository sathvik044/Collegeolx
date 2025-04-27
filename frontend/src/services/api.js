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
  deleteProduct: (id) => api.delete(`/products/${id}`),
  
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  getProductImages: (productId) => api.get(`/products/${productId}/images`)
};

export const animationConfig = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  slideIn: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 }
  }
};