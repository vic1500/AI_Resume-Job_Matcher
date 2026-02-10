import axios from 'axios';

// 1. Create the Axios instance
const api = axios.create({
  // This points to your FastAPI backend
  baseURL: 'http://localhost:8000/api/v1',
});

// 2. Add an "Interceptor" to automatically add the Token
// This runs before EVERY request you make using 'api'
api.interceptors.request.use(
  (config) => {
    // Check if there's a token in LocalStorage
    const token = localStorage.getItem('access_token');

    console.log("1. Interceptor Running for URL:", config.url);
    console.log("2. Token found in Storage:", token);
    // ----------------------------

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("3. Final Header:", config.headers.Authorization);
    } else {
      console.warn("4. ⚠️ NO TOKEN ATTACHED! Sending request without auth.");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;