"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Tag, Calendar, Users, Percent } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useApiQuery } from '@/hooks/useApiQuery';
import { statusStyles } from '@/constant';

export default function CouponDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: responseData, isLoading, isError, error } = useApiQuery(
    `/coupons/${id}`,
    ['coupon', id]
  );

  const coupon = useMemo(() => {
    if (!responseData) return null;
    const extracted = responseData.data?.coupon || responseData.data || responseData;
    
    const rawStatus = extracted.status || 'ACTIVE';
    const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

    let discountText = 'N/A';
    if (extracted.discountType === 'PERCENTAGE') {
       discountText = `${extracted.discountValue}% Off`;
    } else if (extracted.discountType === 'FLAT' || extracted.discountValue) {
       discountText = `Flat ${extracted.discountValue}`;
    }

    return {
      id: extracted.id || extracted._id || id,
      code: extracted.code || 'N/A',
      discount: discountText,
      usageLimit: extracted.usageLimit,
      usedCount: extracted.usedCount || 0,
      status: formattedStatus,
      description: extracted.description || 'No description provided.',
      expiresAt: extracted.expiresAt ? new Date(extracted.expiresAt).toLocaleDateString() : 'No Expiry',
      createdAt: extracted.createdAt ? new Date(extracted.createdAt).toLocaleDateString() : 'N/A',
    };
  }, [responseData, id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-brand-blue mb-4" size={32} />
        <p className="text-text-gray font-medium">Loading coupon details...</p>
      </div>
    );
  }

  if (isError) {
    const isNotFound = error?.response?.status === 404;
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="bg-red-50 p-6 rounded-2xl max-w-md border border-red-100">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            {isNotFound ? "Coupon Not Found" : "Error Loading Coupon"}
          </h2>
          <p className="text-red-600/80 text-sm mb-6">
            {isNotFound 
              ? "The coupon you're looking for doesn't exist or has been deleted." 
              : error?.message || "An unexpected error occurred while fetching the details."}
          </p>
          <button 
            onClick={() => router.push('/dashboard/coupons')}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Back to Coupons
          </button>
        </div>
      </div>
    );
  }

  if (!coupon) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-text-gray hover:text-zinc-800 transition-colors w-fit">
        <ArrowLeft size={16} />
        <Link href="/dashboard/coupons">Back to Coupons</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0 border border-green-200">
          <Tag size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3 font-mono">
            {coupon.code}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border font-sans ${statusStyles[coupon.status] || statusStyles['Active']}`}
            >
              {coupon.status}
            </span>
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5 font-mono">ID: {coupon.id}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-emerald-600 flex items-center gap-2">
             <Percent size={18} />
             {coupon.discount}
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Discount Value</div>
        </div>
        
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <Users size={18} className="text-blue-500" />
             {coupon.usedCount} / {coupon.usageLimit || '∞'}
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Usage Count</div>
        </div>

        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <Calendar size={18} className="text-amber-500" />
             {coupon.expiresAt}
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Expiration Date</div>
        </div>
        
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <Calendar size={18} className="text-purple-500" />
             {coupon.createdAt}
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Created At</div>
        </div>
      </div>
      
      {/* Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 surface p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Coupon Details</h3>
            <div className="space-y-4">
               <div className="flex flex-col py-2 border-b border-border-gray">
                  <span className="text-text-gray text-sm mb-1">Description</span>
                  <span className="font-medium text-slate-900">{coupon.description}</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
