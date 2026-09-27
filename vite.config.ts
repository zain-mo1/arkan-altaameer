import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { locales, meta, notFoundMeta, PAGE_KEYS, pages, shareImage, type PageKey } from './src/config/pages.ts';
import { site } from './src/config/site.ts';
import { media } from './src/data/media.generated.ts';
import { stripLang, withLang } from './src/i18n/paths.ts';
import type { Lang } from './src/i18n/types.ts';

const LANGS: Lang[] = ['ar', 'en'];
const HEAD_RE = /<!-- arkan:head:start -->[\s\S]*?<!-- arkan:head:end -->/;
const FONTS_RE = /<!-- arkan:fonts(?::start -->[\s\S]*?<!-- arkan:fonts:end)? -->/;
const PRELOAD_RE = /<!-- arkan:preload(?::start -->[\s\S]*?<!-- arkan:preload:end)? -->/;

/** Display font of each language, preloaded so the headline doesn't flash in a fallback face. */
const DISPLAY_FONT: Record<Lang, RegExp> = {
  ar: /alexandria-arabic-wght-normal-[\w-]+\.woff2$/,
  en: /montserrat-latin-wght-normal-[\w-]+\.woff2$/,
};

/** Page modules (lazy routes) → their page key, to modulepreload each page's chunk from its own HTML. */
const PAGE_MODULE: [RegExp, PageKey][] = [
  [/src[\\/]pages[\\/]about[\\/]index\.tsx$/, 'about'],
  [/src[\\/]pages[\\/]services[\\/]index\.tsx$/, 'services'],
  [/src[\\/]pages[\\/]projects[\\/]index\.tsx$/, 'projects'],
  [/src[\\/]pages[\\/]faq[\\/]index\.tsx$/, 'faq'],
  [/src[\\/]pages[\\/]quote[\\/]index\.tsx$/, 'quote'],
  [/src[\\/]pages[\\/]contact[\\/]index\.tsx$/, 'contact'],
  [/src[\\/]pages[\\/]legal[\\/]Privacy\.tsx$/, 'privacy'],
  [/src[\\/]pages[\\/]legal[\\/]Terms\.tsx$/, 'terms'],
];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p: string) => site.url + p;
const url = (lang: Lang, page: PageKey) => abs(withLang(lang, pages[page].path));

function jsonLd(lang: Lang) {
  const other: Lang = lang === 'ar' ? 'en' : 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': abs('/#organization'),
    name: site.name[lang],
    alternateName: site.name[other],
    slogan: site.tagline[lang],
    description: meta.home[lang].description,
    url: url(lang, 'home'),
    logo: abs('/brand/logo-on-light.webp'),
    image: abs(shareImage('home')),
    telephone: site.contact.phone,
    email: site.contact.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressRegion: 'Riyadh Province', addressCountry: 'SA' },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
    knowsAbout: ['General Contracting', 'Interior Finishing', 'Stretch Ceilings', 'Interior Fit-Out'],
    sameAs: site.social.map((s) => s.url).filter((u) => u.startsWith('http')),
  };
}

/** Language- and page-specific <head> block. `page = null` → the "not found" document. */
function headBlock(lang: Lang, page: PageKey | null): string {
  const m = page ? meta[page][lang] : notFoundMeta[lang];
  const other: Lang = lang === 'ar' ? 'en' : 'ar';
  const tags = [`<title>${esc(m.title)}</title>`, `<meta name="description" content="${esc(m.description)}" />`];
  if (page) {
    tags.push(
      `<link rel="canonical" href="${url(lang, page)}" />`,
      ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l, page)}" />`),
      `<link rel="alternate" hreflang="x-default" href="${url('ar', page)}" />`,
    );
  } else {
    tags.push(`<meta name="robots" content="noindex, follow" />`);
  }
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name[lang])}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    ...(page ? [`<meta property="og:url" content="${url(lang, page)}" />`] : []),
    `<meta property="og:image" content="${abs(shareImage(page))}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${site.name[lang]} — ${site.tagline[lang]}`)}" />`,
    `<meta property="og:locale" content="${locales[lang]}" />`,
    `<meta property="og:locale:alternate" content="${locales[other]}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${abs(shareImage(page))}" />`,
  );
  if (page === 'home') tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd(lang))}</script>`);
  return ['<!-- arkan:head:start -->', ...tags, '<!-- arkan:head:end -->'].join('\n    ');
}

/** The page's hero photograph — must match the srcset <Picture> renders (AVIF, sizes from the registry). */
function heroPreload(page: PageKey | null): string {
  const hero = page ? pages[page].hero : undefined;
  if (!hero) return '';
  const asset = media[hero.image];
  const srcset = asset.widths.map((w) => `/media/${hero.image}-${w}.avif ${w}w`).join(', ');
  return `<link rel="preload" as="image" type="image/avif" fetchpriority="high" imagesrcset="${srcset}" imagesizes="${hero.sizes}" />`;
}

interface Extras {
  fonts: Partial<Record<Lang, string>>;
  chunks: Partial<Record<PageKey, string[]>>;
}

function render(html: string, lang: Lang, page: PageKey | null, extras?: Extras): string {
  const chunkLinks = (page && extras?.chunks[page]?.map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`).join('')) || '';
  return html
    .replace(/<html[^>]*>/, `<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}" style="background:#10141A">`)
    .replace(HEAD_RE, headBlock(lang, page))
    .replace(FONTS_RE, `<!-- arkan:fonts:start -->${extras?.fonts[lang] ?? ''}<!-- arkan:fonts:end -->`)
    .replace(PRELOAD_RE, `<!-- arkan:preload:start -->${heroPreload(page)}${chunkLinks}<!-- arkan:preload:end -->`);
}

