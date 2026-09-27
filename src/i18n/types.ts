export type Lang = 'ar' | 'en';
export type Dir = 'rtl' | 'ltr';

/** A value that exists in both languages. */
export type Localized<T = string> = Record<Lang, T>;

/** A heading split into lines; `accent` lines are set in the brand gold. */
export type HeadingLines = ReadonlyArray<{ text: string; accent?: boolean }>;

export const LANGS: readonly Lang[] = ['ar', 'en'];
export const DEFAULT_LANG: Lang = 'ar';
export const dirOf = (lang: Lang): Dir => (lang === 'ar' ? 'rtl' : 'ltr');
