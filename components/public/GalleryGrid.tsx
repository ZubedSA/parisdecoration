"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryItemRecord } from "@/types";
import { Modal } from "@/components/ui/modal";


export const GalleryGrid: React.FC<{
  galleries: GalleryItemRecord[];
  showCategoryTabs?: boolean;
}> = ({ galleries, showCategoryTabs = false }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItemRecord | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = Array.from(
    new Set(galleries.map((g) => g.category?.name).filter(Boolean))
  ) as string[];

  const filteredGalleries =
    activeCategory === "all"
      ? galleries
      : galleries.filter((g) => g.category?.name === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category filter tabs if enabled */}
      {showCategoryTabs && categories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-paris-gold-500 text-white shadow-gold"
                : "bg-white text-paris-dark-700 hover:bg-paris-warm-100 border border-paris-warm-200"
            }`}
          >
            Semua Foto ({galleries.length})
          </button>
          {categories.map((cat) => {
            const count = galleries.filter((g) => g.category?.name === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-paris-gold-500 text-white shadow-gold"
                    : "bg-white text-paris-dark-700 hover:bg-paris-warm-100 border border-paris-warm-200"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGalleries.map((item, idx) => (
          <div
            key={item.id}
            data-reveal="scale"
            data-delay={(idx % 3) * 150}
            onClick={() => setSelectedImage(item)}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-card bg-paris-warm-100 border border-paris-warm-200/80 transition-all duration-300 hover:-translate-y-1"
          >
            <Image
              src={item.driveUrl}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-paris-dark-900/85 via-paris-dark-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="flex items-center justify-between text-white mb-2">
                {item.category && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-paris-gold-300 tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-400" />
                    {item.category.name}
                  </span>
                )}
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                  Lihat Foto
                </span>
              </div>
              <h4 className="text-white font-serif font-bold text-base leading-tight">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-xs text-paris-warm-200 line-clamp-1 mt-1 font-light">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredGalleries.length === 0 && (
        <div className="text-center py-12 text-paris-warm-500 text-sm">
          Belum ada foto galeri untuk kategori ini.
        </div>
      )}

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="4xl"
      >
        {selectedImage && (
          <div className="space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-paris-dark-900">
              <Image
                src={selectedImage.driveUrl}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-1">
                {selectedImage.category && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-paris-gold-600 bg-paris-gold-50 px-2.5 py-0.5 rounded-full border border-paris-gold-200">
                    {selectedImage.category.name}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-paris-dark-900">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="text-sm text-paris-warm-600 mt-1 leading-relaxed">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
