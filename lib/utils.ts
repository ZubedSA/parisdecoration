import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number to Indonesian Rupiah currency format (e.g. Rp 5.000.000)
 */
export function formatRupiah(amount: number | string | bigint | null | undefined): string {
  if (amount === null || amount === undefined) return "Rp 0";
  const num = typeof amount === "string" ? parseFloat(amount) : Number(amount);
  if (isNaN(num)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format Date to Indonesian locale readable format (e.g. 20 Oktober 2026)
 */
export function formatIndonesianDate(dateInput: Date | string | number | null | undefined): string {
  if (!dateInput) return "-";
  const date = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

/**
 * Format Date and Time to Indonesian locale (e.g. 20 Oktober 2026, 14:30 WIB)
 */
export function formatIndonesianDateTime(dateInput: Date | string | number | null | undefined): string {
  if (!dateInput) return "-";
  const date = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "-";
  const dateStr = formatIndonesianDate(date);
  const timeStr = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(date);
  return `${dateStr}, ${timeStr} WIB`;
}

/**
 * Generates an order code in format: PD-YYYYMMDD-XXXX (e.g. PD-20261006-4819)
 */
export function generateOrderCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PD-${year}${month}${day}-${randomSuffix}`;
}

/**
 * Generates URL safe slug from text
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Builds direct WhatsApp URL with prefilled message
 */
export function buildWhatsAppLink(
  phoneNumber: string,
  data: {
    orderCode: string;
    customerName: string;
    serviceName: string;
    eventDate: string;
    eventLocation: string;
  }
): string {
  let cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.substring(1);
  }

  const message = `Halo Paris Decoration,

Saya ingin konfirmasi pemesanan saya.

Kode Pesanan: ${data.orderCode}
Nama: ${data.customerName}
Layanan: ${data.serviceName}
Tanggal Acara: ${data.eventDate}
Lokasi: ${data.eventLocation}

Mohon informasi ketersediaan tanggal dan proses berikutnya. Terima kasih!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
