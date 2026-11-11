"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    ChevronDown,
    Building2,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    Loader2,
    ClipboardList,
    Percent,
    Car,
    MapPin,
    LineChart,
    IdCardLanyard,
    Mail
} from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const navItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: LineChart,
    },
    {
        name: "Operations",
        icon: Building2,
        children: [
            { name: "Organization", href: "/dashboard/organization", icon: Building2 },
            { name: "Trips History", href: "/dashboard/trips", icon: MapPin },
            { name: "Work Orders", href: "/dashboard/work-orders", icon: ClipboardList },
            { name: "Audit Logs", href: "/dashboard/audit-logs", icon: ClipboardList },
        ],
    },
    {
        name: "Fleet",
        icon: Car,
        children: [
            { name: "Live Fleet", href: "/dashboard/fleet", icon: Car },
            { name: "Fleet Types", href: "/dashboard/fleet-types", icon: Settings },
            { name: "Geofences", href: "/dashboard/geofences", icon: MapPin },
        ],
    },
    {
        name: "Users & Security",
        icon: Users,
        children: [
            { name: "User Directory", href: "/dashboard/users", icon: Users },
            { name: "KYC Checks", href: "/dashboard/kyc-checks", icon: IdCardLanyard },
            { name: "Admins", href: "/dashboard/admin-management", icon: ShieldCheck },
            { name: "Invitations", href: "/dashboard/invitations", icon: Mail },
        ],
    },
    {
        name: "Coupons",
        href: "/dashboard/coupons",
        icon: Percent,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export default function Sidebar({ onNavClick, collapsed, onCollapseChange }) {
    const pathname = usePathname();
    const router = useRouter();
    const [internalCollapsed, setInternalCollapsed] = useState(false);

    const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;
    const setIsCollapsed = (v) => {
        setInternalCollapsed(v);
        onCollapseChange?.(v);
    };

    const [expanded, setExpanded] = useState(() => {
        const init = {};
        navItems.forEach((item) => {
            if (item.children) {
                const anyActive = item.children.some((c) =>
                    pathname.startsWith(c.href)
                );
                if (anyActive) init[item.name] = true;
            }
        });
        return init;
    });

    const toggleExpand = (name) => {
        if (isCollapsed) return;
        setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const [isPending, setIsPending] = useState(false);

    const handleLogout = () => {
        setIsPending(true);
        setTimeout(() => {
            router.push("/login");
        }, 1000);
    };

    return (
        <aside
            className={clsx(
                "relative h-full flex flex-col overflow-hidden rounded-[24px] text-white shadow-[0_20px_50px_rgb(7_26_69_/_0.28)] transition-all duration-300",
                isCollapsed ? "w-full" : "w-full"
            )}
            style={{
                background:
                    "linear-gradient(180deg, #0b2a73 0%, #071a45 55%, #051433 100%)",
            }}
        >
            <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-brand-blue/40 blur-3xl" />
                <div className="absolute bottom-10 -left-10 h-32 w-32 rounded-full bg-brand-gold/20 blur-3xl" />
            </div>

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex absolute -right-0 top-8 translate-x-1/2 items-center justify-center w-7 h-7 rounded-full bg-white text-brand-navy shadow-lg border border-border-gray hover:bg-accent transition-colors z-50 cursor-pointer"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div
                className={clsx(
                    "h-[76px] flex items-center shrink-0 overflow-hidden transition-all duration-300 relative",
                    isCollapsed ? "px-0 justify-center" : "px-5"
                )}
            >
                <Link
                    href="/dashboard"
                    onClick={onNavClick}
                    className="flex items-center gap-3 min-w-0"
                >
                    <span className="h-10 w-10 rounded-2xl flex items-center justify-center bg-white text-brand-blue shrink-0 shadow-inner">
                        <Car size={20} />
                    </span>
                    {!isCollapsed && (
                        <span className="min-w-0">
                            <span className="block text-[15px] font-semibold tracking-tight text-white truncate">
                                Wikride
                            </span>
                            <span className="block text-[11px] uppercase tracking-[0.18em] text-white/50">
                                Control
                            </span>
                        </span>
                    )}
                </Link>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden relative">
                {!isCollapsed && (
                    <p className="px-3 pb-3 text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em]">
                        Operations
                    </p>
                )}

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const hasChildren = !!item.children;
                    const isExpanded = expanded[item.name] && !isCollapsed;

                    const isParentActive = hasChildren
                        ? item.children.some((c) => pathname.startsWith(c.href))
                        : pathname === item.href;

                    if (hasChildren) {
                        return (
                            <div key={item.name}>
                                <button
                                    onClick={() => toggleExpand(item.name)}
                                    title={isCollapsed ? item.name : undefined}
                                    className={clsx(
                                        "w-full flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                                        isCollapsed ? "justify-center px-0" : "px-3",
                                        isParentActive
                                            ? "nav-active text-white"
                                            : "text-white/65 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    <Icon size={18} className="shrink-0" />
                                    {!isCollapsed && (
                                        <>
                                            <span className="flex-1 text-left truncate">
                                                {item.name}
                                            </span>
                                            <ChevronDown
                                                size={14}
                                                className={clsx(
                                                    "transition-transform duration-200 shrink-0",
                                                    isExpanded ? "rotate-180" : "rotate-0",
                                                    isParentActive ? "text-white" : "text-white/40"
                                                )}
                                            />
                                        </>
                                    )}
                                </button>

                                {isExpanded && (
                                    <div className="ml-5 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                                        {item.children.map((child) => {
                                            const ChildIcon = child.icon;
                                            const isChildActive =
                                                pathname === child.href ||
                                                pathname.startsWith(child.href + "/");
                                            return (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    onClick={onNavClick}
                                                    className={clsx(
                                                        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                                        isChildActive
                                                            ? "bg-white/12 text-white"
                                                            : "text-white/55 hover:bg-white/10 hover:text-white"
                                                    )}
                                                >
                                                    <ChildIcon size={15} className="shrink-0" />
                                                    <span className="truncate">{child.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onNavClick}
                            title={isCollapsed ? item.name : undefined}
                            className={clsx(
                                "flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                isCollapsed ? "justify-center px-0" : "px-3",
                                pathname === item.href
                                    ? "nav-active text-white"
                                    : "text-white/65 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon size={18} className="shrink-0" />
                            {!isCollapsed && (
                                <span className="truncate">{item.name}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 relative">
                <button
                    onClick={handleLogout}
                    disabled={isPending}
                    title={isCollapsed ? "Sign Out" : undefined}
                    className={clsx(
                        "flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium text-white/75 hover:bg-rose-500/20 hover:text-rose-200 transition-colors w-full cursor-pointer",
                        isCollapsed ? "justify-center px-0" : "px-3"
                    )}
                >
                    {isPending ? (
                        <Loader2 className="animate-spin text-white/80" size={18} />
                    ) : (
                        <LogOut size={18} className="shrink-0" />
                    )}
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}
