import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from '../config/api';
import { store } from '../store/store';
import { logout } from '../store/slices/authSlice';

// Create an Axios instance with some default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ----- REQUEST INTERCEPTOR -----
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    try {
      // Attempt to read the token from localStorage
      const tokenString:string | null = localStorage.getItem('token');
      const formattedToken = tokenString?.replace(/^"|"$/g, ""); 
      if (tokenString) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${formattedToken}`,
        };
      }
    } catch (error) {
      // handle localStorage or JSON parsing errors
      console.error('Error reading token from localStorage:', error);
    }
    return config;
  },
  (error: AxiosError) => {
    // If something went wrong before sending the request
    return Promise.reject(error);
  }
);

// ----- RESPONSE INTERCEPTOR -----
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Just return the response as is if successful
    return response;
  },
  (error: AxiosError) => {
    // Handle error responses globally
    if (error.response?.status === 401) {
      // E.g., your token is expired or invalid
      store.dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Typically, a router push or redirect can be handled elsewhere (e.g., in a wrapper component).
    }
    return Promise.reject(error);
  }
);
