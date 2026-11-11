"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BaseUrl, getAuthConfig } from "@/config/config";

export const useApiMutation = (
    endpoint, // Accept string or function
    method = "post",
    options
) => {
    return useMutation({
        // If it's a dynamic function, use a generic key. Otherwise, use the static string.
        mutationKey:
            typeof endpoint === "string" ? [endpoint] : ["dynamic-mutation"],
        mutationFn: async (data) => {
            const baseUrl = BaseUrl;

            // Evaluate the endpoint if it is a function
            const resolvedEndpoint =
                typeof endpoint === "function" ? endpoint(data) : endpoint;

            const rawBase =
                baseUrl ||
                process.env.NEXT_PUBLIC_API_URL ||
                "https://wikride-backend.onrender.com/api/v1";

            const cleanBase = String(rawBase).replace(/\/+$/, "");

            const cleanEndpoint = resolvedEndpoint
                ? (resolvedEndpoint.startsWith("/") ? resolvedEndpoint : `/${resolvedEndpoint}`)
                : "";

            const url = resolvedEndpoint && resolvedEndpoint.startsWith("http")
                ? resolvedEndpoint
                : `${cleanBase}${cleanEndpoint}`;

            const authConfig = getAuthConfig();
            const customHeaders = options?.getHeaders ? options.getHeaders(data) : {};

            return axios.request({
                method,
                url,
                data,
                ...authConfig,
                headers: {
                    ...(authConfig?.headers || {}),
                    ...customHeaders,
                },
            });
        },
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });
};
