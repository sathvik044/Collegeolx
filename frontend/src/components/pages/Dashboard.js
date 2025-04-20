import { useState, useEffect } from 'react';
import { 
  Container, Tabs, Tab, Box, Card, CardContent, CardMedia, 
  Typography, Button, Grid, IconButton 
} from '@mui/material';
import { Edit, Delete, Refresh, CheckCircle } from '@mui/icons-material';
import productService from '../../services/product';
import authService from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [myProducts, setMyProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const products = await productService.getUserProducts(currentUser.id);
      const orders = await productService.getUserOrders(currentUser.id);
      const favs = await productService.getUserFavorites(currentUser.id);
      
      setMyProducts(products);
      setMyOrders(orders);
      setFavorites(favs);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        setMyProducts(myProducts.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const renderOrderCard = (order) => (
    <Grid item xs={12} sm={6} md={4} key={order.id}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={order.product?.imageUrl || 'https://via.placeholder.com/140'}
          alt={order.product?.title}
        />
        <CardContent>
          <Typography variant="h6">{order.product?.title}</Typography>
          <Typography color="primary">${order.product?.price}</Typography>
          <Typography variant="body2">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Status: <span style={{ color: order.status === 'COMPLETED' ? 'green' : 'orange' }}>
              {order.status}
            </span>
          </Typography>
          <Typography variant="body2">
            Seller: {order.product?.seller?.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderFavoriteCard = (product) => (
    <Grid item xs={12} sm={6} md={4} key={product.id}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl || 'https://via.placeholder.com/140'}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography color="primary">${product.price}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              View Details
            </Button>
            <IconButton 
              color="error" 
              onClick={() => handleRemoveFavorite(product.id)}
            >
              <Delete />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Student Dashboard</Typography>
      
      <Tabs 
        value={tabValue} 
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label={`My Products (${myProducts.length})`} />
        <Tab label={`My Orders (${myOrders.length})`} />
        <Tab label={`Favorites (${favorites.length})`} />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/sell')}
              >
                Add New Product
              </Button>
            </Box>
            <Grid container spacing={3}>
              {myProducts.length > 0 ? (
                myProducts.map(renderProductCard)
              ) : (
                <Typography variant="h6" sx={{ p: 3, textAlign: 'center', width: '100%' }}>
                  You haven't posted any products yet.
                </Typography>
              )}
            </Grid>
          </>
        )}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            {myOrders.length > 0 ? (
              myOrders.map(renderOrderCard)
            ) : (
              <Typography variant="h6" sx={{ p: 3, textAlign: 'center', width: '100%' }}>
                You haven't made any purchases yet.
              </Typography>
            )}
          </Grid>
        )}
        {tabValue === 2 && (
          <Grid container spacing={3}>
            {favorites.length > 0 ? (
              favorites.map(renderFavoriteCard)
            ) : (
              <Typography variant="h6" sx={{ p: 3, textAlign: 'center', width: '100%' }}>
                You haven't added any favorites yet.
              </Typography>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;