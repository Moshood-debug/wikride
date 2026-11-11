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
            const cleanBase = BaseUrl

            const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
            const url = endpoint.startsWith("http") ? endpoint : `${cleanBase}${cleanEndpoint}`;
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
