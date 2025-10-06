/**
 * Auth initializer component
 * Restores session on app mount by fetching current user
 * @module components/auth/auth-initializer
 */

"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service.client";

/**
 * Auth initializer component
 *
 * Flow:
 * 1. On mount, try to fetch current user
 * 2. If successful, user is authenticated (cookies exist)
 * 3. If fails (401), user is not authenticated
 * 4. Set initialized flag when done
 *
 * This runs once on app load to restore session
 */
export function AuthInitializer() {
    const setUser = useAuthStore((state) => state.setUser);
    const setInitialized = useAuthStore((state) => state.setInitialized);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    useEffect(() => {
        async function initializeAuth() {
            try {
                // Try to get current user (cookies sent automatically)
                const user = await authService.getCurrentUser();

                // Success - user is authenticated
                setUser(user);
            } catch (error) {
                // Failed - user is not authenticated (or token expired)
                clearAuth();
            } finally {
                // Mark as initialized regardless of result
                setInitialized();
            }
        }

        initializeAuth();
    }, [setUser, clearAuth, setInitialized]);

    // This component renders nothing
    return null;
}