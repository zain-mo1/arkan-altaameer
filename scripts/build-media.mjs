/**
 * Builds optimized, responsive media for the website.
 *
 *   npm run media            → process new/changed sources only
 *   npm run media -- --force → rebuild everything
 *
 * Inputs : assets/photos/*.jpg   (see scripts/media.config.mjs)
 *          assets/brand/*.webp   (logo variants extracted from the brand identity guide)
 * Outputs: public/media/*, public/brand/*, public/*.png (favicons), public/og/*.jpg (link previews),
 *          src/data/media.generated.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { PHOTOS, PRESETS, SHARE_CARDS } from './media.config.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const SRC_PHOTOS = path.join(ROOT, 'assets/photos');
const SRC_BRAND = path.join(ROOT, 'assets/brand');
const OUT_MEDIA = path.join(ROOT, 'public/media');
const OUT_BRAND = path.join(ROOT, 'public/brand');
const OUT_PUBLIC = path.join(ROOT, 'public');
const OUT_SHARE = path.join(ROOT, 'public/og');
const MANIFEST = path.join(ROOT, 'src/data/media.generated.ts');
const FORCE = process.argv.includes('--force');

const GRAPHITE_DEEP = { r: 22, g: 27, b: 35, alpha: 1 }; // #161B23

fs.mkdirSync(OUT_MEDIA, { recursive: true });
fs.mkdirSync(OUT_BRAND, { recursive: true });
fs.mkdirSync(OUT_SHARE, { recursive: true });

const isFresh = (out, src) => !FORCE && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;
const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

/** Largest rect with the given ratio (w/h) centered on a focal point, clamped to the image. */
function cropRect(width, height, ratio, [fx, fy] = [50, 50]) {
  let w = width;
  let h = Math.round(width / ratio);
  if (h > height) {
    h = height;
    w = Math.round(height * ratio);
  }
  const left = Math.min(Math.max(Math.round((fx / 100) * width - w / 2), 0), width - w);
  const top = Math.min(Math.max(Math.round((fy / 100) * height - h / 2), 0), height - h);
  return { left, top, width: w, height: h };
}

async function processPhoto(key, cfg) {
  // `source` reuses another photo (e.g. a project photo cropped differently for a page hero)
  const src = path.join(SRC_PHOTOS, `${cfg.source ?? key}.jpg`);
  if (!fs.existsSync(src)) throw new Error(`Missing source photo: assets/photos/${cfg.source ?? key}.jpg`);

  let base = sharp(src).rotate(); // honour EXIF orientation
  const meta = await base.metadata();
  let { width, height } = meta;
  if (cfg.crop) {
    const rect = cropRect(width, height, cfg.crop.ratio, cfg.crop.focal);
    base = base.extract(rect);
    ({ width, height } = rect);
  }
  const pipeline = await base.toBuffer({ resolveWithObject: true });
  const buf = pipeline.data;

  const widths = PRESETS[cfg.preset].filter((w) => w <= width);
  if (!widths.length || widths[widths.length - 1] < Math.min(width, PRESETS[cfg.preset].at(-1))) widths.push(width);

  let written = 0;
  for (const w of widths) {
    const avif = path.join(OUT_MEDIA, `${key}-${w}.avif`);
    const webp = path.join(OUT_MEDIA, `${key}-${w}.webp`);
    const resized = sharp(buf).resize({ width: w, withoutEnlargement: true });
    if (!isFresh(avif, src)) {
      await resized
        .clone()
        .avif({ quality: cfg.quality ?? 52, effort: 5, chromaSubsampling: '4:2:0' })
        .toFile(avif);
      written++;
    }
    if (!isFresh(webp, src)) {
      await resized
        .clone()
        .webp({ quality: cfg.quality ? cfg.quality + 24 : 76, effort: 5 })
        .toFile(webp);
      written++;
    }
  }

  const stats = await sharp(buf).stats();
  const lqipBuf = await sharp(buf).resize({ width: 24 }).modulate({ saturation: 1.1 }).webp({ quality: 45 }).toBuffer();

  return {
    written,
    entry: {
      w: width,
      h: height,
      widths,
      color: hex(stats.dominant),
      focal: `${(cfg.focal ?? cfg.crop?.focal ?? [50, 50])[0]}% ${(cfg.focal ?? cfg.crop?.focal ?? [50, 50])[1]}%`,
      lqip: `data:image/webp;base64,${lqipBuf.toString('base64')}`,
    },
  };
}

