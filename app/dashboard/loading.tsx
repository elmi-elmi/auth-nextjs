/**
 * Dashboard loading state
 * @module app/dashboard/loading
 */

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Loading component for dashboard pages
 * Uses Next.js 15 loading.tsx convention
 *
 * @returns Loading UI
 */
export default function DashboardLoading() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-96 animate-pulse rounded-md bg-muted" />
            </div>

            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}