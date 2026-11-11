"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', rides: 1200 },
  { name: 'Tue', rides: 1400 },
  { name: 'Wed', rides: 1100 },
  { name: 'Thu', rides: 1600 },
  { name: 'Fri', rides: 2100 },
  { name: 'Sat', rides: 2800 },
  { name: 'Sun', rides: 2400 },
];

export default function RidesChart() {
  return (
    <div className="surface p-5 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-primary-accent">Rides</h2>
          <p className="text-sm text-text-gray">Weekly ride volume across all organizations</p>
        </div>
        <select className="h-10 px-3 bg-[#f7f9fd] border border-border-gray rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
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
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e7f0', boxShadow: '0 12px 30px rgb(7 26 69 / 0.08)' }}
              itemStyle={{ color: '#1b63f5', fontWeight: 600 }}
              formatter={(value) => [`${value} Rides`, 'Volume']}
            />
            <Line
              type="monotone"
              dataKey="rides"
              stroke="#1b63f5"
              strokeWidth={3}
              dot={{ r: 4, fill: '#1b63f5', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#1b63f5', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
