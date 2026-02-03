import apiClient from './client';
import { Location, LocationQuery } from '@/types/location';
import { ApiResponse } from '@/types/api';

export const locationsApi = {
  getAll: async (query?: LocationQuery) => {
    const response = await apiClient.get<
      ApiResponse<{ locations: Location[]; total: number; pages: number }>
    >('/locations', { params: query });
    return response.data.data;
  },

  getById: async (id: string): Promise<Location> => {
    const response = await apiClient.get<ApiResponse<Location>>(
      `/locations/${id}`
    );
    return response.data.data;
  },

  getByState: async (state: string): Promise<Location[]> => {
    const response = await apiClient.get<ApiResponse<Location[]>>(
      `/locations/by-state/${state}`
    );
    return response.data.data;
  },

  getNearby: async (
    longitude: number,
    latitude: number,
    radius?: number
  ): Promise<Location[]> => {
    const response = await apiClient.get<ApiResponse<Location[]>>(
      '/locations/nearby',
      { params: { longitude, latitude, radius } }
    );
    return response.data.data;
  },

  getStates: async (): Promise<string[]> => {
    const response = await apiClient.get<ApiResponse<string[]>>(
      '/locations/states'
    );
    return response.data.data;
  },

  getStateStats: async () => {
    const response = await apiClient.get('/locations/stats/by-state');
    return response.data.data;
  },

  create: async (data: Partial<Location>): Promise<Location> => {
    const response = await apiClient.post<ApiResponse<Location>>(
      '/locations',
      data
    );
    return response.data.data;
  },

  update: async (id: string, data: Partial<Location>): Promise<Location> => {
    const response = await apiClient.patch<ApiResponse<Location>>(
      `/locations/${id}`,
      data
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/locations/${id}`);
  },
};