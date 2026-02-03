import React from 'react';
import { Goods } from '@/types/goods';
import { GoodsCard } from './GoodsCard';

interface GoodsGridProps {
  goods: Goods[];
  isLoading?: boolean;
}

export function GoodsGrid({ goods, isLoading }: GoodsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 animate-pulse rounded-lg h-72"
          />
        ))}
      </div>
    );
  }

  if (goods.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {goods.map((item) => (
        <GoodsCard key={item._id} goods={item} />
      ))}
    </div>
  );
}