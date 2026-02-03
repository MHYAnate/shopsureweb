'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Package,
  Store,
  Settings,
  User,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { Role } from '@/types/user';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles?: Role[];
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: <User className="h-5 w-5" />,
  },
  {
    href: '/dashboard/vendor',
    label: 'Vendor Profile',
    icon: <Store className="h-5 w-5" />,
    roles: [Role.VENDOR],
  },
  {
    href: '/dashboard/vendor/goods',
    label: 'My Products',
    icon: <Package className="h-5 w-5" />,
    roles: [Role.VENDOR],
  },
  {
    href: '/dashboard/vendor/goods/new',
    label: 'Add Product',
    icon: <PlusCircle className="h-5 w-5" />,
    roles: [Role.VENDOR],
  },
  {
    href: '/dashboard/vendor/settings',
    label: 'Vendor Settings',
    icon: <Settings className="h-5 w-5" />,
    roles: [Role.VENDOR],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <nav className="space-y-1">
        {filteredItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center px-4 py-2 rounded-lg font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}