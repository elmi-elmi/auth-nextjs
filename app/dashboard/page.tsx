/**
 * Dashboard page
 * @module app/dashboard/page
 */

"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { formatFullName } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

/**
 * Dashboard home page component
 * Displays user information and welcome message
 *
 * @returns Dashboard page
 */
export default function DashboardPage() {
    const { user } = useAuth();

    if (!user) return null;

    const fullName = formatFullName(user.firstName, user.lastName);
    const initials = getInitials(user.firstName, user.lastName);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold tracking-tight">
                    Welcome back, {user.firstName}!
                </h2>
                <p className="text-muted-foreground">
                    Here's what's happening with your account today.
                </p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Your account details and personal information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.image} alt={fullName} />
                                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Full Name
                                    </p>
                                    <p className="text-lg font-semibold">{fullName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Email
                                    </p>
                                    <p className="text-lg">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Username
                                    </p>
                                    <p className="text-lg">@{user.username}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Gender
                                    </p>
                                    <p className="text-lg capitalize">{user.gender}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                                <span className="text-sm font-medium">Active</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>User ID</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">#{user.id}</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Token-based authentication enabled
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}