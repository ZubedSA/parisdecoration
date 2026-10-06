"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { error: toastError, success: toastSuccess } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Harap masukkan email dan password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Email atau kata sandi tidak valid");
      }

      toastSuccess("Selamat datang kembali, Admin!");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal masuk ke dashboard";
      setErrorMsg(msg);
      toastError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paris-warm-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-paris-gold-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link href="/" className="inline-block mx-auto">
          <BrandLogo size="lg" />
        </Link>
        <h2 className="text-xl font-bold text-paris-dark-800 tracking-tight">
          Admin Portal Login
        </h2>
        <p className="text-xs text-paris-warm-600">
          Masuk untuk mengelola layanan, foto galeri, dan pesanan pelanggan.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-soft border border-paris-warm-200/80 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                label="Email Administrator"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@parisdecoration.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Password / Kata Sandi"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" size="lg" isLoading={isLoading} className="w-full">
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-paris-warm-100 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-paris-warm-600 hover:text-paris-gold-700 transition-colors"
            >
              ← Kembali ke Halaman Utama
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-paris-warm-500">
          Default Dev Admin: <code className="bg-white px-2 py-0.5 rounded border">admin@parisdecoration.com</code> / <code className="bg-white px-2 py-0.5 rounded border">AdminParisDeco2026!#</code>
        </div>
      </div>
    </div>
  );
}
