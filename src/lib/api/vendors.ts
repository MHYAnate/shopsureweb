import apiClient from './client';
import { Vendor, CreateVendorData, VendorQuery } from '@/types/vendor';
import { ApiResponse } from '@/types/api';

export const vendorsApi = {
  getAll: async (query?: VendorQuery) => {
    const response = await apiClient.get<
      ApiResponse<{ vendors: Vendor[]; total: number; pages: number }>
    >('/vendors', { params: query });
    return response.data.data;
  },

  getAllAdmin: async (query?: VendorQuery) => {
    const response = await apiClient.get<
      ApiResponse<{ vendors: Vendor[]; total: number; pages: number }>
    >('/vendors/admin', { params: query });
    return response.data.data;
  },

  getById: async (id: string): Promise<Vendor> => {
    const response = await apiClient.get<ApiResponse<Vendor>>(
      `/vendors/${id}`
    );
    return response.data.data;
  },

  getMyProfile: async (): Promise<Vendor | null> => {
    const response = await apiClient.get<ApiResponse<Vendor | null>>(
      '/vendors/my-profile'
    );
    return response.data.data;
  },

  getByLocation: async (locationId: string): Promise<Vendor[]> => {
    const response = await apiClient.get<ApiResponse<Vendor[]>>(
      `/vendors/by-location/${locationId}`
    );
    return response.data.data;
  },

  getNearby: async (
    longitude: number,
    latitude: number,
    radius?: number
  ): Promise<Vendor[]> => {
    const response = await apiClient.get<ApiResponse<Vendor[]>>(
      '/vendors/nearby',
      { params: { longitude, latitude, radius } }
    );
    return response.data.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<ApiResponse<string[]>>(
      '/vendors/categories'
    );
    return response.data.data;
  },

  create: async (data: CreateVendorData): Promise<Vendor> => {
    const response = await apiClient.post<ApiResponse<Vendor>>(
      '/vendors',
      data
    );
    return response.data.data;
  },

  update: async (id: string, data: Partial<CreateVendorData>): Promise<Vendor> => {
    const response = await apiClient.patch<ApiResponse<Vendor>>(
      `/vendors/${id}`,
      data
    );
    return response.data.data;
  },

  updateStatus: async (
    id: string,
    status: string,
    rejectionReason?: string
  ): Promise<Vendor> => {
    const response = await apiClient.patch<ApiResponse<Vendor>>(
      `/vendors/${id}/status`,
      { status, rejectionReason }
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/vendors/${id}`);
  },
};