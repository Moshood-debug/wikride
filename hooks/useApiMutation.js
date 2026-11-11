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

            const url =
                resolvedEndpoint.startsWith("http") ||
                    resolvedEndpoint.startsWith("/api/")
                    ? resolvedEndpoint
                    : `${baseUrl}${resolvedEndpoint}`;

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
