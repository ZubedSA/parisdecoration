import { NextResponse } from "next/server";
import { updateCategory, deleteCategory } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const { name, description } = await req.json();
    const updated = await updateCategory(id, {
      name,
      slug: name ? slugify(name) : undefined,
      description,
    });
    return NextResponse.json({ success: true, category: updated });
  } catch (err: unknown) {
    console.error("Error updating category:", err);
    return NextResponse.json({ success: false, error: "Gagal memperbarui kategori" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const res = await deleteCategory(id);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error deleting category:", err);
    return NextResponse.json({ success: false, error: "Gagal menghapus kategori" }, { status: 500 });
  }
}
