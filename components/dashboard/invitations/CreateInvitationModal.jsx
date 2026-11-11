"use client";

import React, { useState } from 'react';
import { X, Loader2, Send } from 'lucide-react';
import { useApiMutation } from '@/hooks/useApiQuery';
import { useApiQuery } from '@/hooks/useApiQuery';
import { toast } from 'sonner';

export default function CreateInvitationModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('ORGANIZATION_ADMIN');
  const [organizationId, setOrganizationId] = useState('');

  // Fetch organizations for the dropdown
  const { data: orgData, isLoading: isLoadingOrgs } = useApiQuery(
    '/organizations?limit=100',
    ['organizations-list'],
    { enabled: isOpen }
  );

  const mutation = useApiMutation({
    method: 'POST',
    url: '/invitations'
  });

  const organizations = React.useMemo(() => {
    if (!orgData) return [];
    
    let extracted = [];
    if (Array.isArray(orgData)) extracted = orgData;
    else if (orgData.data && Array.isArray(orgData.data)) extracted = orgData.data;
    else if (orgData.data?.data && Array.isArray(orgData.data.data)) extracted = orgData.data.data;
    else if (orgData.data?.items && Array.isArray(orgData.data.items)) extracted = orgData.data.items;
    
    return Array.isArray(extracted) ? extracted : [];
  }, [orgData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !organizationId) {
      toast.error('Please provide an email and select an organization.');
      return;
    }

    try {
      await mutation.mutateAsync({
        email,
        role,
        organizationId
      });
      
      toast.success('Invitation sent successfully!');
      
      // Reset form
      setEmail('');
      setRole('ORGANIZATION_ADMIN');
      setOrganizationId('');
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send invitation');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-border-gray">
          <h2 className="text-lg font-bold text-slate-900">Send Invitation</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent text-text-gray transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@partner.com"
              className="field"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="field"
            >
              <option value="ORGANIZATION_ADMIN">Organization Admin</option>
              <option value="FLEET_MANAGER">Fleet Manager</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Organization</label>
            {isLoadingOrgs ? (
              <div className="flex items-center gap-2 text-sm text-text-gray py-2">
                <Loader2 size={16} className="animate-spin" />
                Loading organizations...
              </div>
            ) : (
              <select
                required
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                className="field"
              >
                <option value="" disabled>Select an organization...</option>
                {organizations.map((org) => (
                  <option key={org.id || org._id} value={org.id || org._id}>
                    {org.name || org.email || org.id}
                  </option>
                ))}
              </select>
            )}
            <p className="text-xs text-text-gray mt-1">Required to associate this admin with a specific tenant.</p>
          </div>
        </form>

        <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={mutation.isLoading}
            className="btn-primary"
          >
            {mutation.isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Invite
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
