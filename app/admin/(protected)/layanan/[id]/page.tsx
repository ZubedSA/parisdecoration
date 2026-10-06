import React from "react";
import { notFound } from "next/navigation";
import { getServiceById, getCategories } from "@/lib/db";
import { ServiceForm } from "@/components/admin/ServiceForm";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function EditLayananPage({ params }: Props) {
  const { id } = await params;
  const [service, categories] = await Promise.all([
    getServiceById(id),
    getCategories(),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ServiceForm initialData={service} categories={categories} />
    </div>
  );
}
