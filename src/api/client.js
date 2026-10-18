import axios from 'axios';

const PRODUCTION_API_BASE_URL = 'https://safewalk-backend-production-e3a1.up.railway.app/api/v1';
const LOCAL_DEV_API_BASE_URL = 'http://localhost:8080/api/v1';

const resolveApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (import.meta.env.PROD) {
    if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl;
    }
    return PRODUCTION_API_BASE_URL;
  }
  return envUrl || LOCAL_DEV_API_BASE_URL;
};

const API_BASE_URL = resolveApiBaseUrl().trim().replace(/\/+$/, '');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('safewalk_token') || localStorage.getItem('safewalk_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('safewalk_token');
      sessionStorage.removeItem('safewalk_user');
      localStorage.removeItem('safewalk_token');
      localStorage.removeItem('safewalk_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login?sessionExpired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
