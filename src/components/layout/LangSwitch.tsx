import { Fragment } from 'react';
import { Link, useLocation } from 'react-router';
import { useLang } from '@/i18n/context';
import { stripLang, withLang } from '@/i18n/paths';
import { LANGS, type Lang } from '@/i18n/types';
import { cn } from '@/lib/cn';

/** Each language is always written in its own script. */
const NAMES: Record<Lang, string> = { ar: 'العربية', en: 'English' };
const SHORT: Record<Lang, string> = { ar: 'العربية', en: 'EN' };

/**
 * "العربية | English" — the active language is marked, the other one links to the same page in that
 * language (keeping the scroll position and query string).
 * `compact` shows only the other language, for tight headers on phones.
 */
export function LangSwitch({ compact, className }: { compact?: boolean; className?: string }) {
  const { lang, t } = useLang();
  const { pathname, search } = useLocation();
  const target = (l: Lang) => withLang(l, stripLang(pathname)) + search;

  if (compact) {
    const other: Lang = lang === 'ar' ? 'en' : 'ar';
    return (
      <Link
        to={target(other)}
        preventScrollReset
        hrefLang={other}
        lang={other}
        aria-label={NAMES[other]}
        className={cn(
          'grid h-10 min-w-10 place-items-center border border-stone/20 px-3 text-[0.8rem] font-semibold text-stone transition-colors duration-300 hover:border-gold hover:text-gold',
          other === 'en' ? 'font-latin tracking-[0.12em]' : 'font-arabic',
          className,
        )}
      >
        {SHORT[other]}
      </Link>
    );
  }

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={cn('flex h-10 items-center gap-3 border border-stone/20 px-3.5 text-[0.8rem] font-semibold', className)}
    >
      {LANGS.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden className="h-3.5 w-px bg-stone/25" />}
          {l === lang ? (
            <span lang={l} aria-current="true" className={cn('text-gold', l === 'en' ? 'font-latin' : 'font-arabic')}>
              {NAMES[l]}
            </span>
          ) : (
            <Link
              to={target(l)}
              preventScrollReset
              hrefLang={l}
              lang={l}
              className={cn('text-stone/70 transition-colors duration-300 hover:text-stone', l === 'en' ? 'font-latin' : 'font-arabic')}
            >
              {NAMES[l]}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}
