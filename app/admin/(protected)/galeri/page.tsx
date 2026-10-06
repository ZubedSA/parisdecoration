import React from "react";
import { getGalleries, getCategories } from "@/lib/db";
import { AdminGalleryClient } from "@/components/admin/AdminGalleryClient";

export const revalidate = 0;

export default async function AdminGaleriPage() {
  const [galleries, categories] = await Promise.all([
    getGalleries({ status: "ALL" }),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paris-dark-900">
          Galeri & Media Google Drive
        </h1>
        <p className="text-xs sm:text-sm text-paris-warm-600 mt-1">
          Upload foto hasil dekorasi baru ke Google Drive dan atur tampilan portofolio website.
        </p>
      </div>

      <AdminGalleryClient
        initialGalleries={galleries}
        categories={categories}
      />
    </div>
  );
}
