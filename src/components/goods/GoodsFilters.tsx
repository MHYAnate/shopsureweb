'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GOODS_TYPES, PRODUCT_CATEGORIES, NIGERIA_STATES } from '@/lib/utils/constants';
import { Search, X } from 'lucide-react';

interface GoodsFiltersProps {
  filters: {
    search?: string;
    type?: string;
    category?: string;
    state?: string;
    minPrice?: string;
    maxPrice?: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function GoodsFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: GoodsFiltersProps) {
  const hasFilters = Object.values(filters).some((v) => v);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Select
          placeholder="Type"
          options={[{ value: '', label: 'All Types' }, ...GOODS_TYPES]}
          value={filters.type || ''}
          onChange={(e) => onFilterChange('type', e.target.value)}
        />

        <Select
          placeholder="Category"
          options={[
            { value: '', label: 'All Categories' },
            ...PRODUCT_CATEGORIES.map((c) => ({ value: c, label: c })),
          ]}
          value={filters.category || ''}
          onChange={(e) => onFilterChange('category', e.target.value)}
        />

        <Select
          placeholder="State"
          options={[
            { value: '', label: 'All States' },
            ...NIGERIA_STATES.map((s) => ({ value: s, label: s })),
          ]}
          value={filters.state || ''}
          onChange={(e) => onFilterChange('state', e.target.value)}
        />

        <Input
          placeholder="Min Price"
          type="number"
          value={filters.minPrice || ''}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
        />

        <Input
          placeholder="Max Price"
          type="number"
          value={filters.maxPrice || ''}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
        />
      </div>
    </div>
  );
}