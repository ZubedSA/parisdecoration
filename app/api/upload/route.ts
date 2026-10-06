import { NextResponse } from "next/server";
import { uploadImageToStorage } from "@/lib/google-drive";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Only authenticated admin can upload
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak: Silakan login terlebih dahulu" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File gambar tidak ditemukan dalam formulir" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageToStorage(buffer, file.name, file.type);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      fileId: result.fileId,
      fileName: result.fileName,
      url: result.url,
    });
  } catch (err: unknown) {
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal memproses unggahan gambar" },
      { status: 500 }
    );
  }
}
