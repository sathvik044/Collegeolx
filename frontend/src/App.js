import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavBar from './components/pages/NavBar';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';
import ProductForm from './components/products/ProductForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Favorites from './components/pages/Favorites';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import Buy from './components/pages/Buy';  // Use this import only
import Home from './components/pages/Home';  // Add this import at the top

// Add AdminRoute component
// Define PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <NavBar />
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Define AdminRoute component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user?.role === 'ADMIN' ? (
    <>
      <NavBar />
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        isAuthenticated ? (
          user?.role === 'ADMIN' ? 
          <Navigate to="/admin/dashboard" /> : 
          <PrivateRoute><Home /></PrivateRoute>
        ) : <LandingPage />
      } />
      <Route path="/login" element={isAuthenticated ? (
        user?.role === 'ADMIN' ? 
        <Navigate to="/admin/dashboard" /> : 
        <Navigate to="/" />
      ) : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

      {/* Admin Routes - Place these before regular protected routes */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} />

      {/* Protected Routes - Only for non-admin users */}
      <Route path="/dashboard" element={
        user?.role === 'ADMIN' ? 
        <Navigate to="/admin/dashboard" /> : 
        <PrivateRoute><Dashboard /></PrivateRoute>
      } />
      <Route path="/buy" element={<PrivateRoute><Buy /></PrivateRoute>} />
      <Route path="/sell" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
      <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />

      {/* Catch all undefined routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;