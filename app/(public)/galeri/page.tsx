import React from "react";
import { getGalleries } from "@/lib/db";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri Foto Dekorasi",
  description: "Portofolio dokumentasi hasil dekorasi pernikahan, engagement, pesta ulang tahun, dan event Paris Decoration.",
};

export const revalidate = 0;

export default async function GaleriPage() {
  const galleries = await getGalleries({ status: "PUBLISHED" });

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div data-reveal="fade" className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
            Koleksi Visual
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-paris-dark-900 tracking-tight">
            Galeri Momen Istimewa
          </h1>
          <p className="text-base text-paris-dark-600 font-light">
            Inspirasi dekorasi nyata dari pengerjaan terbaik kami untuk berbagai perayaan berharga Anda.
          </p>
        </div>

        {/* Gallery grid with category filter tabs and lightbox */}
        <GalleryGrid galleries={galleries} showCategoryTabs={true} />
      </div>
    </div>
  );
}
