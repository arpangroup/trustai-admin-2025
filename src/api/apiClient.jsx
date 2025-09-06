import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { API_ROUTES } from '../routes/apiRoutes';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Adjust if your backend URL is different
});


// 🔐 Attach Authorization header to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ♻️ Token Refresh Logic
const refreshAuthLogic = async (failedRequest) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const refreshTokenExpiry = Number(localStorage.getItem('refreshTokenExpiry'));

  if (!refreshToken || Date.now() >= refreshTokenExpiry) {
    throw new Error('Refresh token expired or missing');
  }

  try {
    console.log('🔁 Refreshing access token...');
    const response = await axios.post(API_ROUTES.AUTH_API.REFRESH_TOKEN, {
      refreshToken,
    });

    const {
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenExpiry,
      refreshTokenExpiry: newRefreshTokenExpiry
    } = response.data;

    // Save new tokens to local storage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    localStorage.setItem('accessTokenExpiry', accessTokenExpiry);
    localStorage.setItem('refreshTokenExpiry', newRefreshTokenExpiry);

    // Retry original request with new token
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken;
    return Promise.resolve();
  } catch (err) {
    console.error('❌ Refresh token failed. Redirecting to login.');

    // Refresh failed → force logout → Clear tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiry');
    localStorage.removeItem('refreshTokenExpiry');

    // Avoid redirect loop
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }

    return Promise.reject(err);
  }
};

// ✅ Attach token refresh BEFORE error handler
createAuthRefreshInterceptor(apiClient, refreshAuthLogic);


// ❗Centralized Response Error Handling (MUST come after refresh interceptor)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally here
    const status = error.response?.status;
    const data = error.response?.data;

    let customMessage = 'An unexpected error occurred.';

    if (data?.message) {
      // Server provided structured error message
      customMessage = data.message;
    } else if (error.message === 'Network Error') {
      customMessage = 'Network error: Server unreachable.';
    } else if (status === 401) {
      customMessage = 'Unauthorized. Please login again.';
    } else if (status === 403) {
      customMessage = 'Forbidden. You do not have access.';
    } else if (status === 500) {
      customMessage = 'Server error. Please try again later.';
    }

    // Replace the original error message with something clean
    return Promise.reject({
      message: customMessage,
      status: status,
      originalError: error,
    });
  }
);


export default apiClient;
