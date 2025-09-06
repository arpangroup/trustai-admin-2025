import React, { useContext, useState } from "react";
import "./Login.css"; // Import custom CSS for background styling
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from '../../context/AuthContext.jsx';
import { API_ROUTES } from "../../routes";
import apiClient from '../../api/apiClient.jsx';

const Login = () => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Where to redirect after login (default /dashboard)
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      //console.log('Calling ACCESS_TOKEN...');
      const res = await apiClient.post(API_ROUTES.AUTH_API.ACCESS_TOKEN, {
        username,
        password,
        flow: 'password',
      });

      const {
      accessToken,
      refreshToken,
      accessTokenExpiry,
      refreshTokenExpiry
    } = res.data;
      // Store tokens in AuthContext
      login(accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry);

      // Navigate to previous or default route
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="login-background d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 login-card">
        <h3 className="text-center mb-3">Login</h3>
        
        <form onSubmit={handleLogin} autoComplete="on">
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your email"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"              
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="mb-3 text-end">
            <a href="#" className="text-decoration-none">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
