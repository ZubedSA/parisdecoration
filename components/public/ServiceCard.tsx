import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const primaryImage =
    service.images.find((img) => img.isPrimary)?.driveUrl ||
    service.images[0]?.driveUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-paris-warm-200/80 shadow-soft hover:shadow-card transition-all duration-500 ease-out flex flex-col h-full hover:-translate-y-1.5">
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paris-warm-100">
        <Image
          src={primaryImage}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paris-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        {service.category && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-paris-dark-800 text-xs font-semibold shadow-sm border border-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-600" />
              <span>{service.category.name}</span>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl font-bold text-paris-dark-900 group-hover:text-paris-gold-600 transition-colors line-clamp-1">
            {service.name}
          </h3>
          <p className="text-sm text-paris-warm-600 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-paris-warm-100 flex items-center justify-between">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-paris-warm-500 font-medium">
              Mulai dari
            </span>
            <span className="text-lg font-bold text-paris-gold-600">
              {formatRupiah(service.price)}
            </span>
          </div>

          <Link
            href={`/layanan/${service.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-paris-warm-50 hover:bg-paris-gold-500 text-paris-dark-800 hover:text-white text-xs font-semibold transition-all duration-200 border border-paris-warm-200 hover:border-paris-gold-500 group/btn"
          >
            <span>Lihat Detail</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
