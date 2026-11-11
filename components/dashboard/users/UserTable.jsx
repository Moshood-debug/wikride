"use client";

import React from 'react';
import { User, MoreVertical } from 'lucide-react';
import { statusStyles } from '@/constant';

export default function UserTable({ users = [] }) {
  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Organization</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-accent/70 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 font-bold">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-primary-accent">{user.name}</div>
                      <div className="text-xs text-text-gray">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray font-medium">{user.role}</td>
                <td className="px-6 py-4 text-text-gray">{user.organization || '-'}</td>
                <td className="px-6 py-4 text-text-gray">{user.joined}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[user.status] || statusStyles['N/A']}`}>
                    {user.status}
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
        
        {users.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No users found matching your criteria.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
        <span>Showing 1 to {users.length} of {users.length} results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
}
