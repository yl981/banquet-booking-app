import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Intercept requests to attach JWT token
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('banquite_user') || 'null');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
