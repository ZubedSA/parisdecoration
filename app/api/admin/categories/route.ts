import { NextResponse } from "next/server";
import { getCategories, createCategory } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const categories = await getCategories();
  return NextResponse.json({ success: true, categories });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, description } = await req.json();
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Nama kategori wajib diisi" },
        { status: 400 }
      );
    }

    const slug = slugify(name);
    const category = await createCategory({
      name,
      slug,
      description,
    });

    return NextResponse.json({ success: true, category });
  } catch (err: unknown) {
    console.error("Error creating category:", err);
    return NextResponse.json(
      { success: false, error: "Gagal membuat kategori" },
      { status: 500 }
    );
  }
}
