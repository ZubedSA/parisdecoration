"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ServiceItem, CategoryItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUploader, ImageUploadValue } from "@/components/admin/ImageUploader";
import { useToast } from "@/components/ui/toast";
import { ArrowLeft, Trash2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ServiceFormProps {
  initialData?: ServiceItem;
  categories: CategoryItem[];
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, categories }) => {
  const router = useRouter();
  const { success: toastSuccess, error: toastError } = useToast();

  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    categoryId: initialData?.categoryId || categories[0]?.id || "",
    price: initialData?.price ? String(initialData.price) : "",
    description: initialData?.description || "",
    facilities: initialData?.facilities || "",
    status: initialData?.status || "ACTIVE",
  });

  // Existing uploaded images
  const [images, setImages] = useState<
    { fileName: string; driveUrl: string; driveFileId?: string; isPrimary?: boolean }[]
  >(
    initialData?.images?.map((img) => ({
      fileName: img.fileName,
      driveUrl: img.driveUrl,
      driveFileId: img.driveFileId || undefined,
      isPrimary: img.isPrimary,
    })) || []
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddUploadedImage = (uploaded: ImageUploadValue) => {
    setImages((prev) => [
      ...prev,
      {
        fileName: uploaded.fileName,
        driveUrl: uploaded.driveUrl,
        driveFileId: uploaded.driveFileId,
        isPrimary: prev.length === 0,
      },
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const filtered = prev.filter((_, idx) => idx !== index);
      // Ensure at least one image is primary if images exist
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const handleSetPrimary = (index: number) => {
    setImages((prev) =>
      prev.map((img, idx) => ({
        ...img,
        isPrimary: idx === index,
      }))
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Nama layanan wajib diisi";
    if (!formData.categoryId) errs.categoryId = "Kategori wajib dipilih";
    if (!formData.price) errs.price = "Harga wajib diisi";
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0)
      errs.price = "Harga harus berupa angka valid lebih dari 0";
    if (!formData.description.trim()) errs.description = "Deskripsi layanan wajib diisi";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toastError("Periksa input yang ditandai merah");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = isEdit
        ? `/api/admin/services/${initialData.id}`
        : "/api/admin/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          images,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menyimpan layanan");
      }

      toastSuccess(
        isEdit ? "Layanan berhasil diperbarui!" : "Layanan baru berhasil dibuat!"
      );
      router.push("/admin/layanan");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan sistem";
      toastError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/layanan"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-paris-warm-600 hover:text-paris-dark-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Layanan</span>
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-paris-dark-900 pb-3 border-b border-paris-warm-100">
          {isEdit ? `Edit Layanan: ${initialData.name}` : "Informasi Layanan Baru"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input
              label="Nama Paket Layanan"
              required
              placeholder="Contoh: Dekorasi Wedding Royal Elegance"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
          </div>

          <Select
            label="Kategori"
            required
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            error={errors.categoryId}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Input
            label="Harga Mulai (Rp)"
            required
            type="number"
            placeholder="Contoh: 5000000"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            error={errors.price}
          />

          <Select
            label="Status Layanan"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          >
            <option value="ACTIVE">Aktif (Tampil di Website Publik)</option>
            <option value="INACTIVE">Nonaktif (Disembunyikan)</option>
          </Select>
        </div>

        <Textarea
          label="Deskripsi Layanan"
          required
          rows={4}
          placeholder="Jelaskan daya tarik konsep dekorasi, nuansa visual, dan keistimewaan paket ini..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
        />

        <Textarea
          label="Fasilitas & Spesifikasi (Satu item per baris)"
          rows={5}
          placeholder="Pelaminan 6-8 meter&#10;Backdrop ukiran custom&#10;Rangkaian bunga segar&#10;Lighting panggung warm white&#10;Karpet permadani"
          value={formData.facilities}
          onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
          helperText="Tuliskan tiap fasilitas pada baris baru (akan ditampilkan sebagai checklist otomatis di halaman detail)."
        />

        {/* Image Management Section with Google Apps Script / Drive Uploader */}
        <div className="pt-4 border-t border-paris-warm-100 space-y-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-paris-dark-900">
              Foto Layanan & Google Drive Storage
            </h3>
            <p className="text-xs text-paris-warm-600">
              Unggah foto hasil dekorasi untuk paket ini. File akan disimpan di Google Drive.
            </p>
          </div>

          {/* Current Images list */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-paris-warm-200 bg-paris-warm-100 group shadow-xs"
                >
                  <Image
                    src={img.driveUrl}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />

                  {/* Primary badge */}
                  {img.isPrimary && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-paris-gold-500 text-white text-[10px] font-bold shadow-sm">
                      Utama
                    </span>
                  )}

                  {/* Hover controls */}
                  <div className="absolute inset-0 bg-paris-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                    {!img.isPrimary && (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(idx)}
                        className="px-2 py-1 rounded bg-white text-paris-dark-900 text-[10px] font-bold hover:bg-paris-gold-100"
                      >
                        Jadikan Utama
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1.5 rounded-full bg-rose-600 text-white text-xs hover:bg-rose-700"
                      title="Hapus foto ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Uploader tool */}
          <ImageUploader
            label="Tambah Foto Baru"
            onChange={handleAddUploadedImage}
          />
        </div>

        <div className="pt-6 border-t border-paris-warm-100 flex items-center justify-end gap-3">
          <Link
            href="/admin/layanan"
            className="px-6 py-2.5 rounded-full border border-paris-warm-300 text-paris-dark-800 text-sm font-semibold hover:bg-paris-warm-100"
          >
            Batal
          </Link>
          <Button type="submit" size="lg" isLoading={isSubmitting}>
            <span>{isEdit ? "Simpan Perubahan" : "Terbitkan Layanan"}</span>
          </Button>
        </div>
      </div>
    </form>
  );
};
