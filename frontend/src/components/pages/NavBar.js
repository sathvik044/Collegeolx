import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CollegeOLX
        </Typography>
        <Box>
          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' ? (
                <>
                  <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>
                    Admin Dashboard
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/admin/users')}>
                    Users
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/admin/products')}>
                    Products
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/buy')}>
                    Buy
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/sell')}>
                    Sell
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/favorites')}>
                    Favorites
                  </Button>
                </>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;