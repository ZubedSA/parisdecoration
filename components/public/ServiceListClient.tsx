"use client";

import React, { useState, useMemo } from "react";
import { ServiceItem, CategoryItem } from "@/types";
import { ServiceCard } from "@/components/public/ServiceCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export const ServiceListClient: React.FC<{
  initialServices: ServiceItem[];
  categories: CategoryItem[];
}> = ({ initialServices, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  const filteredServices = useMemo(() => {
    return initialServices
      .filter((s) => {
        // Category filter
        if (selectedCategory !== "all" && s.categoryId !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = s.name.toLowerCase().includes(q);
          const matchDesc = s.description.toLowerCase().includes(q);
          const matchFac = s.facilities ? s.facilities.toLowerCase().includes(q) : false;
          if (!matchName && !matchDesc && !matchFac) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
        if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
        return 0;
      });
  }, [initialServices, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search and Sort controls */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-paris-warm-200/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paris-warm-500" />
            <input
              type="text"
              placeholder="Cari layanan (misal: Wedding, Lamaran, Aqiqah)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-paris-warm-50/70 border border-paris-warm-200 text-paris-dark-900 placeholder-paris-warm-500 text-sm focus:outline-none focus:ring-2 focus:ring-paris-gold-400 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-paris-warm-500 hover:text-paris-dark-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="relative sm:w-60">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-paris-warm-500 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-paris-warm-50/70 border border-paris-warm-200 text-paris-dark-900 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-paris-gold-400 focus:bg-white transition-all"
            >
              <option value="default">Urutan Standar</option>
              <option value="price-asc">Harga: Terendah ke Tertinggi</option>
              <option value="price-desc">Harga: Tertinggi ke Terendah</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Mobile horizontal scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-paris-gold-500 text-white shadow-gold"
                : "bg-paris-warm-50 text-paris-dark-700 hover:bg-paris-warm-100 border border-paris-warm-200"
            }`}
          >
            Semua ({initialServices.length})
          </button>
          {categories.map((cat) => {
            const count = initialServices.filter((s) => s.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-paris-gold-500 text-white shadow-gold"
                    : "bg-paris-warm-50 text-paris-dark-700 hover:bg-paris-warm-100 border border-paris-warm-200"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of services */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              data-reveal="scale"
              data-delay={(idx % 3) * 150}
              className="h-full"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-paris-warm-200/80 p-8">
          <SlidersHorizontal className="w-10 h-10 text-paris-warm-400 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-paris-dark-900">
            Tidak ada layanan yang sesuai
          </h3>
          <p className="text-sm text-paris-warm-600 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-5 py-2 rounded-full bg-paris-gold-500 text-white text-xs font-semibold shadow-gold"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};
