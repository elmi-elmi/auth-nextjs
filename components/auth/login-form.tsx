/**
 * Login form component with validation
 * @module components/auth/login-form
 */

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

/**
 * Login form component with animations and validation
 * Uses react-hook-form with Zod schema validation
 *
 * @returns Login form component
 */
export function LoginForm() {
    const { mutate: login, isPending, error } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
            // expiresInMins: 30,
        },
    });

    /**
     * Handle form submission
     * @param data - Validated form data
     */
    const onSubmit = (data: LoginFormData) => {
        login(data);
    };

    // Copy feedback state
    const [copied, setCopied] = React.useState<"none" | "username" | "password">("none");

    // Copy handler with animation
    const handleCopy = (value: string, type: "username" | "password") => {
        navigator.clipboard.writeText(value);
        setCopied(type);
        setTimeout(() => setCopied("none"), 1200);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                {...register("username")}
                                disabled={isPending}
                                className={errors.username ? "border-destructive" : ""}
                            />
                            {errors.username && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="text-sm text-destructive"
                                >
                                    {errors.username.message}
                                </motion.p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                                disabled={isPending}
                                className={errors.password ? "border-destructive" : ""}
                            />
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="text-sm text-destructive"
                                >
                                    {errors.password.message}
                                </motion.p>
                            )}
                        </div>

                        {/* API Error Display */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="rounded-md bg-destructive/10 p-3"
                            >
                                <p className="text-sm text-destructive">
                                    {error instanceof Error
                                        ? error.message
                                        : "Login failed. Please try again."}
                                </p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>

                        {/* Demo Credentials Info */}
                        <div className="rounded-md bg-muted p-3 text-sm">
                            <p className="font-medium mb-1">Demo Credentials:</p>
                            <div className="flex items-center gap-2">
                                <p className="text-muted-foreground mb-0">Username: emilys</p>
                                <button
                                    type="button"
                                    aria-label="Copy username"
                                    className="ml-1 text-xs text-primary hover:underline relative cursor-pointer"
                                    onClick={() => handleCopy("emilys", "username")}
                                >
                                    <motion.span
                                        initial={{ scale: 1 }}
                                        animate={copied === "username" ? { scale: 1.2, color: '#22c55e' } : { scale: 1, color: '#6366f1' }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        className="inline-flex"
                                    >
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
                                    </motion.span>
                                    {copied === "username" && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: -20 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute left-1/2 -translate-x-1/2 text-xs text-green-500 bg-white px-1 rounded shadow"
                                            style={{ top: -18 }}
                                        >
                                            Copied!
                                        </motion.span>
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-muted-foreground mb-0">Password: emilyspass</p>
                                <button
                                    type="button"
                                    aria-label="Copy password"
                                    className="ml-1 text-xs text-primary hover:underline relative cursor-pointer"
                                    onClick={() => handleCopy("emilyspass", "password")}
                                >
                                    <motion.span
                                        initial={{ scale: 1 }}
                                        animate={copied === "password" ? { scale: 1.2, color: '#22c55e' } : { scale: 1, color: '#6366f1' }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        className="inline-flex"
                                    >
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
                                    </motion.span>
                                    {copied === "password" && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: -20 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute left-1/2 -translate-x-1/2 text-xs text-green-500 bg-white px-1 rounded shadow"
                                            style={{ top: -18 }}
                                        >
                                            Copied!
                                        </motion.span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}