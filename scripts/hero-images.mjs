/**
 * Builds the two hero images for the scratch band in public/images.
 *
 * Both source images must have the same framing: only the background differs.
 * The script crops them to one shared box, writes four widths of each as WebP,
 * and can shift the second image by a few pixels to line the two up exactly.
 *
 * Requirements: Node 20+ and puppeteer-core.
 *   npm i -D puppeteer-core
 *
 * Usage (from the project root):
 *   node scripts/hero-images.mjs <plain-image> <tech-image> [--dx 0] [--dy 0]
 *
 * Example:
 *   node scripts/hero-images.mjs ~/Downloads/plain.webp ~/Downloads/tech.webp --dx 3 --dy 1
 *
 * Set CHROME_PATH if Edge/Chrome is not in the default Windows location.
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const WIDTHS = [800, 1200, 1600, 2000];
const RATIO = 2000 / 833; // the band's aspect ratio; see HeroBanner.tsx
const OUT_DIR = "public/images";
const CHROME =
  process.env.CHROME_PATH ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

const [plainPath, techPath, ...rest] = process.argv.slice(2);
if (!plainPath || !techPath) {
  console.error("Usage: node scripts/hero-images.mjs <plain-image> <tech-image> [--dx N] [--dy N]");
  process.exit(1);
}
const arg = (name, fallback) => {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(rest[i + 1]);
};
const dx = arg("dx", 0);
const dy = arg("dy", 0);

const mime = (file) => {
  const ext = path.extname(file).toLowerCase();
  return ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
};
const toDataUrl = (file) =>
  `data:${mime(file)};base64,` + fs.readFileSync(file).toString("base64");

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.goto("about:blank");

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [name, file, shiftX, shiftY, quality] of [
  ["hero-plain", plainPath, 0, 0, 0.9],
  ["hero-tech", techPath, dx, dy, 0.88],
]) {
  const data = toDataUrl(file);
  for (const W of WIDTHS) {
    const H = Math.round(W / RATIO);
    const url = await page.evaluate(
      async (data, W, H, shiftX, shiftY, quality) => {
        const img = new Image();
        img.src = data;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = W;
        c.height = H;
        const ctx = c.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        // cover fit, centred — the same crop CSS object-fit: cover applies
        const s = Math.max(W / img.width, H / img.height);
        const dw = img.width * s;
        const dh = img.height * s;
        ctx.drawImage(img, (W - dw) / 2 + shiftX * s, (H - dh) / 2 + shiftY * s, dw, dh);
        return c.toDataURL("image/webp", quality);
      },
      data,
      W,
      H,
      shiftX,
      shiftY,
      quality,
    );
    const buf = Buffer.from(url.split(",")[1], "base64");
    const out = path.join(OUT_DIR, `${name}-${W}.webp`);
    fs.writeFileSync(out, buf);
    console.log(`${out}  ${W}x${H}  ${(buf.length / 1024).toFixed(0)} KB`);
  }
}

await browser.close();
console.log("\nDone. The band picks the right width per screen automatically.");
