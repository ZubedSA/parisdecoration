import React from "react";
import { getServices, getSiteSettings } from "@/lib/db";
import { OrderFormClient } from "@/components/public/OrderFormClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pemesanan Online",
  description: "Pesan layanan dekorasi Paris Decoration secara online dan mudah. Dapatkan penawaran terbaik untuk acara Anda.",
};

export const revalidate = 0;

interface Props {
  searchParams: Promise<{ serviceId?: string }>;
}

export default async function OrderPage({ searchParams }: Props) {
  const { serviceId } = await searchParams;
  const [services, settings] = await Promise.all([
    getServices({ status: "ACTIVE" }),
    getSiteSettings(),
  ]);

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div data-reveal="fade" className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
            Pemesanan Mudah
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-paris-dark-900 tracking-tight">
            Pesan Layanan Dekorasi
          </h1>
          <p className="text-base text-paris-dark-600 font-light">
            Isi formulir pemesanan di bawah ini. Kami akan segera memproses dan mengonfirmasi ketersediaan jadwal acara Anda.
          </p>
        </div>

        <div data-reveal="scale" data-delay="100">
          <OrderFormClient
            services={services}
            preselectedServiceId={serviceId}
            whatsappNumber={settings.whatsapp || undefined}
          />
        </div>
      </div>
    </div>
  );
}
