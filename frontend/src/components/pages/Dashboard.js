import React from 'react';
import { Container, Typography, Box, Grid, Paper, Fade } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Fade in={true} timeout={500}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
        </Fade>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Listings
              </Typography>
              <Typography color="textSecondary">
                No active listings
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography color="textSecondary">
                No recent activity
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4">0</Typography>
                    <Typography variant="body2">Items Listed</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4">0</Typography>
                    <Typography variant="body2">Items Sold</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4">0</Typography>
                    <Typography variant="body2">Items Bought</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4">0</Typography>
                    <Typography variant="body2">Favorites</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;