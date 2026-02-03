export enum LocationType {
  MARKET = 'market',
  MALL = 'mall',
  PLAZA = 'plaza',
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
}

export interface Coordinates {
  type: string;
  coordinates: [number, number];
}

export interface Location {
  _id: string;
  id: string;
  name: string;
  type: LocationType;
  state: string;
  lga: string;
  area: string;
  address?: string;
  description?: string;
  coordinates?: Coordinates;
  isActive: boolean;
  images: string[];
  openingHours?: string;
  contactPhone?: string;
  contactEmail?: string;
  totalVendors: number;
  createdAt: string;
  updatedAt: string;
}

export interface LocationQuery {
  page?: number;
  limit?: number;
  type?: LocationType;
  state?: string;
  lga?: string;
  area?: string;
  search?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
}