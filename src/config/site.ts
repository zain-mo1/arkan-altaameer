/**
 * Company facts — single source of truth.
 * Used by the app at runtime AND by vite.config.ts (head tags, JSON-LD, sitemap),
 * so keep this file free of browser / Vite-only APIs.
 *
 * ⚠️ Placeholders to replace before launch are marked TODO.
 * Optional facts left as `null` are simply not rendered — never fill them with guesses.
 */
export const site = {
  /**
   * Production origin, no trailing slash — canonical URLs, link previews, sitemap and JSON-LD are built on it.
   * TODO: switch to the company domain once it is connected on Vercel.
   */
  url: 'https://arkan-altaameer.vercel.app',

  name: { ar: 'شركة أركان التعمير المتحدة', en: 'Arkan Altaameer United Co.' },
  shortName: { ar: 'أركان التعمير المتحدة', en: 'Arkan Altaameer' },
  tagline: { ar: 'نبني مساحات أفضل', en: 'We Build Better Spaces' },
  concept: { ar: 'من البناء إلى المساحة', en: 'From Structure to Space' },

  contact: {
    /** Calls — E.164 */
    phone: '+966502927751',
    phoneDisplay: '+966 50 292 7751',
    /** WhatsApp — international format, digits only (same line as calls) */
    whatsapp: '966502927751',
    /** Contact e-mail — also the recipient of the forms' "send by e-mail" option */
    email: 'bariaa19771@gmail.com',
    /** TODO (optional): working hours, e.g. { ar: 'الأحد – الخميس، ٨ ص – ٥ م', en: 'Sun – Thu, 8 am – 5 pm' } */
    hours: null as { ar: string; en: string } | null,
  },

  location: {
    city: { ar: 'الرياض', en: 'Riyadh' },
    country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
    full: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
    /** TODO (optional): office street address — shown on the contact page when provided */
    address: null as { ar: string; en: string } | null,
    /** City reference used as an architectural "site reference" (Riyadh city centre, not the office) */
    // Arabic: each figure wrapped in LTR isolates (U+2066 … U+2069) — after Arabic letters, "46°40′" would
    // otherwise be reordered as Arabic-number runs and display as "′40°46".
    coordinates: { ar: '\u206624°42′\u2069 شمالًا · \u206646°40′\u2069 شرقًا', en: '24°42′N · 46°40′E' },
    /** TODO: replace with the office's Google Maps link once available */
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Riyadh%2C+Saudi+Arabia',
    /** TODO (optional): Google Maps embed URL of the office — the contact page shows a live map when set */
    mapEmbedUrl: '',
  },

  /** TODO: real profile URLs. Entries with an empty url are hidden. */
  social: [
    { id: 'instagram', label: 'Instagram', url: '#' },
    { id: 'x', label: 'X', url: '#' },
    { id: 'linkedin', label: 'LinkedIn', url: '#' },
    { id: 'tiktok', label: 'TikTok', url: '#' },
  ] as { id: SocialId; label: string; url: string }[],

  forms: {
    /**
     * TODO (optional): endpoint that receives form submissions as multipart/form-data
     * (e.g. Formspree, Web3Forms, Basin or your own API). While empty, the contact and quote forms send
     * their content through WhatsApp (or e-mail), and file attachments are not offered.
     */
    endpoint: '',
    /** Attachment limits (only used when an endpoint is configured) */
    maxFiles: 5,
    maxFileMb: 10,
  },
};

export type SocialId = 'instagram' | 'x' | 'linkedin' | 'tiktok';
