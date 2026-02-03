import apiClient from './client';
import { ApiResponse } from '@/types/api';

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
}

export const uploadsApi = {
  uploadSingle: async (
    file: File,
    folder: string = 'general'
  ): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<ApiResponse<UploadResult>>(
      `/uploads/single?folder=${folder}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  uploadMultiple: async (
    files: File[],
    folder: string = 'general'
  ): Promise<UploadResult[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await apiClient.post<ApiResponse<UploadResult[]>>(
      `/uploads/multiple?folder=${folder}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  delete: async (publicId: string): Promise<void> => {
    await apiClient.delete(`/uploads/${encodeURIComponent(publicId)}`);
  },
};