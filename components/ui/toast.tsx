"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, description?: string) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info", description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, description }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = useCallback((message: string, description?: string) => addToast(message, "success", description), [addToast]);
  const error = useCallback((message: string, description?: string) => addToast(message, "error", description), [addToast]);
  const info = useCallback((message: string, description?: string) => addToast(message, "info", description), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5",
              t.type === "success" && "bg-white border-emerald-200 text-emerald-950",
              t.type === "error" && "bg-white border-rose-200 text-rose-950",
              t.type === "info" && "bg-white border-paris-warm-300 text-paris-dark-900"
            )}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {t.type === "error" && <AlertCircle className="w-5 h-5 text-rose-600" />}
              {t.type === "info" && <Info className="w-5 h-5 text-paris-gold-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{t.message}</p>
              {t.description && <p className="text-xs text-paris-warm-600 mt-0.5">{t.description}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-paris-warm-400 hover:text-paris-dark-800 transition-colors p-1"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
