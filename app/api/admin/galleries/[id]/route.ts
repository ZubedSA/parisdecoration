import { NextResponse } from "next/server";
import { deleteGallery, toggleGalleryStatus } from "@/lib/db";
import { getSession } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const updated = await toggleGalleryStatus(id);
    return NextResponse.json({ success: true, gallery: updated });
  } catch (err: unknown) {
    console.error("Error updating gallery:", err);
    return NextResponse.json({ success: false, error: "Gagal memperbarui status galeri" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await deleteGallery(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error deleting gallery:", err);
    return NextResponse.json({ success: false, error: "Gagal menghapus foto galeri" }, { status: 500 });
  }
}
