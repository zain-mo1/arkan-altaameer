/**
 * Page registry — paths, per-language metadata and the LCP image of every page.
 * Shared by the app (router, navigation, `useDocumentMeta`) and by vite.config.ts, which writes a static
 * HTML file with the right <head> for each page and language, plus sitemap.xml.
 * Keep this file free of browser / Vite-only APIs and of "@/..." imports (the Vite config can't resolve them).
 */
import type { MediaKey } from '../data/media.generated.ts';
import type { Lang, Localized } from '../i18n/types.ts';

export const PAGE_KEYS = ['home', 'about', 'services', 'projects', 'faq', 'quote', 'contact', 'privacy', 'terms'] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

interface PageDef {
  /** app path without the language prefix */
  path: string;
  /** above-the-fold photo, preloaded from the static HTML (must match the page's <Picture sizes>) */
  hero?: { image: MediaKey; sizes: string };
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
}

export const pages: Record<PageKey, PageDef> = {
  home: { path: '/', hero: { image: 'hero-contracting', sizes: '100vw' }, priority: 1, changefreq: 'monthly' },
  about: { path: '/about', hero: { image: 'page-about', sizes: '100vw' }, priority: 0.8, changefreq: 'monthly' },
  services: { path: '/services', hero: { image: 'page-services', sizes: '100vw' }, priority: 0.9, changefreq: 'monthly' },
  projects: { path: '/projects', hero: { image: 'page-projects', sizes: '100vw' }, priority: 0.9, changefreq: 'weekly' },
  faq: { path: '/faq', hero: { image: 'page-faq', sizes: '100vw' }, priority: 0.6, changefreq: 'monthly' },
  quote: { path: '/quote', priority: 0.8, changefreq: 'yearly' },
  contact: { path: '/contact', hero: { image: 'page-contact', sizes: '100vw' }, priority: 0.8, changefreq: 'yearly' },
  privacy: { path: '/privacy', priority: 0.2, changefreq: 'yearly' },
  terms: { path: '/terms', priority: 0.2, changefreq: 'yearly' },
};

export const locales: Record<Lang, string> = { ar: 'ar_SA', en: 'en_US' };

type Meta = { title: string; description: string };

