import { NextResponse } from "next/server";
import { createOrder, getServiceById } from "@/lib/db";
import { generateOrderCode } from "@/lib/utils";
import { z } from "zod";

const orderSchema = z.object({
  customerName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  phone: z.string().min(8, "Nomor WhatsApp tidak valid"),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  serviceId: z.string().min(1, "Harap pilih layanan dekorasi"),
  eventDate: z.string().refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, "Tanggal acara tidak boleh tanggal yang sudah lewat"),
  eventLocation: z.string().min(3, "Lokasi acara wajib diisi"),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = orderSchema.safeParse(body);

    if (!validated.success) {
      const issues = validated.error.issues;
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validasi gagal" },
        { status: 400 }
      );
    }

    const { customerName, phone, email, serviceId, eventDate, eventLocation, notes } =
      validated.data;

    const service = await getServiceById(serviceId);
    if (!service) {
      return NextResponse.json(
        { success: false, error: "Layanan yang dipilih tidak ditemukan" },
        { status: 404 }
      );
    }

    const orderCode = generateOrderCode();

    const order = await createOrder({
      orderCode,
      customerName,
      phone,
      email: email || undefined,
      serviceId,
      eventDate: new Date(eventDate).toISOString(),
      eventLocation,
      notes: notes || undefined,
    });

    return NextResponse.json({
      success: true,
      orderCode: order.orderCode,
      order,
    });
  } catch (err: unknown) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { success: false, error: "Gagal membuat pesanan. Silakan coba kembali." },
      { status: 500 }
    );
  }
}
