'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Role } from '@/types/user';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  MapPin,
} from 'lucide-react';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/vendors', label: 'Vendors', icon: Store },
  { href: '/admin/goods', label: 'Products', icon: Package },
  { href: '/admin/locations', label: 'Locations', icon: MapPin },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthGuard allowedRoles={[Role.ADMIN]}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <aside className="w-64 bg-white border-r min-h-screen p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-4">
              Admin Panel
            </h2>
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center px-4 py-2 rounded-lg font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}