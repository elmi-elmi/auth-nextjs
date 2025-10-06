/**
 * Utility functions
 * @module lib/utils
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Decode JWT token payload (without verification)
 * @param token - JWT token string
 * @returns Decoded payload or null
 */
export function decodeJWT(token: string): Record<string, unknown> | null {
    try {
        const base64Url = token.split(".")[1];
        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        return JSON.parse(jsonPayload) as Record<string, unknown>;
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        return null;
    }
}

/**
 * Check if JWT token is expired
 * @param token - JWT token string
 * @returns True if token is expired
 */
export function isTokenExpired(token: string): boolean {
    const decoded = decodeJWT(token);
    if (!decoded || typeof decoded.exp !== "number") {
        return true;
    }

    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
}

/**
 * Get time until token expiration in milliseconds
 * @param token - JWT token string
 * @returns Milliseconds until expiration, or 0 if expired
 */
export function getTokenExpirationTime(token: string): number {
    const decoded = decodeJWT(token);
    if (!decoded || typeof decoded.exp !== "number") {
        return 0;
    }

    const expirationTime = decoded.exp * 1000;
    const timeUntilExpiration = expirationTime - Date.now();

    return Math.max(0, timeUntilExpiration);
}

/**
 * Format user's full name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Formatted full name
 */
export function formatFullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`.trim();
}

/**
 * Get initials from name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Initials (e.g., "JD" for John Doe)
 */
export function getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}