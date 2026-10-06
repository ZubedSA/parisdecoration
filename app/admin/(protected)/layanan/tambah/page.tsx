import React from "react";
import { getCategories } from "@/lib/db";
import { ServiceForm } from "@/components/admin/ServiceForm";

export const revalidate = 0;

export default async function TambahLayananPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <ServiceForm categories={categories} />
    </div>
  );
}