export const meta: Record<PageKey, Localized<Meta>> = {
  home: {
    ar: {
      title: 'شركة أركان التعمير المتحدة | مقاولات عامة وتشطيبات داخلية في الرياض',
      description:
        'شركة أركان التعمير المتحدة — مقاولات عامة، تشطيبات داخلية، أسقف فرنسية وأعمال الـFit-Out للمشاريع السكنية والتجارية في الرياض، المملكة العربية السعودية.',
    },
    en: {
      title: 'Arkan Altaameer United Co. | Contracting & Interior Finishing in Riyadh',
      description:
        'Arkan Altaameer United Co. delivers general contracting, interior finishing, stretch ceilings and interior fit-out for residential and commercial projects in Riyadh, Saudi Arabia.',
    },
  },
  about: {
    ar: {
      title: 'من نحن | شركة أركان التعمير المتحدة',
      description:
        'تعرّف على شركة أركان التعمير المتحدة: شركة سعودية مقرّها الرياض، متخصصة في المقاولات العامة والتشطيبات الداخلية والأسقف الفرنسية وأعمال الـFit-Out — رؤيتنا ورسالتنا وقيمنا.',
    },
    en: {
      title: 'About Us | Arkan Altaameer United Co.',
      description:
        'Meet Arkan Altaameer United Co., a Riyadh-based Saudi company specialising in general contracting, interior finishing, stretch ceilings and interior fit-out — our vision, mission and values.',
    },
  },
  services: {
    ar: {
      title: 'خدماتنا | شركة أركان التعمير المتحدة',
      description:
        'المقاولات العامة، التشطيبات الداخلية، الأسقف الفرنسية وأعمال الـFit-Out — خدمات متكاملة تنفّذها شركة أركان التعمير المتحدة في الرياض، من الهيكل حتى التسليم.',
    },
    en: {
      title: 'Our Services | Arkan Altaameer United Co.',
      description:
        'General contracting, interior finishing, stretch ceilings and interior fit-out — integrated services delivered by Arkan Altaameer United in Riyadh, from structure to handover.',
    },
  },
  projects: {
    ar: {
      title: 'مشاريعنا | شركة أركان التعمير المتحدة',
      description:
        'مختارات من أعمال شركة أركان التعمير المتحدة في المقاولات العامة والتشطيبات الداخلية والأسقف الفرنسية وأعمال الـFit-Out للقطاعات السكنية والتجارية.',
    },
    en: {
      title: 'Our Projects | Arkan Altaameer United Co.',
      description:
        'A selection of work by Arkan Altaameer United in general contracting, interior finishing, stretch ceilings and fit-out across residential and commercial sectors.',
    },
  },
  faq: {
    ar: {
      title: 'الأسئلة الشائعة | شركة أركان التعمير المتحدة',
      description:
        'إجابات عن الأسئلة الأكثر شيوعًا حول خدمات شركة أركان التعمير المتحدة، والأسقف الفرنسية، وآلية تنفيذ المشاريع، وطلب عروض الأسعار.',
    },
    en: {
      title: 'FAQ | Arkan Altaameer United Co.',
      description:
        'Answers to common questions about Arkan Altaameer United’s services, stretch ceilings, how projects are delivered and how to request a quotation.',
    },
  },
  quote: {
    ar: {
      title: 'طلب عرض سعر | شركة أركان التعمير المتحدة',
      description:
        'أرسل تفاصيل مشروعك واطلب عرض سعر من شركة أركان التعمير المتحدة للمقاولات العامة أو التشطيبات الداخلية أو الأسقف الفرنسية أو أعمال الـFit-Out.',
    },
    en: {
      title: 'Request a Quote | Arkan Altaameer United Co.',
      description:
        'Share your project details and request a quotation from Arkan Altaameer United for general contracting, interior finishing, stretch ceilings or interior fit-out.',
    },
  },
  contact: {
    ar: {
      title: 'تواصل معنا | شركة أركان التعمير المتحدة',
      description:
        'تواصل مع شركة أركان التعمير المتحدة في الرياض عبر واتساب أو الهاتف أو البريد الإلكتروني، أو أرسل رسالتك مباشرة من الموقع.',
    },
    en: {
      title: 'Contact Us | Arkan Altaameer United Co.',
      description:
        'Get in touch with Arkan Altaameer United in Riyadh via WhatsApp, phone or email — or send us a message directly from the website.',
    },
  },
  privacy: {
    ar: {
      title: 'سياسة الخصوصية | شركة أركان التعمير المتحدة',
      description: 'كيف تجمع شركة أركان التعمير المتحدة بياناتك الشخصية وتستخدمها وتحميها عند استخدامك الموقع أو تواصلك معنا.',
    },
    en: {
      title: 'Privacy Policy | Arkan Altaameer United Co.',
      description: 'How Arkan Altaameer United collects, uses and protects your personal data when you use this website or contact us.',
    },
  },
  terms: {
    ar: {
      title: 'الشروط والأحكام | شركة أركان التعمير المتحدة',
      description: 'الشروط والأحكام المنظِّمة لاستخدام الموقع الإلكتروني لشركة أركان التعمير المتحدة.',
    },
    en: {
      title: 'Terms & Conditions | Arkan Altaameer United Co.',
      description: 'The terms and conditions that govern the use of the Arkan Altaameer United Co. website.',
    },
  },
};

/** Meta for URLs that don't exist (served by the SPA fallback / 404.html). */
export const notFoundMeta: Localized<Meta> = {
  ar: { title: 'الصفحة غير موجودة | شركة أركان التعمير المتحدة', description: meta.home.ar.description },
  en: { title: 'Page not found | Arkan Altaameer United Co.', description: meta.home.en.description },
};

/** The page whose path matches an app path (language prefix already stripped). */
export const pageByPath = (path: string): PageKey | undefined => PAGE_KEYS.find((k) => pages[k].path === path);

/**
 * Link-preview card of a page (1200×630, public/og/<page>.jpg, generated by `npm run media`): pages with a hero
 * photo have their own card, the others share the home card.
 */
export const shareImage = (page: PageKey | null) => `/og/${page && pages[page].hero ? page : 'home'}.jpg`;

/** Sheet number of a page, as printed in its hero ("02" for About …) */
export const pageIndex = (key: PageKey) => String(PAGE_KEYS.indexOf(key) + 1).padStart(2, '0');
