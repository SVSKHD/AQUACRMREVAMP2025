import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import { Invoice } from '@/lib/types/invoice';

let token: string | null = null;
let formattedToken: string | null = null; ;

if (typeof window !== 'undefined') {
  const tokenString = window.localStorage.getItem('token');
  console.log('tokenString from localStorage =>', tokenString);

  token = tokenString ? JSON.parse(tokenString) : null;
  console.log('token after JSON.parse =>', token);

  if (typeof token === 'string') {
    formattedToken = token.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
  } else {
    formattedToken = '';
  }
  console.log('formattedToken =>', formattedToken);
}

// Define a reusable headers object
const headers = {
  authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc5MTljMWM5MjQ3NGRmNDE4ZmY5MzkiLCJlbWFpbCI6ImFxdWFrYXJ0QGFxdWFrYXJ0LmNvLmluIiwicm9sZSI6MSwiaWF0IjoxNzM0NzQ3NzM4LCJleHAiOjE3MzczMzk3Mzh9.AHbbVzXCXGFL3KLgkHq1dAlsXv8C1TlBZUNQQH7lXG4`, // fallback to empty string if token is null
};

export const invoiceService = {
  async getAll(): Promise<Invoice[]> {
    const response = await api.get<Invoice[]>(API_ENDPOINTS.INVOICES, { headers });
    return response.data;
  },

  async getById(id: string): Promise<Invoice> {
    const response = await api.get<Invoice>(API_ENDPOINTS.INVOICE_BY_ID(id), { headers });
    return response.data;
  },

  async create(data: Partial<Invoice>): Promise<Invoice> {
    const response = await api.post<Invoice>(API_ENDPOINTS.INVOICES, data, { headers });
    return response.data;
  },

  async update(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const response = await api.put<Invoice>(API_ENDPOINTS.INVOICE_BY_ID(id), data, { headers });
    return response.data;
  },

  async delete(id: string): Promise<Invoice> {
    const response = await api.delete<Invoice>(API_ENDPOINTS.INVOICE_BY_ID(id), { headers });
    return response.data;
  },
};
