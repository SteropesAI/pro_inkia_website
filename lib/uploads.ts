import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 Mo
export const MAX_IMAGES = 5;

const EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function saveUploadedImages(
  files: File[],
  prefix: string
): Promise<string[]> {
  const uploadsDir = path.join(process.cwd(), "uploads");
  fs.mkdirSync(uploadsDir, { recursive: true });

  const saved: string[] = [];
  const limited = files.slice(0, MAX_IMAGES);

  for (const file of limited) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      throw new Error("Format image non accepté (jpg, png, webp)");
    }
    if (file.size > MAX_IMAGE_BYTES) {
      throw new Error("Image trop volumineuse (max 5 Mo)");
    }
    const ext = EXT[file.type] || ".bin";
    const name = `${prefix}-${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
    const dest = path.join(uploadsDir, name);
    const buf = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(dest, buf);
    saved.push(name);
  }
  return saved;
}

export function collectImageFiles(form: FormData): File[] {
  const out: File[] = [];
  for (const [key, value] of form.entries()) {
    if (
      (key === "photos" || key === "photo" || key.startsWith("photo")) &&
      value instanceof File &&
      value.size > 0
    ) {
      out.push(value);
    }
  }
  return out;
}
