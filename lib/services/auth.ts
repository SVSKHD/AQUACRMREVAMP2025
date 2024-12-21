import axios from 'axios';
import { LoginCredentials, LoginResponse } from '@/lib/types/auth';

const API_URL = 'https://api.aquakart.co.in/v1/crm/user';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },
};