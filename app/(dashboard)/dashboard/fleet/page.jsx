"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import FleetTable from '@/components/dashboard/fleet/FleetTable';
import FleetFilters from '@/components/dashboard/fleet/FleetFilters';

const mockFleets = [
  { id: 'BK-001', organization: 'UNILAG', status: 'Available', battery: '92%' },
  { id: 'BK-002', organization: 'UNILAG', status: 'In Ride', battery: '84%' },
  { id: 'BK-003', organization: 'Eko Hotel', status: 'Maintenance', battery: null },
];

export default function FleetPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizationFilter, setOrganizationFilter] = useState('All');

  // Filter logic
  const filteredFleets = mockFleets.filter(fleet => {
    const matchesSearch = fleet.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrg = organizationFilter === 'All' || fleet.organization === organizationFilter;
    return matchesSearch && matchesOrg;
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Fleet" 
        description="Monitor and manage all bikes across organizations." 
      />

      <FleetFilters 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        organizationFilter={organizationFilter}
        onOrganizationFilterChange={setOrganizationFilter}
      />

      <FleetTable fleets={filteredFleets} />
    </div>
  );
}
