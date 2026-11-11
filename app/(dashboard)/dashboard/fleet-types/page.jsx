"use client";

import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import { Plus, Loader2 } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';
import FleetTypeTable from '@/components/dashboard/fleet-types/FleetTypeTable';

export default function FleetTypesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch fleet types from the API
  const { data: responseData, isLoading, isError, error } = useApiQuery(
    '/fleet-types',
    ['fleet-types']
  );

  const fleetTypes = useMemo(() => {
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

  const filteredFleetTypes = useMemo(() => {
    return fleetTypes.filter(ft => {
      const matchesSearch = ft.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        ft.type?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    }).map(ft => {
      const rawStatus = ft.status || 'ACTIVE';
      const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

      return {
        ...ft,
        id: ft.id || ft._id,
        name: ft.name || 'N/A',
        type: ft.type || 'N/A',
        status: formattedStatus
      };
    });
  }, [fleetTypes, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Fleet Types" 
          description="Manage fleet configurations and models." 
        />
        <button className="btn-primary">
          <Plus size={16} />
          Add Fleet Type
        </button>
      </div>

      <div className="surface p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search fleet types..."
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
          Error loading fleet types: {error?.message || "Something went wrong."}
        </div>
      ) : (
        <FleetTypeTable fleetTypes={filteredFleetTypes} />
      )}
    </div>
  );
}
