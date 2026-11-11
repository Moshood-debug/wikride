"use client";

import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import { Plus, Loader2 } from 'lucide-react';
import OrganizationFilters from '@/components/dashboard/organization/OrganizationFilters';
import OrganizationTable from '@/components/dashboard/organization/OrganizationTable';
import { useApiQuery } from '@/hooks/useApiQuery';

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch organizations from the API
  const { data: responseData, isLoading, isError, error } = useApiQuery(
    '/organizations',
    ['organizations']
  );

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  // Extract organizations from response safely
  const organizations = useMemo(() => {
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

  const filteredOrganizations = useMemo(() => {
    return organizations.filter(org => {
      const matchesSearch = org.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        org.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatus = statusFilter === 'All' || org.status === statusFilter || 
        (org.status && org.status.toUpperCase() === statusFilter.toUpperCase());

      return matchesSearch && matchesStatus;
    }).map(org => {
      const rawStatus = org.status || 'ACTIVE';
      const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

      return {
        ...org,
        id: org.id || org._id,
        name: org.name || 'N/A',
        location: org.country || org.location || 'N/A',
        bikes: org.bikes || 0,
        riders: org.riders || 0,
        status: formattedStatus
      };
    });
  }, [organizations, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Organizations" 
          description="Manage organizations, their fleets, and assign admins." 
        />
        <button className="btn-primary">
          <Plus size={16} />
          Add Organization
        </button>
      </div>

      <OrganizationFilters 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onReset={handleReset}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center border border-red-100">
          Error loading organizations: {error?.message || "Something went wrong."}
        </div>
      ) : (
        <OrganizationTable organizations={filteredOrganizations} />
      )}
    </div>
  );
}
