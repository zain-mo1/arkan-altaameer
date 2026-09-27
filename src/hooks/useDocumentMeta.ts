import { useLayoutEffect } from 'react';
import { locales, meta, notFoundMeta, pages, type PageKey } from '@/config/pages';
import { site } from '@/config/site';
import { useLang } from '@/i18n/context';
import { withLang } from '@/i18n/paths';
import { LANGS } from '@/i18n/types';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

/**
 * Keeps <html lang/dir>, <title>, description, canonical, hreflang and Open Graph tags in sync with the route.
 * The static HTML of every page already ships the same tags (see vite.config.ts); this covers client navigation.
 * `page = null` → "not found" (noindex, no canonical).
 */
export function useDocumentMeta(page: PageKey | null) {
  const { lang, dir } = useLang();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;

    const m = page ? meta[page][lang] : notFoundMeta[lang];
    document.title = m.title;
    setMeta('name', 'description', m.description);
    setMeta('property', 'og:title', m.title);
    setMeta('property', 'og:description', m.description);
    setMeta('property', 'og:locale', locales[lang]);

    if (page) {
      const url = (l: typeof lang) => site.url + withLang(l, pages[page].path);
      setMeta('property', 'og:url', url(lang));
      setLink('link[rel="canonical"]', { rel: 'canonical', href: url(lang) });
      for (const l of LANGS) setLink(`link[rel="alternate"][hreflang="${l}"]`, { rel: 'alternate', hreflang: l, href: url(l) });
      setLink('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: url('ar') });
      document.head.querySelector('meta[name="robots"]')?.remove();
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove();
      setMeta('name', 'robots', 'noindex, follow');
    }
  }, [lang, dir, page]);
}
