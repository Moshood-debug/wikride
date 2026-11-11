import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            hasRole: (role) => {
                const { user } = get();
                return user && (user.role === role || user.role?.name === role);
            },
            hasPermission: (permission) => {
                const { user } = get();
                if (user && user.permissions && Array.isArray(user.permissions)) {
                    return user.permissions.includes(permission);
                }
                // Fallback to check against static config if permissions aren't on the user object directly:
                // import { ROLE_PERMISSIONS } from '../config/roles';
                // const roleName = user?.role?.name || user?.role;
                // return ROLE_PERMISSIONS[roleName]?.includes(permission) || false;
                return false;
            },
            setAuth: (data) => {
                if (typeof document !== 'undefined') {
                    // Sync with cookies so Next.js middleware can read it
                    const expires = new Date(Date.now() + 7 * 864e5).toUTCString(); // 7 days
                    document.cookie = `accessToken=${data.accessToken}; expires=${expires}; path=/;`;
                    
                    const role = data.user?.role?.name || data.user?.role || '';
                    document.cookie = `userRole=${role}; expires=${expires}; path=/;`;
                }
                set({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    user: data.user,
                });
            },
            clearAuth: () => {
                if (typeof document !== 'undefined') {
                    // Clear cookies
                    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
                    document.cookie = `userRole=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
                }
                set({
                    accessToken: null,
                    refreshToken: null,
                    user: null,
                });
            },
        }),
        {
            name: 'auth-storage', 
            storage: createJSONStorage(() => localStorage), 
        }
    )
);
