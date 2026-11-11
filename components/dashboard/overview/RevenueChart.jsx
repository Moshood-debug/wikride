"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, rides: 2400 },
  { name: 'Feb', revenue: 3000, rides: 1398 },
  { name: 'Mar', revenue: 2000, rides: 9800 },
  { name: 'Apr', revenue: 2780, rides: 3908 },
  { name: 'May', revenue: 1890, rides: 4800 },
  { name: 'Jun', revenue: 2390, rides: 3800 },
  { name: 'Jul', revenue: 3490, rides: 4300 },
];

export default function RevenueChart() {
  return (
    <div className="surface p-5 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-primary-accent">Revenue Overview</h2>
          <p className="text-sm text-text-gray">Monthly revenue across all organizations</p>
        </div>
        <select className="h-10 px-3 bg-[#f7f9fd] border border-border-gray rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue">
          <option>This Year</option>
          <option>Last 6 Months</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1b63f5" stopOpacity={0.28}/>
                <stop offset="95%" stopColor="#1b63f5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e7f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#5b6475' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#5b6475' }}
              tickFormatter={(value) => `₦${value}`}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e7f0', boxShadow: '0 12px 30px rgb(7 26 69 / 0.08)' }}
              itemStyle={{ color: '#1b63f5', fontWeight: 600 }}
              formatter={(value) => [`₦${value}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1b63f5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
