"use client";

import React from 'react';
import { ClipboardList, MoreVertical, Calendar } from 'lucide-react';
import { statusStyles } from '@/constant';

export default function WorkOrderTable({ workOrders = [] }) {
  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">Work Order ID</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {workOrders.map((order) => (
              <tr 
                key={order.id} 
                className="hover:bg-accent/70 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <ClipboardList size={16} />
                    </div>
                    <span className="font-semibold text-primary-accent">{order.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray">
                  <div className="max-w-[200px] truncate" title={order.description}>
                    {order.description || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    order.priority?.toLowerCase() === 'high' ? 'bg-red-50 text-red-700' :
                    order.priority?.toLowerCase() === 'medium' ? 'bg-amber-50 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {order.priority || 'Normal'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[order.status] || statusStyles['Active']}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-gray whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-zinc-400" />
                    {order.createdAt}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left opacity-70 hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-accent rounded-lg text-text-gray transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {workOrders.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No work orders found.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {workOrders.length > 0 && (
        <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
          <span>Showing 1 to {workOrders.length} of {workOrders.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
