'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateVendorData, VendorType } from '@/types/vendor';
import { Location } from '@/types/location';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { ImageUpload } from '@/components/goods/ImageUpload';
import { locationsApi } from '@/lib/api/locations';
import { VENDOR_TYPES, NIGERIA_STATES, PRODUCT_CATEGORIES } from '@/lib/utils/constants';

const vendorSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
  vendorType: z.nativeEnum(VendorType),
  locationId: z.string().optional(),
  shopNumber: z.string().optional(),
  shopFloor: z.string().optional(),
  shopBlock: z.string().optional(),
  homeAddress: z.string().optional(),
  homeState: z.string().optional(),
  homeLga: z.string().optional(),
  homeArea: z.string().optional(),
  businessPhone: z.string().optional(),
  businessEmail: z.string().email().optional().or(z.literal('')),
  whatsappNumber: z.string().optional(),
  instagramHandle: z.string().optional(),
  facebookPage: z.string().optional(),
  openingHours: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

type VendorFormData = z.infer<typeof vendorSchema>;

interface VendorFormProps {
  initialData?: Partial<CreateVendorData>;
  onSubmit: (data: CreateVendorData) => Promise<void>;
  isLoading?: boolean;
}

export function VendorForm({ initialData, onSubmit, isLoading }: VendorFormProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [logo, setLogo] = useState<string>(initialData?.logo || '');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: initialData,
  });

  const vendorType = watch('vendorType');
  const selectedState = watch('homeState');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await locationsApi.getAll({ limit: 100 });
        setLocations(data.locations);
      } catch (err) {
        console.error('Failed to fetch locations', err);
      }
    };
    fetchLocations();
  }, []);

  const handleFormSubmit = async (data: VendorFormData) => {
    await onSubmit({
      ...data,
      images,
      logo: logo || undefined,
    } as CreateVendorData);
  };

  const isMarketBased = [VendorType.MARKET, VendorType.MALL, VendorType.PLAZA].includes(
    vendorType
  );
  const isHomeBased = vendorType === VendorType.HOME_BASED;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Business Name *"
          error={errors.businessName?.message}
          {...register('businessName')}
        />

        <Select
          label="Vendor Type *"
          options={VENDOR_TYPES}
          error={errors.vendorType?.message}
          {...register('vendorType')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Description *
        </label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          {...register('businessDescription')}
        />
        {errors.businessDescription && (
          <p className="mt-1 text-sm text-red-600">
            {errors.businessDescription.message}
          </p>
        )}
      </div>

      {/* Location Selection for Market-based vendors */}
      {isMarketBased && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">Market/Mall Location</h3>
          <Select
            label="Select Location *"
            options={[
              { value: '', label: 'Select a market/mall' },
              ...locations.map((l) => ({
                value: l._id,
                label: `${l.name} - ${l.area}, ${l.state}`,
              })),
            ]}
            {...register('locationId')}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Shop Number"
              placeholder="e.g., A-15"
              {...register('shopNumber')}
            />
            <Input
              label="Floor"
              placeholder="e.g., Ground Floor"
              {...register('shopFloor')}
            />
            <Input
              label="Block"
              placeholder="e.g., Block A"
              {...register('shopBlock')}
            />
          </div>
        </div>
      )}

      {/* Home Address for Home-based vendors */}
      {isHomeBased && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">Home Business Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="State *"
              options={[
                { value: '', label: 'Select State' },
                ...NIGERIA_STATES.map((s) => ({ value: s, label: s })),
              ]}
              {...register('homeState')}
            />
            <Input
              label="LGA *"
              placeholder="Local Government Area"
              {...register('homeLga')}
            />
            <Input
              label="Area *"
              placeholder="e.g., Lekki Phase 1"
              {...register('homeArea')}
            />
          </div>
          <Input
            label="Full Address"
            placeholder="Street address"
            {...register('homeAddress')}
          />
        </div>
      )}

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-medium">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Business Phone"
            type="tel"
            placeholder="+234 800 000 0000"
            {...register('businessPhone')}
          />
          <Input
            label="Business Email"
            type="email"
            placeholder="business@example.com"
            error={errors.businessEmail?.message}
            {...register('businessEmail')}
          />
          <Input
            label="WhatsApp Number"
            placeholder="+234 800 000 0000"
            {...register('whatsappNumber')}
          />
          <Input
            label="Opening Hours"
            placeholder="e.g., Mon-Sat 9AM-6PM"
            {...register('openingHours')}
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="font-medium">Social Media (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Instagram Handle"
            placeholder="@yourbusiness"
            {...register('instagramHandle')}
          />
          <Input
            label="Facebook Page"
            placeholder="facebook.com/yourbusiness"
            {...register('facebookPage')}
          />
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Logo
        </label>
        <ImageUpload
          images={logo ? [logo] : []}
          onChange={(imgs) => setLogo(imgs[0] || '')}
          maxImages={1}
          folder="vendors/logos"
        />
      </div>

      {/* Business Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Images
        </label>
        <ImageUpload
          images={images}
          onChange={setImages}
          maxImages={5}
          folder="vendors/images"
        />
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        {initialData ? 'Update Vendor Profile' : 'Create Vendor Profile'}
      </Button>
    </form>
  );
}