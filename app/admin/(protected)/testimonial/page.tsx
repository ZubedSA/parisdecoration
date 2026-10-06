import React from "react";
import { getTestimonials } from "@/lib/db";
import { AdminTestimonialsClient } from "@/components/admin/AdminTestimonialsClient";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials({ status: "ALL" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900">
          Ulasan & Testimoni Pelanggan
        </h1>
        <p className="text-xs sm:text-sm text-paris-warm-600 mt-1">
          Kelola kepuasan pelanggan yang ditampilkan pada halaman utama website.
        </p>
      </div>

      <AdminTestimonialsClient initialTestimonials={testimonials} />
    </div>
  );
}
