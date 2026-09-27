/**
 * Media pipeline configuration.
 *
 * Every photo placed in `assets/photos/<key>.jpg` must be listed here.
 * Run `npm run media` to (re)generate:
 *   - public/media/<key>-<width>.avif|webp   (responsive sets)
 *   - src/data/media.generated.ts            (typed manifest: size, focal point, color, blur placeholder)
 *
 * preset  → which responsive widths to produce (see PRESETS)
 * crop    → optional pre-crop to an aspect ratio around a focal point, so we never ship
 *           pixels that the layout crops away anyway (e.g. portrait source used as a banner)
 * focal   → [x%, y%] used as CSS object-position when the layout crops the image
 * source  → optional: build this key from another photo in assets/photos (no duplicate source files)
 */

export const PRESETS = {
  full: [640, 960, 1280, 1920, 2560],
  large: [480, 768, 1080, 1440, 1920],
  medium: [400, 640, 960, 1280],
};

/** @type {Record<string, { preset: keyof typeof PRESETS, source?: string, crop?: { ratio: number, focal?: [number, number] }, focal?: [number, number], quality?: number }>} */
export const PHOTOS = {
  // Hero — one slide per service line
  'hero-contracting': { preset: 'full', focal: [55, 62] },
  'hero-finishing': { preset: 'full', focal: [50, 55] },
  'hero-ceiling': { preset: 'full', focal: [50, 40] },
  'hero-fitout': { preset: 'full', focal: [58, 55] },

  // About — "From structure to space"
  'about-structure': { preset: 'large', crop: { ratio: 3 / 4, focal: [50, 45] }, focal: [50, 50] },
  'about-space': { preset: 'large', crop: { ratio: 4 / 3, focal: [55, 50] }, focal: [50, 50] },

  // Services panel (portrait frame)
  'svc-contracting': { preset: 'large', crop: { ratio: 4 / 5, focal: [50, 62] }, focal: [50, 60] },
  'svc-finishing': { preset: 'large', crop: { ratio: 4 / 5, focal: [50, 50] }, focal: [50, 50] },
  'svc-ceiling': { preset: 'large', crop: { ratio: 4 / 5, focal: [50, 40] }, focal: [50, 45] },
  'svc-fitout': { preset: 'large', crop: { ratio: 4 / 5, focal: [42, 50] }, focal: [45, 50] },

  // Featured projects (sample imagery until the client supplies project photography)
  'prj-villa': { preset: 'full', focal: [50, 55] },
  'prj-hq': { preset: 'large', focal: [50, 55] },
  'prj-restaurant': { preset: 'large', focal: [42, 55] },
  'prj-residence': { preset: 'full', focal: [45, 55] },

  // Details & backgrounds
  'why-detail': { preset: 'large', crop: { ratio: 16 / 9, focal: [50, 45] }, focal: [60, 50] },
  'cta-riyadh': { preset: 'full', crop: { ratio: 4 / 3, focal: [50, 58] }, focal: [55, 55] },
  'texture-slats': { preset: 'large', crop: { ratio: 4 / 5, focal: [50, 45] } },

  // Inner-page heroes (full-bleed, text on the reading side)
  'page-about': { preset: 'full', focal: [50, 45] },
  'page-services': { preset: 'full', focal: [45, 55] },
  'page-contact': { preset: 'full', crop: { ratio: 3 / 2, focal: [42, 50] }, focal: [40, 48] },
  'page-faq': { preset: 'full', focal: [60, 50] },
  'page-quote': { preset: 'large', crop: { ratio: 5 / 4, focal: [50, 50] } },

  // About page
  'about-site': { preset: 'large', crop: { ratio: 4 / 5, focal: [52, 55] }, focal: [50, 55] },
  'about-vision': { preset: 'full', focal: [55, 45] },
  'about-quality': { preset: 'large', crop: { ratio: 4 / 5, focal: [70, 50] }, focal: [60, 50] },
  'detail-joinery': { preset: 'medium', crop: { ratio: 3 / 4, focal: [50, 50] } },
  'detail-stone': { preset: 'medium', crop: { ratio: 3 / 4, focal: [50, 50] } },
  'detail-lighting': { preset: 'medium', crop: { ratio: 3 / 4, focal: [50, 45] } },
  'detail-plaster': { preset: 'medium', crop: { ratio: 3 / 4, focal: [50, 50] } },

  // Projects page hero — the majlis photograph, framed wide
  'page-projects': { preset: 'full', source: 'prj-majlis', focal: [50, 58] },

  // Sample projects (placeholder photography until the client's own project photos arrive)
  'prj-office': { preset: 'large', focal: [45, 55] },
  'prj-retail': { preset: 'large', focal: [55, 50] },
  'prj-majlis': { preset: 'large', focal: [50, 60] },
  'prj-cafe': { preset: 'large', focal: [40, 55] },
  'prj-apartment': { preset: 'large', focal: [45, 50] },
  'prj-structure': { preset: 'large', focal: [62, 58] },
  'prj-hall': { preset: 'full', focal: [50, 45] },

  // Services page — stretch-ceiling detail (portrait frame)
  'svc-ceiling-2': { preset: 'large', crop: { ratio: 4 / 5, focal: [60, 45] }, focal: [55, 45] },
};
