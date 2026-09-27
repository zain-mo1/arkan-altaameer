import { createContext, useContext } from 'react';
import type { Dictionary } from './ar';
import type { Dir, Lang, Localized } from './types';

export interface LangContextValue {
  lang: Lang;
  dir: Dir;
  isRTL: boolean;
  /** UI copy for the active language */
  t: Dictionary;
  /** Pick the active language from a localized value */
  pick: <T>(value: Localized<T>) => T;
  /** Root path of the active language ("/" or "/en/") */
  home: string;
  /** Prefix an app path with the active language ("/about" → "/en/about") */
  path: (to: string) => string;
  /** The other language, and the equivalent URL of a pathname in it */
  altLang: Lang;
  altPath: (pathname: string) => string;
}

export const LangContext = createContext<LangContextValue | null>(null);

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
