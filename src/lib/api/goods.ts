import apiClient from './client';
import { Goods, CreateGoodsData, GoodsQuery } from '@/types/goods';
import { ApiResponse } from '@/types/api';

export const goodsApi = {
  getAll: async (query?: GoodsQuery) => {
    const response = await apiClient.get<
      ApiResponse<{ goods: Goods[]; total: number; pages: number }>
    >('/goods', { params: query });
    return response.data.data;
  },

  getAllAdmin: async (query?: GoodsQuery) => {
    const response = await apiClient.get<
      ApiResponse<{ goods: Goods[]; total: number; pages: number }>
    >('/goods/admin', { params: query });
    return response.data.data;
  },

  getById: async (id: string): Promise<Goods> => {
    const response = await apiClient.get<ApiResponse<Goods>>(`/goods/${id}`);
    return response.data.data;
  },

  getMyGoods: async (query?: GoodsQuery) => {
    const response = await apiClient.get<
      ApiResponse<{ goods: Goods[]; total: number; pages: number }>
    >('/goods/my-goods', { params: query });
    return response.data.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<ApiResponse<string[]>>(
      '/goods/categories'
    );
    return response.data.data;
  },

  getStats: async () => {
    const response = await apiClient.get('/goods/stats');
    return response.data.data;
  },

  create: async (data: CreateGoodsData): Promise<Goods> => {
    const response = await apiClient.post<ApiResponse<Goods>>('/goods', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<CreateGoodsData>): Promise<Goods> => {
    const response = await apiClient.patch<ApiResponse<Goods>>(
      `/goods/${id}`,
      data
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/goods/${id}`);
  },
};