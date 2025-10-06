/**
 * Application providers wrapper
 * @module providers
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

/**
 * Props for Providers component
 */
interface ProvidersProps {
    children: ReactNode;
}

/**
 * Root providers component that wraps the entire application
 * Includes React Query provider with optimized configuration
 *
 * @param props - Component props
 * @returns Wrapped children with providers
 */
export function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Disable automatic refetching for better UX
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: false,
                        // Retry failed requests once
                        retry: 1,
                        // Cache data for 5 minutes
                        staleTime: 5 * 60 * 1000,
                    },
                    mutations: {
                        // Retry failed mutations once
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}