"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "@/lib/gallery-data";

interface ImageLightboxProps {
    item: GalleryItem | null;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

export function ImageLightbox({
    item,
    isOpen,
    onClose,
    onNext,
    onPrev,
    hasNext,
    hasPrev,
}: ImageLightboxProps) {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" && onNext) onNext();
            if (e.key === "ArrowLeft" && onPrev) onPrev();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose, onNext, onPrev]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-50"
                        aria-label="Fechar"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Navigation Buttons */}
                    {hasPrev && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrev?.();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-50 hidden md:block"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>
                    )}

                    {hasNext && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext?.();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-50 hidden md:block"
                            aria-label="Próximo"
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>
                    )}

                    {/* Image Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full h-full max-w-7xl max-h-screen p-4 flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* We use a regular img tag here for better compatibility with unknown aspect ratios in a lightbox, 
                                or Next/Image with object-contain if we want optimization. 
                                Let's use Next/Image with fill and object-contain. */}
                            <div className="relative w-full h-[80vh]">
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-center">
                            <h3 className="text-2xl font-cinzel text-gold-500 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
