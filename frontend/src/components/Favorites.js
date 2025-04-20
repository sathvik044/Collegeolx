import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const Favorites = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Favorites
      </Typography>
      <Grid container spacing={3}>
        {/* Favorite items will be mapped here */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="textSecondary">
              No favorite items yet
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Favorites;