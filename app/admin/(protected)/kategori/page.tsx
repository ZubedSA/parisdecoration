import React from "react";
import { getCategories } from "@/lib/db";
import { AdminCategoriesClient } from "@/components/admin/AdminCategoriesClient";

export const revalidate = 0;

export default async function AdminKategoriPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900">
          Kategori Layanan
        </h1>
        <p className="text-xs sm:text-sm text-paris-warm-600 mt-1">
          Kelola kelompok kategori untuk paket dekorasi dan filter portofolio galeri.
        </p>
      </div>

      <AdminCategoriesClient initialCategories={categories} />
    </div>
  );
}
