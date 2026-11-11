"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import TripFilters from '@/components/dashboard/trips/TripFilters';
import TripTable from '@/components/dashboard/trips/TripTable';
import { Download } from 'lucide-react';

const mockTrips = [
  { id: 'TRP-1001', rider: 'Charlie Davis', bikeId: 'BK-001', date: 'Oct 24, 2025', time: '14:30 PM', amount: '₦450.00', status: 'Completed' },
  { id: 'TRP-1002', rider: 'Diana Prince', bikeId: 'BK-002', date: 'Oct 24, 2025', time: '15:15 PM', amount: '₦1,200.00', status: 'Ongoing' },
  { id: 'TRP-1003', rider: 'Eve Smith', bikeId: 'BK-003', date: 'Oct 23, 2025', time: '09:00 AM', amount: '₦0.00', status: 'Cancelled' },
  { id: 'TRP-1004', rider: 'Frank Castle', bikeId: 'BK-001', date: 'Oct 23, 2025', time: '18:45 PM', amount: '₦850.00', status: 'Completed' },
];

export default function TripsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  const filteredTrips = mockTrips.filter(trip => {
    const matchesSearch = trip.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trip.rider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trip.bikeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Trips History" 
          description="View and manage all ride history and transactions across the platform." 
        />
        <button className="btn-secondary">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <TripFilters 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onReset={handleReset}
      />

      <TripTable trips={filteredTrips} />
    </div>
  );
}
