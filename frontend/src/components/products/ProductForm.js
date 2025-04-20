import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/product';
import authService from '../../services/auth';

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null
  });
  const currentUser = authService.getCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('image', formData.image);
      data.append('sellerId', currentUser.id);
      data.append('isSold', false);

      await productService.createProduct(data);
      navigate('/buy'); // Redirects to buy page after product is listed
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>Sell Product</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Title" 
            margin="normal"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required 
          />
          <TextField 
            fullWidth 
            label="Description" 
            multiline 
            rows={4} 
            margin="normal"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <TextField 
            fullWidth 
            label="Price" 
            type="number" 
            margin="normal"
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </Button>
          <Button 
            type="submit"
            fullWidth 
            variant="contained" 
            sx={{ mt: 2 }}
          >
            Sell
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductForm;