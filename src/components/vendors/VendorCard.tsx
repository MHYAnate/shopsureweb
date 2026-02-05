import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vendor, VendorType } from '@/types/vendor';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Package, Star, Store } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  const logo = vendor.logo || '/images/placeholder.png';

  const getVendorTypeLabel = (type: VendorType) => {
    const labels: Record<VendorType, string> = {
      [VendorType.MARKET]: 'Market',
      [VendorType.MALL]: 'Mall',
      [VendorType.PLAZA]: 'Plaza',
      [VendorType.HOME_BASED]: 'Home-Based',
      [VendorType.ONLINE_ONLY]: 'Online',
    };
    return labels[type];
  };

  const getLocationText = () => {
    if (vendor.location) {
      return `${vendor.location.name}, ${vendor.location.state}`;
    }
    if (vendor.vendorType === VendorType.HOME_BASED && vendor.homeArea) {
      return `${vendor.homeArea}, ${vendor.homeLga}, ${vendor.homeState}`;
    }
    return 'Online';
  };

  return (
    <Link href={`/vendors/${vendor._id}`}>
      <Card hover padding="none" className="overflow-hidden h-full">
        <div className="relative h-32 w-full bg-gradient-to-r from-primary-500 to-primary-600">
          <div className="absolute -bottom-10 left-4">
            <div className="relative h-20 w-20 rounded-full border-4 border-white overflow-hidden bg-white">
              <Image
                src={logo}
                alt={vendor.businessName}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pt-12 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                {vendor.businessName}
              </h3>
              <div className="flex items-center mt-1">
                <Badge variant="default" size="sm">
                  {getVendorTypeLabel(vendor.vendorType)}
                </Badge>
                {vendor.isOpen && (
                  <Badge variant="success" size="sm" className="ml-2">
                    Open
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {vendor.businessDescription}
          </p>

          <div className="mt-3 space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{getLocationText()}</span>
            </div>

            {vendor.shopNumber && (
              <div className="flex items-center text-sm text-gray-500">
                <Store className="h-4 w-4 mr-1" />
                Shop: {vendor.shopNumber}
                {vendor.shopFloor && `, Floor ${vendor.shopFloor}`}
              </div>
            )}

            <div className="flex items-center justify-between mt-2 pt-2 border-t">
              <div className="flex items-center text-sm text-gray-500">
                <Package className="h-4 w-4 mr-1" />
                {vendor.totalGoods} products
              </div>
              {vendor.rating > 0 && (
                <div className="flex items-center text-sm text-yellow-500">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  {vendor.rating.toFixed(1)}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}