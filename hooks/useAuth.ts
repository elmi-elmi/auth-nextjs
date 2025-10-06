/**
 * React Query auth hooks
 * @module hooks/useAuth
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service.client";
import type { LoginCredentials } from "@/types/auth.types";
import { parseApiError } from "@/schemas/auth.schema";

const QUERY_KEYS = {
    CURRENT_USER: ["auth", "currentUser"],
} as const;

/**
 * Hook for login mutation
 *
 * Flow:
 * 1. Call client service (which calls our API)
 * 2. API sets httpOnly cookies
 * 3. Store user in Zustand (no tokens!)
 * 4. Redirect to dashboard
 */
export function useLogin() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            authService.login(credentials),
        onSuccess: (data) => {
            // Store ONLY user data (no tokens)
            setUser(data.user);

            // Invalidate user query to refetch
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CURRENT_USER });

            // Force full reload so middleware sees new cookie
            window.location.href = "/dashboard/images";
        },
        onError: (error) => {
            const parsedError = parseApiError(error);
            console.error("Login failed:", parsedError.message);
        },
    });
}

/**
 * Hook for logout mutation
 *
 * Flow:
 * 1. Call API to clear cookies
 * 2. Clear Zustand state
 * 3. Clear React Query cache
 * 4. Redirect to login
 */
export function useLogout() {
    const router = useRouter();
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            // Clear client-side state
            clearAuth();

            // Clear all cached queries
            queryClient.clear();

            // Navigate to login
            router.push("/login");
        },
        onError: (error) => {
            // Even if API fails, clear local state
            clearAuth();
            queryClient.clear();
            router.push("/login");
        },
    });
}

/**
 * Hook for getting current user
 *
 * Flow:
 * 1. Call API (cookies sent automatically)
 * 2. API reads token from cookie
 * 3. Return user data
 * 4. If 401, trigger refresh or logout
 */
export function useCurrentUser() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setUser = useAuthStore((state) => state.setUser);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useQuery({
        queryKey: QUERY_KEYS.CURRENT_USER,
        queryFn: async () => {
            try {
                const user = await authService.getCurrentUser();
                setUser(user);
                return user;
            } catch (error) {
                // If unauthorized, clear auth
                clearAuth();
                throw error;
            }
        },
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error) => {
            // Don't retry on 401
            if (error instanceof Error && "status" in error && error.status === 401) {
                return false;
            }
            return failureCount < 1;
        },
    });
}

/**
 * Hook for refreshing token
 *
 * Flow:
 * 1. Call API (refresh token sent via cookie)
 * 2. API updates cookies with new tokens
 * 3. No data returned to client
 */
export function useRefreshToken() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authService.refreshToken(),
        onSuccess: () => {
            // Invalidate user query to refetch with new token
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CURRENT_USER });
        },
        onError: (error) => {
            const parsedError = parseApiError(error);
            console.error("Token refresh failed:", parsedError.message);

            // On refresh failure, user needs to login again
            // This will be handled by the API returning 401
        },
    });
}

/**
 * Main auth hook - combines all auth functionality
 *
 * @returns Auth state and methods
 */
export function useAuth() {
    const authState = useAuthStore();
    const loginMutation = useLogin();
    const logoutMutation = useLogout();
    const { data: user } = useCurrentUser();

    return {
        // State
        user: user || authState.user,
        isAuthenticated: authState.isAuthenticated,
        isInitialized: authState.isInitialized,

        // Actions
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,

        // Loading states
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,

        // Errors
        loginError: loginMutation.error,
        logoutError: logoutMutation.error,
    };
}