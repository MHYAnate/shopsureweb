import { User } from './user';
import { Location } from './location';

export enum VendorType {
  MARKET = 'market',
  MALL = 'mall',
  PLAZA = 'plaza',
  HOME_BASED = 'home_based',
  ONLINE_ONLY = 'online_only',
}

export enum VendorStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

export interface Vendor {
  _id: string;
  id: string;
  user: User;
  businessName: string;
  businessDescription: string;
  vendorType: VendorType;
  location?: Location;
  shopNumber?: string;
  shopFloor?: string;
  shopBlock?: string;
  homeAddress?: string;
  homeState?: string;
  homeLga?: string;
  homeArea?: string;
  coordinates?: {
    type: string;
    coordinates: [number, number];
  };
  businessPhone?: string;
  businessEmail?: string;
  logo?: string;
  documents: string[];
  images: string[];
  status: VendorStatus;
  verifiedAt?: string;
  verifiedBy?: User;
  rejectionReason?: string;
  totalGoods: number;
  rating: number;
  totalReviews: number;
  categories: string[];
  whatsappNumber?: string;
  instagramHandle?: string;
  facebookPage?: string;
  isOpen: boolean;
  openingHours?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVendorData {
  businessName: string;
  businessDescription: string;
  vendorType: VendorType;
  locationId?: string;
  shopNumber?: string;
  shopFloor?: string;
  shopBlock?: string;
  homeAddress?: string;
  homeState?: string;
  homeLga?: string;
  homeArea?: string;
  coordinates?: {
    longitude: number;
    latitude: number;
  };
  businessPhone?: string;
  businessEmail?: string;
  logo?: string;
  documents?: string[];
  images?: string[];
  categories?: string[];
  whatsappNumber?: string;
  instagramHandle?: string;
  facebookPage?: string;
  openingHours?: string;
}

export interface VendorQuery {
  page?: number;
  limit?: number;
  status?: VendorStatus;
  vendorType?: VendorType;
  state?: string;
  lga?: string;
  area?: string;
  locationId?: string;
  search?: string;
  category?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  isOpen?: boolean;
}