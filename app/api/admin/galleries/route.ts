import { NextResponse } from "next/server";
import { getGalleries, createGallery } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const categoryId = url.searchParams.get("categoryId") || undefined;
  const galleries = await getGalleries({ status: "ALL", categoryId });

  return NextResponse.json({ success: true, galleries });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, description, categoryId, driveUrl, driveFileId, status } = await req.json();

    if (!title || !driveUrl) {
      return NextResponse.json(
        { success: false, error: "Judul foto dan file gambar wajib diunggah" },
        { status: 400 }
      );
    }

    const item = await createGallery({
      title,
      description,
      categoryId,
      driveUrl,
      driveFileId,
      status: status || "PUBLISHED",
    });

    return NextResponse.json({ success: true, gallery: item });
  } catch (err: unknown) {
    console.error("Error creating gallery:", err);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan foto galeri" },
      { status: 500 }
    );
  }
}
