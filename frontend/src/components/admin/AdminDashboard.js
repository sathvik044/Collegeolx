import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent,
  Button, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    pendingProducts: 0,
    totalTransactions: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApprove = async (productId) => {
    try {
      await axios.post(`http://localhost:8085/api/admin/products/${productId}/approve`);
      fetchDashboardData(); // Refresh data after approval
    } catch (error) {
      console.error('Error approving product:', error);
    }
  };

  const handleReject = async (productId) => {
    try {
      await axios.post(`http://localhost:8085/api/admin/products/${productId}/reject`);
      fetchDashboardData(); // Refresh data after rejection
    } catch (error) {
      console.error('Error rejecting product:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, productsResponse] = await Promise.all([
        axios.get('http://localhost:8085/api/admin/stats'),
        axios.get('http://localhost:8085/api/admin/products/pending')
      ]);
      
      console.log('Stats:', statsResponse.data); // Debug log
      console.log('Pending Products:', productsResponse.data); // Debug log
      
      setStats(statsResponse.data);
      setRecentProducts(productsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Admin Control Panel
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats cards */}
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'primary.light' }}>
            <CardContent>
              <Typography color="white" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h5" color="white">
                {stats.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h5">
                {stats.totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Products
              </Typography>
              <Typography variant="h5">
                {stats.pendingProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Transactions
              </Typography>
              <Typography variant="h5">
                {stats.totalTransactions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Products Pending Approval
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Seller</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.seller?.name}</TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      color="primary" 
                      onClick={() => handleApprove(product.id)}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="small" 
                      color="error"
                      onClick={() => handleReject(product.id)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminDashboard;