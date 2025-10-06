/**
 * Application constants and configuration
 * @module config/constants
 */

/**
 * API configuration constants
 */
export const API_CONFIG = {
    BASE_URL: "https://dummyjson.com",
    ENDPOINTS: {
        LOGIN: "/auth/login",
        REFRESH: "/auth/refresh",
        ME: "/auth/me",
    },
    TIMEOUT: 10000,
} as const;

/**
 * Token configuration
 */
export const TOKEN_CONFIG = {
    REFRESH_THRESHOLD_MS: 5 * 60 * 1000, // Refresh 5 minutes before expiration
    DEFAULT_EXPIRES_IN_MINS: 30,
    MAX_RETRY_ATTEMPTS: 3,
} as const;

/**
 * Route paths
 */
export const ROUTES = {
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    HOME: "/",
    PROFILE: "/dashboard/profile",
    SETTINGS: "/dashboard/settings",
    IMAGES: "/dashboard/images"
} as const;

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.HOME] as const;

/**
 * Query keys for React Query
 */
export const QUERY_KEYS = {
    AUTH: {
        ME: ["auth", "me"] as const,
        SESSION: ["auth", "session"] as const,
    },
} as const;

/**
 * Local storage keys (avoided for tokens, but used for preferences)
 */
export const STORAGE_KEYS = {
    THEME: "theme",
} as const;