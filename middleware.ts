/**
 * Next.js middleware for route protection
 * @module middleware
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES, PUBLIC_ROUTES } from "@/config/constants";

/**
 * Check if a path is public (doesn't require authentication)
 * @param path - Request pathname
 * @returns True if path is public
 */
function isPublicPath(path: string): boolean {
    return PUBLIC_ROUTES.some((route) => path === route );
}

/**
 * Middleware function to protect routes
 * Redirects unauthenticated users to login page
 * Redirects authenticated users away from login page
 *
 * @param request - Next.js request object
 * @returns Response or redirect
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for access token in cookies
    const accessToken = request.cookies.get("accessToken")?.value;
    const isAuthenticated = !!accessToken;

    const isPublic = isPublicPath(pathname);
    const isLoginPage = pathname === ROUTES.LOGIN;

    // Redirect authenticated users away from login page
    if (isAuthenticated && isLoginPage) {
        return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }

    // Redirect unauthenticated users to login page
    if (!isAuthenticated && !isPublic) {
        const loginUrl = new URL(ROUTES.LOGIN, request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

/**
 * Matcher configuration for middleware
 * Applies to all routes except static files and API routes
 */
export const config = {
    matcher: [
        '/((?!api/auth/login|api/public|_next/static|_next/image|favicon.ico).*)',
    ],
};