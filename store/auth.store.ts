/**
 * Zustand auth store - NO TOKENS stored here!
 * @module store/auth
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AuthStore, User } from "@/types/auth.types";

/**
 * Auth store - only stores user data, NOT tokens
 * Tokens are in httpOnly cookies managed by server
 */
export const useAuthStore = create<AuthStore>()(
    devtools(
        (set) => ({
            // State
            user: null,
            isAuthenticated: false,
            isInitialized: false,

            /**
             * Set user data after successful auth
             */
            setUser: (user: User) =>
                set(
                    {
                        user,
                        isAuthenticated: true,
                        isInitialized: true,
                    },
                    false,
                    "auth/setUser"
                ),

            /**
             * Clear auth state (logout)
             */
            clearAuth: () =>
                set(
                    {
                        user: null,
                        isAuthenticated: false,
                        isInitialized: true,
                    },
                    false,
                    "auth/clearAuth"
                ),

            /**
             * Mark as initialized
             */
            setInitialized: () =>
                set(
                    {
                        isInitialized: true,
                    },
                    false,
                    "auth/setInitialized"
                ),
        }),
        {
            name: "auth-store",
            enabled: process.env.NODE_ENV === "development",
        }
    )
);