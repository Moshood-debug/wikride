import React from 'react';
import { UserPlus, Building2, MapPin, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'new_org',
    title: 'New Organization Onboarded',
    description: 'Tech Hub Lagos has been added to the platform.',
    time: '2 hours ago',
    icon: Building2,
    color: 'text-brand-blue',
    bgColor: 'bg-blue-50',
  },
  {
    id: 2,
    type: 'trip_completed',
    title: 'High-Value Trip Completed',
    description: 'Trip TRP-1004 finished. Amount: ₦1,250.',
    time: '4 hours ago',
    icon: MapPin,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 3,
    type: 'new_user',
    title: 'New Rider Registered',
    description: 'Samuel O. just created an account.',
    time: '5 hours ago',
    icon: UserPlus,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 4,
    type: 'bike_alert',
    title: 'Maintenance Alert',
    description: 'Bike BK-042 requires immediate servicing.',
    time: '1 day ago',
    icon: AlertCircle,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
];

export default function RecentActivity() {
  return (
    <div className="surface p-5 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary-accent">Recent Activity</h2>
          <p className="text-sm text-text-gray">Latest platform events</p>
        </div>
        <button className="text-sm font-semibold text-brand-blue hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-5 flex-1">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex gap-3 relative">
              {index !== activities.length - 1 && (
                <div className="absolute left-5 top-10 bottom-[-20px] w-px bg-border-gray"></div>
              )}

              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 ${activity.bgColor} ${activity.color}`}>
                <Icon size={16} />
              </div>

              <div className="flex-1 pb-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="text-sm font-semibold text-primary-accent">{activity.title}</h3>
                  <span className="text-xs text-text-gray whitespace-nowrap">{activity.time}</span>
                </div>
                <p className="text-sm text-text-gray">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
