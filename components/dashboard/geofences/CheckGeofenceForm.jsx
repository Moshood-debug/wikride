"use client";

import React, { useState } from 'react';
import { Search, Loader2, Map, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';

export default function CheckGeofenceForm() {
  const [lat, setLat] = useState('52.5205');
  const [lng, setLng] = useState('13.4055');
  const [queryObj, setQueryObj] = useState(null);

  const { data: responseData, isLoading, isError, error } = useApiQuery(
    queryObj ? `/geofences/contains?lat=${queryObj.lat}&lng=${queryObj.lng}` : null,
    ['geofence-contains', queryObj?.lat, queryObj?.lng],
    {
      enabled: !!queryObj
    }
  );

  const handleCheck = (e) => {
    e.preventDefault();
    if (lat && lng) {
      setQueryObj({ lat, lng });
    }
  };

  const results = React.useMemo(() => {
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

  return (
    <div className="surface p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Map size={20} className="text-brand-blue" />
        Check Point-in-Polygon
      </h3>
      <p className="text-sm text-text-gray mb-6">
        Enter coordinates to see which geofences (like NO_PARKING or SPEED_LIMIT zones) contain that point.
      </p>

      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-text-gray mb-1">Latitude</label>
          <input
            type="number"
            step="any"
            required
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="field"
            placeholder="e.g. 52.5205"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-text-gray mb-1">Longitude</label>
          <input
            type="number"
            step="any"
            required
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="field"
            placeholder="e.g. 13.4055"
          />
        </div>
        <div className="flex items-end">
          <button 
            type="submit"
            className="btn-primary h-11"
          >
            <Search size={16} />
            Check Location
          </button>
        </div>
      </form>

      {/* Results Section */}
      {queryObj && (
        <div className="border-t border-zinc-100 pt-6">
          <h4 className="text-sm font-semibold text-slate-800 mb-4">
            Results for {queryObj.lat}, {queryObj.lng}
          </h4>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="animate-spin text-brand-blue" size={24} />
              <p className="text-sm text-text-gray">Scanning geofences...</p>
            </div>
          ) : isError ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 flex items-start gap-3">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-1">Check Failed</strong>
                {error?.message || "An error occurred while checking geofences."}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              {results.map((fence) => (
                <div key={fence.id || fence._id || Math.random()} className="flex items-center justify-between p-4 bg-[#f7f9fd] rounded-xl border border-border-gray">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <div>
                      <div className="font-semibold text-primary-accent">{fence.name || 'Unnamed Geofence'}</div>
                      <div className="text-xs text-text-gray mt-0.5">Type: {fence.type || 'N/A'}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono bg-white px-2 py-1 rounded-lg border border-border-gray text-text-gray">
                    ID: {fence.id || fence._id}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-gray bg-[#f7f9fd] rounded-xl border border-border-gray border-dashed">
              No geofences cover this location.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
