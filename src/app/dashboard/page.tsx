'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Role } from '@/types/user';
import { Package, Store, Settings, Plus } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Profile</CardTitle>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage your personal information and settings
            </p>
            <Link href="/dashboard/profile">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {user?.role === Role.VENDOR ? (
          <>
            <Card>
              <CardTitle>Your Products</CardTitle>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Manage your product listings
                </p>
                <Link href="/dashboard/vendor/goods">
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    View Products
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>Add New Product</CardTitle>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  List a new product for sale
                </p>
                <Link href="/dashboard/vendor/goods/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardTitle>Become a Vendor</CardTitle>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Start selling on NaijaMarket today
              </p>
              <Link href="/dashboard/vendor/register">
                <Button>
                  <Store className="h-4 w-4 mr-2" />
                  Register as Vendor
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}