import { useMemo, type ReactNode } from 'react';
import { ar, type Dictionary } from './ar';
import { LangContext, type LangContextValue } from './context';
import { en } from './en';
import { stripLang, withLang } from './paths';
import { dirOf, type Lang } from './types';

const dictionaries: Record<Lang, Dictionary> = { ar, en };

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<LangContextValue>(() => {
    const altLang: Lang = lang === 'ar' ? 'en' : 'ar';
    return {
      lang,
      dir: dirOf(lang),
      isRTL: lang === 'ar',
      t: dictionaries[lang],
      pick: (v) => v[lang],
      home: withLang(lang, '/'),
      path: (to) => withLang(lang, to),
      altLang,
      altPath: (pathname) => withLang(altLang, stripLang(pathname)),
    };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
