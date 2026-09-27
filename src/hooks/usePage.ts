import { useLocation } from 'react-router';
import { pageByPath, type PageKey } from '@/config/pages';
import { useLang } from '@/i18n/context';
import { stripLang } from '@/i18n/paths';

/** The registered page currently shown (undefined on unknown URLs). */
export function usePage(): PageKey | undefined {
  const { pathname } = useLocation();
  return pageByPath(stripLang(pathname).replace(/(.)\/$/, '$1'));
}

/** WhatsApp message that fits the page the visitor is on. */
export function usePageWhatsAppMessage(): string {
  const { t } = useLang();
  const page = usePage();
  switch (page) {
    case 'about':
    case 'services':
    case 'projects':
    case 'faq':
    case 'quote':
    case 'contact':
      return t.wa[page];
    default:
      return t.wa.home;
  }
}
