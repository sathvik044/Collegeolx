import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Admin Navigation Items
  if (user?.role === 'ADMIN') {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CollegeOLX Admin
          </Typography>
          <Button color="inherit" component={Link} to="/admin/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/admin/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/admin/products">
            Products
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  // Regular User Navigation
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/home" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          CollegeOLX
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            startIcon={<HomeIcon />}
            component={Link}
            to="/home"
          >
            Home
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<ShoppingCartIcon />}
            component={Link}
            to="/buy"
          >
            Buy
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<SellIcon />}
            component={Link}
            to="/sell"
          >
            Sell
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<DashboardIcon />}
            component={Link}
            to="/dashboard"
          >
            Dashboard
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;