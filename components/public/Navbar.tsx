"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/layanan", label: "Layanan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export const Navbar: React.FC<{ siteName?: string; whatsappNumber?: string }> = ({
  siteName = "Paris Decoration",
  whatsappNumber = "6285943610397",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-500 ease-out w-full",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-paris-warm-200/60 py-3"
          : "bg-white/70 backdrop-blur-xs py-4 sm:py-5 border-b border-paris-warm-200/30"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/">
            <BrandLogo siteName={siteName} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-paris-gold-600",
                    isActive ? "text-paris-gold-600 font-semibold" : "text-paris-dark-700"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-paris-gold-500 rounded-full animate-in fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paris-gold-500 hover:bg-paris-gold-600 text-white text-sm font-semibold shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Pesan Sekarang</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-paris-dark-800 hover:text-paris-gold-600 hover:bg-paris-warm-100/80 transition-colors"
            aria-label="Toggle navigasi"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white border-b border-paris-warm-200 shadow-xl px-5 pt-4 pb-7 space-y-4 animate-in slide-in-from-top-4 duration-200 z-50">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-paris-gold-50 text-paris-gold-800 font-semibold"
                      : "text-paris-dark-800 hover:bg-paris-warm-50 hover:text-paris-gold-600"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-paris-gold-500" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-paris-warm-100 flex flex-col gap-3">
            <Link
              href="/order"
              className="w-full text-center py-3.5 rounded-xl bg-paris-gold-500 hover:bg-paris-gold-600 text-white font-semibold text-base shadow-gold transition-colors"
            >
              Pesan Sekarang
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-paris-warm-100 hover:bg-paris-warm-200 text-paris-dark-800 font-medium text-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
