import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button, Fade, Grow } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      title: "Buy & Sell Easily",
      description: "Simple platform for college students to trade items"
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Secure Transactions",
      description: "Safe and verified student-to-student marketplace"
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: "Campus Community",
      description: "Connect with students from your college"
    },
    {
      icon: <MoneyOffIcon sx={{ fontSize: 40 }} />,
      title: "Save Money",
      description: "Find great deals on textbooks and more"
    }
  ];

  return (
    <Container>
      <Box sx={{ my: 8 }}>
        <Fade in={true} timeout={600}>
          <Typography 
            variant="h2" 
            component="h1" 
            align="center" 
            sx={{ 
              mb: 4,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Welcome to CollegeOLX
          </Typography>
        </Fade>

        <Fade in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
          <Box>
            <Typography variant="h5" align="center" sx={{ mb: 4 }}>
              Your One-Stop Campus Marketplace
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 6 }}>
              CollegeOLX is a revolutionary platform designed exclusively for college students. 
              We understand the unique needs of campus life and provide a secure, easy-to-use 
              marketplace where students can buy, sell, and exchange items within their college community.
            </Typography>
          </Box>
        </Fade>

        <Fade in={true} timeout={600} style={{ transitionDelay: '600ms' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 8 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/buy')}
              sx={{ borderRadius: 2 }}
            >
              Start Shopping
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/sell')}
              sx={{ borderRadius: 2 }}
            >
              Sell Items
            </Button>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Grow in={true} timeout={600} style={{ transitionDelay: `${200 * (index + 1)}ms` }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>

        <Fade in={true} timeout={600} style={{ transitionDelay: '1200ms' }}>
          <Box sx={{ mt: 8, textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" gutterBottom>
              Why Choose CollegeOLX?
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
              • Exclusive college community - Trade with verified students
              <br />
              • Zero platform fees - Keep more money in your pocket
              <br />
              • Local transactions - No shipping hassles
              <br />
              • Secure messaging - Connect safely with buyers/sellers
            </Typography>
          </Box>
        </Fade>

        <Fade in={true} timeout={600} style={{ transitionDelay: '1400ms' }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'primary.light', color: 'white' }}>
            <Typography variant="h5" align="center" gutterBottom>
              Join the Campus Trading Revolution
            </Typography>
            <Typography align="center">
              Get started today and experience a smarter way to buy and sell on campus.
            </Typography>
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
};

export default Home;