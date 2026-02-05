'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VendorForm } from '@/components/vendors/VendorForm';
import { vendorsApi } from '@/lib/api/vendors';
import { useToast } from '@/lib/context/ToastContext';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { CreateVendorData } from '@/types/vendor';

export default function VendorRegisterPage() {
  const router = useRouter();
  const { success, error: showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateVendorData) => {
    setIsLoading(true);
    try {
      await vendorsApi.create(data);
      success('Vendor profile created successfully! Awaiting verification.');
      router.push('/dashboard/vendor');
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to create vendor profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardTitle>Register as a Vendor</CardTitle>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Fill in your business details to start selling on NaijaMarket.
            Your profile will be reviewed before approval.
          </p>
          <VendorForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}