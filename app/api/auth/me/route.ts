/**
 * Get current user API route
 * @module app/api/auth/me/route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authServiceServer } from "@/services/auth.service.server";

/**
 * GET /api/auth/me
 *
 * Flow:
 * 1. Read accessToken from httpOnly cookie
 * 2. Call external API with token
 * 3. Return user data
 * 4. If token expired, return 401 (client will refresh)
 */
export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        // Get user from external API
        const user = await authServiceServer.getUserByToken(accessToken);

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Get user error:", error);

        return NextResponse.json(
            { message: "Failed to fetch user" },
            { status: 401 }
        );
    }
}