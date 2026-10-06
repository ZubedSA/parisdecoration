"use client";

import React, { useState } from "react";
import { ServiceItem } from "@/types";
import { formatRupiah, formatIndonesianDate, buildWhatsAppLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ArrowRight, ArrowLeft, MessageSquare, Copy, Check } from "lucide-react";
import Link from "next/link";

interface OrderFormProps {
  services: ServiceItem[];
  preselectedServiceId?: string;
  whatsappNumber?: string;
}

export const OrderFormClient: React.FC<OrderFormProps> = ({
  services,
  preselectedServiceId,
  whatsappNumber = "6285943610397",
}) => {
  const { error: toastError, success: toastSuccess } = useToast();

  const [step, setStep] = useState<"fill" | "review" | "success">("fill");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrderCode, setCreatedOrderCode] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Today in YYYY-MM-DD for min date picker
  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    serviceId: preselectedServiceId || (services[0]?.id ?? ""),
    eventDate: "",
    eventLocation: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedService = services.find((s) => s.id === formData.serviceId);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      errs.customerName = "Nama lengkap wajib diisi";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Nomor WhatsApp wajib diisi";
    } else if (formData.phone.length < 8) {
      errs.phone = "Nomor WhatsApp minimal 8 digit";
    }
    if (!formData.serviceId) {
      errs.serviceId = "Pilih salah satu layanan dekorasi";
    }
    if (!formData.eventDate) {
      errs.eventDate = "Tanggal acara wajib dipilih";
    } else {
      const selected = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.eventDate = "Tanggal acara tidak boleh tanggal yang sudah lewat";
      }
    }
    if (!formData.eventLocation.trim()) {
      errs.eventLocation = "Lokasi acara wajib diisi (gedung / rumah / kota)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep("review");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toastError("Mohon lengkapi formulir dengan benar.");
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal membuat pesanan");
      }

      setCreatedOrderCode(data.orderCode);
      setStep("success");
      toastSuccess("Pesanan Anda berhasil dikirim!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses pesanan";
      toastError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(createdOrderCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // WhatsApp click link generator
  const waLink = buildWhatsAppLink(whatsappNumber, {
    orderCode: createdOrderCode,
    customerName: formData.customerName,
    serviceName: selectedService?.name || "Dekorasi Custom",
    eventDate: formatIndonesianDate(formData.eventDate),
    eventLocation: formData.eventLocation,
  });

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicators */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === "fill"
                ? "bg-paris-gold-500 text-white"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            1
          </div>
          <span className="text-xs sm:text-sm font-semibold text-paris-dark-800">
            Isi Formulir
          </span>
        </div>
        <div className="w-12 sm:w-20 h-0.5 bg-paris-warm-200" />
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === "review"
                ? "bg-paris-gold-500 text-white"
                : step === "success"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-paris-warm-200 text-paris-dark-600"
            }`}
          >
            2
          </div>
          <span className="text-xs sm:text-sm font-semibold text-paris-dark-800">
            Review & Konfirmasi
          </span>
        </div>
        <div className="w-12 sm:w-20 h-0.5 bg-paris-warm-200" />
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === "success"
                ? "bg-emerald-600 text-white"
                : "bg-paris-warm-200 text-paris-dark-600"
            }`}
          >
            3
          </div>
          <span className="text-xs sm:text-sm font-semibold text-paris-dark-800">
            Selesai
          </span>
        </div>
      </div>

      {/* STEP 1: FORM FILLING */}
      {step === "fill" && (
        <form
          onSubmit={handleProceedToReview}
          className="bg-white p-6 sm:p-10 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-6"
        >
          <div className="space-y-1 pb-2 border-b border-paris-warm-100">
            <h2 className="font-serif text-2xl font-bold text-paris-dark-900">
              Formulir Pemesanan Dekorasi
            </h2>
            <p className="text-xs sm:text-sm text-paris-warm-600">
              Lengkapi informasi berikut untuk menjadwalkan dekorasi acara Anda.
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              required
              placeholder="Contoh: Ahmad Rizky"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              error={errors.customerName}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nomor WhatsApp"
                required
                type="tel"
                placeholder="Contoh: 0859xxxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                helperText="Untuk konfirmasi dan kirim foto konsep"
              />

              <Input
                label="Email (Opsional)"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />
            </div>

            <Select
              label="Pilih Paket Layanan Dekorasi"
              required
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              error={errors.serviceId}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - mulai {formatRupiah(s.price)}
                </option>
              ))}
            </Select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tanggal Acara"
                required
                type="date"
                min={todayStr}
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                error={errors.eventDate}
              />

              <Input
                label="Lokasi Acara (Gedung / Alamat)"
                required
                placeholder="Contoh: Gedung Graha Adi, Sumenep"
                value={formData.eventLocation}
                onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                error={errors.eventLocation}
              />
            </div>

            <Textarea
              label="Catatan Khusus / Kebutuhan Acara (Opsional)"
              placeholder="Ceritakan preferensi warna, tema pakaian pengantin, atau permintaan khusus lainnya..."
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full">
              <span>Lanjut ke Review Pesanan</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      )}

      {/* STEP 2: REVIEW ORDER */}
      {step === "review" && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-6">
          <div className="space-y-1 pb-4 border-b border-paris-warm-100">
            <h2 className="font-serif text-2xl font-bold text-paris-dark-900">
              Konfirmasi Detail Pesanan
            </h2>
            <p className="text-xs sm:text-sm text-paris-warm-600">
              Periksa kembali data Anda sebelum mengirimkan pemesanan.
            </p>
          </div>

          <div className="rounded-2xl bg-paris-warm-50/80 border border-paris-warm-200/80 p-5 space-y-4 text-sm">
            <div className="flex justify-between items-start pb-3 border-b border-paris-warm-200/60">
              <span className="text-paris-warm-600">Nama Pelanggan</span>
              <span className="font-semibold text-paris-dark-900 text-right">
                {formData.customerName}
              </span>
            </div>

            <div className="flex justify-between items-start pb-3 border-b border-paris-warm-200/60">
              <span className="text-paris-warm-600">Nomor WhatsApp</span>
              <span className="font-semibold text-paris-dark-900 text-right">{formData.phone}</span>
            </div>

            {formData.email && (
              <div className="flex justify-between items-start pb-3 border-b border-paris-warm-200/60">
                <span className="text-paris-warm-600">Email</span>
                <span className="font-semibold text-paris-dark-900 text-right">
                  {formData.email}
                </span>
              </div>
            )}

            <div className="flex justify-between items-start pb-3 border-b border-paris-warm-200/60">
              <span className="text-paris-warm-600">Paket Dekorasi</span>
              <span className="font-semibold text-paris-gold-700 text-right">
                {selectedService?.name}
              </span>
            </div>

            <div className="flex justify-between items-start pb-3 border-b border-paris-warm-200/60">
              <span className="text-paris-warm-600">Tanggal Acara</span>
              <span className="font-semibold text-paris-dark-900 text-right">
                {formatIndonesianDate(formData.eventDate)}
              </span>
            </div>

            <div className="flex justify-between items-start pb-3 border-b border-paris-warm-200/60">
              <span className="text-paris-warm-600">Lokasi Acara</span>
              <span className="font-semibold text-paris-dark-900 text-right">
                {formData.eventLocation}
              </span>
            </div>

            {formData.notes && (
              <div className="flex justify-between items-start pb-3 border-b border-paris-warm-200/60">
                <span className="text-paris-warm-600">Catatan</span>
                <span className="text-paris-dark-800 text-right max-w-xs">{formData.notes}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-1">
              <span className="text-base font-bold text-paris-dark-900">Estimasi Biaya Paket</span>
              <span className="font-serif text-2xl font-bold text-paris-gold-600">
                {formatRupiah(selectedService?.price)}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-paris-warm-50 border-l-4 border-paris-gold-500 text-xs text-paris-dark-800 leading-relaxed">
            <p>
              Status pemesanan pertama kali adalah <strong>PENDING</strong>. Admin Paris Decoration akan memeriksa ketersediaan tanggal dan segera menghubungi Anda via WhatsApp untuk konsultasi teknis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep("fill")}
              disabled={isSubmitting}
              className="sm:w-1/3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Ubah Data</span>
            </Button>

            <Button
              type="button"
              onClick={handleSubmitOrder}
              isLoading={isSubmitting}
              className="flex-1"
              size="lg"
            >
              <span>Konfirmasi Pesanan</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS & CONFIRMATION */}
      {step === "success" && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-paris-warm-200/80 shadow-soft text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-paris-warm-50 border-2 border-paris-gold-400/50 flex items-center justify-center mx-auto shadow-md">
            <BrandLogo size="md" showText={false} />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900">
              Pesanan Berhasil Dibuat!
            </h2>
            <p className="text-sm text-paris-dark-600 max-w-md mx-auto leading-relaxed">
              Terima kasih telah mempercayakan perayaan istimewa Anda kepada Paris Decoration.
            </p>
          </div>

          {/* Order Code Box */}
          <div className="p-6 rounded-2xl bg-paris-warm-50 border border-paris-warm-200/80 max-w-md mx-auto space-y-2">
            <span className="text-xs uppercase tracking-wider text-paris-warm-500 font-semibold block">
              Kode Pesanan Anda:
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-2xl font-bold text-paris-gold-700 tracking-wider">
                {createdOrderCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg text-paris-warm-600 hover:text-paris-dark-900 hover:bg-paris-warm-200 transition-colors"
                title="Salin Kode Pesanan"
              >
                {copiedCode ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-paris-warm-600 pt-1">
              Silakan simpan kode ini untuk memudahkan pelacakan status pesanan Anda.
            </p>
          </div>

          <div className="space-y-3 max-w-md mx-auto pt-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Konfirmasi via WhatsApp Sekarang</span>
            </a>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-paris-warm-100 hover:bg-paris-warm-200 text-paris-dark-800 text-sm font-semibold transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
