import type { Lang } from './types.ts';

/** "/en/about" → "/about", "/en" → "/" */
export const stripLang = (pathname: string) => pathname.replace(/^\/en(?=\/|$)/, '') || '/';

/** "/about" → "/en/about" (English) or "/about" (Arabic, the default language) */
export const withLang = (lang: Lang, to: string) => (lang === 'en' ? `/en${to === '/' ? '/' : to}` : to);
