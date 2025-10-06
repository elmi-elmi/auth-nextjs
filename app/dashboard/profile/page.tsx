/**
 * Profile page
 * @module app/dashboard/profile/page
 */

"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { formatFullName, getInitials } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Profile page component
 * Displays detailed user information
 *
 * @returns Profile page
 */
export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return null;

    const fullName = formatFullName(user.firstName, user.lastName);
    const initials = getInitials(user.firstName, user.lastName);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
                <p className="text-muted-foreground">
                    Manage your account information and preferences
                </p>
            </div>

            <div className="grid gap-6">
                {/* Profile Header Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                        <CardDescription>
                            Your profile picture is visible to other users
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user.image} alt={fullName} />
                                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Profile image URL
                                </p>
                                <Input value={user.image} readOnly className="max-w-md" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Your personal details and contact information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" value={user.firstName} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" value={user.lastName} readOnly />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={user.email} readOnly />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" value={user.username} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Input
                                    id="gender"
                                    value={user.gender}
                                    className="capitalize"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="userId">User ID</Label>
                            <Input id="userId" value={user.id.toString()} readOnly />
                        </div>
                    </CardContent>
                </Card>

                {/* Account Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>
                            Technical details about your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Authentication Method</Label>
                            <p className="text-sm text-muted-foreground">
                                JWT Token-based authentication
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label>Account Status</Label>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-sm font-medium">Active</span>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button disabled>Edit Profile (Demo Only)</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}