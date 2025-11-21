"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from "@/lib/gallery-data";
import { ImageLightbox } from "./ImageLightbox";
import { Button } from "@/components/ui/Button";

export function GalleryGrid() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const filteredItems = selectedCategory === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
    };

    const nextImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex < filteredItems.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    return (
        <div className="space-y-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
                {GALLERY_CATEGORIES.map((category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "primary" : "outline"}
                        onClick={() => setSelectedCategory(category.id)}
                        className="min-w-[100px]"
                    >
                        {category.label}
                    </Button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredItems.map((item, index) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={item.id}
                        className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-gold-500/20 bg-black/40"
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
                            <h3 className="font-cinzel text-lg font-bold text-gold-500 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground translate-y-4 transition-transform duration-300 group-hover:translate-y-0 delay-75">
                                {item.category}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Lightbox */}
            <ImageLightbox
                item={selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null}
                isOpen={selectedImageIndex !== null}
                onClose={closeLightbox}
                onNext={nextImage}
                onPrev={prevImage}
                hasNext={selectedImageIndex !== null && selectedImageIndex < filteredItems.length - 1}
                hasPrev={selectedImageIndex !== null && selectedImageIndex > 0}
            />
        </div>
    );
}
