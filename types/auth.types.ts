/**
 * Authentication type definitions
 * @module types/auth
 */

/**
 * User data structure
 */
export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
    username: string;
    password: string;
}

/**
 * Login response from our API (NOT external API)
 * Tokens are set as httpOnly cookies, not returned
 */
export interface LoginResponse {
    user: User;
    success: boolean;
}

/**
 * Auth state (client-side)
 * No tokens stored here!
 */
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
}

/**
 * Auth actions
 */
export interface AuthActions {
    setUser: (user: User) => void;
    clearAuth: () => void;
    setInitialized: () => void;
}

/**
 * Complete auth store
 */
export type AuthStore = AuthState & AuthActions;

/**
 * API Error
 */
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}