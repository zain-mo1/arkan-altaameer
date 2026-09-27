import { site } from '@/config/site';

export const waLink = (text?: string) => `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const telLink = `tel:${site.contact.phone}`;
export const mailLink = `mailto:${site.contact.email}`;

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** Converts Arabic-Indic / Persian digits to Latin digits (users often type ٠٥٥…). */
export const toLatinDigits = (value: string) =>
  value.replace(/[٠-٩۰-۹]/g, (d) => String(ARABIC_DIGITS.includes(d) ? ARABIC_DIGITS.indexOf(d) : PERSIAN_DIGITS.indexOf(d)));
