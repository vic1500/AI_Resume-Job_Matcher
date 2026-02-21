import axios from 'axios';



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
});

// 2. Add an "Interceptor" to automatically add the Token
// This runs before EVERY request you make using 'api'
api.interceptors.request.use(
  (config) => {
    // Check if there's a token in LocalStorage
    const token = localStorage.getItem('access_token');
    // ----------------------------

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;