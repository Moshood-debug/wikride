"use client";

import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import { Plus, Loader2 } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';
import InvitationTable from '@/components/dashboard/invitations/InvitationTable';
import CreateInvitationModal from '@/components/dashboard/invitations/CreateInvitationModal';
import { useQueryClient } from '@tanstack/react-query';

export default function InvitationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  
  // Fetch invitations from the API
  const { data: responseData, isLoading, isError, error } = useApiQuery(
    '/invitations?page=1&limit=10',
    ['invitations']
  );

  const invitations = useMemo(() => {
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

  const filteredInvitations = useMemo(() => {
    return invitations.filter(invite => {
      const matchesSearch = invite.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        invite.role?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    }).map(invite => {
      const rawStatus = invite.status || 'PENDING';
      const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

      return {
        ...invite,
        id: invite.id || invite._id || 'N/A',
        email: invite.email || 'N/A',
        role: invite.role || 'N/A',
        status: formattedStatus,
        createdAt: invite.createdAt ? new Date(invite.createdAt).toLocaleDateString() : 'N/A'
      };
    });
  }, [invitations, searchTerm]);

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['invitations'] });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Invitations" 
          description="Manage sent invites for new admins, fleet managers, and operators." 
        />
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          Send Invite
        </button>
      </div>

      <div className="surface p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by email..."
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
          Error loading invitations: {error?.message || "Something went wrong."}
        </div>
      ) : (
        <InvitationTable invitations={filteredInvitations} />
      )}

      <CreateInvitationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess} 
      />
    </div>
  );
}
