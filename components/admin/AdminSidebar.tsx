"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  FolderTree,
  Image as ImageIcon,
  ShoppingBag,
  MessageSquareQuote,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/layanan", label: "Kelola Layanan", icon: Layers },
  { href: "/admin/kategori", label: "Kategori", icon: FolderTree },
  { href: "/admin/galeri", label: "Galeri Foto", icon: ImageIcon },
  { href: "/admin/pesanan", label: "Daftar Pesanan", icon: ShoppingBag },
  { href: "/admin/testimonial", label: "Testimoni", icon: MessageSquareQuote },
  { href: "/admin/pengaturan", label: "Pengaturan Website", icon: Settings },
];

export const AdminSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <aside className="w-64 bg-paris-dark-900 text-paris-warm-100 flex flex-col h-full border-r border-paris-dark-800">
      {/* Brand logo */}
      <div className="p-6 border-b border-paris-dark-800 flex items-center justify-between">
        <Link href="/admin/dashboard">
          <BrandLogo variant="dark" size="sm" showTagline={false} siteName="Paris Deco" />
        </Link>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-paris-gold-500 text-white font-semibold shadow-gold"
                  : "text-paris-warm-300 hover:text-white hover:bg-paris-dark-800"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-paris-dark-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-paris-warm-400 hover:text-white hover:bg-paris-dark-800 transition-colors"
        >
          <span>Buka Website Publik</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-900/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
};
