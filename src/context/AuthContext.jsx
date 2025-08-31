import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
  const [accessExpAt, setAccessExpAt] = useState(() => Number(localStorage.getItem('accessTokenExpiry')));
  const [refreshExpAt, setRefreshExpAt] = useState(() => Number(localStorage.getItem('refreshTokenExpiry')));

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // ✅ Authenticated if we have refresh token and it's not expired
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshExpiry = Number(localStorage.getItem('refreshTokenExpiry'));
    return !!refreshToken && Date.now() < refreshExpiry;
  });

  useEffect(() => {
    // Whenever tokens change, update auth state
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshExpiry = Number(localStorage.getItem('refreshTokenExpiry'));
    setIsAuthenticated(!!refreshToken && Date.now() < refreshExpiry);
  }, [token, refreshExpAt]);

  const login = (accessToken, refreshToken, accessExpiry, refreshExpiry) => {
    setToken(accessToken);
    setAccessExpAt(accessExpiry);
    setRefreshExpAt(refreshExpiry);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('accessTokenExpiry', accessExpiry);
    localStorage.setItem('refreshTokenExpiry', refreshExpiry);
    
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setAccessExpAt(null);
    setRefreshExpAt(null);
    setIsAuthenticated(false);
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiry');
    localStorage.removeItem('refreshTokenExpiry');
  };

  
  const isAccessTokenExpired = () => Date.now() >= accessExpAt;
  const isRefreshTokenExpired = () => Date.now() >= refreshExpAt;

  return (
     <AuthContext.Provider value={{
      token,
      accessExpAt,
      refreshExpAt,
      isAuthenticated,
      login,
      logout,
      isAccessTokenExpired,
      isRefreshTokenExpired
    }}>
      {children}
    </AuthContext.Provider>
  );
}
