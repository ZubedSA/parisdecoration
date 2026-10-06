import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

export const CtaSection: React.FC<{ whatsappNumber?: string }> = ({
  whatsappNumber = "6285943610397",
}) => {
  const cleanWa = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-paris-dark-900 via-paris-dark-800 to-paris-dark-900 text-white relative overflow-hidden">
      {/* Golden glow decoration with breathing pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-paris-gold-500/20 rounded-full blur-[110px] pointer-events-none animate-glow-gold" />

      <div data-reveal="scale" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paris-gold-500/20 text-paris-gold-300 border border-paris-gold-400/30 text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-paris-gold-400" />
          <span>Konsultasi & Reservasi Jadwal</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Siap Membuat Momen Berharga Anda Begitu Berkesan & Tak Terlupakan?
        </h2>

        <p className="text-base sm:text-lg text-paris-warm-200 max-w-2xl mx-auto font-light leading-relaxed">
          Konsultasikan konsep dekorasi impian Anda bersama tim profesional Paris Decoration. Kami siap menghadirkan keindahan terbaik untuk perayaan Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/order"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-paris-gold-500 hover:bg-paris-gold-400 text-white font-semibold text-base shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Pesan Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={`https://wa.me/${cleanWa}?text=Halo%20Paris%20Decoration,%20saya%20ingin%20konsultasi%20dekorasi`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 backdrop-blur-sm transition-all duration-200"
          >
            <PhoneCall className="w-4 h-4 text-paris-gold-300" />
            <span>Konsultasi WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
