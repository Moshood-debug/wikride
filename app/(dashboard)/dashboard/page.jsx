import React from 'react';
import { Building2, Bike, Users, CreditCard } from 'lucide-react';
import PageHeader from '@/components/reuseable/PageHeader';
import RevenueChart from '@/components/dashboard/overview/RevenueChart';
import RecentActivity from '@/components/dashboard/overview/RecentActivity';

const stats = [
    {
        title: 'Organizations',
        value: '24',
        description: 'Live on the platform',
        icon: Building2,
        accent: 'from-blue-500/15 to-transparent',
        iconClass: 'bg-blue-50 text-brand-blue',
    },
    {
        title: 'Bikes',
        value: '842',
        description: 'Across all fleets',
        icon: Bike,
        accent: 'from-indigo-500/15 to-transparent',
        iconClass: 'bg-indigo-50 text-indigo-600',
    },
    {
        title: 'Riders',
        value: '12,480',
        description: 'Registered accounts',
        icon: Users,
        accent: 'from-emerald-500/15 to-transparent',
        iconClass: 'bg-emerald-50 text-emerald-600',
    },
    {
        title: 'Revenue',
        value: '₦5,653,381.97',
        description: 'Platform total',
        icon: CreditCard,
        accent: 'from-amber-400/20 to-transparent',
        iconClass: 'bg-amber-50 text-amber-600',
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title={"Overview"}
                description={"Monitor the overall health and metrics of the Wikride platform."}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="surface relative overflow-hidden p-5">
                            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.accent}`} />
                            <div className="relative flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-medium text-text-gray">{stat.title}</h3>
                                    <span className="mt-3 block text-2xl font-semibold text-primary-accent tracking-tight">
                                        {stat.value}
                                    </span>
                                    <p className="mt-1 text-xs text-text-gray">{stat.description}</p>
                                </div>
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${stat.iconClass}`}>
                                    <Icon size={18} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div className="lg:col-span-1">
                    <RecentActivity />
                </div>
            </div>
        </div>
    );
}
