/**
 * Settings page
 * @module app/dashboard/settings/page
 */

"use client";

import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";

/**
 * Settings page component
 * Displays app settings and preferences
 *
 * @returns Settings page
 */
export default function SettingsPage() {
    const { logout, isLoggingOut } = useAuth();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your application preferences and security settings
                </p>
            </div>

            <div className="grid gap-6">
                {/* Preferences Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                        <CardDescription>
                            Customize your application experience
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="notifications">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive email updates about your account
                                </p>
                            </div>
                            <Switch id="notifications" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="marketing">Marketing Emails</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive emails about new features and updates
                                </p>
                            </div>
                            <Switch id="marketing" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="security">Security Alerts</Label>
                                <p className="text-sm text-muted-foreground">
                                    Get notified about security events
                                </p>
                            </div>
                            <Switch id="security" defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* Security Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>
                            Manage your account security settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                            </p>
                            <Button variant="outline" disabled>
                                Enable 2FA (Coming Soon)
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>
                            <p className="text-sm text-muted-foreground">
                                Last changed 30 days ago
                            </p>
                            <Button variant="outline" disabled>
                                Change Password (Demo Only)
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label>Active Sessions</Label>
                            <p className="text-sm text-muted-foreground">
                                You are currently signed in on 1 device
                            </p>
                            <Button variant="outline" disabled>
                                Manage Sessions
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone Card */}
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>
                            Irreversible actions that affect your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Sign Out</Label>
                            <p className="text-sm text-muted-foreground">
                                Sign out of your account on this device
                            </p>
                            <Button
                                variant="destructive"
                                onClick={() => logout()}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? "Signing out..." : "Sign Out"}
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label>Delete Account</Label>
                            <p className="text-sm text-muted-foreground">
                                Permanently delete your account and all associated data
                            </p>
                            <Button variant="destructive" disabled>
                                Delete Account (Demo Only)
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}