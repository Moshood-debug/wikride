"use client";

import React from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import { Plus } from 'lucide-react';
import CheckGeofenceForm from '@/components/dashboard/geofences/CheckGeofenceForm';

export default function GeofencesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Geofences" 
          description="Manage zones, boundaries, and restrictions for your fleet." 
        />
        <button className="btn-primary">
          <Plus size={16} />
          Create Geofence
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
           <CheckGeofenceForm />
        </div>
        <div className="lg:col-span-1 surface p-6 flex flex-col items-center justify-center text-center text-text-gray min-h-[300px]">
           <MapPlaceholder />
           <p className="mt-4 text-sm max-w-sm">
             Select a geofence to view its boundaries on the map, or use the check form to find active zones at a specific coordinate.
           </p>
        </div>
      </div>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div className="w-16 h-16 bg-blue-50 text-blue-200 rounded-2xl flex items-center justify-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
         <line x1="9" x2="9" y1="3" y2="18"></line>
         <line x1="15" x2="15" y1="6" y2="21"></line>
       </svg>
    </div>
  );
}
