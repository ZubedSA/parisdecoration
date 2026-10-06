import React from "react";
import { getOrders } from "@/lib/db";
import { AdminOrdersClient } from "@/components/admin/AdminOrdersClient";

export const revalidate = 0;

export default async function AdminPesananListPage() {
  const orders = await getOrders({ status: "ALL" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900">
          Daftar Pesanan Masuk
        </h1>
        <p className="text-xs sm:text-sm text-paris-warm-600 mt-1">
          Pantau dan kelola jadwal dekorasi, periksa ketersediaan tanggal, dan ubah status pesanan.
        </p>
      </div>

      <AdminOrdersClient initialOrders={orders} />
    </div>
  );
}
