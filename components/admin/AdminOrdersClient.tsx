"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { OrderItemRecord, OrderStatus } from "@/types";
import { formatRupiah, formatIndonesianDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import {
  Search,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const AdminOrdersClient: React.FC<{
  initialOrders: OrderItemRecord[];
}> = ({ initialOrders }) => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [orders, setOrders] = useState<OrderItemRecord[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "ALL" && o.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !o.orderCode.toLowerCase().includes(q) &&
          !o.customerName.toLowerCase().includes(q) &&
          !o.phone.includes(q) &&
          !o.eventLocation.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [orders, search, statusFilter]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? data.order : o))
      );
      toastSuccess(`Status pesanan berhasil diubah menjadi ${newStatus}`);
    } catch {
      toastError("Gagal memperbarui status pesanan");
    }
  };

  const getBadge = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="warning">PENDING</Badge>;
      case "CONFIRMED":
        return <Badge variant="info">CONFIRMED</Badge>;
      case "PROCESSING":
        return <Badge variant="gold">PROCESSING</Badge>;
      case "COMPLETED":
        return <Badge variant="success">COMPLETED</Badge>;
      case "CANCELLED":
        return <Badge variant="danger">CANCELLED</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-paris-warm-500" />
          <input
            type="text"
            placeholder="Cari kode order, nama pelanggan, kota, nomor WA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-paris-warm-200 text-sm focus:outline-none focus:ring-2 focus:ring-paris-gold-400"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {["ALL", "PENDING", "CONFIRMED", "PROCESSING", "COMPLETED", "CANCELLED"].map(
            (st) => {
              const count =
                st === "ALL"
                  ? orders.length
                  : orders.filter((o) => o.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    statusFilter === st
                      ? "bg-paris-gold-500 text-white shadow-gold"
                      : "bg-white text-paris-dark-700 hover:bg-paris-warm-100 border border-paris-warm-200"
                  }`}
                >
                  {st === "ALL" ? "Semua" : st} ({count})
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-3xl border border-paris-warm-200/80 shadow-soft overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-paris-warm-50/70 border-b border-paris-warm-200 text-xs uppercase tracking-wider text-paris-dark-700">
              <th className="py-4 px-6 font-semibold">Kode & Tanggal</th>
              <th className="py-4 px-4 font-semibold">Pelanggan</th>
              <th className="py-4 px-4 font-semibold">Layanan & Lokasi</th>
              <th className="py-4 px-4 font-semibold">Total Biaya</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-paris-warm-100 text-sm">
            {filtered.map((ord) => {
              const cleanWa = ord.phone.replace(/[^0-9]/g, "");
              return (
                <tr key={ord.id} className="hover:bg-paris-warm-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-paris-dark-900 block">
                      {ord.orderCode}
                    </span>
                    <span className="text-xs text-paris-warm-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {formatIndonesianDate(ord.eventDate)}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-semibold text-paris-dark-900 block">
                      {ord.customerName}
                    </span>
                    <a
                      href={`https://wa.me/${cleanWa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-700 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <MessageSquare className="w-3 h-3" />
                      {ord.phone}
                    </a>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-medium text-paris-dark-800 block truncate max-w-xs">
                      {ord.items[0]?.serviceName || "Layanan Custom"}
                    </span>
                    <span className="text-xs text-paris-warm-500 flex items-center gap-1 mt-0.5 truncate max-w-xs">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {ord.eventLocation}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-bold text-paris-gold-700">
                    {formatRupiah(ord.totalPrice)}
                  </td>

                  <td className="py-4 px-4">
                    <select
                      value={ord.status}
                      onChange={(e) =>
                        handleStatusChange(ord.id, e.target.value as OrderStatus)
                      }
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-paris-warm-200 bg-paris-warm-50 cursor-pointer focus:outline-none focus:ring-1 focus:ring-paris-gold-500"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/pesanan/${ord.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-paris-warm-100 hover:bg-paris-gold-500 hover:text-white text-xs font-semibold text-paris-dark-800 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Rincian</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filtered.map((ord) => {
          const cleanWa = ord.phone.replace(/[^0-9]/g, "");
          return (
            <div
              key={ord.id}
              className="bg-white p-5 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-paris-dark-900">
                  {ord.orderCode}
                </span>
                {getBadge(ord.status)}
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-paris-dark-900">
                  {ord.customerName}
                </h4>
                <p className="text-xs text-paris-gold-700 font-semibold mt-0.5">
                  {ord.items[0]?.serviceName}
                </p>
              </div>

              <div className="text-xs text-paris-warm-600 space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-paris-gold-600" />
                  <span>Tanggal Acara: {formatIndonesianDate(ord.eventDate)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-paris-gold-600" />
                  <span>Lokasi: {ord.eventLocation}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-paris-warm-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-paris-warm-500 block uppercase">
                    Total Biaya
                  </span>
                  <span className="font-bold text-sm text-paris-gold-700">
                    {formatRupiah(ord.totalPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${cleanWa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-700"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  <Link
                    href={`/admin/pesanan/${ord.id}`}
                    className="px-3 py-2 rounded-xl bg-paris-warm-100 text-xs font-semibold text-paris-dark-900"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-paris-warm-200/80 text-sm text-paris-warm-500">
          Belum ada pesanan dalam status ini.
        </div>
      )}
    </div>
  );
};
