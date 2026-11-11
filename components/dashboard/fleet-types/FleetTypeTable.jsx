"use client";

import React from 'react';
import { Settings, MoreVertical, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { statusStyles } from '@/constant';

export default function FleetTypeTable({ fleetTypes = [] }) {
  const router = useRouter();

  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Max Speed</th>
              <th className="px-6 py-4 font-medium">Battery Cap.</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {fleetTypes.map((ft) => (
              <tr 
                key={ft.id} 
                onClick={() => router.push(`/dashboard/fleet-types/${ft.id}`)}
                className="hover:bg-accent/70 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Settings size={16} />
                    </div>
                    <span className="font-semibold text-primary-accent">{ft.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray">{ft.type || 'N/A'}</td>
                <td className="px-6 py-4 text-text-gray">
                  {ft.maxSpeed ? `${ft.maxSpeed} km/h` : 'N/A'}
                </td>
                <td className="px-6 py-4 text-text-gray">
                  {ft.batteryCapacity ? (
                    <span className="flex items-center gap-1">
                      <Zap size={14} className="text-amber-500" />
                      {ft.batteryCapacity} kWh
                    </span>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[ft.status] || statusStyles['Active']}`}>
                    {ft.status}
                  </span>
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
        
        {fleetTypes.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No fleet types found.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {fleetTypes.length > 0 && (
        <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
          <span>Showing 1 to {fleetTypes.length} of {fleetTypes.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
