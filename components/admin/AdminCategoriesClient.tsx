"use client";

import React, { useState } from "react";
import { CategoryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { Plus, Edit, Trash2, FolderTree, Layers } from "lucide-react";

export const AdminCategoriesClient: React.FC<{
  initialCategories: CategoryItem[];
}> = ({ initialCategories }) => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CategoryItem | null>(null);

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description || "" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toastError("Nama kategori wajib diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? data.category : c))
        );
        toastSuccess("Kategori berhasil diperbarui!");
      } else {
        setCategories((prev) => [...prev, data.category]);
        toastSuccess("Kategori baru berhasil ditambahkan!");
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      toastError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      toastSuccess("Kategori berhasil dihapus");
      setDeleteTarget(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus kategori";
      toastError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-paris-warm-600">
          Total {categories.length} kategori layanan aktif
        </p>

        <Button onClick={openAddModal} className="gap-1.5" size="md">
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori</span>
        </Button>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const serviceCount = cat._count?.services || 0;
          return (
            <div
              key={cat.id}
              className="bg-white p-6 rounded-3xl border border-paris-warm-200/80 shadow-soft hover:shadow-card transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-paris-gold-50 text-paris-gold-600 flex items-center justify-center">
                    <FolderTree className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-paris-dark-700 bg-paris-warm-100 px-2.5 py-0.5 rounded-full">
                    <Layers className="w-3 h-3 text-paris-gold-600" />
                    {serviceCount} Layanan
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-paris-dark-900">
                  {cat.name}
                </h3>
                <p className="text-xs text-paris-warm-500 font-mono">slug: {cat.slug}</p>
                {cat.description && (
                  <p className="text-xs text-paris-warm-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-paris-warm-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(cat)}
                  className="p-2 rounded-xl text-paris-warm-600 hover:text-paris-gold-700 hover:bg-paris-warm-100 transition-colors"
                  title="Edit Kategori"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(cat)}
                  className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                  title="Hapus Kategori"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Kategori"
            required
            placeholder="Contoh: Wedding, Engagement, Birthday..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Textarea
            label="Deskripsi Kategori (Opsional)"
            placeholder="Jelaskan jenis acara yang termasuk dalam kategori ini..."
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              <span>{editingCategory ? "Simpan Perubahan" : "Tambah Kategori"}</span>
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Kategori?"
        description="Periksa apakah masih ada layanan yang terhubung dengan kategori ini."
        maxWidth="md"
      >
        {deleteTarget && (
          <div className="space-y-6">
            <p className="text-sm text-paris-dark-700">
              Apakah Anda yakin ingin menghapus kategori <strong>"{deleteTarget.name}"</strong>?
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
                Hapus Kategori
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
