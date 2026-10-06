import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug, getSiteSettings, getServices } from "@/lib/db";
import { ServiceDetailClient } from "@/components/public/ServiceDetailClient";
import { ServiceCard } from "@/components/public/ServiceCard";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan",
    };
  }

  const primaryImage =
    service.images.find((img) => img.isPrimary)?.driveUrl ||
    service.images[0]?.driveUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";

  return {
    title: `${service.name} - Paris Decoration`,
    description: service.description,
    openGraph: {
      title: `${service.name} | Paris Decoration`,
      description: service.description,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 800,
          alt: service.name,
        },
      ],
    },
  };
}

export const revalidate = 0;

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const [settings, allServices] = await Promise.all([
    getSiteSettings(),
    getServices({ status: "ACTIVE" }),
  ]);

  // Related services in same category or others
  const relatedServices = allServices
    .filter((s) => s.id !== service.id && s.categoryId === service.categoryId)
    .slice(0, 3);

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-paris-warm-600">
          <Link href="/" className="hover:text-paris-gold-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-paris-warm-400" />
          <Link href="/layanan" className="hover:text-paris-gold-700 transition-colors">
            Layanan
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-paris-warm-400" />
          <span className="text-paris-dark-800 font-medium truncate max-w-xs sm:max-w-md">
            {service.name}
          </span>
        </nav>

        {/* Main service detail view */}
        <ServiceDetailClient
          service={service}
          whatsappNumber={settings.whatsapp || undefined}
        />

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="pt-16 border-t border-paris-warm-200/80 space-y-8">
            <div data-reveal="fade">
              <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
                Pilihan Lainnya
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900 mt-2">
                Layanan Terkait untuk Anda
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((rel, idx) => (
                <div
                  key={rel.id}
                  data-reveal="scale"
                  data-delay={(idx % 3) * 150}
                  className="h-full"
                >
                  <ServiceCard service={rel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