/* ---------------- brand assets ---------------- */

/**
 * Left-to-right arrangement of the horizontal lockup. The identity guide ships the Arabic order only (wordmark,
 * then the symbol on the right); on English pages the symbol leads on the left. Both parts are moved unchanged,
 * keeping the original spacing: the widest fully transparent column run is the space between them.
 */
async function lockupLtr(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const blank = (x) => {
    for (let y = 0; y < height; y++) if (data[(y * width + x) * channels + 3] > 8) return false;
    return true;
  };
  let gap = { start: 0, size: 0 };
  for (let x = 0, run = 0; x < width; x++) {
    run = blank(x) ? run + 1 : 0;
    if (run > gap.size) gap = { start: x - run + 1, size: run };
  }
  if (gap.size < width * 0.03) throw new Error('lockupLtr: no space found between the wordmark and the symbol');

  const symbolX = gap.start + gap.size;
  const wordmark = await sharp(buffer).extract({ left: 0, top: 0, width: gap.start, height }).toBuffer();
  const symbol = await sharp(buffer)
    .extract({ left: symbolX, top: 0, width: width - symbolX, height })
    .toBuffer();
  return sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: symbol, left: 0, top: 0 },
      { input: wordmark, left: width - gap.start, top: 0 },
    ])
    .png()
    .toBuffer();
}

const BRAND = [
  // [source, output, width, transform?]
  ['lockup-on-dark.webp', 'lockup-on-dark.webp', 640],
  ['lockup-on-light.webp', 'lockup-on-light.webp', 640],
  ['lockup-on-dark.webp', 'lockup-ltr-on-dark.webp', 640, lockupLtr],
  ['lockup-on-light.webp', 'lockup-ltr-on-light.webp', 640, lockupLtr],
  ['logo-on-dark.webp', 'logo-on-dark.webp', 560],
  ['logo-on-light.webp', 'logo-on-light.webp', 560],
  ['symbol-on-dark.webp', 'symbol-on-dark.webp', 360],
  ['symbol-on-light.webp', 'symbol-on-light.webp', 360],
];

async function processBrand() {
  const dims = {};
  for (const [srcName, outName, width, transform] of BRAND) {
    const src = path.join(SRC_BRAND, srcName);
    const out = path.join(OUT_BRAND, outName);
    // trim transparent padding so layout sizing is exact
    let trimmed = await sharp(src).trim({ threshold: 1 }).toBuffer();
    if (transform) trimmed = await transform(trimmed);
    const img = sharp(trimmed).resize({ width, withoutEnlargement: true });
    if (!isFresh(out, src)) await img.clone().webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(out);
    const m = await sharp(await img.clone().toBuffer()).metadata();
    dims[outName.replace('.webp', '')] = { w: m.width, h: m.height };
  }

  // Favicons — brand symbol (dark version) on a graphite tile, as in the identity guide's app icon.
  const symbol = await sharp(path.join(SRC_BRAND, 'symbol-on-dark.webp')).trim({ threshold: 1 }).toBuffer();
  const tile = async (size, pad, radius, out) => {
    const inner = Math.round(size * (1 - pad * 2));
    const sym = await sharp(symbol).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
    const sm = await sharp(sym).metadata();
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
    );
    const bg = await sharp({ create: { width: size, height: size, channels: 4, background: GRAPHITE_DEEP } })
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();
    await sharp(bg)
      .composite([{ input: sym, left: Math.round((size - sm.width) / 2), top: Math.round((size - sm.height) / 2 + size * 0.02) }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT_PUBLIC, out));
  };
  await tile(32, 0.1, 7, 'favicon-32.png');
  await tile(180, 0.14, 0, 'apple-touch-icon.png'); // iOS applies its own mask
  await tile(192, 0.14, 40, 'icon-192.png');
  await tile(512, 0.2, 0, 'icon-512-maskable.png');

  return dims;
}

