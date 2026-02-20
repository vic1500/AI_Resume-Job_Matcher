import api from '../api/axios';

export const login = async (email, password) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const response = await api.post('/login', formData);

  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }

  return response.data.access_token;
};

export const signup = async (email, password, username) => {
  // Signup usually expects JSON, so this is standard
  const response = await api.post('/signup', {
    email,
    password,
    username,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  // This will automatically use the token from localStorage via the interceptor
  const response = await api.get('/users/me');
  return response.data; // Returns { username: "...", email: "...", id: ... }
};

export const logout = () => {
  localStorage.removeItem('access_token');
};