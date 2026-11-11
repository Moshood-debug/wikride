"use client";

import React from 'react';
import { User, Globe } from 'lucide-react';

const actionStyles = {
  Create: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Update: 'bg-blue-50 text-blue-700 border-blue-200',
  Delete: 'bg-rose-50 text-rose-700 border-rose-200',
  Login: 'bg-purple-50 text-purple-700 border-purple-200',
  Export: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function ActivityTable({ activities = [] }) {
  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">Timestamp</th>
              <th className="px-6 py-4 font-medium">Admin</th>
              <th className="px-6 py-4 font-medium">Action</th>
              <th className="px-6 py-4 font-medium">Details</th>
              <th className="px-6 py-4 font-medium">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-accent/70 transition-colors group">
                <td className="px-6 py-4 text-text-gray whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{activity.date}</span>
                    <span className="text-xs">{activity.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <User size={12} />
                    </div>
                    <span className="font-medium text-slate-900">{activity.adminName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${actionStyles[activity.action] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                    {activity.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-gray">
                  {activity.details}
                </td>
                <td className="px-6 py-4 text-text-gray text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <Globe size={12} className="text-zinc-400" />
                    {activity.ipAddress}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {activities.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No activity logs found matching your criteria.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
        <span>Showing 1 to {activities.length} of {activities.length} results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
}
