import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import { Category, SubCategory } from '@/lib/types/category';

export const categoryService = {
  // Categories
  async getAllCategories() {
    const response = await api.get(API_ENDPOINTS.CATEGORIES);
    return response.data;
  },

  async getCategoryById(id: string) {
    const response = await api.get(API_ENDPOINTS.CATEGORY_BY_ID(id));
    return response.data;
  },

  async createCategory(data: Partial<Category>) {
    const response = await api.post(API_ENDPOINTS.CATEGORIES, data);
    return response.data;
  },

  async updateCategory(id: string, data: Partial<Category>) {
    const response = await api.put(API_ENDPOINTS.CATEGORY_BY_ID(id), data);
    return response.data;
  },

  async deleteCategory(id: string) {
    const response = await api.delete(API_ENDPOINTS.CATEGORY_BY_ID(id));
    return response.data;
  },

  // Sub-Categories
  async getAllSubCategories() {
    const response = await api.get(API_ENDPOINTS.SUB_CATEGORIES);
    return response.data;
  },

  async getSubCategoryById(id: string) {
    const response = await api.get(API_ENDPOINTS.SUB_CATEGORY_BY_ID(id));
    return response.data;
  },

  async createSubCategory(data: Partial<SubCategory>) {
    const response = await api.post(API_ENDPOINTS.SUB_CATEGORIES, data);
    return response.data;
  },

  async updateSubCategory(id: string, data: Partial<SubCategory>) {
    const response = await api.put(API_ENDPOINTS.SUB_CATEGORY_BY_ID(id), data);
    return response.data;
  },

  async deleteSubCategory(id: string) {
    const response = await api.delete(API_ENDPOINTS.SUB_CATEGORY_BY_ID(id));
    return response.data;
  },
};