"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export interface ImageUploadValue {
  fileName: string;
  driveUrl: string;
  driveFileId?: string;
}

interface ImageUploaderProps {
  value?: string;
  onChange: (val: ImageUploadValue) => void;
  onRemove?: () => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  onRemove,
  label = "Unggah Foto ke Google Drive",
}) => {
  const { error: toastError, success: toastSuccess } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(value || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toastError("Format tidak didukung. Harap pilih gambar JPG, PNG, atau WEBP.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toastError("Ukuran gambar terlalu besar. Maksimal 5MB.");
      return;
    }

    // Local instant preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah gambar");
      }

      setPreviewUrl(data.url);
      onChange({
        fileName: data.fileName,
        driveUrl: data.url,
        driveFileId: data.fileId,
      });

      toastSuccess("Gambar berhasil diunggah ke Google Drive!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah gambar";
      toastError(msg);
      setPreviewUrl(value || "");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleClear = () => {
    setPreviewUrl("");
    if (onRemove) onRemove();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-paris-dark-700">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-paris-warm-300 bg-paris-warm-100 group">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {isUploading && (
            <div className="absolute inset-0 bg-paris-dark-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2">
              <div className="w-8 h-8 rounded-full border-2 border-white border-t-paris-gold-400 animate-spin" />
              <p className="text-xs font-semibold">Mengunggah ke Google Drive...</p>
            </div>
          )}

          {!isUploading && (
            <div className="absolute inset-0 bg-paris-dark-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-full bg-white text-paris-dark-900 text-xs font-semibold hover:bg-paris-warm-100 shadow-md"
              >
                Ganti Gambar
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-md"
                title="Hapus gambar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="border-2 border-dashed border-paris-warm-300 hover:border-paris-gold-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-paris-warm-50/50 hover:bg-paris-gold-50/30"
        >
          <div className="w-12 h-12 rounded-2xl bg-paris-warm-100 flex items-center justify-center text-paris-gold-600 mx-auto mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-paris-dark-900">
            Klik untuk memilih atau seret gambar
          </p>
          <p className="text-xs text-paris-warm-600 mt-1">
            Format: JPG, PNG, WEBP (Maksimal 5MB)
          </p>
        </div>
      )}
    </div>
  );
};
