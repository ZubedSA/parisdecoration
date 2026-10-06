"use client";

import React, { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";

export const AdminHeader: React.FC<{ adminName?: string }> = ({
  adminName = "Administrator",
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-paris-warm-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-paris-dark-800 hover:bg-paris-warm-100 transition-colors"
            aria-label="Buka menu navigasi admin"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block">
            <h2 className="text-base font-bold text-paris-dark-900 font-serif">
              Paris Decoration Panel
            </h2>
            <p className="text-xs text-paris-warm-600">Sistem Manajemen Bisnis Dekorasi</p>
          </div>
        </div>

        {/* User profile pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-paris-warm-50 border border-paris-warm-200">
            <div className="w-7 h-7 rounded-full bg-paris-gold-600 text-white flex items-center justify-center text-xs font-serif font-bold shadow-xs">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold text-paris-dark-900 block leading-tight">
                {adminName}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">Aktif</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-paris-dark-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 text-paris-warm-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <AdminSidebar onCloseMobile={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};
