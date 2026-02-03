import { User } from './user';
import { Vendor } from './vendor';

export enum GoodsType {
  SALE = 'sale',
  LEASE = 'lease',
}

export enum GoodsStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  FLAGGED = 'flagged',
  DROPPED = 'dropped',
}

export interface Goods {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number;
  type: GoodsType;
  category?: string;
  images: string[];
  status: GoodsStatus;
  vendor: Vendor;
  createdBy: User;
  specifications?: Record<string, any>;
  views: number;
  flagReason?: string;
  flaggedBy?: User;
  flaggedAt?: string;
  approvedAt?: string;
  approvedBy?: User;
  isAvailable: boolean;
  condition?: string;
  brand?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoodsData {
  title: string;
  description: string;
  price: number;
  type: GoodsType;
  category?: string;
  images?: string[];
  specifications?: Record<string, any>;
  condition?: string;
  brand?: string;
  tags?: string[];
}

export interface GoodsQuery {
  page?: number;
  limit?: number;
  status?: GoodsStatus;
  type?: GoodsType;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  vendorId?: string;
  locationId?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  condition?: string;
  brand?: string;
}