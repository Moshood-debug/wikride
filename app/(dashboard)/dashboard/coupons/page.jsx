"use client";

import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import { Plus, Loader2 } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';
import CouponTable from '@/components/dashboard/coupons/CouponTable';

export default function CouponsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch coupons from the API
  const { data: responseData, isLoading, isError, error } = useApiQuery(
    '/coupons?page=1&limit=10',
    ['coupons']
  );

  const coupons = useMemo(() => {
    if (!responseData) return [];
    
    let extracted = [];
    if (Array.isArray(responseData)) {
      extracted = responseData;
    } else if (responseData.data && Array.isArray(responseData.data)) {
      extracted = responseData.data;
    } else if (responseData.data?.data && Array.isArray(responseData.data.data)) {
      extracted = responseData.data.data;
    } else if (responseData.data?.items && Array.isArray(responseData.data.items)) {
      extracted = responseData.data.items;
    } else if (responseData.items && Array.isArray(responseData.items)) {
      extracted = responseData.items;
    }

    return Array.isArray(extracted) ? extracted : [];
  }, [responseData]);

  const filteredCoupons = useMemo(() => {
    return coupons.filter(coupon => {
      const matchesSearch = coupon.code?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }).map(coupon => {
      const rawStatus = coupon.status || 'ACTIVE';
      const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

      let discountText = 'N/A';
      if (coupon.discountType === 'PERCENTAGE') {
         discountText = `${coupon.discountValue}% Off`;
      } else if (coupon.discountType === 'FLAT' || coupon.discountValue) {
         discountText = `Flat ${coupon.discountValue}`;
      }

      return {
        ...coupon,
        id: coupon.id || coupon._id || 'N/A',
        code: coupon.code || 'N/A',
        discount: discountText,
        usageLimit: coupon.usageLimit,
        usedCount: coupon.usedCount || 0,
        status: formattedStatus,
        expiresAt: coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'N/A'
      };
    });
  }, [coupons, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Coupons" 
          description="Manage promotional codes and discounts for riders." 
        />
        <button className="btn-primary">
          <Plus size={16} />
          Create Coupon
        </button>
      </div>

      <div className="surface p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by coupon code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="field"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-brand-blue" size={32} />
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center border border-red-100">
          Error loading coupons: {error?.message || "Something went wrong."}
        </div>
      ) : (
        <CouponTable coupons={filteredCoupons} />
      )}
    </div>
  );
}
