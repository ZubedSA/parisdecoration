"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem, CategoryItem } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Power,
  ExternalLink,
  Tag,
} from "lucide-react";

export const AdminServicesClient: React.FC<{
  initialServices: ServiceItem[];
  categories: CategoryItem[];
}> = ({ initialServices, categories }) => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (selectedCat !== "all" && s.categoryId !== selectedCat) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  }, [services, search, selectedCat]);

  const handleToggleStatus = async (service: ServiceItem) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle-status" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? data.service : s))
      );
      toastSuccess(`Status layanan "${service.name}" berhasil diubah!`);
    } catch {
      toastError("Gagal mengubah status layanan");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/services/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      toastSuccess("Layanan berhasil dihapus");
      setDeleteTarget(null);
    } catch {
      toastError("Gagal menghapus layanan");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-paris-warm-500" />
            <input
              type="text"
              placeholder="Cari nama atau deskripsi layanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-paris-warm-200 text-sm focus:outline-none focus:ring-2 focus:ring-paris-gold-400"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-4 py-2 rounded-2xl bg-white border border-paris-warm-200 text-sm focus:outline-none focus:ring-2 focus:ring-paris-gold-400"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/admin/layanan/tambah"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-paris-gold-500 hover:bg-paris-gold-600 text-white text-xs sm:text-sm font-semibold shadow-gold transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan Baru</span>
        </Link>
      </div>

      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden md:block bg-white rounded-3xl border border-paris-warm-200/80 shadow-soft overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-paris-warm-50/70 border-b border-paris-warm-200 text-xs uppercase tracking-wider text-paris-dark-700">
              <th className="py-4 px-6 font-semibold">Layanan & Foto</th>
              <th className="py-4 px-4 font-semibold">Kategori</th>
              <th className="py-4 px-4 font-semibold">Harga</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-paris-warm-100 text-sm">
            {filtered.map((s) => {
              const primaryImg = s.images[0]?.driveUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80";
              return (
                <tr key={s.id} className="hover:bg-paris-warm-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-14 h-12 rounded-xl overflow-hidden bg-paris-warm-100 shrink-0 border border-paris-warm-200">
                        <Image src={primaryImg} alt={s.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <span className="font-semibold text-paris-dark-900 block truncate">{s.name}</span>
                        <span className="text-xs text-paris-warm-600 truncate block">{s.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-paris-warm-100 text-paris-dark-800 font-medium">
                      <Tag className="w-3 h-3 text-paris-gold-600" />
                      {s.category?.name || "Umum"}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-paris-gold-700">
                    {formatRupiah(s.price)}
                  </td>
                  <td className="py-4 px-4">
                    {s.status === "ACTIVE" ? (
                      <Badge variant="success">Aktif</Badge>
                    ) : (
                      <Badge variant="neutral">Nonaktif</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleToggleStatus(s)}
                        className={`p-2 rounded-xl transition-colors ${
                          s.status === "ACTIVE"
                            ? "text-emerald-700 hover:bg-emerald-50"
                            : "text-paris-warm-500 hover:bg-paris-warm-100"
                        }`}
                        title={s.status === "ACTIVE" ? "Nonaktifkan Layanan" : "Aktifkan Layanan"}
                      >
                        <Power className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/layanan/${s.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl text-paris-warm-600 hover:text-paris-dark-900 hover:bg-paris-warm-100 transition-colors"
                        title="Lihat di Web Publik"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/layanan/${s.id}`}
                        className="p-2 rounded-xl text-paris-warm-600 hover:text-paris-gold-700 hover:bg-paris-warm-100 transition-colors"
                        title="Edit Layanan"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => setDeleteTarget(s)}
                        className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        title="Hapus Layanan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Section 39 & Section 50: Table changes to card on mobile) */}
      <div className="md:hidden space-y-4">
        {filtered.map((s) => {
          const primaryImg = s.images[0]?.driveUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80";
          return (
            <div
              key={s.id}
              className="bg-white p-5 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-paris-warm-100 shrink-0 border border-paris-warm-200">
                  <Image src={primaryImg} alt={s.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase text-paris-warm-500">
                      {s.category?.name}
                    </span>
                    {s.status === "ACTIVE" ? (
                      <Badge size="sm" variant="success">Aktif</Badge>
                    ) : (
                      <Badge size="sm" variant="neutral">Nonaktif</Badge>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-base text-paris-dark-900 truncate mt-0.5">
                    {s.name}
                  </h4>
                  <p className="text-sm font-bold text-paris-gold-700 mt-1">
                    {formatRupiah(s.price)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-paris-warm-100 text-xs">
                <button
                  onClick={() => handleToggleStatus(s)}
                  className="flex items-center gap-1.5 text-paris-dark-700 font-medium py-1.5 px-2 rounded-lg hover:bg-paris-warm-100"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{s.status === "ACTIVE" ? "Matikan" : "Aktifkan"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/layanan/${s.id}`}
                    className="p-2 rounded-xl bg-paris-warm-100 text-paris-dark-800 font-semibold"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(s)}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600 font-semibold"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-paris-warm-200/80 text-sm text-paris-warm-500">
          Tidak ada layanan yang sesuai dengan pencarian.
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Layanan Dekorasi?"
        description="Tindakan ini tidak dapat dibatalkan. Layanan akan dihapus dari katalog."
        maxWidth="md"
      >
        {deleteTarget && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              Apakah Anda yakin ingin menghapus <strong>"{deleteTarget.name}"</strong>?
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                Batal
              </Button>
              <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
                Ya, Hapus Layanan
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
