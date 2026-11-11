import { useAuthStore } from "@/store/useAuthStore";

export const BaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://wikride-backend.onrender.com/api/v1";



export const getAuthConfig = () => {
    let accessToken = null;

    // Safely attempt to get the access token
    try {
        accessToken = useAuthStore.getState().accessToken;
    } catch (error) {
        // Ignore error if store is not initialized or we're on the server
    }

    return {
        headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
    };
};