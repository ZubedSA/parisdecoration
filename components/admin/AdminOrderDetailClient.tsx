"use client";

import React, { useState } from "react";
import Link from "next/link";
import { OrderItemRecord, OrderStatus } from "@/types";
import { formatRupiah, formatIndonesianDate, formatIndonesianDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  ShoppingBag,
  FileText,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

export const AdminOrderDetailClient: React.FC<{ order: OrderItemRecord }> = ({
  order: initialOrder,
}) => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [order, setOrder] = useState<OrderItemRecord>(initialOrder);
  const [status, setStatus] = useState<OrderStatus>(initialOrder.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const cleanWa = order.phone.replace(/[^0-9]/g, "");

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setOrder(data.order);
      toastSuccess(`Status pesanan berhasil diperbarui menjadi ${status}!`);
    } catch {
      toastError("Gagal memperbarui status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getBadge = (st: OrderStatus) => {
    switch (st) {
      case "PENDING":
        return <Badge variant="warning">PENDING (Menunggu Verifikasi)</Badge>;
      case "CONFIRMED":
        return <Badge variant="info">CONFIRMED (Terkonfirmasi)</Badge>;
      case "PROCESSING":
        return <Badge variant="gold">PROCESSING (Dalam Pengerjaan)</Badge>;
      case "COMPLETED":
        return <Badge variant="success">COMPLETED (Selesai)</Badge>;
      case "CANCELLED":
        return <Badge variant="danger">CANCELLED (Dibatalkan)</Badge>;
      default:
        return <Badge variant="neutral">{st}</Badge>;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/pesanan"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-paris-warm-600 hover:text-paris-dark-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Pesanan</span>
        </Link>
      </div>

      {/* Header Info Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="font-mono text-2xl font-bold text-paris-dark-900">
              {order.orderCode}
            </h2>
            {getBadge(order.status)}
          </div>
          <p className="text-xs text-paris-warm-600">
            Dibuat pada: {formatIndonesianDateTime(order.createdAt)}
          </p>
        </div>

        {/* Quick status updater controls */}
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="px-4 py-2.5 rounded-2xl border border-paris-warm-200 bg-paris-warm-50/70 text-xs font-semibold text-paris-dark-900 focus:outline-none focus:ring-2 focus:ring-paris-gold-400"
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <Button
            onClick={handleUpdateStatus}
            isLoading={isUpdating}
            size="md"
            disabled={status === order.status}
          >
            Update Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-4">
          <h3 className="font-serif text-lg font-bold text-paris-dark-900 flex items-center gap-2 pb-3 border-b border-paris-warm-100">
            <User className="w-4 h-4 text-paris-gold-600" />
            <span>Informasi Pelanggan</span>
          </h3>

          <div className="space-y-3.5 text-sm">
            <div>
              <span className="text-xs text-paris-warm-500 block uppercase">Nama Lengkap</span>
              <p className="font-semibold text-paris-dark-900 text-base mt-0.5">
                {order.customerName}
              </p>
            </div>

            <div>
              <span className="text-xs text-paris-warm-500 block uppercase">Nomor WhatsApp</span>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="font-mono font-medium text-paris-dark-900">{order.phone}</span>
                <a
                  href={`https://wa.me/${cleanWa}?text=Halo%20${encodeURIComponent(
                    order.customerName
                  )},%20kami%20dari%20Paris%20Decoration%20mengenai%20pesanan%20${order.orderCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>

            {order.email && (
              <div>
                <span className="text-xs text-paris-warm-500 block uppercase">Email</span>
                <p className="text-paris-dark-800 mt-0.5">{order.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Event Schedule & Location */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-4">
          <h3 className="font-serif text-lg font-bold text-paris-dark-900 flex items-center gap-2 pb-3 border-b border-paris-warm-100">
            <Calendar className="w-4 h-4 text-paris-gold-600" />
            <span>Waktu & Lokasi Acara</span>
          </h3>

          <div className="space-y-3.5 text-sm">
            <div>
              <span className="text-xs text-paris-warm-500 block uppercase">Tanggal Pelaksanaan</span>
              <p className="font-bold text-paris-dark-900 text-base mt-0.5">
                {formatIndonesianDate(order.eventDate)}
              </p>
            </div>

            <div>
              <span className="text-xs text-paris-warm-500 block uppercase">Lokasi Acara</span>
              <p className="font-medium text-paris-dark-800 mt-0.5 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-paris-gold-600 shrink-0 mt-0.5" />
                <span>{order.eventLocation}</span>
              </p>
            </div>

            {order.notes && (
              <div>
                <span className="text-xs text-paris-warm-500 block uppercase">Catatan Klien</span>
                <p className="text-paris-dark-700 italic bg-paris-warm-50/80 p-3 rounded-xl border border-paris-warm-200 mt-1 text-xs leading-relaxed">
                  "{order.notes}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ordered Services Item Table */}
      <div className="bg-white rounded-3xl border border-paris-warm-200/80 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-paris-warm-100">
          <h3 className="font-serif text-lg font-bold text-paris-dark-900 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-paris-gold-600" />
            <span>Rincian Layanan yang Dipesan</span>
          </h3>
        </div>

        <div className="p-6 divide-y divide-paris-warm-100">
          {order.items.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-paris-dark-900">
                  {item.serviceName}
                </h4>
                <p className="text-xs text-paris-warm-500">
                  Jumlah: {item.quantity} paket
                </p>
              </div>
              <div className="text-right">
                <span className="font-serif text-lg font-bold text-paris-gold-700">
                  {formatRupiah(item.subtotal)}
                </span>
              </div>
            </div>
          ))}

          <div className="pt-6 flex justify-between items-center text-base">
            <span className="font-bold text-paris-dark-900">Total Keseluruhan</span>
            <span className="font-serif text-2xl font-bold text-paris-gold-700">
              {formatRupiah(order.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
