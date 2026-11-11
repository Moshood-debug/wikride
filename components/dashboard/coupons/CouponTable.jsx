"use client";

import React from 'react';
import { Tag, MoreVertical, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { statusStyles } from '@/constant';

export default function CouponTable({ coupons = [] }) {
  const router = useRouter();

  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">Coupon Code</th>
              <th className="px-6 py-4 font-medium">Discount</th>
              <th className="px-6 py-4 font-medium">Usage</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Expires At</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {coupons.map((coupon) => (
              <tr 
                key={coupon.id} 
                onClick={() => router.push(`/dashboard/coupons/${coupon.id}`)}
                className="hover:bg-accent/70 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      <Tag size={16} />
                    </div>
                    <span className="font-bold text-slate-900 font-mono tracking-wide">{coupon.code}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray font-medium text-emerald-600">
                  {coupon.discount || 'N/A'}
                </td>
                <td className="px-6 py-4 text-text-gray">
                  <span className="text-xs font-semibold bg-zinc-100 px-2 py-1 rounded-md">
                    {coupon.usedCount || 0} / {coupon.usageLimit || '∞'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[coupon.status] || statusStyles['Active']}`}>
                    {coupon.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-gray whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-zinc-400" />
                    {coupon.expiresAt}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left opacity-70 hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-accent rounded-lg text-text-gray transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {coupons.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No coupons found.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {coupons.length > 0 && (
        <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
          <span>Showing 1 to {coupons.length} of {coupons.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
