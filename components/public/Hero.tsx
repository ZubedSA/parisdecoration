import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteSettingsData } from "@/types";

export interface HeroProps {
  settings?: Partial<SiteSettingsData> | null;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const heroTitle = settings?.heroTitle || "Create Beautiful Moments";
  const heroDescription =
    settings?.heroDescription ||
    "Jadikan setiap momen istimewa dengan dekorasi yang elegan, berkelas, dan penuh kehangatan dari Paris Decoration.";
  const heroImage =
    settings?.heroImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-24 bg-gradient-to-b from-paris-warm-50 via-white to-white">
      {/* Subtle decorative circles with ambient breathing */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-paris-gold-100/40 rounded-full blur-3xl pointer-events-none -z-0 animate-glow-gold" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-paris-warm-200/50 rounded-full blur-2xl pointer-events-none -z-0 animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Col */}
          <div data-reveal="left" className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paris-warm-100 text-paris-dark-800 border border-paris-warm-200 text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-600" />
              <span>Studio & Jasa Dekorasi Profesional</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-paris-dark-900 leading-[1.15]">
              {heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-paris-dark-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/order"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-paris-gold-500 hover:bg-paris-gold-600 text-white font-semibold text-base shadow-gold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/layanan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-paris-warm-50 text-paris-dark-800 font-semibold text-base border border-paris-warm-300 shadow-soft transition-all duration-300 hover:scale-[1.01]"
              >
                <span>Lihat Layanan</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-paris-warm-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-paris-dark-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-600 shrink-0" />
                <span>Desain Custom & Mewah</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-paris-dark-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-600 shrink-0" />
                <span>Tim Kreatif Berpengalaman</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-paris-dark-700 font-medium col-span-2 sm:col-span-1">
                <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-600 shrink-0" />
                <span>Harga Jelas & Transparan</span>
              </div>
            </div>
          </div>

          {/* Right Image Col */}
          <div data-reveal="right" data-delay="150" className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] sm:aspect-[3/4] group">
                <Image
                  src={heroImage}
                  alt="Dekorasi Paris Decoration"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paris-dark-900/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating stat badge on image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40 flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-xl bg-paris-gold-50 border border-paris-gold-200 flex items-center justify-center shrink-0">
                    <span className="font-serif text-lg font-bold text-paris-gold-700">100+</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-paris-dark-900 uppercase tracking-wide">
                      Momen Terselenggara
                    </p>
                    <p className="text-xs text-paris-warm-600">
                      Dipercaya untuk berbagai perayaan berharga
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative background accent behind image */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-paris-gold-300/40 -z-10 hidden sm:block animate-float-slow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
