"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Zap } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useApiQuery } from '@/hooks/useApiQuery';
import { statusStyles } from '@/constant';

export default function FleetTypeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: responseData, isLoading, isError, error } = useApiQuery(
    `/fleet-types/${id}`,
    ['fleet-type', id]
  );

  const fleetType = useMemo(() => {
    if (!responseData) return null;
    const extracted = responseData.data?.fleetType || responseData.data || responseData;
    
    const rawStatus = extracted.status || 'ACTIVE';
    const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

    return {
      id: extracted.id || extracted._id || id,
      name: extracted.name || 'N/A',
      type: extracted.type || 'N/A',
      maxSpeed: extracted.maxSpeed,
      batteryCapacity: extracted.batteryCapacity,
      status: formattedStatus,
      createdAt: extracted.createdAt ? new Date(extracted.createdAt).toLocaleDateString() : 'N/A',
      updatedAt: extracted.updatedAt ? new Date(extracted.updatedAt).toLocaleDateString() : 'N/A',
    };
  }, [responseData, id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-brand-blue mb-4" size={32} />
        <p className="text-text-gray font-medium">Loading fleet type details...</p>
      </div>
    );
  }

  if (isError) {
    const isNotFound = error?.response?.status === 404;
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="bg-red-50 p-6 rounded-2xl max-w-md border border-red-100">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            {isNotFound ? "Fleet Type Not Found" : "Error Loading Fleet Type"}
          </h2>
          <p className="text-red-600/80 text-sm mb-6">
            {isNotFound 
              ? "The fleet type you're looking for doesn't exist or has been deleted." 
              : error?.message || "An unexpected error occurred while fetching the details."}
          </p>
          <button 
            onClick={() => router.push('/dashboard/fleet-types')}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Back to Fleet Types
          </button>
        </div>
      </div>
    );
  }

  if (!fleetType) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-text-gray hover:text-zinc-800 transition-colors w-fit">
        <ArrowLeft size={16} />
        <Link href="/dashboard/fleet-types">Back to Fleet Types</Link>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-accent flex items-center gap-3">
            {fleetType.name}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusStyles[fleetType.status] || statusStyles['Active']}`}
            >
              {fleetType.status}
            </span>
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5 font-mono">{fleetType.id}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900">{fleetType.type}</div>
          <div className="text-sm font-medium text-text-gray mt-1">Vehicle Type</div>
        </div>
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900">
             {fleetType.maxSpeed ? `${fleetType.maxSpeed} km/h` : 'N/A'}
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Max Speed</div>
        </div>
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
             {fleetType.batteryCapacity ? (
                <>
                  <Zap size={18} className="text-amber-500" />
                  {fleetType.batteryCapacity} kWh
                </>
             ) : 'N/A'}
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Battery Capacity</div>
        </div>
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900">{fleetType.createdAt}</div>
          <div className="text-sm font-medium text-text-gray mt-1">Created At</div>
        </div>
      </div>
    </div>
  );
}
