/**
 * Login API route
 * @module app/api/auth/login/route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authServiceServer } from "@/services/auth.service.server";
import { loginSchema } from "@/schemas/auth.schema";

/**
 * POST /api/auth/login
 *
 * Flow:
 * 1. Validate credentials
 * 2. Call external API (DummyJSON)
 * 3. Set tokens as httpOnly cookies
 * 4. Return only user data (NO tokens to client)
 */
export async function POST(request: NextRequest) {
    try {
        // Parse and validate request body
        const body = await request.json();

        const validatedData = loginSchema.parse(body);

        // Call external API
        const authResponse = await authServiceServer.login(
            validatedData.username,
            validatedData.password
        );


        // Extract user data and tokens
        const { accessToken, refreshToken, ...userData } = authResponse;

        // Set httpOnly cookies
        const cookieStore = await cookies();

        // Access token - short lived (30 min)
        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 60, // 30 minutes
            path: "/",
        });

        // Refresh token - long lived (7 days)
        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        // Return ONLY user data (no tokens)
        return NextResponse.json({
            user: userData,
            success: true,
        });
    } catch (error) {
        console.error("Login error:", error);

        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    }
}