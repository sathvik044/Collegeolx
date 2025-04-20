import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

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
        <motion.div {...fadeIn}>
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Typography variant="h5" align="center" sx={{ mb: 4 }}>
            Your One-Stop Campus Marketplace
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 6 }}>
            CollegeOLX is a revolutionary platform designed exclusively for college students. 
            We understand the unique needs of campus life and provide a secure, easy-to-use 
            marketplace where students can buy, sell, and exchange items within their college community.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
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
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
              >
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
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'primary.light', color: 'white' }}>
            <Typography variant="h5" align="center" gutterBottom>
              Join the Campus Trading Revolution
            </Typography>
            <Typography align="center">
              Get started today and experience a smarter way to buy and sell on campus.
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Home;