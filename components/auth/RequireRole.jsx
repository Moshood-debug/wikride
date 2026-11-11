'use client';

import { useAuthStore } from '@/store/useAuthStore';

/**
 * A wrapper component that only renders its children if the current user has one of the specified roles.
 * If fallback is provided, it will render the fallback component when access is denied.
 *
 * @param {string | string[]} roles - A single role string or array of roles (e.g., ['SUPER_ADMIN', 'ORGANIZATION_ADMIN'])
 * @param {React.ReactNode} children - The content to render if permitted
 * @param {React.ReactNode} fallback - The content to render if not permitted (optional)
 */
export default function RequireRole({ roles, children, fallback = null }) {
    const { user, hasRole } = useAuthStore();

    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    const userRole = user?.role?.name || user?.role;

    const isPermitted = allowedRoles.includes(userRole);

    if (!isPermitted) {
        return fallback;
    }

    return <>{children}</>;
}
