import { NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/db";
import { getSession } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  return NextResponse.json({ success: true, order });
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const updated = await updateOrderStatus(id, status);
    return NextResponse.json({ success: true, order: updated });
  } catch (err: unknown) {
    console.error("Error updating order status:", err);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui status pesanan" },
      { status: 500 }
    );
  }
}
