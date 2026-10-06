import React from "react";
import { getServices, getCategories } from "@/lib/db";
import { ServiceListClient } from "@/components/public/ServiceListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Layanan Dekorasi",
  description: "Daftar lengkap paket dekorasi pernikahan, lamaran, ulang tahun, aqiqah, dan acara spesial Paris Decoration.",
};

export const revalidate = 0;

export default async function LayananPage() {
  const [services, categories] = await Promise.all([
    getServices({ status: "ACTIVE" }),
    getCategories(),
  ]);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div data-reveal="fade" className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
            Katalog Lengkap
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-paris-dark-900 tracking-tight">
            Paket & Layanan Dekorasi
          </h1>
          <p className="text-base text-paris-dark-600 font-light">
            Temukan konsep dekorasi sempurna dengan harga transparan dan fasilitas lengkap sesuai kebutuhan Anda.
          </p>
        </div>

        {/* Client filter & list */}
        <ServiceListClient initialServices={services} categories={categories} />
      </div>
    </div>
  );
}
