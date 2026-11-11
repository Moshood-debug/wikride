"use client";

import React from 'react';
import { ShieldCheck, MoreVertical } from 'lucide-react';
import { statusStyles } from '@/constant';

export default function AdminTable({ admins = [] }) {
  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">Admin</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Last Login</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-accent/70 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 font-bold">
                      {admin.avatar ? (
                        <img src={admin.avatar} alt={admin.name} className="h-full w-full rounded-full object-cover" />
                      ) : (
                        admin.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-primary-accent flex items-center gap-1.5">
                        {admin.name}
                        {admin.role === 'Super Admin' && <ShieldCheck size={14} className="text-emerald-500" />}
                      </div>
                      <div className="text-xs text-text-gray">{admin.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray font-medium">{admin.role}</td>
                <td className="px-6 py-4 text-text-gray">{admin.lastLogin}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[admin.status] || statusStyles['N/A']}`}>
                    {admin.status}
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
        
        {admins.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No admins found matching your criteria.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
        <span>Showing 1 to {admins.length} of {admins.length} results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
}
