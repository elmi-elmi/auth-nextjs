/**
 * Icon Gallery - Bento grid layout with PNG and SVG icons
 * Features toggle between formats and hash-based icons
 * @module components/images/icon-gallery
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ImageIcon } from "lucide-react";
import Image from "next/image";

interface IconItem {
    id: number;
    hash: string;
    size: number;
    label: string;
    span?: "col-span-2" | "row-span-2" | "col-span-2 row-span-2";
}

// Generate diverse hash-based icons
const ICON_ITEMS: IconItem[] = [
    { id: 1, hash: "tech001", size: 150, label: "Tech Icon", span: "col-span-2" },
    { id: 2, hash: "design02", size: 120, label: "Design Icon" },
    { id: 3, hash: "code003", size: 120, label: "Code Icon" },
    { id: 4, hash: "web004", size: 150, label: "Web Icon", span: "row-span-2" },
    { id: 5, hash: "app005", size: 120, label: "App Icon" },
    { id: 6, hash: "data006", size: 150, label: "Data Icon", span: "col-span-2 row-span-2" },
    { id: 7, hash: "cloud07", size: 120, label: "Cloud Icon" },
    { id: 8, hash: "api008", size: 120, label: "API Icon" },
    { id: 9, hash: "db009", size: 150, label: "Database Icon", span: "col-span-2" },
    { id: 10, hash: "sec010", size: 120, label: "Security Icon" },
    { id: 11, hash: "net011", size: 120, label: "Network Icon" },
    { id: 12, hash: "dev012", size: 150, label: "Dev Icon", span: "row-span-2" },
    { id: 13, hash: "ui013", size: 120, label: "UI Icon" },
    { id: 14, hash: "ux014", size: 120, label: "UX Icon" },
    { id: 15, hash: "mobile015", size: 150, label: "Mobile Icon", span: "col-span-2" },
    { id: 16, hash: "server016", size: 120, label: "Server Icon" },
    { id: 17, hash: "git017", size: 120, label: "Git Icon" },
    { id: 18, hash: "docker018", size: 150, label: "Docker Icon", span: "row-span-2" },
    { id: 19, hash: "k8s019", size: 120, label: "Kubernetes Icon" },
    { id: 20, hash: "ai020", size: 150, label: "AI Icon", span: "col-span-2 row-span-2" },
    { id: 21, hash: "ml021", size: 120, label: "ML Icon" },
    { id: 22, hash: "blockchain022", size: 120, label: "Blockchain Icon" },
    { id: 23, hash: "iot023", size: 150, label: "IoT Icon", span: "col-span-2" },
    { id: 24, hash: "ar024", size: 120, label: "AR Icon" },
    { id: 25, hash: "vr025", size: 120, label: "VR Icon" },
    { id: 26, hash: "game026", size: 150, label: "Game Icon", span: "row-span-2" },
    { id: 27, hash: "analytics027", size: 120, label: "Analytics Icon" },
    { id: 28, hash: "chart028", size: 120, label: "Chart Icon" },
    { id: 29, hash: "dashboard029", size: 150, label: "Dashboard Icon", span: "col-span-2" },
    { id: 30, hash: "report030", size: 120, label: "Report Icon" },
    { id: 31, hash: "email031", size: 120, label: "Email Icon" },
    { id: 32, hash: "chat032", size: 150, label: "Chat Icon", span: "row-span-2" },
    { id: 33, hash: "video033", size: 120, label: "Video Icon" },
    { id: 34, hash: "audio034", size: 150, label: "Audio Icon", span: "col-span-2 row-span-2" },
    { id: 35, hash: "photo035", size: 120, label: "Photo Icon" },
    { id: 36, hash: "file036", size: 120, label: "File Icon" },
    { id: 37, hash: "folder037", size: 150, label: "Folder Icon", span: "col-span-2" },
    { id: 38, hash: "search038", size: 120, label: "Search Icon" },
    { id: 39, hash: "settings039", size: 120, label: "Settings Icon" },
    { id: 40, hash: "user040", size: 150, label: "User Icon", span: "row-span-2" },
    { id: 41, hash: "team041", size: 120, label: "Team Icon" },
    { id: 42, hash: "lock042", size: 120, label: "Lock Icon" },
    { id: 43, hash: "key043", size: 150, label: "Key Icon", span: "col-span-2" },
    { id: 44, hash: "shield044", size: 120, label: "Shield Icon" },
    { id: 45, hash: "rocket045", size: 120, label: "Rocket Icon" },
    { id: 46, hash: "star046", size: 150, label: "Star Icon", span: "row-span-2" },
    { id: 47, hash: "heart047", size: 120, label: "Heart Icon" },
    { id: 48, hash: "bell048", size: 150, label: "Bell Icon", span: "col-span-2 row-span-2" },
    { id: 49, hash: "cart049", size: 120, label: "Cart Icon" },
    { id: 50, hash: "payment050", size: 120, label: "Payment Icon" },
];// Optimized lazy loading with format support
function LazyIcon({
                      hash,
                      size,
                      format,
                      alt,
                      className,
                  }: {
    hash: string;
    size: number;
    format: "png" | "svg";
    alt: string;
    className?: string;
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    const url = `https://dummyjson.com/icon/${hash}/${size}?type=${format}`;

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
                rootMargin: "150px",
                threshold: 0.1,
            }
        );

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={`relative ${className}`}>
            {!isLoaded && !error && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="w-full h-full" />
                    <ImageIcon className="absolute h-8 w-8 text-muted-foreground animate-pulse" />
                </div>
            )}
            {isInView && !error && (
                <Image
                    src={url}
                    alt={alt}
                    className={`w-full h-full object-contain p-4 transition-all duration-500 ${
                        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    fill
                    sizes="(max-width: 768px) 300px, 300px"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setError(true)}
                    loading="lazy"
                />
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
            )}
        </div>
    );
}

export default function IconGallery() {
    const [format, setFormat] = useState<"png" | "svg">("png");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <div className="space-y-4">
            {/* Format Toggle */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant={format === "png" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormat("png")}
                    >
                        PNG
                    </Button>
                    <Button
                        variant={format === "svg" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormat("svg")}
                    >
                        SVG
                    </Button>
                </div>
                <Badge variant="secondary">{format.toUpperCase()} Format</Badge>
            </div>

            {/* Bento Grid Layout */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={format}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[180px] gap-4"
                >
                    {ICON_ITEMS.map((item) => (
                        <motion.div
                            key={`${item.id}-${format}`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            whileTap={{ scale: 0.95 }}
                            className={item.span || ""}
                        >
                            <Card className="h-full overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-background to-muted/30">
                                <div className="relative h-full overflow-hidden">
                                    <LazyIcon
                                        hash={item.hash}
                                        size={item.size}
                                        format={format}
                                        alt={item.label}
                                        className="w-full h-full"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Info on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white font-semibold text-sm mb-1 truncate">
                                            {item.label}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="secondary" className="text-xs">
                                                {item.size}px
                                            </Badge>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 text-white hover:bg-white/20"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const url = `https://dummyjson.com/icon/${item.hash}/${item.size}?type=${format}`;
                                                    window.open(url, "_blank");
                                                }}
                                            >
                                                <Download className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Top badge */}
                                    <Badge
                                        variant="outline"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm bg-background/80"
                                    >
                                        #{item.hash}
                                    </Badge>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Stats Footer */}
            <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span>{ICON_ITEMS.length} Icons</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Lazy Loaded</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>{format.toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
}