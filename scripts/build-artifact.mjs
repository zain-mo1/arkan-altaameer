/**
 * Static preview build (e.g. to share as a claude.ai artifact).
 *
 *   npm run build:artifact   →   .artifact/index.html  +  .artifact/media/*  +  .artifact/brand/*
 *
 * The preview host wraps the page in its own <html>/<head>/<body>, only allows fonts from Google Fonts
 * and serves the page from a path we don't control. So this build uses `--mode artifact` (relative
 * asset URLs, in-memory routing, single JS bundle) and inlines the CSS + JS into one page fragment.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const OUT = path.join(ROOT, '.artifact');
const BUILD = path.join(OUT, 'build');

const TITLE = 'Arkan Altaameer Website';
const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Alexandria:wght@300..700&family=IBM+Plex+Sans+Arabic:wght@400;500&family=Montserrat:wght@300..700&display=swap';
/** Only the brand files the site references (see Header/Footer). */
const BRAND_FILES = ['lockup-on-dark.webp', 'logo-on-dark.webp'];

fs.rmSync(OUT, { recursive: true, force: true });
execSync(`npx vite build --mode artifact --outDir "${BUILD}" --emptyOutDir`, { cwd: ROOT, stdio: 'inherit' });

const assets = path.join(BUILD, 'assets');
const list = fs.readdirSync(assets);
const js = list.filter((f) => f.endsWith('.js'));
const css = list.filter((f) => f.endsWith('.css'));
if (js.length !== 1) throw new Error(`Expected a single JS bundle, got: ${js.join(', ')}`);

// Keep the inlined code from closing its own element early.
const jsCode = fs
  .readFileSync(path.join(assets, js[0]), 'utf8')
  .replace(/<\/script/gi, '<\\/script')
  .replace(/<!--/g, '<\\!--');
const cssCode = css
  .map((f) => fs.readFileSync(path.join(assets, f), 'utf8'))
  .join('\n')
  .replace(/<\/style/gi, '<\\/style');

const page = `<title>${TITLE}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${GOOGLE_FONTS}">
<style>${cssCode}</style>
<script>(function(){var en=location.hash==='#en',d=document.documentElement;d.lang=en?'en':'ar';d.dir=en?'ltr':'rtl';})();</script>
<div id="root"></div>
<script type="module">${jsCode}</script>
`;
fs.writeFileSync(path.join(OUT, 'index.html'), page);

// Supporting files: a reduced photo set (WebP, ≤ 2 widths per photo — must match previewWidths() in
// src/components/ui/Picture.tsx) keeps the preview within the host's file limits; plus the logos in use.
const published = [];
const copy = (from, to) => {
  fs.mkdirSync(path.dirname(path.join(OUT, to)), { recursive: true });
  fs.copyFileSync(from, path.join(OUT, to));
  published.push(to);
};
const widthsByKey = new Map();
for (const f of fs.readdirSync(path.join(ROOT, 'public/media'))) {
  const m = f.match(/^(.+)-(\d+)\.webp$/);
  if (!m) continue;
  widthsByKey.set(
    m[1],
    [...(widthsByKey.get(m[1]) ?? []), Number(m[2])].sort((a, b) => a - b),
  );
}
for (const [key, widths] of widthsByKey) {
  const small = widths.filter((w) => w <= 1000).at(-1) ?? widths[0];
  const large = widths.filter((w) => w <= 2000).at(-1) ?? widths[widths.length - 1];
  for (const w of new Set([small, large])) copy(path.join(ROOT, 'public/media', `${key}-${w}.webp`), `media/${key}-${w}.webp`);
}
for (const f of BRAND_FILES) copy(path.join(ROOT, 'public/brand', f), `brand/${f}`);

fs.rmSync(BUILD, { recursive: true, force: true });
fs.writeFileSync(path.join(OUT, 'files.json'), JSON.stringify(published, null, 2));

const bytes = published.reduce((sum, f) => sum + fs.statSync(path.join(OUT, f)).size, 0);
console.log(
  `\n✓ .artifact/index.html (${(Buffer.byteLength(page) / 1024).toFixed(0)} KB) + ${published.length} files (${(bytes / 1024 / 1024).toFixed(1)} MB)`,
);
