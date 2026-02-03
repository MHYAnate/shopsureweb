import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">
              NaijaMarket
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Nigeria's premier online marketplace connecting buyers with trusted
              vendors from markets and malls across the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/goods"
                  className="text-gray-400 hover:text-white"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-gray-400 hover:text-white"
                >
                  Find Vendors
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-gray-400 hover:text-white"
                >
                  Markets & Malls
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/vendor/register"
                  className="text-gray-400 hover:text-white"
                >
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                Lagos, Nigeria
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                +234 800 000 0000
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                info@naijamarket.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NaijaMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}