/** "/en/about" → { lang: 'en', page: 'about' } (null page = unknown URL) */
function resolve(pathname: string): { lang: Lang; page: PageKey | null } {
  const clean = pathname.split(/[?#]/)[0];
  const lang: Lang = /^\/en(\/|$)/.test(clean) ? 'en' : 'ar';
  const bare =
    stripLang(clean)
      .replace(/\/index\.html$/, '/')
      .replace(/(.)\/$/, '$1') || '/';
  return { lang, page: PAGE_KEYS.find((k) => pages[k].path === bare) ?? null };
}

function sitemap(): string {
  const entries = PAGE_KEYS.flatMap((page) =>
    LANGS.map((lang) => {
      const alternates = LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${url(l, page)}"/>`).join('');
      const priority = Math.max(0.1, pages[page].priority - (lang === 'en' ? 0.1 : 0)).toFixed(1);
      return `  <url><loc>${url(lang, page)}</loc>${alternates}<changefreq>${pages[page].changefreq}</changefreq><priority>${priority}</priority></url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
}

/**
 * Static <head> per page and language. In dev every URL gets its own head; at build this writes
 * <lang>/<page>/index.html for every page, 404.html, sitemap.xml and robots.txt.
 */
function arkanSite(): Plugin[] {
  let outDir = 'dist';
  const extras: Extras = { fonts: {}, chunks: {} };

  return [
    {
      name: 'arkan:head',
      transformIndexHtml: {
        order: 'pre',
        handler: (html, ctx) => {
          const { lang, page } = resolve(ctx.originalUrl ?? ctx.path);
          return render(html, ctx.server ? lang : 'ar', ctx.server ? page : 'home');
        },
      },
    },
    {
      name: 'arkan:build-extras',
      apply: 'build',
      configResolved(config) {
        outDir = path.resolve(config.root, config.build.outDir);
      },
      generateBundle(_options, bundle) {
        const files = Object.keys(bundle);
        for (const lang of LANGS) {
          const font = files.find((f) => DISPLAY_FONT[lang].test(f));
          if (font) extras.fonts[lang] = `<link rel="preload" href="/${font}" as="font" type="font/woff2" crossorigin />`;
        }
        const entryImports = new Set<string>();
        for (const chunk of Object.values(bundle)) {
          if (chunk.type === 'chunk' && chunk.isEntry) [chunk.fileName, ...chunk.imports].forEach((f) => entryImports.add(f));
        }
        for (const chunk of Object.values(bundle)) {
          if (chunk.type !== 'chunk' || !chunk.facadeModuleId) continue;
          const match = PAGE_MODULE.find(([re]) => re.test(chunk.facadeModuleId!));
          if (match) extras.chunks[match[1]] = [chunk.fileName, ...chunk.imports].filter((f) => !entryImports.has(f));
        }
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n` });
      },
      closeBundle() {
        const file = path.join(outDir, 'index.html');
        if (!fs.existsSync(file)) return;
        const base = fs.readFileSync(file, 'utf8');
        for (const lang of LANGS) {
          for (const page of PAGE_KEYS) {
            const html = render(base, lang, page, extras);
            const route = withLang(lang, pages[page].path).replace(/\/$/, '');
            // "/about/index.html" serves "/about/", "/about.html" serves "/about" on hosts with clean URLs
            const targets = route
              ? [path.join(outDir, route, 'index.html'), path.join(outDir, `${route}.html`)]
              : [path.join(outDir, 'index.html')];
            for (const target of targets) {
              fs.mkdirSync(path.dirname(target), { recursive: true });
              fs.writeFileSync(target, html);
            }
          }
        }
        fs.writeFileSync(path.join(outDir, '404.html'), render(base, 'ar', null, extras));

        // every page must have its link-preview card (npm run media → public/og/)
        const missing = PAGE_KEYS.map(shareImage).filter((p) => !fs.existsSync(path.join(outDir, p)));
        if (missing.length) this.error(`Missing link-preview cards: ${[...new Set(missing)].join(', ')} — run npm run media`);
      },
    },
  ];
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /**
   * `--mode artifact` (npm run build:artifact) builds a static preview that runs from any URL path:
   * relative asset URLs, in-memory routing (src/app/router.tsx), fonts from Google Fonts and a single
   * JS bundle that scripts/build-artifact.mjs inlines into one page.
   */
  const artifact = mode === 'artifact';
  const srcDir = fileURLToPath(new URL('./src', import.meta.url));

  return {
    base: artifact ? './' : '/',
    plugins: [react(), tailwindcss(), ...(artifact ? [] : arkanSite())],
    resolve: {
      alias: [
        // must precede the generic "@" alias
        ...(artifact ? [{ find: '@/styles/fonts', replacement: path.join(srcDir, 'styles', 'fonts.hosted.ts') }] : []),
        { find: '@', replacement: srcDir },
      ],
    },
    build: {
      target: 'es2022',
      cssTarget: ['chrome111', 'safari16.4', 'firefox128'],
      // react-dom alone is ~200 kB minified — keep the warning meaningful for app code
      chunkSizeWarningLimit: artifact ? 900 : 260,
      rolldownOptions: {
        output: {
          // stable vendor chunks: cached across deploys, downloaded in parallel
          codeSplitting: artifact
            ? false
            : {
                groups: [
                  { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
                  { name: 'router', test: /node_modules[\\/]react-router[\\/]/ },
                  { name: 'motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils|lenis)[\\/]/ },
                ],
              },
        },
      },
    },
  };
});
