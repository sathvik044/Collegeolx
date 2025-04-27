import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onFavoriteClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (onFavoriteClick) {
      onFavoriteClick(product.id);
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl || 'https://via.placeholder.com/200'}
        alt={product.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <IconButton 
            onClick={handleFavoriteClick}
            color="primary"
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;