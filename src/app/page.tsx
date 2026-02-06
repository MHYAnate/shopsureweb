'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { goodsApi } from '@/lib/api/goods';
import { locationsApi } from '@/lib/api/locations';
import { Goods } from '@/types/goods';
import { Location } from '@/types/location';
import { GoodsGrid } from '@/components/goods/GoodsGrid';
import { LocationCard } from '@/components/locations/LocationCard';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Store, Package, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [featuredGoods, setFeaturedGoods] = useState<Goods[]>([]);
  const [popularLocations, setPopularLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goodsData, locationsData] = await Promise.all([
          goodsApi.getAll({ limit: 8 }),
          locationsApi.getAll({ limit: 6 }),
        ]);
        setFeaturedGoods(goodsData.goods);
        setPopularLocations(locationsData.locations);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Nigerian Markets Online
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Shop from trusted vendors across Nigerian markets, malls, and
              home-based businesses
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/goods">
                <Button size="lg" variant="secondary">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Products
                </Button>
              </Link>
              <Link href="/vendors">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                  <Store className="h-5 w-5 mr-2" />
                  Find Vendors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600">Verified Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">50+</div>
              <div className="text-gray-600">Markets & Malls</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">10K+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">37</div>
              <div className="text-gray-600">States Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-gray-600 mt-1">
                Discover quality products from trusted vendors
              </p>
            </div>
            <Link href="/goods">
              <Button variant="outline">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <GoodsGrid goods={featuredGoods} isLoading={isLoading} />
        </div>
      </section>

      {/* Popular Markets */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Popular Markets & Malls
              </h2>
              <p className="text-gray-600 mt-1">
                Explore vendors in top Nigerian markets
              </p>
            </div>
            <Link href="/locations">
              <Button variant="outline">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 animate-pulse rounded-lg h-64"
                  />
                ))
              : popularLocations.map((location) => (
                  <LocationCard key={location._id} location={location} />
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of vendors and reach customers across Nigeria.
            Register your business today!
          </p>
          <Link href="/dashboard/vendor/register">
            <Button size="lg" variant="secondary">
              Become a Vendor
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}