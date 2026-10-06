import React from "react";
import Image from "next/image";
import { TestimonialItem } from "@/types";
import { Star, Quote } from "lucide-react";

export const TestimonialSection: React.FC<{ testimonials: TestimonialItem[] }> = ({
  testimonials,
}) => {
  const published = testimonials.filter((t) => t.status === "PUBLISHED");

  if (published.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="fade" className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
            Kata Mereka
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paris-dark-900 tracking-tight">
            Cerita Bahagia dari Klien Kami
          </h2>
          <p className="text-base text-paris-dark-600 font-light">
            Pengalaman nyata dari mereka yang mempercayakan dekorasi hari berharga mereka kepada Paris Decoration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {published.map((t, idx) => (
            <div
              key={t.id}
              data-reveal
              data-delay={(idx % 3) * 150}
              className="bg-paris-warm-50/60 p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-paris-gold-200/60" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? "text-paris-gold-500 fill-paris-gold-500"
                          : "text-paris-warm-300 fill-paris-warm-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-paris-dark-700 leading-relaxed italic">
                  "{t.message}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-paris-warm-200/70 flex items-center gap-3.5">
                {t.image ? (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-paris-gold-300">
                    <Image
                      src={t.image}
                      alt={t.customerName}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-paris-gold-200 text-paris-gold-800 font-serif font-bold text-base flex items-center justify-center shrink-0">
                    {t.customerName.charAt(0)}
                  </div>
                )}

                <div>
                  <h4 className="font-serif font-bold text-sm text-paris-dark-900">
                    {t.customerName}
                  </h4>
                  {t.eventType && (
                    <span className="text-xs text-paris-gold-700 font-medium">
                      {t.eventType}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
