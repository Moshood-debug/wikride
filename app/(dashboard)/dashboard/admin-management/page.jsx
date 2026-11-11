"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import AdminFilters from '@/components/dashboard/admin-management/AdminFilters';
import AdminTable from '@/components/dashboard/admin-management/AdminTable';
import { ShieldPlus } from 'lucide-react';

const mockAdmins = [
  { id: '1', name: 'Admin One', email: 'admin1@wikride.com', role: 'Super Admin', lastLogin: '10 mins ago', status: 'Active' },
  { id: '2', name: 'Admin Two', email: 'admin2@wikride.com', role: 'Operations', lastLogin: '2 hours ago', status: 'Active' },
  { id: '3', name: 'Admin Three', email: 'admin3@wikride.com', role: 'Support', lastLogin: '3 days ago', status: 'Suspended' },
];

export default function AdminManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setRoleFilter('All');
  };

  const filteredAdmins = mockAdmins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || admin.status === statusFilter;
    const matchesRole = roleFilter === 'All' || admin.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Admin Management" 
          description="Control system access and permissions for internal staff." 
        />
        <button className="btn-primary">
          <ShieldPlus size={16} />
          Invite Admin
        </button>
      </div>

      <AdminFilters 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        onReset={handleReset}
      />

      <AdminTable admins={filteredAdmins} />
    </div>
  );
}
