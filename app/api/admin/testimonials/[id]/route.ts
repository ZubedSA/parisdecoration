import { NextResponse } from "next/server";
import { updateTestimonialStatus, deleteTestimonial } from "@/lib/db";
import { getSession } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const { status } = await req.json();
    const updated = await updateTestimonialStatus(id, status);
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (err: unknown) {
    console.error("Error updating testimonial:", err);
    return NextResponse.json({ success: false, error: "Gagal memperbarui testimoni" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await deleteTestimonial(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error deleting testimonial:", err);
    return NextResponse.json({ success: false, error: "Gagal menghapus testimoni" }, { status: 500 });
  }
}
