"use client";

import React from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import RidesChart from '@/components/dashboard/analytics/RidesChart';
import MetricsGrid from '@/components/dashboard/analytics/MetricsGrid';
import { Download } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Platform Analytics" 
          description="High-level metrics and performance data across the Wikride ecosystem." 
        />
        <button className="btn-secondary">
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* Main Chart Area */}
      <div className="w-full">
        <RidesChart />
      </div>

      {/* Grid of Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-primary-accent mb-4">Key Performance Indicators</h3>
        <MetricsGrid />
      </div>
    </div>
  );
}
