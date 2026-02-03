import apiClient from './client';
import { ApiResponse } from '@/types/api';

export const adminApi = {
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data.data;
  },

  getPendingVendors: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get('/admin/vendors/pending', {
      params: { page, limit },
    });
    return response.data.data;
  },

  verifyVendor: async (id: string) => {
    const response = await apiClient.patch(`/admin/vendors/${id}/verify`);
    return response.data.data;
  },

  rejectVendor: async (id: string, reason: string) => {
    const response = await apiClient.patch(`/admin/vendors/${id}/reject`, {
      reason,
    });
    return response.data.data;
  },

  suspendVendor: async (id: string, reason: string) => {
    const response = await apiClient.patch(`/admin/vendors/${id}/suspend`, {
      reason,
    });
    return response.data.data;
  },

  getPendingGoods: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get('/admin/goods/pending', {
      params: { page, limit },
    });
    return response.data.data;
  },

  approveGoods: async (id: string) => {
    const response = await apiClient.patch(`/admin/goods/${id}/approve`);
    return response.data.data;
  },

  flagGoods: async (id: string, reason: string) => {
    const response = await apiClient.patch(`/admin/goods/${id}/flag`, {
      reason,
    });
    return response.data.data;
  },

  dropGoods: async (id: string, reason: string) => {
    const response = await apiClient.patch(`/admin/goods/${id}/drop`, {
      reason,
    });
    return response.data.data;
  },
};