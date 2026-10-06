import { NextResponse } from "next/server";
import { getServiceById, updateService, deleteService, toggleServiceStatus } from "@/lib/db";
import { getSession } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, service });
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();

    if (body.action === "toggle-status") {
      const updated = await toggleServiceStatus(id);
      return NextResponse.json({ success: true, service: updated });
    }

    const updated = await updateService(id, {
      ...body,
      price: body.price !== undefined ? Number(body.price) : undefined,
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (err: unknown) {
    console.error("Error updating service:", err);
    return NextResponse.json({ success: false, error: "Gagal memperbarui layanan" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await deleteService(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error deleting service:", err);
    return NextResponse.json({ success: false, error: "Gagal menghapus layanan" }, { status: 500 });
  }
}
