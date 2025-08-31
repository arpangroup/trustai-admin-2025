import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  const refreshTokenExpiry = Number(localStorage.getItem('refreshTokenExpiry'));

  // ✅ If refresh token is expired, force logout
  if (!isAuthenticated || Date.now() > refreshTokenExpiry) {
    localStorage.clear(); // Clear all tokens
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
