"use client";

import React from 'react';
import { MoreVertical, MapPin } from 'lucide-react';
import { statusStyles } from '@/constant';

export default function TripTable({ trips = [] }) {
  return (
    <div className="surface overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 font-medium">Trip ID</th>
              <th className="px-6 py-4 font-medium">Rider</th>
              <th className="px-6 py-4 font-medium">Bike ID</th>
              <th className="px-6 py-4 font-medium">Date & Time</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {trips.map((trip) => (
              <tr key={trip.id} className="hover:bg-accent/70 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                      <MapPin size={16} />
                    </div>
                    <span className="font-semibold text-primary-accent">{trip.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray font-medium">{trip.rider}</td>
                <td className="px-6 py-4 text-text-gray">{trip.bikeId}</td>
                <td className="px-6 py-4 text-text-gray">
                  <div className="flex flex-col">
                    <span>{trip.date}</span>
                    <span className="text-xs text-zinc-400">{trip.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-gray font-semibold">{trip.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[trip.status] || statusStyles['N/A']}`}>
                    {trip.status}
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
        
        {trips.length === 0 && (
          <div className="p-8 text-center text-text-gray text-sm">
            No trips found matching your criteria.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-border-gray flex items-center justify-between text-sm text-text-gray bg-[#f7f9fd]">
        <span>Showing 1 to {trips.length} of {trips.length} results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 border border-border-gray rounded-lg bg-white text-zinc-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
}
