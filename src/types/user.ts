export enum Role {
  USER = 'user',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export interface User {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}