import React from "react";
import Link from "next/link";
import { Hero } from "@/components/public/Hero";
import { ServiceCard } from "@/components/public/ServiceCard";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { FeaturesSection } from "@/components/public/FeaturesSection";
import { TestimonialSection } from "@/components/public/TestimonialSection";
import { CtaSection } from "@/components/public/CtaSection";
import { getSiteSettings, getServices, getGalleries, getTestimonials } from "@/lib/db";
import { ArrowRight } from "lucide-react";

export const revalidate = 0; // Dynamic server component

export default async function HomePage() {
  const [settings, services, galleries, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices({ status: "ACTIVE" }),
    getGalleries({ status: "PUBLISHED" }),
    getTestimonials({ status: "PUBLISHED" }),
  ]);

  // Featured services (limit 6 on homepage)
  const featuredServices = services.slice(0, 6);
  // Featured galleries (limit 6 on homepage)
  const featuredGalleries = galleries.slice(0, 6);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero settings={settings} />

      {/* 2. Section Layanan Unggulan */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4">
            <div data-reveal="left" className="space-y-3 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
                Pilihan Terbaik
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paris-dark-900 tracking-tight">
                Layanan Dekorasi Unggulan
              </h2>
              <p className="text-sm sm:text-base text-paris-dark-600 font-light">
                Dari pernikahan megah hingga perayaan intim, kami siap mewujudkan konsep impian Anda.
              </p>
            </div>

            <div data-reveal="right" data-delay="150">
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 text-sm font-semibold text-paris-gold-700 hover:text-paris-gold-600 transition-colors group self-start sm:self-auto"
              >
                <span>Lihat Semua Layanan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, idx) => (
              <div
                key={service.id}
                data-reveal="scale"
                data-delay={(idx % 3) * 150}
                className="h-full"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          {featuredServices.length === 0 && (
            <div className="text-center py-12 text-paris-warm-500">
              Belum ada layanan tersedia saat ini.
            </div>
          )}
        </div>
      </section>

      {/* 3. Section Keunggulan / Features */}
      <FeaturesSection />

      {/* 4. Section Galeri Hasil Dekorasi */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4">
            <div data-reveal="left" className="space-y-3 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
                Portofolio Kami
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paris-dark-900 tracking-tight">
                Galeri Hasil Dekorasi
              </h2>
              <p className="text-sm sm:text-base text-paris-dark-600 font-light">
                Sentuhan estetika karya Paris Decoration di berbagai venue dan perayaan istimewa.
              </p>
            </div>

            <div data-reveal="right" data-delay="150">
              <Link
                href="/galeri"
                className="inline-flex items-center gap-2 text-sm font-semibold text-paris-gold-700 hover:text-paris-gold-600 transition-colors group self-start sm:self-auto"
              >
                <span>Lihat Seluruh Galeri</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <GalleryGrid galleries={featuredGalleries} />
        </div>
      </section>

      {/* 5. Section Testimoni Klien */}
      <TestimonialSection testimonials={testimonials} />

      {/* 6. Section CTA */}
      <CtaSection whatsappNumber={settings.whatsapp || undefined} />
    </div>
  );
}
