"use client";

import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import { Plus, Loader2 } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';
import WorkOrderTable from '@/components/dashboard/work-orders/WorkOrderTable';

export default function WorkOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch work orders from the API
  const { data: responseData, isLoading, isError, error } = useApiQuery(
    '/work-orders?page=1&limit=10',
    ['work-orders']
  );

  const workOrders = useMemo(() => {
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

  const filteredWorkOrders = useMemo(() => {
    return workOrders.filter(order => {
      const matchesSearch = order.id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    }).map(order => {
      const rawStatus = order.status || 'PENDING';
      const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

      return {
        ...order,
        id: order.id || order._id || 'N/A',
        description: order.description || order.title || 'N/A',
        priority: order.priority || 'Normal',
        status: formattedStatus,
        createdAt: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'
      };
    });
  }, [workOrders, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Work Orders" 
          description="Manage and track maintenance tasks across the platform." 
        />
        <button className="btn-primary">
          <Plus size={16} />
          Create Work Order
        </button>
      </div>

      <div className="surface p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by ID or description..."
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
          Error loading work orders: {error?.message || "Something went wrong."}
        </div>
      ) : (
        <WorkOrderTable workOrders={filteredWorkOrders} />
      )}
    </div>
  );
}
