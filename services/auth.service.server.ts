/**
 * Server-side auth service
 * Calls external DummyJSON API and handles tokens
 * ONLY used in API routes (server-side)
 * @module services/auth.service.server
 */

import type { User } from "@/types/auth.types";

/**
 * External API response (from DummyJSON)
 */
interface ExternalAuthResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

/**
 * Refresh token response from external API
 */
interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

const API_BASE = "https://dummyjson.com";

/**
 * Server-side auth service
 * Used ONLY in Next.js API routes
 */
export const authServiceServer = {
    /**
     * Login via external API
     * Returns tokens that should be set as httpOnly cookies
     *
     * @param username - Username
     * @param password - Password
     * @returns User data and tokens
     */
    async login(
        username: string,
        password: string
    ): Promise<ExternalAuthResponse> {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                expiresInMins: 30,
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || "Login failed");
        }

        const data = await response.json();
        return data as ExternalAuthResponse;
    },

    /**
     * Get user from external API using access token
     *
     * @param accessToken - JWT access token
     * @returns User data
     */
    async getUserByToken(accessToken: string): Promise<User> {
        const response = await fetch(`${API_BASE}/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        return data as User;
    },

    /**
     * Refresh access token using refresh token
     *
     * @param refreshToken - Refresh token
     * @returns New access and refresh tokens
     */
    async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        const response = await fetch(`${API_BASE}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken,
                expiresInMins: 30,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        return data as RefreshTokenResponse;
    },
};