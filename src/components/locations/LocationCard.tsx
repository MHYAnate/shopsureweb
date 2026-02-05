import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Location, LocationType } from '@/types/location';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Store, Clock, Phone } from 'lucide-react';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const image = location.images?.[0] || '/images/placeholder.png';

  const getTypeLabel = (type: LocationType) => {
    const labels: Record<LocationType, string> = {
      [LocationType.MARKET]: 'Market',
      [LocationType.MALL]: 'Mall',
      [LocationType.PLAZA]: 'Plaza',
      [LocationType.RESIDENTIAL]: 'Residential',
      [LocationType.COMMERCIAL]: 'Commercial',
    };
    return labels[type];
  };

  const getTypeVariant = (type: LocationType) => {
    const variants: Record<LocationType, 'default' | 'success' | 'info' | 'warning'> = {
      [LocationType.MARKET]: 'success',
      [LocationType.MALL]: 'info',
      [LocationType.PLAZA]: 'warning',
      [LocationType.RESIDENTIAL]: 'default',
      [LocationType.COMMERCIAL]: 'default',
    };
    return variants[type];
  };

  return (
    <Link href={`/locations/${location._id}`}>
      <Card hover padding="none" className="overflow-hidden h-full">
        <div className="relative h-40 w-full">
          <Image
            src={image}
            alt={location.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={getTypeVariant(location.type)}>
              {getTypeLabel(location.type)}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg">{location.name}</h3>

          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {location.area}, {location.lga}, {location.state}
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Store className="h-4 w-4 mr-1" />
              {location.totalVendors} vendors
            </div>

            {location.openingHours && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {location.openingHours}
              </div>
            )}
          </div>

          {location.description && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {location.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}