import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await getSiteSettings();
  return NextResponse.json({ success: true, settings });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: unknown) {
    console.error("Error updating settings:", err);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui konfigurasi website" },
      { status: 500 }
    );
  }
}
