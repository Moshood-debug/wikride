'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { ROLE_PERMISSIONS } from '@/config/roles';

/**
 * A wrapper component that only renders its children if the current user has the specified permission.
 * If fallback is provided, it will render the fallback component when access is denied.
 *
 * @param {string} permission - The required permission (e.g., 'users.create')
 * @param {React.ReactNode} children - The content to render if permitted
 * @param {React.ReactNode} fallback - The content to render if not permitted (optional)
 */
export default function RequirePermission({ permission, children, fallback = null }) {
    const { user, hasPermission } = useAuthStore();

    // Check if store's hasPermission passes
    let isPermitted = hasPermission(permission);

    // If hasPermission fails but we have static config, fallback to checking static config
    if (!isPermitted && user?.role) {
        const roleName = user.role.name || user.role;
        const rolePermissions = ROLE_PERMISSIONS[roleName] || [];
        isPermitted = rolePermissions.includes(permission);
    }

    if (!isPermitted) {
        return fallback;
    }

    return <>{children}</>;
}
