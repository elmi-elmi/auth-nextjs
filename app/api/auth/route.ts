/**
 * Optional API route for server-side auth operations
 * @module app/api/auth/route
 *
 * Note: This is optional. The current implementation uses client-side
 * API calls directly to DummyJSON. This file shows how you would
 * implement server-side API routes if needed.
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * POST /api/auth - Handle login on server side
 * This would be useful for:
 * - Setting httpOnly cookies
 * - Hiding API keys
 * - Rate limiting
 * - Custom server logic
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password, expiresInMins = 30 } = body;

        // Call external API
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                expiresInMins,
            }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const data = await response.json();

        // Set httpOnly cookies for tokens
        const cookieStore = await cookies();
        cookieStore.set("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: expiresInMins * 60,
            path: "/",
        });

        cookieStore.set("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        // Return user data (without tokens for security)
        return NextResponse.json({
            user: {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                image: data.image,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/auth - Handle logout on server side
 */
export async function DELETE() {
    try {
        const cookieStore = await cookies();

        // Clear auth cookies
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}