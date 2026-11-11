"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import clsx from "clsx";
import { X } from "lucide-react";

export default function DashboardLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="min-h-screen flex bg-background">
            <div
                className={clsx(
                    "hidden md:flex h-screen sticky top-0 z-40 shrink-0 transition-all duration-300 p-3 pr-0",
                    isSidebarCollapsed ? "w-[88px]" : "w-[280px]"
                )}
            >
                <Sidebar
                    collapsed={isSidebarCollapsed}
                    onCollapseChange={setIsSidebarCollapsed}
                />
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-brand-navy/50 backdrop-blur-sm z-50 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            <div
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 w-[288px] p-3 transform transition-transform duration-300 ease-in-out md:hidden",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="relative h-full">
                    <button
                        type="button"
                        className="absolute top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none"
                        onClick={closeMobileMenu}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <Sidebar onNavClick={closeMobileMenu} />
                </div>
            </div>

            <div className="flex flex-col flex-1 w-0 min-w-0">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1440px]">{children}</div>
                </main>
            </div>
        </div>
    );
}
