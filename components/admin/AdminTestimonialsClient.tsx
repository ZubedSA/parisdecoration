"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TestimonialItem, TestimonialStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { Star, Plus, Eye, EyeOff, Trash2, MessageSquareQuote } from "lucide-react";

export const AdminTestimonialsClient: React.FC<{
  initialTestimonials: TestimonialItem[];
}> = ({ initialTestimonials }) => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    rating: 5,
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleStatus = async (item: TestimonialItem) => {
    const nextStatus: TestimonialStatus =
      item.status === "PUBLISHED" ? "HIDDEN" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? data.testimonial : t))
      );
      toastSuccess(`Status testimoni diperbarui menjadi ${nextStatus}`);
    } catch {
      toastError("Gagal memperbarui status testimoni");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      toastSuccess("Testimoni berhasil dihapus");
      setDeleteTarget(null);
    } catch {
      toastError("Gagal menghapus testimoni");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.message.trim()) {
      toastError("Nama dan isi pesan testimoni wajib diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setTestimonials((prev) => [data.testimonial, ...prev]);
      toastSuccess("Testimoni baru berhasil ditambahkan!");
      setIsModalOpen(false);
      setFormData({ customerName: "", rating: 5, eventType: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menambahkan testimoni";
      toastError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-paris-warm-600">
          Total {testimonials.length} ulasan klien
        </p>

        <Button onClick={() => setIsModalOpen(true)} size="md" className="gap-1.5">
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-3xl border border-paris-warm-200/80 shadow-soft flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-paris-warm-300"
                      }`}
                    />
                  ))}
                </div>
                {t.status === "PUBLISHED" ? (
                  <Badge variant="success" size="sm">Tayang</Badge>
                ) : (
                  <Badge variant="neutral" size="sm">Disembunyikan</Badge>
                )}
              </div>

              <p className="text-sm text-paris-dark-800 italic leading-relaxed">
                "{t.message}"
              </p>
            </div>

            <div className="pt-4 border-t border-paris-warm-100 flex items-center justify-between">
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

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleStatus(t)}
                  className="p-1.5 rounded-lg text-paris-warm-600 hover:text-paris-dark-900 hover:bg-paris-warm-100 transition-colors"
                  title="Ubah visibilitas"
                >
                  {t.status === "PUBLISHED" ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4 text-emerald-600" />
                  )}
                </button>
                <button
                  onClick={() => setDeleteTarget(t)}
                  className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                  title="Hapus testimoni"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-paris-warm-200/80 text-sm text-paris-warm-500">
          Belum ada testimoni tersimpan.
        </div>
      )}

      {/* Modal Add Testimonial */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Testimoni Pelanggan"
        maxWidth="md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Nama Klien / Pelanggan"
            required
            placeholder="Contoh: dr. Amanda & Farhan"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          />

          <Input
            label="Jenis Acara (Opsional)"
            placeholder="Contoh: Pernikahan Gedung, Lamaran Rumah"
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
          />

          <Select
            label="Rating Bintang"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang - Sempurna)</option>
            <option value={4}>⭐⭐⭐⭐ (4 Bintang - Sangat Puas)</option>
            <option value={3}>⭐⭐⭐ (3 Bintang - Cukup)</option>
          </Select>

          <Textarea
            label="Isi Testimoni / Review"
            required
            rows={4}
            placeholder="Tuliskan pengalaman positif klien terhadap layanan dekorasi Paris Decoration..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Simpan Testimoni
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Delete Testimonial */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Testimoni?"
        maxWidth="md"
      >
        {deleteTarget && (
          <div className="space-y-6">
            <p className="text-sm text-paris-dark-700">
              Apakah Anda yakin ingin menghapus testimoni dari <strong>"{deleteTarget.customerName}"</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setDeleteTarget(null)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button variant="danger" onClick={handleDelete} isLoading={isSubmitting}>
                Hapus
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
