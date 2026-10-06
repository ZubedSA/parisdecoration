"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { ArrowRight, PhoneCall } from "lucide-react";

export const ServiceDetailClient: React.FC<{
  service: ServiceItem;
  whatsappNumber?: string;
}> = ({ service, whatsappNumber = "6285943610397" }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = service.images.length > 0 ? service.images : [
    {
      id: "fallback",
      serviceId: service.id,
      fileName: "default.jpg",
      driveFileId: null,
      driveUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      isPrimary: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const currentImage = images[activeImageIndex] || images[0];

  const facilitiesList = service.facilities
    ? service.facilities
        .split("\n")
        .map((f) => f.trim().replace(/^[-*•✓]\s*/, ""))
        .filter(Boolean)
    : [];

  const cleanWa = whatsappNumber.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanWa}?text=Halo%20Paris%20Decoration,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(
    service.name
  )}`;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div data-reveal="left" className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-paris-warm-100 border border-paris-warm-200/80 shadow-soft">
            <Image
              src={currentImage.driveUrl}
              alt={service.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-all duration-300"
            />
            {service.category && (
              <div className="absolute top-5 left-5">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-paris-dark-800 text-xs font-semibold shadow-sm border border-white/50">
                  {service.category.name}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails row if multiple */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-paris-gold-500 ring-2 ring-paris-gold-400/30 scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.driveUrl}
                    alt={`${service.name} thumb ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing & Booking Details */}
        <div data-reveal="right" data-delay="150" className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-paris-dark-900 tracking-tight leading-tight">
              {service.name}
            </h1>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-paris-warm-500 font-medium">
                Mulai dari
              </span>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-paris-gold-600">
                {formatRupiah(service.price)}
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-paris-dark-700 leading-relaxed font-light">
            {service.description}
          </p>

          {/* Facilities Checklist */}
          {facilitiesList.length > 0 && (
            <div className="p-6 rounded-3xl bg-paris-warm-50/70 border border-paris-warm-200/80 space-y-3">
              <h3 className="font-serif text-base font-bold text-paris-dark-900 pb-2 border-b border-paris-warm-200/50">
                Fasilitas & Spesifikasi Paket:
              </h3>
              <ul className="space-y-2.5">
                {facilitiesList.map((facility, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-paris-dark-800">
                    <span className="text-paris-gold-600 font-serif font-bold text-base leading-none select-none">—</span>
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action CTA Buttons */}
          <div className="space-y-3 pt-2">
            <Link
              href={`/order?serviceId=${service.id}`}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-paris-gold-500 hover:bg-paris-gold-600 text-white font-semibold text-base shadow-gold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Pesan Layanan Ini</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-paris-warm-50 text-paris-dark-800 font-medium text-sm border border-paris-warm-300 shadow-soft transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Tanya / Konsultasi via WhatsApp</span>
            </a>
          </div>

          {/* Guarantees */}
          <div className="pt-4 border-t border-paris-warm-200 grid grid-cols-2 gap-4 text-xs text-paris-warm-700">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-600 shrink-0" />
              <span>Booking Terverifikasi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-600 shrink-0" />
              <span>Pemasangan Tepat Waktu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
