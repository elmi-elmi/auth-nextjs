/**
 * Refresh token API route
 * @module app/api/auth/refresh/route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authServiceServer } from "@/services/auth.service.server";

/**
 * POST /api/auth/refresh
 *
 * Flow:
 * 1. Read refreshToken from httpOnly cookie
 * 2. Call external API to get new tokens
 * 3. Update cookies with new tokens
 * 4. Return success (no tokens to client)
 */
export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { message: "No refresh token" },
                { status: 401 }
            );
        }

        // Get new tokens from external API
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await authServiceServer.refreshToken(refreshToken);

        // Update cookies with new tokens
        cookieStore.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 60, // 30 minutes
            path: "/",
        });

        cookieStore.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Refresh token error:", error);

        // Clear invalid cookies
        const cookieStore = await cookies();
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return NextResponse.json(
            { message: "Failed to refresh token" },
            { status: 401 }
        );
    }
}