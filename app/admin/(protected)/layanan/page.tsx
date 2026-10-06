import React from "react";
import { getServices, getCategories } from "@/lib/db";
import { AdminServicesClient } from "@/components/admin/AdminServicesClient";

export const revalidate = 0;

export default async function AdminLayananListPage() {
  const [services, categories] = await Promise.all([
    getServices({ status: "ALL" }),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900">
          Kelola Layanan Dekorasi
        </h1>
        <p className="text-xs sm:text-sm text-paris-warm-600 mt-1">
          Tambah paket baru, ubah rincian fasilitas, foto, harga, dan atur status tayang.
        </p>
      </div>

      <AdminServicesClient initialServices={services} categories={categories} />
    </div>
  );
}
