import type { PageKey } from '@/config/pages';

/** Primary navigation, in the order of the brief (mobile menu). */
export const MAIN_NAV: PageKey[] = ['home', 'about', 'services', 'projects', 'faq', 'quote', 'contact'];

/** Desktop header links — "Request a quote" is the header's main call-to-action button instead. */
export const HEADER_NAV: PageKey[] = ['home', 'about', 'services', 'projects', 'faq', 'contact'];

export const LEGAL_NAV: PageKey[] = ['privacy', 'terms'];

/** Home-page sections, in page order. Their ids double as URL hashes (#services …). */
export const SECTIONS = ['about', 'services', 'projects', 'why', 'process', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];

/** Section index shown in home-page labels (01 … 06) */
export const sectionIndex = (id: SectionId) => String(SECTIONS.indexOf(id) + 1).padStart(2, '0');

/** Two-digit sheet number, e.g. 3 → "03" */
export const pad2 = (n: number) => String(n).padStart(2, '0');
