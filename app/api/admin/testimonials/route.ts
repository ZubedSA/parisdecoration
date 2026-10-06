import { NextResponse } from "next/server";
import { getTestimonials, createTestimonial } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const testimonials = await getTestimonials({ status: "ALL" });
  return NextResponse.json({ success: true, testimonials });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { customerName, rating, message, eventType, image, status } = await req.json();

    if (!customerName || !message) {
      return NextResponse.json(
        { success: false, error: "Nama pelanggan dan isi testimoni wajib diisi" },
        { status: 400 }
      );
    }

    const item = await createTestimonial({
      customerName,
      rating: Number(rating) || 5,
      message,
      eventType,
      image,
      status: status || "PUBLISHED",
    });

    return NextResponse.json({ success: true, testimonial: item });
  } catch (err: unknown) {
    console.error("Error creating testimonial:", err);
    return NextResponse.json(
      { success: false, error: "Gagal membuat testimoni" },
      { status: 500 }
    );
  }
}
