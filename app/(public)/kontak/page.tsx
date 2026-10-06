import React from "react";
import { getSiteSettings } from "@/lib/db";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak & Konsultasi",
  description: "Hubungi Paris Decoration untuk konsultasi konsep, ketersediaan jadwal, dan pemesanan dekorasi.",
};

export const revalidate = 0;

export default async function KontakPage() {
  const settings = await getSiteSettings();
  const phone = settings.phone || "085943610397";
  const whatsapp = settings.whatsapp || "6285943610397";
  const cleanWa = whatsapp.replace(/[^0-9]/g, "");
  const email = settings.email || "contact@parisdecoration.com";
  const instagram = settings.instagram || "@parisdecoration";
  const address = settings.address || "Jl. Trunojoyo No. 45, Sumenep, Madura, Jawa Timur";

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div data-reveal="fade" className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
            Terhubung Bersama Kami
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-paris-dark-900 tracking-tight">
            Kontak & Lokasi Gallery
          </h1>
          <p className="text-base text-paris-dark-600 font-light">
            Tim kami siap menyambut pertanyaan dan mendiskusikan konsep dekorasi terbaik untuk hari istimewa Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Information Cards */}
          <div data-reveal="left" className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-6">
              <h3 className="font-serif text-xl font-bold text-paris-dark-900">
                Informasi Kantor & Workshop
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-paris-gold-50 flex items-center justify-center text-paris-gold-600 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-paris-dark-900 block">Alamat Workshop</span>
                    <p className="text-paris-warm-600 mt-0.5 leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-paris-gold-50 flex items-center justify-center text-paris-gold-600 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-paris-dark-900 block">WhatsApp / Telepon</span>
                    <a
                      href={`https://wa.me/${cleanWa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paris-gold-700 hover:text-paris-gold-600 font-medium block mt-0.5"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-paris-gold-50 flex items-center justify-center text-paris-gold-600 shrink-0 mt-0.5">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-paris-dark-900 block">Instagram</span>
                    <a
                      href={`https://instagram.com/${instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paris-gold-700 hover:text-paris-gold-600 font-medium block mt-0.5"
                    >
                      {instagram}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-paris-gold-50 flex items-center justify-center text-paris-gold-600 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-paris-dark-900 block">Email Resmi</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-paris-gold-700 hover:text-paris-gold-600 font-medium block mt-0.5"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-paris-gold-50 flex items-center justify-center text-paris-gold-600 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-paris-dark-900 block">Jam Operasional</span>
                    <p className="text-paris-warm-600 mt-0.5">
                      Senin - Minggu: 08.00 - 21.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${cleanWa}?text=Halo%20Paris%20Decoration,%20saya%20ingin%20konsultasi`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base">Chat Cepat via WhatsApp</h4>
                  <p className="text-xs text-emerald-100">Respon cepat dalam jam kerja</p>
                </div>
              </div>
              <span className="text-sm font-semibold underline group-hover:translate-x-1 transition-transform">
                Chat Sekarang →
              </span>
            </a>
          </div>

          {/* Right Side: Map & Consultation Info */}
          <div data-reveal="right" data-delay="150" className="lg:col-span-7 bg-white p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-6">
            <h3 className="font-serif text-xl font-bold text-paris-dark-900">
              Lokasi Layanan & Jangkauan Wilayah
            </h3>
            <p className="text-sm text-paris-dark-600 leading-relaxed font-light">
              Paris Decoration berbasis di <strong>Sumenep</strong> dan melayani seluruh wilayah Madura (Sumenep, Pamekasan, Sampang, Bangkalan) serta area Jawa Timur sekitarnya.
            </p>

            {/* Embedded interactive styled map visual */}
            <div className="w-full h-80 rounded-2xl overflow-hidden relative border border-paris-warm-200 bg-paris-warm-100">
              <iframe
                title="Peta Lokasi Paris Decoration"
                src="https://maps.google.com/maps?q=Sumenep,+Madura,+East+Java,+Indonesia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                aria-hidden="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
