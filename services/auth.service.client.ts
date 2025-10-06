/**
 * Client-side auth service
 * Calls our Next.js API routes (NOT external API directly)
 * @module services/auth.service.client
 */

import type { LoginCredentials, LoginResponse, User } from "@/types/auth.types";
import { userSchema } from "@/schemas/auth.schema";

/**
 * Custom API error class
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public code?: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Base fetch wrapper with error handling
 */
async function fetchApi<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    try {
        console.log('fetch api', url);
        const response = await fetch(url, {
            ...options,
            credentials: "include", // Important: send cookies
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });

        console.log(response);

        const data = await response.json().catch(() => ({}));
        console.log('data', data);

        if (!response.ok) {
            throw new ApiError(
                data.message || `HTTP error! status: ${response.status}`,
                response.status,
                data.code
            );
        }

        return data as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        if (error instanceof Error) {
            throw new ApiError(error.message);
        }
        throw new ApiError("An unexpected error occurred");
    }
}

/**
 * Client-side auth service
 * All methods call our Next.js API routes
 */
export const authService = {
    /**
     * Login user
     * Tokens are set as httpOnly cookies by the server
     *
     * @param credentials - Login credentials
     * @returns User data only (no tokens)
     */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await fetchApi<LoginResponse>("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });

        console.log('in service eeeeeeeeeeeee: ',response, credentials)

        // Validate user data
        userSchema.parse(response.user);

        return response;
    },

    /**
     * Get current user
     * Uses cookies automatically (credentials: "include")
     *
     * @returns Current user data
     */
    async getCurrentUser(): Promise<User> {
        const response = await fetchApi<{ user: User }>("/api/auth/me", {
            method: "GET",
        });

        // Validate user data
        const validatedUser = userSchema.parse(response.user);

        return validatedUser;
    },

    /**
     * Logout user
     * Server clears httpOnly cookies
     */
    async logout(): Promise<void> {
        await fetchApi<{ success: boolean }>("/api/auth/logout", {
            method: "POST",
        });
    },

    /**
     * Refresh access token
     * Server handles token refresh using refresh token from cookie
     * Client doesn't need to send anything
     */
    async refreshToken(): Promise<void> {
        await fetchApi<{ success: boolean }>("/api/auth/refresh", {
            method: "POST",
        });
    },
};