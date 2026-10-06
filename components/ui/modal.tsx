"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "lg",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-paris-dark-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative bg-white rounded-3xl shadow-2xl border border-paris-warm-200 w-full overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col",
          widthClasses[maxWidth]
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="p-6 pb-4 border-b border-paris-warm-100 flex items-start justify-between">
            <div>
              {title && <h3 className="text-xl font-serif font-bold text-paris-dark-900">{title}</h3>}
              {description && <p className="text-sm text-paris-warm-600 mt-1">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-paris-warm-500 hover:text-paris-dark-800 hover:bg-paris-warm-100 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content body */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
