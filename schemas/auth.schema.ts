/**
 * Zod validation schemas
 * @module schemas/auth
 */

import { z } from "zod";

/**
 * Login form schema
 */
export const loginSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * User schema
 */
export const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    image: z.string().url(),
});

/**
 * API error schema
 */
export const apiErrorSchema = z.object({
    message: z.string(),
    status: z.number().optional(),
    code: z.string().optional(),
});

/**
 * Parse API error safely
 */
export function parseApiError(error: unknown): {
    message: string;
    status?: number;
    code?: string;
} {
    if (error instanceof Error) {
        return { message: error.message };
    }

    if (typeof error === "object" && error !== null && "message" in error) {
        const result = apiErrorSchema.safeParse(error);
        if (result.success) {
            return result.data;
        }
    }

    return { message: "An unexpected error occurred" };
}