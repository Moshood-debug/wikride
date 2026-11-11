"use client";

import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import ActivityFilters from '@/components/dashboard/activity/ActivityFilters';
import ActivityTable from '@/components/dashboard/activity/ActivityTable';
import { Download, Loader2 } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';

export default function AuditLogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');

  const { data: responseData, isLoading, isError, error } = useApiQuery(
    '/audit-logs?page=1&limit=20',
    ['audit-logs']
  );

  const activities = useMemo(() => {
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

  const handleReset = () => {
    setSearchTerm('');
    setActionFilter('All');
  };

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const adminStr = activity.adminName || activity.actor?.email || activity.actor?.name || 'System';
      const detailStr = activity.details || activity.description || '';
      
      const matchesSearch = adminStr.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            detailStr.toLowerCase().includes(searchTerm.toLowerCase());
      
      const activityAction = activity.action || 'Unknown';
      const matchesAction = actionFilter === 'All' || activityAction === actionFilter;
      
      return matchesSearch && matchesAction;
    }).map(activity => {
      let parsedDate = 'N/A';
      let parsedTime = 'N/A';
      
      if (activity.createdAt || activity.timestamp) {
        const d = new Date(activity.createdAt || activity.timestamp);
        parsedDate = d.toLocaleDateString();
        parsedTime = d.toLocaleTimeString();
      }

      const adminStr = activity.adminName || activity.actor?.email || activity.actor?.name || 'System';

      return {
        ...activity,
        id: activity.id || activity._id || Math.random().toString(),
        date: parsedDate,
        time: parsedTime,
        adminName: adminStr,
        action: activity.action || 'Unknown',
        details: activity.details || activity.description || 'No details provided.',
        ipAddress: activity.ipAddress || activity.ip || 'Unknown'
      };
    });
  }, [activities, searchTerm, actionFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Audit Logs" 
          description="Track and audit administrative actions across the platform." 
        />
        <button className="btn-secondary">
          <Download size={16} />
          Export Audit Log
        </button>
      </div>

      <ActivityFilters 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        actionFilter={actionFilter}
        onActionFilterChange={setActionFilter}
        onReset={handleReset}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-brand-blue" size={32} />
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center border border-red-100">
          Error loading audit logs: {error?.message || "Something went wrong."}
        </div>
      ) : (
        <ActivityTable activities={filteredActivities} />
      )}
    </div>
  );
}
