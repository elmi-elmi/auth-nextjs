/**
 * Root layout component
 * @module app/layout
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { AuthInitializer } from "@/components/auth/auth-initializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Auth System - Next.js 15",
    description: "Production-ready authentication system with Next.js 15",
};

/**
 * Root layout component
 * Wraps entire app with providers and global styles
 *
 * @param props - Layout props
 * @returns Root layout
 */
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <Providers>
            <AuthInitializer />
            {children}
        </Providers>
        </body>
        </html>
    );
}