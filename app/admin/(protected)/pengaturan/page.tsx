import React from "react";
import { getSiteSettings } from "@/lib/db";
import { AdminSettingsClient } from "@/components/admin/AdminSettingsClient";

export const revalidate = 0;

export default async function AdminPengaturanPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900">
          Pengaturan Website
        </h1>
        <p className="text-xs sm:text-sm text-paris-warm-600 mt-1">
          Kelola informasi nama bisnis, nomor WhatsApp, media sosial, banner hero, dan footer.
        </p>
      </div>

      <AdminSettingsClient initialSettings={settings} />
    </div>
  );
}
