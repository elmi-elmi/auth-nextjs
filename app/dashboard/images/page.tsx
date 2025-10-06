/**
 * Images page with three tabs showcasing different image APIs
 * @module app/dashboard/images/page
 */

"use client";

import { Suspense, lazy, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Image as ImageIcon, Sparkles, Grid3x3 } from "lucide-react";

// Dynamic imports for performance
const PlaceholderGallery = lazy(() => import("@/components/images/placeholder-gallery"));
const CustomTextGallery = lazy(() => import("@/components/images/custom-text-gallery"));
const IconGallery = lazy(() => import("@/components/images/icon-gallery"));

// Loading skeleton for tabs
function TabLoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

/**
 * Images page component
 * Features:
 * - Three tabs with different image APIs
 * - Dynamic imports for code splitting
 * - Lazy loading images with plaiceholder
 * - Non-blocking tab switches with useTransition
 * - Beautiful Tailwind layouts
 */
export default function ImagesPage() {
    const [activeTab, setActiveTab] = useState("placeholder");
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (value: string) => {
        startTransition(() => {
            setActiveTab(value);
        });
    };

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
                <h2 className="text-3xl font-bold tracking-tight">Image Gallery</h2>
                <p className="text-muted-foreground">
                    Explore different image generation APIs with lazy loading and smooth transitions
                </p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
                        <TabsTrigger value="placeholder" className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Placeholder</span>
                            <span className="sm:hidden">Size</span>
                        </TabsTrigger>
                        <TabsTrigger value="custom" className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            <span className="hidden sm:inline">Custom Text</span>
                            <span className="sm:hidden">Text</span>
                        </TabsTrigger>
                        <TabsTrigger value="icons" className="flex items-center gap-2">
                            <Grid3x3 className="h-4 w-4" />
                            <span className="hidden sm:inline">Icons</span>
                            <span className="sm:hidden">Icons</span>
                        </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TabsContent value="placeholder" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Placeholder Images by Size</CardTitle>
                                        <CardDescription>
                                            Generate placeholder images with various sizes using https://dummyjson.com/image/SIZE
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Suspense fallback={<TabLoadingSkeleton />}>
                                            <PlaceholderGallery />
                                        </Suspense>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="custom" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Custom Text Images</CardTitle>
                                        <CardDescription>
                                            Create images with custom text, colors, and dimensions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Suspense fallback={<TabLoadingSkeleton />}>
                                            <CustomTextGallery />
                                        </Suspense>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="icons" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Icon Gallery</CardTitle>
                                        <CardDescription>
                                            Browse hash-based icons in PNG and SVG formats
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Suspense fallback={<TabLoadingSkeleton />}>
                                            <IconGallery />
                                        </Suspense>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </motion.div>
                    </AnimatePresence>

                    {isPending && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg"
                        >
                            Loading...
                        </motion.div>
                    )}
                </Tabs>
            </motion.div>
        </motion.div>
    );
}