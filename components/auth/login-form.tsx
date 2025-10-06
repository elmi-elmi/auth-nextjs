/**
 * Login form component with validation
 * @module components/auth/login-form
 */

"use client";

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
                            <p className="text-muted-foreground">Username: emilys</p>
                            <p className="text-muted-foreground">Password: emilyspass</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}