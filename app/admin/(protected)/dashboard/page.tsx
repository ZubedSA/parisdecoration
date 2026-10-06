import React from "react";
import Link from "next/link";
import { getDashboardMetrics } from "@/lib/db";
import { formatRupiah, formatIndonesianDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Eye,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="warning">Menunggu</Badge>;
      case "CONFIRMED":
        return <Badge variant="info">Dikonfirmasi</Badge>;
      case "PROCESSING":
        return <Badge variant="gold">Diproses</Badge>;
      case "COMPLETED":
        return <Badge variant="success">Selesai</Badge>;
      case "CANCELLED":
        return <Badge variant="danger">Dibatalkan</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900">
            Dashboard Utama
          </h1>
          <p className="text-xs sm:text-sm text-paris-warm-600 mt-1">
            Ringkasan operasional dan aktivitas pesanan Paris Decoration.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/layanan/tambah"
            className="px-4 py-2.5 rounded-full bg-paris-gold-500 hover:bg-paris-gold-600 text-white text-xs font-semibold shadow-gold transition-colors"
          >
            + Tambah Layanan
          </Link>
          <Link
            href="/admin/galeri"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-paris-warm-100 text-paris-dark-800 text-xs font-semibold border border-paris-warm-200 shadow-xs transition-colors"
          >
            Upload Galeri
          </Link>
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-paris-warm-500">
              Total Layanan
            </span>
            <div className="w-9 h-9 rounded-xl bg-paris-gold-50 text-paris-gold-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-paris-dark-900">
            {metrics.totalServices}
          </div>
          <p className="text-xs text-paris-warm-600">Paket dekorasi aktif</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-paris-warm-500">
              Total Pesanan
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-paris-dark-900">
            {metrics.totalOrders}
          </div>
          <p className="text-xs text-paris-warm-600">Semua pesanan masuk</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-paris-warm-500">
              Pesanan Pending
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-amber-600">
            {metrics.pendingOrders}
          </div>
          <p className="text-xs text-paris-warm-600">Perlu konfirmasi jadwal</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-paris-warm-500">
              Pesanan Selesai
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-700">
            {metrics.completedOrders}
          </div>
          <p className="text-xs text-paris-warm-600">Terselenggara sukses</p>
        </div>
      </div>

      {/* Grid: Recent Orders & Popular Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table/List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-paris-warm-200/80 shadow-soft overflow-hidden">
          <div className="p-6 border-b border-paris-warm-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-paris-dark-900">Pesanan Terbaru</h3>
              <p className="text-xs text-paris-warm-600">Aktivitas pemesanan klien terkini</p>
            </div>
            <Link
              href="/admin/pesanan"
              className="text-xs font-semibold text-paris-gold-700 hover:text-paris-gold-600 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-paris-warm-100 overflow-x-auto">
            {metrics.recentOrders.length > 0 ? (
              metrics.recentOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-paris-warm-50/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-paris-dark-900">
                        {ord.orderCode}
                      </span>
                      {getStatusBadge(ord.status)}
                    </div>
                    <p className="text-sm font-semibold text-paris-dark-800">
                      {ord.customerName}
                    </p>
                    <p className="text-xs text-paris-warm-600">
                      {ord.items[0]?.serviceName || "Layanan Custom"} •{" "}
                      {formatIndonesianDate(ord.eventDate)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <span className="text-xs text-paris-warm-500 block">Total Biaya</span>
                      <span className="text-sm font-bold text-paris-gold-700">
                        {formatRupiah(ord.totalPrice)}
                      </span>
                    </div>

                    <Link
                      href={`/admin/pesanan/${ord.id}`}
                      className="p-2 rounded-xl bg-paris-warm-100 hover:bg-paris-gold-500 hover:text-white text-paris-dark-700 transition-colors"
                      title="Lihat Detail Pesanan"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-paris-warm-500 text-sm">
                Belum ada pesanan terbaru.
              </div>
            )}
          </div>
        </div>

        {/* Popular Services & Revenue Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Revenue highlight */}
          <div className="bg-gradient-to-br from-paris-dark-900 to-paris-dark-800 text-white p-6 rounded-3xl border border-paris-dark-700 shadow-soft space-y-2">
            <div className="flex items-center gap-2 text-paris-gold-400 text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Total Estimasi Transaksi</span>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-paris-gold-400">
              {formatRupiah(metrics.totalRevenue)}
            </div>
            <p className="text-xs text-paris-warm-300">
              Dari pesanan berstatus Dikonfirmasi & Selesai
            </p>
          </div>

          {/* Popular Services */}
          <div className="bg-white p-6 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-bold text-paris-dark-900">Layanan Populer</h3>
            <div className="space-y-3">
              {metrics.popularServices.map((ps, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-paris-warm-50/70 text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-paris-dark-900 truncate">{ps.name}</p>
                    <p className="text-paris-warm-600 mt-0.5">{formatRupiah(ps.price)}</p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-paris-gold-100 text-paris-gold-800 font-bold">
                    {ps.orderCount} order
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
