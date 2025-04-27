import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Fade in={true} timeout={500}>
          <Box>
            <Typography variant="h2" gutterBottom>
              Welcome to CollegeOLX
            </Typography>
            <Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
              Buy and sell items within your college community
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={500} style={{ transitionDelay: '200ms' }}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Get Started
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{ mr: 2 }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LandingPage;