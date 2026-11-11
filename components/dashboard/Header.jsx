"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header({ onMenuClick }) {
    const user = useAuthStore((state) => state.user);

    const roleLabel = user?.role === "SUPER_ADMIN" ? "Super Admin" : user?.role;
    const displayName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Admin";
    const initials = `${user?.firstName?.[0] || "A"}${user?.lastName?.[0] || ""}`;

    return (
        <header className="sticky top-0 z-30 px-4 sm:px-6 lg:px-8 pt-4">
            <div className="h-16 bg-white/80 border border-border-gray rounded-2xl backdrop-blur-xl shadow-[0_8px_24px_rgb(7_26_69_/_0.04)] flex items-center justify-between px-3 sm:px-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                        onClick={onMenuClick}
                        aria-label="Open mobile menu"
                        className="p-2 rounded-xl text-primary-accent hover:bg-accent md:hidden cursor-pointer"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="hidden md:flex items-center gap-2 h-10 w-full max-w-md px-3 rounded-xl bg-[#f7f9fd] border border-border-gray text-sm text-text-gray">
                        <Search size={16} className="shrink-0" />
                        <input
                            type="search"
                            placeholder="Search organizations, trips, fleet…"
                            className="w-full bg-transparent outline-none text-foreground placeholder:text-zinc-400"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1.5 text-xs font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live ops
                    </div>

                    <button
                        type="button"
                        className="relative h-10 w-10 rounded-xl border border-border-gray bg-white text-primary-accent hover:bg-accent transition-colors cursor-pointer"
                    >
                        <Bell size={16} className="mx-auto" />
                        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-brand-blue" />
                    </button>

                    <div className="flex items-center gap-3 pl-1">
                        <div className="h-10 w-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-semibold text-xs overflow-hidden shrink-0">
                            {initials}
                        </div>
                        <div className="hidden sm:flex flex-col items-start text-left">
                            <span className="text-sm font-semibold text-primary-accent leading-tight">
                                {displayName}
                            </span>
                            <span className="text-xs text-text-gray leading-tight">
                                {roleLabel || "Operator"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
