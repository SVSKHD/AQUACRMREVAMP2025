import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import { LoginCredentials, AuthResponse } from '@/lib/types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },
};