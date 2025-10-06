/**
 * Global error boundary
 * @module app/global-error
 */

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Props for global error component
 */
interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Global error boundary component
 * Catches errors in the entire application
 *
 * @param props - Error props
 * @returns Error UI
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        console.error("Global error:", error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md text-center space-y-6">
        <div className="space-y-2">
        <h1 className="text-4xl font-bold">Something went wrong!</h1>
    <p className="text-muted-foreground">
        An unexpected error occurred. Please try again.
    </p>
    </div>

    <div className="rounded-lg bg-destructive/10 p-4">
    <p className="text-sm text-destructive font-mono">
        {error.message || "An unexpected error occurred"}
        </p>
        </div>

        <Button onClick={reset}>Try again</Button>
    </div>
    </div>
    </body>
    </html>
);
}