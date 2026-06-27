// Generates lightweight gallery thumbnails in WebP (with JPEG fallback) from the
// full-size photos in public/images. Run with `npm run thumbs` (also runs on prebuild).
//
// - Grid/cards load these ~640px thumbnails; the lightbox still loads the full image.
// - WebP gives ~25-35% better compression than JPEG; the .jpg is a fallback for
//   the few browsers without WebP support (via <picture><source type="image/webp">).
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const thumbsDir = path.join(imagesDir, "thumbs");
const MAX = 640;

await mkdir(thumbsDir, { recursive: true });

const entries = await readdir(imagesDir, { withFileTypes: true });
const files = entries.filter((d) => d.isFile() && /\.jpe?g$/i.test(d.name)).map((d) => d.name);

let count = 0;
let webpBytes = 0;
let jpgBytes = 0;

for (const name of files) {
  const input = path.join(imagesDir, name);
  const base = name.replace(/\.jpe?g$/i, "");
  const resized = sharp(input).rotate().resize({
    width: MAX,
    height: MAX,
    fit: "inside",
    withoutEnlargement: true,
  });

  const webpOut = path.join(thumbsDir, `${base}.webp`);
  const jpgOut = path.join(thumbsDir, `${base}.jpg`);

  await resized.clone().webp({ quality: 72 }).toFile(webpOut);
  await resized.clone().jpeg({ quality: 66, mozjpeg: true }).toFile(jpgOut);

  webpBytes += (await stat(webpOut)).size;
  jpgBytes += (await stat(jpgOut)).size;
  count++;
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(`Generated ${count} thumbnails -> ${thumbsDir}`);
console.log(`  WebP total: ${mb(webpBytes)} MB  |  JPEG fallback total: ${mb(jpgBytes)} MB`);
