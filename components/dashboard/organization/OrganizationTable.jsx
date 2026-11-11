"use client";

import React from 'react';
import { Building2, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrganizationTable({ organizations = [] }) {
  const router = useRouter();
  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">Organization</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Bikes</th>
              <th className="px-6 py-4 font-medium">Riders</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {organizations.map((org) => (
              <tr 
                key={org.id} 
                onClick={() => router.push(`/dashboard/organization/${org.id}`)}
                className="hover:bg-accent/70 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Building2 size={16} />
                    </div>
                    <span className="font-semibold text-primary-accent">{org.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray">{org.location}</td>
                <td className="px-6 py-4 text-text-gray">{org.bikes}</td>
                <td className="px-6 py-4 text-text-gray">{org.riders}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {org.status}
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
        
        {organizations.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No organizations found.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
        <span>Showing 1 to {organizations.length} of {organizations.length} results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
}
