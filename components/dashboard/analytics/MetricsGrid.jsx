import React from 'react';
import {
  Activity,
  CalendarDays,
  Users,
  Building2,
  CreditCard,
  Clock,
  Map,
  Percent,
  Trophy
} from 'lucide-react';

const metrics = [
  { label: 'Daily rides', value: '1,842', trend: '+12%', icon: Activity, color: 'text-brand-blue', bg: 'bg-blue-50' },
  { label: 'Monthly rides', value: '45,210', trend: '+8%', icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Active riders', value: '12,480', trend: '+5%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'New organizations', value: '4', trend: 'This month', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Revenue (Monthly)', value: '₦8.2M', trend: '+15%', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Avg ride duration', value: '18m 45s', trend: '-2m', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Avg ride distance', value: '3.2 km', trend: '+0.4 km', icon: Map, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Fleet utilization', value: '68%', trend: '+4%', icon: Percent, color: 'text-rose-600', bg: 'bg-rose-50' },
  { label: 'Most active org', value: 'UNILAG', trend: '12k rides', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
];

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div key={idx} className="surface p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${metric.bg} ${metric.color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-gray mb-0.5">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-primary-accent">{metric.value}</span>
                <span className={`text-xs font-medium ${metric.trend.startsWith('+') ? 'text-emerald-600' : metric.trend.startsWith('-') ? 'text-rose-600' : 'text-text-gray'}`}>
                  {metric.trend}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
