import React from "react";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/db";
import { AdminOrderDetailClient } from "@/components/admin/AdminOrderDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function AdminPesananDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminOrderDetailClient order={order} />
    </div>
  );
}
