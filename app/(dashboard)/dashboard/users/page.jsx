"use client";

import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import UserFilters from '@/components/dashboard/users/UserFilters';
import UserTable from '@/components/dashboard/users/UserTable';
import { Plus, Loader2 } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  // Fetch users from the API
  const { data: responseData, isLoading, isError, error } = useApiQuery(
    '/users',
    ['users']
  );

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setRoleFilter('All');
  };

  // Safely extract the users array from response
  // Assuming the API might return the array directly or inside a `data` property
  const users = useMemo(() => {
    if (!responseData) return [];
    
    let extracted = [];
    if (Array.isArray(responseData)) {
      extracted = responseData;
    } else if (responseData.data && Array.isArray(responseData.data)) {
      extracted = responseData.data;
    } else if (responseData.data?.data && Array.isArray(responseData.data.data)) {
      extracted = responseData.data.data;
    } else if (responseData.data?.users && Array.isArray(responseData.data.users)) {
      extracted = responseData.data.users;
    } else if (responseData.data?.items && Array.isArray(responseData.data.items)) {
      extracted = responseData.data.items;
    } else if (responseData.users && Array.isArray(responseData.users)) {
      extracted = responseData.users;
    }

    return Array.isArray(extracted) ? extracted : [];
  }, [responseData]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase());

      const emailMatch = user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSearch = nameMatch || emailMatch;

      // Handle status if present
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

      // Handle role if present
      const matchesRole = roleFilter === 'All' || user.role === roleFilter || user.role?.name === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    }).map(user => ({
      ...user,
      id: user.id || user._id,
      name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A',
      email: user.email || 'N/A',
      role: user.role?.name || user.role || 'N/A',
      organization: user.organization?.name || user.organization || '-',
      joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : user.joined || '-',
      status: user.status || 'Active'
    }));
  }, [users, searchTerm, statusFilter, roleFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Users"
          description="Manage admins, organization managers, and riders across the platform."
        />
        <button className="btn-primary">
          <Plus size={16} />
          Add User
        </button>
      </div>

      <UserFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        onReset={handleReset}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center border border-red-100">
          Error loading users: {error?.message || "Something went wrong."}
        </div>
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
}
