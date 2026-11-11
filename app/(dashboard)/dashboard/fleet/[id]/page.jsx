"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Battery, MapPin, Building2, Calendar, Bike } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useApiQuery } from '@/hooks/useApiQuery';
import { statusStyles } from '@/constant';

export default function BikeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: responseData, isLoading, isError, error } = useApiQuery(
    `/bikes/${id}`,
    ['bike', id]
  );

  const bike = useMemo(() => {
    if (!responseData) return null;
    const extracted = responseData.data?.bike || responseData.data || responseData;
    
    const rawStatus = extracted.status || 'AVAILABLE';
    const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

    return {
      id: extracted.id || extracted._id || id,
      name: extracted.name || extracted.bikeId || 'N/A',
      fleetType: extracted.fleetType?.name || extracted.fleetType || 'N/A',
      organization: extracted.organization?.name || extracted.organization || 'N/A',
      battery: extracted.batteryLevel || extracted.battery || 0,
      location: extracted.location?.address || extracted.location || 'Unknown Location',
      status: formattedStatus,
      lastMaintenance: extracted.lastMaintenance ? new Date(extracted.lastMaintenance).toLocaleDateString() : 'N/A',
      createdAt: extracted.createdAt ? new Date(extracted.createdAt).toLocaleDateString() : 'N/A',
    };
  }, [responseData, id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-brand-blue mb-4" size={32} />
        <p className="text-text-gray font-medium">Loading bike details...</p>
      </div>
    );
  }

  if (isError) {
    const isNotFound = error?.response?.status === 404;
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="bg-red-50 p-6 rounded-2xl max-w-md border border-red-100">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            {isNotFound ? "Bike Not Found" : "Error Loading Bike"}
          </h2>
          <p className="text-red-600/80 text-sm mb-6">
            {isNotFound 
              ? "The bike you're looking for doesn't exist or has been deleted." 
              : error?.message || "An unexpected error occurred while fetching the details."}
          </p>
          <button 
            onClick={() => router.push('/dashboard/fleet')}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Back to Live Fleet
          </button>
        </div>
      </div>
    );
  }

  if (!bike) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-text-gray hover:text-zinc-800 transition-colors w-fit">
        <ArrowLeft size={16} />
        <Link href="/dashboard/fleet">Back to Live Fleet</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
          <Bike size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-accent flex items-center gap-3">
            {bike.name}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusStyles[bike.status] || statusStyles['Active']}`}
            >
              {bike.status}
            </span>
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5 font-mono">ID: {bike.id}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <Battery size={18} className={bike.battery > 20 ? 'text-emerald-500' : 'text-rose-500'} />
             {bike.battery}%
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Battery Level</div>
        </div>
        
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <MapPin size={18} className="text-blue-500" />
             <span className="truncate">{bike.location}</span>
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Current Location</div>
        </div>

        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <Building2 size={18} className="text-purple-500" />
             <span className="truncate">{bike.organization}</span>
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Organization</div>
        </div>
        
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <Calendar size={18} className="text-amber-500" />
             {bike.lastMaintenance}
          </div>
          <div className="text-sm font-medium text-text-gray mt-1">Last Maintenance</div>
        </div>
      </div>
      
      {/* Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 surface p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Bike Information</h3>
            <div className="space-y-4">
               <div className="flex justify-between py-2 border-b border-border-gray">
                  <span className="text-text-gray">Fleet Type</span>
                  <span className="font-medium text-slate-900">{bike.fleetType}</span>
               </div>
               <div className="flex justify-between py-2 border-b border-border-gray">
                  <span className="text-text-gray">Created At</span>
                  <span className="font-medium text-slate-900">{bike.createdAt}</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
