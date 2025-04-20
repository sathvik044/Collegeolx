import axios from 'axios';

const API_URL = 'http://localhost:8085/api';

const compressImage = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 800;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }));
          },
          'image/jpeg',
          0.6
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

const productService = {
  getAllAvailableProducts: async () => {
    try {
      // Only fetch approved products
      const response = await axios.get(`${API_URL}/products?status=approved`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const formData = new FormData();
      
      // Set initial status as pending
      formData.append('status', 'pending');
      formData.append('createdAt', new Date().toISOString());
      
      // Handle image
      if (productData.get('image')) {
        const compressedImage = await compressImage(productData.get('image'));
        formData.append('file', compressedImage);
      }

      // Copy other form data
      for (let [key, value] of productData.entries()) {
        if (key !== 'image') {
          formData.append(key, value);
        }
      }

      const response = await axios.post(`${API_URL}/products/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // New method to get pending products for admin
  getPendingProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products?status=pending`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pending products:', error);
      throw error;
    }
  },

  // New method to approve/reject products
  updateProductStatus: async (productId, status) => {
    try {
      const response = await axios.patch(`${API_URL}/products/${productId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating product status:', error);
      throw error;
    }
  }
};

export default productService;