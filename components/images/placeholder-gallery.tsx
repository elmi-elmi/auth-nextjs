/**
 * Placeholder Gallery - Grid layout with various sizes
 * Uses intersection observer for lazy loading
 * @module components/images/placeholder-gallery
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface ImageItem {
    id: number;
    size: number;
    url: string;
    label: string;
}

// Generate diverse placeholder images
const PLACEHOLDER_IMAGES: ImageItem[] = [
    { id: 1, size: 200, url: "https://dummyjson.com/image/200", label: "Square 200x200" },
    { id: 2, size: 300, url: "https://dummyjson.com/image/300", label: "Square 300x300" },
    { id: 3, size: 150, url: "https://dummyjson.com/image/150", label: "Square 150x150" },
    { id: 4, size: 250, url: "https://dummyjson.com/image/250", label: "Square 250x250" },
    { id: 5, size: 180, url: "https://dummyjson.com/image/180", label: "Square 180x180" },
    { id: 6, size: 220, url: "https://dummyjson.com/image/220", label: "Square 220x220" },
    { id: 7, size: 280, url: "https://dummyjson.com/image/280", label: "Square 280x280" },
    { id: 8, size: 160, url: "https://dummyjson.com/image/160", label: "Square 160x160" },
    { id: 9, size: 240, url: "https://dummyjson.com/image/240", label: "Square 240x240" },
    { id: 10, size: 190, url: "https://dummyjson.com/image/190", label: "Square 190x190" },
    { id: 11, size: 270, url: "https://dummyjson.com/image/270", label: "Square 270x270" },
    { id: 12, size: 210, url: "https://dummyjson.com/image/210", label: "Square 210x210" },
];

// Lazy loading image component
function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imgRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "50px",
            }
        );

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={`relative ${className}`}>
            {!isLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            {isInView && (
                <Image
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    fill
                    sizes="(max-width: 768px) 300px, 300px"
                    onLoad={() => setIsLoaded(true)}
                    loading="lazy"
                />
            )}
        </div>
    );
}

export default function PlaceholderGallery() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            {PLACEHOLDER_IMAGES.map((item) => (
                <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="aspect-square relative overflow-hidden bg-muted">
                            <LazyImage
                                src={item.url}
                                alt={item.label}
                                className="w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Badge
                                variant="secondary"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {item.size}px
                            </Badge>
                        </div>
                        <CardContent className="p-3">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            <p className="text-xs text-muted-foreground">
                                Size: {item.size}x{item.size}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}