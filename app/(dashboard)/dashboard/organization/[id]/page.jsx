"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import OrgHeader from '@/components/dashboard/organization/details/OrgHeader';
import { useApiQuery } from '@/hooks/useApiQuery';

export default function OrganizationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: responseData, isLoading, isError, error } = useApiQuery(
    `/organizations/${id}`,
    ['organization', id]
  );

  const organization = useMemo(() => {
    if (!responseData) return null;
    const extracted = responseData.data?.organization || responseData.data || responseData;
    
    const rawStatus = extracted.status || 'ACTIVE';
    const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

    return {
      id: extracted.id || extracted._id || id,
      name: extracted.name || 'N/A',
      status: formattedStatus,
      location: extracted.country || extracted.location || 'N/A',
      stats: {
        bikes: extracted.bikes || 0,
        riders: extracted.riders || 0,
        active: extracted.activeRides || extracted.active || 0,
      }
    };
  }, [responseData, id]);

  const tabs = ['Overview', 'Fleet', 'Riders', 'Trips', 'Revenue', 'Settings'];
  const [activeTab, setActiveTab] = useState('Overview');

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-brand-blue mb-4" size={32} />
        <p className="text-text-gray font-medium">Loading organization details...</p>
      </div>
    );
  }

  if (isError) {
    const isNotFound = error?.response?.status === 404;
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="bg-red-50 p-6 rounded-2xl max-w-md border border-red-100">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            {isNotFound ? "Organization Not Found" : "Error Loading Organization"}
          </h2>
          <p className="text-red-600/80 text-sm mb-6">
            {isNotFound 
              ? "The organization you're looking for doesn't exist or has been deleted." 
              : error?.message || "An unexpected error occurred while fetching the details."}
          </p>
          <button 
            onClick={() => router.push('/dashboard/organization')}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Back to Organizations
          </button>
        </div>
      </div>
    );
  }

  if (!organization) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-text-gray hover:text-zinc-800 transition-colors w-fit">
        <ArrowLeft size={16} />
        <Link href="/dashboard/organization">Back to Organizations</Link>
      </div>

      <OrgHeader organization={organization} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-3xl font-semibold text-primary-accent">{organization.stats.bikes}</div>
          <div className="text-sm font-medium text-text-gray mt-1">Bikes</div>
        </div>
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-3xl font-semibold text-primary-accent">{organization.stats.riders}</div>
          <div className="text-sm font-medium text-text-gray mt-1">Riders</div>
        </div>
        <div className="surface p-6 flex flex-col justify-center">
          <div className="text-3xl font-semibold text-primary-accent">{organization.stats.active}</div>
          <div className="text-sm font-medium text-text-gray mt-1">Active Rides</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-gray">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                ? 'border-brand-blue text-brand-blue'
                : 'border-transparent text-text-gray hover:text-zinc-700 hover:border-zinc-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'Overview' && (
          <div className="surface p-8 flex flex-col items-center justify-center text-center text-text-gray min-h-[300px]">
            <p>Overview content for {organization.name}</p>
          </div>
        )}
        {activeTab === 'Fleet' && (
          <div className="surface p-8 flex flex-col items-center justify-center text-center text-text-gray min-h-[300px]">
            <p>Fleet management view</p>
          </div>
        )}
        {activeTab === 'Riders' && (
          <div className="surface p-8 flex flex-col items-center justify-center text-center text-text-gray min-h-[300px]">
            <p>Riders list and details</p>
          </div>
        )}
        {activeTab === 'Trips' && (
          <div className="surface p-8 flex flex-col items-center justify-center text-center text-text-gray min-h-[300px]">
            <p>Recent trips and history</p>
          </div>
        )}
        {activeTab === 'Revenue' && (
          <div className="surface p-8 flex flex-col items-center justify-center text-center text-text-gray min-h-[300px]">
            <p>Revenue statistics and charts</p>
          </div>
        )}
        {activeTab === 'Settings' && (
          <div className="surface p-8 flex flex-col items-center justify-center text-center text-text-gray min-h-[300px]">
            <p>Organization settings configuration</p>
          </div>
        )}
      </div>
    </div>
  );
}
