// src/api/axiosInstance.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://91.98.46.158:3002/api', // dynamic base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: add interceptors for auth, logging, errors
apiClient.interceptors.request.use(config => {
  // Example: add auth token dynamically
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // handle errors globally
    return Promise.reject(error);
  }
);
