/**
 * Dashboard error boundary
 * @module app/dashboard/error
 */

"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

/**
 * Props for error component
 */
interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Error boundary for dashboard pages
 * Uses Next.js 15 error.tsx convention
 *
 * @param props - Error props
 * @returns Error UI
 */
export default function DashboardError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to error reporting service
        console.error("Dashboard error:", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <CardTitle>Something went wrong!</CardTitle>
                    </div>
                    <CardDescription>
                        An error occurred while loading this page.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-md bg-destructive/10 p-4">
                        <p className="text-sm text-destructive">
                            {error.message || "An unexpected error occurred"}
                        </p>
                    </div>
                    <Button onClick={reset} className="w-full">
                        Try again
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}