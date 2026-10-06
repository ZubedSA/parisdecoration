import { NextResponse } from "next/server";
import { getServices, createService } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const search = url.searchParams.get("search") || undefined;
  const categorySlug = url.searchParams.get("category") || undefined;

  const services = await getServices({
    status: "ALL",
    search,
    categorySlug,
  });

  return NextResponse.json({ success: true, services });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, categoryId, description, price, facilities, status, images } = body;

    if (!name || !categoryId || !description || price === undefined) {
      return NextResponse.json(
        { success: false, error: "Nama, kategori, deskripsi, dan harga wajib diisi" },
        { status: 400 }
      );
    }

    const slug = slugify(name) + "-" + Math.floor(100 + Math.random() * 900);

    const service = await createService({
      name,
      slug,
      categoryId,
      description,
      price: Number(price),
      facilities,
      status: status || "ACTIVE",
      images: images || [],
    });

    return NextResponse.json({ success: true, service });
  } catch (err: unknown) {
    console.error("Error creating service:", err);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan layanan baru" },
      { status: 500 }
    );
  }
}
