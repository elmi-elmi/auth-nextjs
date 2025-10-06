/**
 * Custom Text Gallery - Masonry/Pinterest-style layout
 * Images with custom text, backgrounds, and foreground colors
 * @module components/images/custom-text-gallery
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface CustomImageItem {
    id: number;
    width: number;
    height: number;
    bgColor: string;
    fgColor: string;
    text: string;
    url: string;
}

// Generate creative custom text images
const CUSTOM_IMAGES: CustomImageItem[] = [
    {
        id: 1,
        width: 400,
        height: 300,
        bgColor: "282c34",
        fgColor: "61dafb",
        text: "React",
        url: "https://dummyjson.com/image/400x300/282c34/61dafb?text=React",
    },
    {
        id: 2,
        width: 350,
        height: 350,
        bgColor: "3178c6",
        fgColor: "ffffff",
        text: "TypeScript",
        url: "https://dummyjson.com/image/350x350/3178c6/ffffff?text=TypeScript",
    },
    {
        id: 3,
        width: 400,
        height: 250,
        bgColor: "000000",
        fgColor: "ffffff",
        text: "Next.js",
        url: "https://dummyjson.com/image/400x250/000000/ffffff?text=Next.js",
    },
    {
        id: 4,
        width: 300,
        height: 400,
        bgColor: "38bdf8",
        fgColor: "ffffff",
        text: "Tailwind",
        url: "https://dummyjson.com/image/300x400/38bdf8/ffffff?text=Tailwind",
    },
    {
        id: 5,
        width: 380,
        height: 280,
        bgColor: "ff3e00",
        fgColor: "ffffff",
        text: "Svelte",
        url: "https://dummyjson.com/image/380x280/ff3e00/ffffff?text=Svelte",
    },
    {
        id: 6,
        width: 320,
        height: 320,
        bgColor: "42b883",
        fgColor: "35495e",
        text: "Vue.js",
        url: "https://dummyjson.com/image/320x320/42b883/35495e?text=Vue.js",
    },
    {
        id: 7,
        width: 400,
        height: 200,
        bgColor: "764abc",
        fgColor: "ffffff",
        text: "Redux",
        url: "https://dummyjson.com/image/400x200/764abc/ffffff?text=Redux",
    },
    {
        id: 8,
        width: 350,
        height: 300,
        bgColor: "ff4785",
        fgColor: "ffffff",
        text: "Storybook",
        url: "https://dummyjson.com/image/350x300/ff4785/ffffff?text=Storybook",
    },
    {
        id: 9,
        width: 300,
        height: 350,
        bgColor: "008080",
        fgColor: "ffffff",
        text: "Zustand",
        url: "https://dummyjson.com/image/300x350/008080/ffffff?text=Zustand",
    },
    {
        id: 10,
        width: 380,
        height: 220,
        bgColor: "CA4245",
        fgColor: "ffffff",
        text: "Vite",
        url: "https://dummyjson.com/image/380x220/CA4245/ffffff?text=Vite",
    },
    {
        id: 11,
        width: 340,
        height: 340,
        bgColor: "ec4899",
        fgColor: "ffffff",
        text: "Framer",
        url: "https://dummyjson.com/image/340x340/ec4899/ffffff?text=Framer",
    },
    {
        id: 12,
        width: 400,
        height: 280,
        bgColor: "0ea5e9",
        fgColor: "ffffff",
        text: "shadcn/ui",
        url: "https://dummyjson.com/image/400x280/0ea5e9/ffffff?text=shadcn/ui",
    },
];

// Advanced lazy loading with blur placeholder
function LazyImageWithBlur({
                               src,
                               alt,
                               className,
                           }: {
    src: string;
    alt: string;
    className?: string;
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

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
                rootMargin: "100px",
                threshold: 0.01,
            }
        );

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={`relative h-full  ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 w-full h-full">
                    <Skeleton className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse" />
                </div>
            )}
            {isInView && (
                <Image
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                        isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                    }`}
                    fill
                    sizes="(max-width: 768px) 200px, 300px"
                    onLoad={() => setIsLoaded(true)}
                    loading="lazy"
                />
            )}
        </div>
    );
}

export default function CustomTextGallery() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
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
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
            {CUSTOM_IMAGES.map((item) => (
                <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="break-inside-avoid"
                >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:ring-2 hover:ring-primary/20">
                        <div className="relative h-20 overflow-hidden bg-muted">
                            <LazyImageWithBlur
                                src={item.url}
                                alt={item.text}
                                className="w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Badge variant="secondary" className="backdrop-blur-sm">
                                    {item.width}x{item.height}
                                </Badge>
                                <div className="flex gap-1">
                                    <div
                                        className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                                        style={{ backgroundColor: `#${item.bgColor}` }}
                                    />
                                    <div
                                        className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                                        style={{ backgroundColor: `#${item.fgColor}` }}
                                    />
                                </div>
                            </div>
                            <div className="absolute top-2 left-2 right-2">
                                <p className="text-white font-bold text-sm drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}