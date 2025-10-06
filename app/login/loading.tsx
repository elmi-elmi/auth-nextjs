/**
 * Login page loading state
 * @module app/login/loading
 */

import { Loader2 } from "lucide-react";

/**
 * Loading component for login page
 * Uses Next.js 15 loading.tsx convention
 *
 * @returns Loading UI
 */
export default function LoginLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
}