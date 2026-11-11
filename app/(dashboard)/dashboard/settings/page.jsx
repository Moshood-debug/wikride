"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/reuseable/PageHeader';
import { Save, Bell, Shield, Wallet, Globe, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('platform');

  const tabs = [
    { id: 'platform', label: 'Platform Config', icon: Globe },
    { id: 'pricing', label: 'Global Pricing', icon: Wallet },
    { id: 'security', label: 'Security & APIs', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Platform Settings" 
          description="Manage global configurations and policies for Wikride." 
        />
        <button className="btn-primary">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-accent text-brand-blue'
                      : 'text-text-gray hover:bg-accent hover:text-primary-accent'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-brand-blue' : 'text-zinc-400'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 surface p-6 sm:p-8 min-h-[500px]">
          
          {/* PLATFORM SETTINGS */}
          {activeTab === 'platform' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-semibold text-primary-accent mb-1">General Information</h3>
                <p className="text-sm text-text-gray mb-6">Update the main contact and branding details for the platform.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Platform Name</label>
                    <input type="text" defaultValue="Wikride" className="field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Support Email</label>
                    <input type="email" defaultValue="support@wikride.com" className="field" />
                  </div>
                </div>
              </div>

              <hr className="border-zinc-100" />

              <div>
                <h3 className="text-lg font-semibold text-primary-accent mb-1">Maintenance Mode</h3>
                <p className="text-sm text-text-gray mb-6">Temporarily disable rider access to the platform during upgrades.</p>
                <div className="flex items-center justify-between p-4 border border-border-gray rounded-xl bg-[#f7f9fd]">
                  <div>
                    <h4 className="font-medium text-slate-900">Enable Maintenance Mode</h4>
                    <p className="text-sm text-text-gray">Only Super Admins will be able to log in.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* PRICING SETTINGS */}
          {activeTab === 'pricing' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-semibold text-primary-accent mb-1">Base Pricing Model</h3>
                <p className="text-sm text-text-gray mb-6">Set the default rates for standard bike rentals.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Unlock Fee (₦)</label>
                    <input type="number" defaultValue="50.00" className="field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Rate per Minute (₦)</label>
                    <input type="number" defaultValue="20.00" className="field" />
                  </div>
                </div>
              </div>

              <hr className="border-zinc-100" />

              <div>
                <h3 className="text-lg font-semibold text-primary-accent mb-1">Wallet Configuration</h3>
                <p className="text-sm text-text-gray mb-6">Rules for user wallet balances and top-ups.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Minimum Top-up Amount (₦)</label>
                    <input type="number" defaultValue="500.00" className="field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Minimum Balance to Ride (₦)</label>
                    <input type="number" defaultValue="150.00" className="field" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY & APIs */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-semibold text-primary-accent mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-text-gray mb-6">Require 2FA for all administrative accounts.</p>
                <div className="flex items-center justify-between p-4 border border-border-gray rounded-xl bg-[#f7f9fd]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Lock size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Enforce Global 2FA</h4>
                      <p className="text-sm text-text-gray">All admins must configure Google Authenticator.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>
              </div>
              
              <hr className="border-zinc-100" />

              <div>
                <h3 className="text-lg font-semibold text-primary-accent mb-1">IoT Webhook Secrets</h3>
                <p className="text-sm text-text-gray mb-6">Keys used for validating requests from the bike IoT servers.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input type="password" value="sk_test_1234567890abcdefghijklmnopqrstuvwxyz" readOnly className="flex-1 h-10 px-3 bg-zinc-50 border border-zinc-300 rounded-lg text-sm focus:outline-none text-text-gray" />
                    <button className="btn-secondary h-10">Rotate Key</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-semibold text-primary-accent mb-1">Email Alerts</h3>
                <p className="text-sm text-text-gray mb-6">Configure which events trigger an email alert to the Super Admins.</p>
                
                <div className="space-y-4">
                  {[
                    { title: 'New Organization Registration', desc: 'When a new business signs up.' },
                    { title: 'IoT Connection Loss', desc: 'When a bike drops off the network for > 1 hour.', defaultChecked: true },
                    { title: 'High-Value Top-ups', desc: 'When a user tops up their wallet with > ₦50,000.', defaultChecked: true },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border-gray rounded-xl bg-[#f7f9fd] hover:bg-zinc-50 transition-colors">
                      <div>
                        <h4 className="font-medium text-slate-900">{alert.title}</h4>
                        <p className="text-sm text-text-gray">{alert.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={alert.defaultChecked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
