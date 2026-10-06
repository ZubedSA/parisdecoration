import React from "react";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { getSiteSettings } from "@/lib/db";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar
        siteName={settings.siteName}
        whatsappNumber={settings.whatsapp || undefined}
      />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
