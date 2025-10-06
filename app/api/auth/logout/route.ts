/**
 * Logout API route
 * @module app/api/auth/logout/route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * POST /api/auth/logout
 *
 * Flow:
 * 1. Delete both httpOnly cookies
 * 2. Return success
 *
 * Note: In production, you might also:
 * - Invalidate refresh token in database
 * - Add token to blacklist
 * - Log the logout event
 */
export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();

        // Delete auth cookies
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Logout error:", error);

        return NextResponse.json(
            { message: "Logout failed" },
            { status: 500 }
        );
    }
}