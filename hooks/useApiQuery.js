"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseUrl, getAuthConfig } from "@/config/config";

export const useApiQuery = (
    endpoint,
    queryKey = [],
    options
) => {
    const normalizedKey = Array.isArray(queryKey) ? queryKey : [queryKey];

    return useQuery({
        queryKey: normalizedKey,
        queryFn: async () => {
            const rawBase =
                BaseUrl ||
                process.env.NEXT_PUBLIC_API_URL ||
                "https://wikride-backend.onrender.com/api/v1";

            const cleanBase = String(rawBase).replace(/\/+$/, "");
            const cleanEndpoint = endpoint
                ? (endpoint.startsWith("/") ? endpoint : `/${endpoint}`)
                : "";
            const url = endpoint && endpoint.startsWith("http")
                ? endpoint
                : `${cleanBase}${cleanEndpoint}`;
            const response = await axios.get(url, {
                ...getAuthConfig(),
                validateStatus: (status) => status >= 200 && status < 300,
            });

            const data = response.data;

            if (
                typeof data === "string" &&
                (data.trim().startsWith("<!") || data.trim().startsWith("<html"))
            ) {
                throw new Error("Received HTML instead of JSON — backend may be down.");
            }

            return data;
        },
        ...options,
    });
};
