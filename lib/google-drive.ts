import fs from "fs/promises";
import path from "path";

export interface UploadResult {
  success: boolean;
  fileId?: string;
  fileName: string;
  url: string;
  error?: string;
}

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB limit

/**
 * Uploads an image to Google Drive via the deployed Google Apps Script Web App.
 * If GOOGLE_APPS_SCRIPT_URL is not set, falls back to saving locally in public/uploads/
 * so development and local testing work smoothly out of the box.
 */
export async function uploadImageToStorage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<UploadResult> {
  // Validate file type
  if (!ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase())) {
    return {
      success: false,
      fileName,
      url: "",
      error: `Format file ${mimeType} tidak didukung. Harap unggah format JPG, JPEG, PNG, atau WEBP.`,
    };
  }

  // Validate size
  if (fileBuffer.length > MAX_FILE_SIZE_BYTES) {
    return {
      success: false,
      fileName,
      url: "",
      error: "Ukuran gambar melebihi batas maksimal 5MB.",
    };
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const scriptSecret = process.env.GOOGLE_DRIVE_UPLOAD_SECRET;

  // If Google Apps Script is configured and points to a real URL
  if (scriptUrl && scriptUrl.startsWith("http") && !scriptUrl.includes("YOUR_SCRIPT_ID")) {
    try {
      const base64Data = fileBuffer.toString("base64");
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upload",
          fileName,
          mimeType,
          base64: base64Data,
          secret: scriptSecret || undefined,
        }),
      });

      const data = await response.json();
      if (data && data.success) {
        return {
          success: true,
          fileId: data.fileId,
          fileName: data.fileName || fileName,
          url: data.url || data.fallbackUrl,
        };
      } else {
        throw new Error(data.error || "Gagal mengunggah ke Google Drive");
      }
    } catch (err: unknown) {
      console.warn("Google Apps Script upload failed, falling back to local storage:", err);
      // Fallback to local storage below
    }
  }

  // Local fallback storage
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadDir, safeName);
    await fs.writeFile(filePath, fileBuffer);

    return {
      success: true,
      fileId: `local-${safeName}`,
      fileName: safeName,
      url: `/uploads/${safeName}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menyimpan file";
    return {
      success: false,
      fileName,
      url: "",
      error: message,
    };
  }
}

/**
 * Deletes an image from storage
 */
export async function deleteImageFromStorage(fileId?: string, url?: string): Promise<boolean> {
  if (!fileId && !url) return false;

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const scriptSecret = process.env.GOOGLE_DRIVE_UPLOAD_SECRET;

  if (fileId && !fileId.startsWith("local-") && scriptUrl && !scriptUrl.includes("YOUR_SCRIPT_ID")) {
    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          fileId,
          secret: scriptSecret || undefined,
        }),
      });
      const data = await response.json();
      return !!data.success;
    } catch {
      return false;
    }
  }

  if (url && url.startsWith("/uploads/")) {
    try {
      const localPath = path.join(process.cwd(), "public", url);
      await fs.unlink(localPath);
      return true;
    } catch {
      return false;
    }
  }

  return true;
}
