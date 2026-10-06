"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-paris-dark-900">
            Terjadi Kendala Memuat Halaman
          </h2>
          <p className="text-xs sm:text-sm text-paris-warm-600 leading-relaxed font-light">
            Sistem mendeteksi pembaruan cache atau gangguan koneksi sesaat. Silakan coba segarkan halaman.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-paris-gold-500 hover:bg-paris-gold-600 text-white text-xs sm:text-sm font-semibold shadow-gold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Muat Ulang Halaman</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-paris-warm-100 hover:bg-paris-warm-200 text-paris-dark-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
