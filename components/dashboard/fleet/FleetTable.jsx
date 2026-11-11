"use client";

import React from 'react';
import { MoreVertical, Bike } from 'lucide-react';
import { statusStyles } from '@/constant';

import { useRouter } from 'next/navigation';

export default function FleetTable({ fleets = [] }) {
  const router = useRouter();

  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">Bike ID</th>
              <th className="px-6 py-4 font-medium">Organization</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Battery</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {fleets.map((fleet) => (
              <tr 
                key={fleet.id} 
                onClick={() => router.push(`/dashboard/fleet/${fleet.id}`)}
                className="hover:bg-accent/70 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <Bike size={16} />
                    </div>
                    <span className="font-semibold text-primary-accent">{fleet.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray">{fleet.organization}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[fleet.status] || statusStyles['N/A']}`}>
                    {fleet.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-gray">
                  {fleet.battery ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${parseInt(fleet.battery) > 20 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          style={{ width: fleet.battery }}
                        />
                      </div>
                      <span className="text-xs font-medium">{fleet.battery}</span>
                    </div>
                  ) : (
                    <span className="text-zinc-400">--</span>
                  )}
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
        
        {fleets.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No fleets found.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
        <span>Showing 1 to {fleets.length} of {fleets.length} results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
}
