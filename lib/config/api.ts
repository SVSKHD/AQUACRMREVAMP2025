// API configuration
export const API_BASE_URL = 'https://api.aquakart.co.in/v1/crm';
export const API_BASE_OPERATIONS_URL = 'https://api.aquakart.co.in/v1';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/user/login',
  
  // Invoices
  INVOICES: 'admin/all-invoices',
  INVOICE_BY_ID: (id: string) => `/invoice/${id}`,
  
  // Categories
  CATEGORIES: '/allcategories',
  CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
  SUB_CATEGORIES: '/all-subcategories',
  SUB_CATEGORY_BY_ID: (id: string) => `/sub-categories/${id}`,
} as const;