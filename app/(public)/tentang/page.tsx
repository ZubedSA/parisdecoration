import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/db";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali lebih dekat Paris Decoration, penyedia jasa dekorasi pernikahan dan event profesional terpercaya.",
};

export const revalidate = 0;

export default async function TentangPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 md:py-20 space-y-20">
      {/* Intro section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div data-reveal="left" className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
              Cerita Kami
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-paris-dark-900 leading-tight">
              Mewujudkan Dekorasi Impian dengan Sentuhan Elegan & Penuh Cinta
            </h1>
            <p className="text-base text-paris-dark-700 leading-relaxed font-light">
              {settings.description ||
                "Paris Decoration bermula dari hasrat mendalam akan seni tata ruang dan dekorasi perayaan. Kami percaya bahwa setiap perayaan memiliki cerita unik yang pantas dihadirkan dalam atmosfer memukau."}
            </p>
            <p className="text-sm sm:text-base text-paris-warm-600 leading-relaxed">
              Berbasis di Madura, Jawa Timur, tim kami berdedikasi menciptakan karya dekoratif berkualitas tinggi, mulai dari pernikahan megah di ballroom, lamaran intim di rumah, hingga event korporat terkemuka.
            </p>
            <div className="pt-2">
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-paris-gold-500 hover:bg-paris-gold-600 text-white font-semibold text-sm shadow-gold transition-all duration-300 hover:scale-[1.03]"
              >
                <span>Mulai Konsultasi Acara</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div data-reveal="right" data-delay="150" className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                alt="Tentang Paris Decoration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="bg-paris-warm-50/70 border-y border-paris-warm-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal="fade" className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-paris-dark-900">
              Visi & Nilai Utama Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div data-reveal="scale" data-delay="100" className="bg-white p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-4 hover:-translate-y-1 transition-transform duration-300">
              <span className="font-serif text-sm font-bold text-paris-gold-600 tracking-widest uppercase">
                Pilar I
              </span>
              <h3 className="font-serif text-xl font-bold text-paris-dark-900">Visi & Komitmen</h3>
              <p className="text-sm text-paris-dark-600 leading-relaxed font-light">
                Menjadi vendor dekorasi terdepan dan paling terpercaya yang selalu mengedepankan keindahan artistik, orisinalitas ide, dan kepuasan paripurna setiap klien.
              </p>
            </div>

            <div data-reveal="scale" data-delay="200" className="bg-white p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-4 hover:-translate-y-1 transition-transform duration-300">
              <span className="font-serif text-sm font-bold text-paris-gold-600 tracking-widest uppercase">
                Pilar II
              </span>
              <h3 className="font-serif text-xl font-bold text-paris-dark-900">Seni & Ketelitian Detail</h3>
              <p className="text-sm text-paris-dark-600 leading-relaxed font-light">
                Setiap helai bunga, tata pencahayaan lampu, hingga keselarasan kain dirangkai dengan kecermatan tingkat tinggi demi estetika visual yang sempurna.
              </p>
            </div>

            <div data-reveal="scale" data-delay="300" className="bg-white p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-4 hover:-translate-y-1 transition-transform duration-300">
              <span className="font-serif text-sm font-bold text-paris-gold-600 tracking-widest uppercase">
                Pilar III
              </span>
              <h3 className="font-serif text-xl font-bold text-paris-dark-900">Kepercayaan & Integritas</h3>
              <p className="text-sm text-paris-dark-600 leading-relaxed font-light">
                Kami menjunjung tinggi komitmen tepat waktu, transparansi anggaran, serta kesiapan penuh mendampingi acara Anda hingga usai dengan sukses.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
