"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryItemRecord, CategoryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { ImageUploader, ImageUploadValue } from "@/components/admin/ImageUploader";
import { useToast } from "@/components/ui/toast";
import { Plus, Eye, EyeOff, Trash2, Tag, UploadCloud } from "lucide-react";

export const AdminGalleryClient: React.FC<{
  initialGalleries: GalleryItemRecord[];
  categories: CategoryItem[];
}> = ({ initialGalleries, categories }) => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [galleries, setGalleries] = useState<GalleryItemRecord[]>(initialGalleries);
  const [selectedCat, setSelectedCat] = useState("all");

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItemRecord | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    categoryId: string;
    driveUrl: string;
    driveFileId?: string;
  }>({
    title: "",
    description: "",
    categoryId: categories[0]?.id || "",
    driveUrl: "",
    driveFileId: undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered =
    selectedCat === "all"
      ? galleries
      : galleries.filter((g) => g.categoryId === selectedCat);

  const handleToggleStatus = async (item: GalleryItemRecord) => {
    try {
      const res = await fetch(`/api/admin/galleries/${item.id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setGalleries((prev) =>
        prev.map((g) => (g.id === item.id ? data.gallery : g))
      );
      toastSuccess(`Status foto "${item.title}" diperbarui!`);
    } catch {
      toastError("Gagal mengubah status foto");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/galleries/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setGalleries((prev) => prev.filter((g) => g.id !== deleteTarget.id));
      toastSuccess("Foto galeri berhasil dihapus!");
      setDeleteTarget(null);
    } catch {
      toastError("Gagal menghapus foto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUploaded = (val: ImageUploadValue) => {
    setFormData((prev) => ({
      ...prev,
      driveUrl: val.driveUrl,
      driveFileId: val.driveFileId,
      title: prev.title || val.fileName.replace(/\.[^/.]+$/, ""),
    }));
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.driveUrl) {
      toastError("Harap lengkapi judul dan unggah foto terlebih dahulu");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/galleries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setGalleries((prev) => [data.gallery, ...prev]);
      toastSuccess("Foto berhasil ditambahkan ke galeri publik!");
      setIsUploadModalOpen(false);
      setFormData({
        title: "",
        description: "",
        categoryId: categories[0]?.id || "",
        driveUrl: "",
        driveFileId: undefined,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menambahkan foto";
      toastError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-4 py-2 rounded-2xl bg-white border border-paris-warm-200 text-sm focus:outline-none focus:ring-2 focus:ring-paris-gold-400"
          >
            <option value="all">Semua Kategori ({galleries.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={() => setIsUploadModalOpen(true)} size="md" className="gap-1.5">
          <UploadCloud className="w-4 h-4" />
          <span>Upload Foto Baru</span>
        </Button>
      </div>

      {/* Grid of gallery photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-paris-warm-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-paris-warm-100">
              <Image
                src={item.driveUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-3 left-3">
                {item.status === "PUBLISHED" ? (
                  <Badge variant="success" size="sm">Tayang</Badge>
                ) : (
                  <Badge variant="neutral" size="sm">Disembunyikan</Badge>
                )}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                {item.category && (
                  <span className="text-[10px] uppercase font-bold text-paris-gold-700 tracking-wider flex items-center gap-1 mb-1">
                    <Tag className="w-3 h-3" />
                    {item.category.name}
                  </span>
                )}
                <h4 className="font-serif font-bold text-base text-paris-dark-900 line-clamp-1">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-paris-warm-600 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-paris-warm-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleStatus(item)}
                  className="flex items-center gap-1.5 text-xs text-paris-dark-700 hover:text-paris-gold-700 font-semibold py-1 px-2 rounded-lg hover:bg-paris-warm-50 transition-colors"
                  title="Ubah visibilitas"
                >
                  {item.status === "PUBLISHED" ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-paris-warm-500" />
                      <span>Sembunyikan</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Publikasikan</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                  title="Hapus Foto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-paris-warm-200/80 text-sm text-paris-warm-500">
          Belum ada foto dalam galeri untuk kategori ini.
        </div>
      )}

      {/* Upload Modal (Google Apps Script -> Drive) */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Foto ke Google Drive & Galeri"
        description="Pilih foto untuk langsung disimpan ke Google Drive dan dipublikasikan di galeri."
        maxWidth="lg"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <ImageUploader
            value={formData.driveUrl}
            onChange={handleImageUploaded}
            label="Pilih Foto Dekorasi"
          />

          <Input
            label="Judul Foto"
            required
            placeholder="Contoh: Modern Champagne Wedding - Graha Adi"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Select
            label="Kategori Foto"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Textarea
            label="Deskripsi / Catatan Venue (Opsional)"
            rows={2}
            placeholder="Contoh: Pelaminan 6 meter dengan sentuhan warm lighting..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsUploadModalOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={!formData.driveUrl}
              isLoading={isSubmitting}
            >
              <span>Simpan ke Galeri</span>
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Foto Galeri?"
        maxWidth="md"
      >
        {deleteTarget && (
          <div className="space-y-6">
            <p className="text-sm text-paris-dark-700">
              Apakah Anda yakin ingin menghapus foto <strong>"{deleteTarget.title}"</strong> dari galeri?
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
                Hapus Foto
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