/**
 * Link-preview cards shown when a page is shared (WhatsApp, LinkedIn, X, Facebook…): the page's hero photo
 * under a graphite veil, a gold drafting frame and the full logo. The logo stays inside the central square,
 * which is what WhatsApp keeps for its small thumbnails.
 */
async function processShareCards() {
  const [W, H] = [1200, 630];
  const veil = Buffer.from(
    `<svg width="${W}" height="${H}"><defs><radialGradient id="g" cx="50%" cy="48%" r="70%"><stop offset="0" stop-color="#10141A" stop-opacity=".78"/><stop offset="1" stop-color="#10141A" stop-opacity=".92"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/><rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#D4AF37" stroke-opacity=".45"/></svg>`,
  );
  const logo = await sharp(path.join(SRC_BRAND, 'logo-on-dark.webp')).trim({ threshold: 1 }).resize({ height: 470 }).toBuffer();
  const lm = await sharp(logo).metadata();

  for (const [page, key] of Object.entries(SHARE_CARDS)) {
    const cfg = PHOTOS[key];
    if (!cfg) throw new Error(`SHARE_CARDS.${page}: unknown photo "${key}"`);
    // same framing as the page hero: the configured pre-crop, then a 1200×630 window around the focal point
    let photo = await sharp(path.join(SRC_PHOTOS, `${cfg.source ?? key}.jpg`))
      .rotate()
      .toBuffer({ resolveWithObject: true });
    if (cfg.crop) {
      const rect = cropRect(photo.info.width, photo.info.height, cfg.crop.ratio, cfg.crop.focal);
      photo = await sharp(photo.data).extract(rect).toBuffer({ resolveWithObject: true });
    }
    const frame = cropRect(photo.info.width, photo.info.height, W / H, cfg.focal ?? cfg.crop?.focal);
    await sharp(photo.data)
      .extract(frame)
      .resize(W, H)
      .composite([{ input: veil }, { input: logo, left: Math.round((W - lm.width) / 2), top: Math.round((H - lm.height) / 2) }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(OUT_SHARE, `${page}.jpg`));
  }
}

/* ---------------- run ---------------- */

const t0 = Date.now();
const entries = {};
let total = 0;
for (const [key, cfg] of Object.entries(PHOTOS)) {
  const { written, entry } = await processPhoto(key, cfg);
  entries[key] = entry;
  total += written;
  console.log(
    `${key.padEnd(20)} ${entry.w}×${entry.h}  widths: ${entry.widths.join(', ')}  ${written ? `(+${written} files)` : '(cached)'}`,
  );
}
const brand = await processBrand();
await processShareCards();

const ts = `// AUTO-GENERATED by scripts/build-media.mjs — do not edit by hand. Run \`npm run media\`.
/* eslint-disable */

export interface MediaAsset {
  /** intrinsic size of the largest rendition */
  w: number;
  h: number;
  /** available widths (px) — files: /media/<key>-<width>.avif|webp */
  widths: readonly number[];
  /** dominant color, used as placeholder background */
  color: string;
  /** CSS object-position focal point */
  focal: string;
  /** tiny blurred preview */
  lqip: string;
}

export const media = ${JSON.stringify(entries, null, 2)} as const satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

export const brandAssets = ${JSON.stringify(brand, null, 2)} as const;
`;
fs.writeFileSync(MANIFEST, ts);
console.log(
  `\n✓ ${Object.keys(entries).length} photos, ${total} files written, brand assets, favicons and link-preview cards in ${((Date.now() - t0) / 1000).toFixed(1)}s`,
);
