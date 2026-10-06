"use client";

import React, { useState } from "react";
import { SiteSettingsData } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useToast } from "@/components/ui/toast";
import { Save, LayoutTemplate, Phone, Globe, Image as ImageIcon } from "lucide-react";

export const AdminSettingsClient: React.FC<{
  initialSettings: SiteSettingsData;
}> = ({ initialSettings }) => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [settings, setSettings] = useState<SiteSettingsData>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setSettings(data.settings);
      toastSuccess("Pengaturan website berhasil disimpan!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan pengaturan";
      toastError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* 1. General Profile */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-paris-warm-100">
          <Globe className="w-5 h-5 text-paris-gold-600" />
          <h2 className="font-serif text-xl font-bold text-paris-dark-900">
            Identitas Website & Brand
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Nama Bisnis / Brand"
            required
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
          />

          <Input
            label="Tagline / Slogan"
            value={settings.tagline || ""}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            placeholder="Contoh: Create Beautiful Moments"
          />

          <div className="sm:col-span-2">
            <Textarea
              label="Deskripsi Singkat Paris Decoration"
              rows={3}
              value={settings.description || ""}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 2. Hero & Homepage Content */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-paris-warm-100">
          <LayoutTemplate className="w-5 h-5 text-paris-gold-600" />
          <h2 className="font-serif text-xl font-bold text-paris-dark-900">
            Konten Hero Banner Utama
          </h2>
        </div>

        <div className="space-y-5">
          <Input
            label="Headline Judul Hero"
            value={settings.heroTitle || ""}
            onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
            placeholder="Create Beautiful Moments"
          />

          <Textarea
            label="Subheadline / Keterangan Hero"
            rows={2}
            value={settings.heroDescription || ""}
            onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
          />

          <div className="pt-2">
            <ImageUploader
              label="Foto Banner Hero Utama"
              value={settings.heroImage || undefined}
              onChange={(val) => setSettings({ ...settings, heroImage: val.driveUrl })}
            />
          </div>
        </div>
      </div>

      {/* 3. Contact & Social Channels */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-paris-warm-100">
          <Phone className="w-5 h-5 text-paris-gold-600" />
          <h2 className="font-serif text-xl font-bold text-paris-dark-900">
            Kontak, WhatsApp & Alamat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Nomor WhatsApp (Format: 628xxx)"
            value={settings.whatsapp || ""}
            onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
            helperText="Nomor tujuan tombol pesan WhatsApp pelanggan"
          />

          <Input
            label="Nomor Telepon Kantor"
            value={settings.phone || ""}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
          />

          <Input
            label="Akun Instagram"
            value={settings.instagram || ""}
            onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
            placeholder="@parisdecoration"
          />

          <Input
            label="Email Resmi"
            type="email"
            value={settings.email || ""}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
          />

          <div className="sm:col-span-2">
            <Input
              label="Alamat Workshop / Studio"
              value={settings.address || ""}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="Jl. Trunojoyo No. 45, Sumenep, Madura, Jawa Timur"
            />
          </div>

          <div className="sm:col-span-2">
            <Textarea
              label="Teks Deskripsi Footer"
              rows={2}
              value={settings.footerDescription || ""}
              onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" isLoading={isSaving} className="gap-2">
          <Save className="w-4 h-4" />
          <span>Simpan Seluruh Pengaturan</span>
        </Button>
      </div>
    </form>
  );
};
