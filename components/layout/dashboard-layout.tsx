/**
 * Dashboard layout component with sidebar
 * @module components/layout/dashboard-layout
 */

"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";

/**
 * Props for DashboardLayout component
 */
interface DashboardLayoutProps {
    children: React.ReactNode;
}

/**
 * Dashboard layout with responsive sidebar
 * Uses shadcn sidebar component with mobile support
 *
 * @param props - Component props
 * @returns Dashboard layout
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold">Dashboard</h1>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}