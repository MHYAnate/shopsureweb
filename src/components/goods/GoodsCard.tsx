import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Goods } from '@/types/goods';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils/format';
import { MapPin, Eye, Store } from 'lucide-react';

interface GoodsCardProps {
  goods: Goods;
}

export function GoodsCard({ goods }: GoodsCardProps) {
  const mainImage = goods.images?.[0] || '/images/placeholder.png';

  return (
    <Link href={`/goods/${goods._id}`}>
      <Card hover padding="none" className="overflow-hidden h-full">
        <div className="relative h-48 w-full">
          <Image
            src={mainImage}
            alt={goods.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={goods.type === 'sale' ? 'success' : 'info'}>
              {goods.type === 'sale' ? 'For Sale' : 'For Lease'}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 truncate">{goods.title}</h3>

          <p className="text-xl font-bold text-primary-600 mt-2">
            {formatPrice(goods.price)}
            {goods.type === 'lease' && (
              <span className="text-sm font-normal text-gray-500">/month</span>
            )}
          </p>

          {goods.vendor && (
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <Store className="h-4 w-4 mr-1" />
              <span className="truncate">{goods.vendor.businessName}</span>
            </div>
          )}

          {goods.vendor?.location && (
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">
                {goods.vendor.location.name}, {goods.vendor.location.state}
              </span>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {goods.views} views
            </div>
            {goods.category && (
              <Badge variant="default" size="sm">
                {goods.category}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}