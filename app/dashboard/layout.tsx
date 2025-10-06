/**
 * Dashboard layout file
 * @module app/dashboard/layout
 */

import { DashboardLayout } from "@/components/layout/dashboard-layout";

/**
 * Dashboard layout component
 * Wraps dashboard pages with sidebar and protection
 *
 * @param props - Layout props
 * @returns Dashboard layout
 */
export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    return (<DashboardLayout>{children}</DashboardLayout>);
}