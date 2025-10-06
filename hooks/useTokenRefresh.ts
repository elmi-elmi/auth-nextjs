/**
 * Automatic token refresh hook
 * @module hooks/useTokenRefresh
 */

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service.client";

/**
 * Hook that automatically refreshes tokens before expiration
 *
 * Note: Since tokens are in httpOnly cookies, we can't read them client-side.
 * We need to estimate refresh time or use a different strategy.
 *
 * Strategy options:
 * 1. Refresh on 401 error (reactive - implemented in interceptor)
 * 2. Refresh periodically (proactive - this hook)
 * 3. Server sends token expiry time in response
 *
 * This implementation uses option 2 (proactive refresh every 25 minutes)
 */
export function useTokenRefresh() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        // Don't set up refresh if not authenticated
        if (!isAuthenticated) {
            return;
        }

        /**
         * Refresh token proactively
         * Access token expires in 30 min, so refresh at 25 min
         */
        const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes

        timeoutRef.current = setTimeout(async () => {
            try {
                await authService.refreshToken();
                console.log("Token refreshed successfully");
            } catch (error) {
                console.error("Token refresh failed:", error);
                // Error will be handled by the auth interceptor
            }
        }, REFRESH_INTERVAL);

        // Cleanup on unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isAuthenticated]);
}

/**
 * Alternative: Token refresh with server-provided expiry
 *
 * If your server returns token expiry time, use this instead:
 */
export function useTokenRefreshWithExpiry() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (!isAuthenticated) {
            return;
        }

        /**
         * Get token expiry from server
         * You would need to add an endpoint like /api/auth/token-info
         * that returns: { expiresAt: timestamp }
         */
        async function setupRefresh() {
            try {
                // Example: const { expiresAt } = await authService.getTokenInfo();
                // const timeUntilExpiry = expiresAt - Date.now();
                // const refreshTime = Math.max(0, timeUntilExpiry - 5 * 60 * 1000);

                // For now, use fixed interval
                const REFRESH_TIME = 25 * 60 * 1000;

                timeoutRef.current = setTimeout(async () => {
                    await authService.refreshToken();
                }, REFRESH_TIME);
            } catch (error) {
                console.error("Failed to setup token refresh:", error);
            }
        }

        setupRefresh();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isAuthenticated]);
}