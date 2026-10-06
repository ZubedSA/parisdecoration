import React from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  showText?: boolean;
  siteName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "light",
  size = "md",
  showTagline = true,
  showText = true,
  siteName = "Paris Decoration",
}) => {
  const isDark = variant === "dark";

  const sizeClasses = {
    sm: {
      box: "w-8 h-8 text-xs",
      title: "text-lg",
      subtitle: "text-[9px]",
    },
    md: {
      box: "w-9 h-9 text-sm",
      title: "text-xl sm:text-2xl",
      subtitle: "text-[10px]",
    },
    lg: {
      box: "w-12 h-12 text-base",
      title: "text-2xl sm:text-3xl",
      subtitle: "text-xs",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-2.5 group select-none">
      {/* Bespoke Monogram Emblem */}
      <div
        className={cn(
          "rounded-xl flex items-center justify-center font-serif font-bold tracking-wider transition-transform duration-200 group-hover:scale-105 border shrink-0",
          currentSize.box,
          isDark
            ? "bg-paris-gold-500/10 border-paris-gold-400/40 text-paris-gold-400 shadow-sm"
            : "bg-paris-gold-50 border-paris-gold-400 text-paris-gold-700 shadow-xs"
        )}
      >
        <span className="relative">
          PD
          <span
            className={cn(
              "absolute -top-0.5 -right-1 w-1 h-1 rounded-full",
              isDark ? "bg-paris-gold-400" : "bg-paris-gold-600"
            )}
          />
        </span>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={cn(
              "font-serif font-bold tracking-tight leading-none group-hover:text-paris-gold-600 transition-colors",
              currentSize.title,
              isDark ? "text-white" : "text-paris-dark-900"
            )}
          >
            {siteName}
          </span>
          {showTagline && (
            <span
              className={cn(
                "tracking-[0.2em] font-medium uppercase mt-1",
                currentSize.subtitle,
                isDark ? "text-paris-gold-400/90" : "text-paris-gold-700"
              )}
            >
              Atelier & Decoration
            </span>
          )}
        </div>
      )}
    </div>
  );
};
