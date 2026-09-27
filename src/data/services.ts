import type { HeadingLines, Localized } from '@/i18n/types';
import type { MediaKey } from './media.generated';

export type ServiceId = 'contracting' | 'finishing' | 'ceiling' | 'fitout';

export interface Service {
  /** also the section id on the Services page (/services#ceiling) */
  id: ServiceId;
  index: string;
  title: Localized;
  /** compact title for tight UI (hero strip on mobile) */
  short: Localized;
  tagline: Localized;
  description: Localized;
  /** NOTE: indicative scope — to be confirmed with the client */
  scope: Localized<string[]>;
  image: MediaKey;
  imageAlt: Localized;
  hero: MediaKey;
  heroAlt: Localized;
  /** home-page hero slide: headline (the accent line is set in gold) and a supporting line */
  heroTitle: Localized<HeadingLines>;
  heroBody: Localized;
}

export const services: Service[] = [
  {
    id: 'contracting',
    index: '01',
    title: { ar: 'المقاولات العامة', en: 'General Contracting' },
    short: { ar: 'المقاولات العامة', en: 'Contracting' },
    tagline: { ar: 'من الهيكل حتى التسليم', en: 'From structure to handover' },
    description: {
      ar: 'تنفيذ وإدارة أعمال المقاولات وفق متطلبات المشروع ومعايير الجودة، من الأعمال الإنشائية حتى التسليم.',
      en: 'Execution and management of contracting works to your project’s requirements and to rigorous quality standards — from structural works through to handover.',
    },
    scope: {
      ar: ['الأعمال الإنشائية', 'أعمال البناء', 'إدارة التنفيذ'],
      en: ['Structural works', 'Building works', 'Construction management'],
    },
    image: 'svc-contracting',
    imageAlt: { ar: 'أبراج قيد الإنشاء ورافعات عند الغروب', en: 'Towers under construction with cranes at sunset' },
    hero: 'hero-contracting',
    heroAlt: { ar: 'فيلا عصرية مضاءة عند الغسق', en: 'Contemporary villa illuminated at dusk' },
    // first slide introduces the company: brand name + tagline
    heroTitle: {
      ar: [{ text: 'أركان التعمير' }, { text: 'نبني مساحات أفضل', accent: true }],
      en: [{ text: 'Arkan Altaameer' }, { text: 'We build better spaces', accent: true }],
    },
    heroBody: {
      ar: 'شركة سعودية للمقاولات العامة والتشطيبات الداخلية، ننفّذ مشروعك من الأعمال الإنشائية حتى التسليم، بإدارة منظّمة ومعايير جودة واضحة.',
      en: 'A Saudi contracting and interior finishing company, taking your project from structural works to handover with organised management and clear quality standards.',
    },
  },
  {
    id: 'finishing',
    index: '02',
    title: { ar: 'التشطيبات الداخلية', en: 'Interior Finishing' },
    short: { ar: 'التشطيبات الداخلية', en: 'Finishing' },
    tagline: { ar: 'تنفيذ متكامل بجودة عالية', en: 'Complete execution, uncompromising quality' },
    description: {
      ar: 'تنفيذ أعمال التشطيبات الداخلية، وتحويل المساحات إلى بيئات متكاملة وجاهزة للاستخدام.',
      en: 'Interior finishing works that transform raw spaces into complete, refined environments — ready to use.',
    },
    scope: {
      ar: ['الأرضيات والجدران', 'الجبس والدهانات', 'الأعمال الخشبية'],
      en: ['Floors & walls', 'Gypsum & paintwork', 'Joinery'],
    },
    image: 'svc-finishing',
    imageAlt: { ar: 'مغسلة فاخرة بتشطيبات رخامية وإضاءة دافئة', en: 'Luxury vanity with marble finishes and warm lighting' },
    hero: 'hero-finishing',
    heroAlt: { ar: 'صالة معيشة فاخرة بتكسيات داكنة وخطوط إضاءة', en: 'Luxury living room with dark panelling and linear lighting' },
    heroTitle: {
      ar: [{ text: 'تشطيبات تليق' }, { text: 'بمساحتك', accent: true }],
      en: [{ text: 'Every detail,' }, { text: 'finished', accent: true }],
    },
    heroBody: {
      ar: 'أرضيات وجدران وجبس وأعمال خشبية وإضاءة؛ تنفيذ متكامل بمواد مختارة بعناية، ودقّة في كل تفصيلة.',
      en: 'Floors, walls, gypsum, joinery and lighting — complete finishing works in carefully chosen materials, precise in every detail.',
    },
  },
  {
    id: 'ceiling',
    index: '03',
    title: { ar: 'الأسقف الفرنسية', en: 'Stretch Ceilings' },
    short: { ar: 'الأسقف الفرنسية', en: 'Ceilings' },
    tagline: { ar: 'تصاميم عصرية وإضاءة مدمجة', en: 'Contemporary designs, integrated lighting' },
    description: {
      ar: 'حلول متخصصة للأسقف الفرنسية بتصاميم وتشطيبات تناسب مختلف المساحات، مع إمكانية دمج الإضاءة.',
      en: 'Specialist stretch ceiling solutions, with designs and finishes tailored to every kind of space — including integrated lighting.',
    },
    scope: {
      ar: ['أسقف مضيئة', 'تصاميم مطبوعة', 'تشطيبات لامعة ومطفية'],
      en: ['Backlit ceilings', 'Printed designs', 'Gloss & matte finishes'],
    },
    image: 'svc-ceiling',
    imageAlt: { ar: 'سقف منحني بإضاءة مخفية دافئة', en: 'Curved ceiling with warm concealed lighting' },
    hero: 'hero-ceiling',
    heroAlt: { ar: 'سقف انسيابي بإضاءة مدمجة وشرائح خشبية', en: 'Flowing ceiling with integrated lighting and timber slats' },
    heroTitle: {
      ar: [{ text: 'أسقف ناعمة' }, { text: 'بلا فواصل', accent: true }],
      en: [{ text: 'Seamless' }, { text: 'ceilings', accent: true }],
    },
    heroBody: {
      ar: 'أسقف فرنسية بتشطيبات مطفية ولامعة ومضيئة ومطبوعة، تُركَّب بسرعة ونظافة، وتمنح المساحة طابعًا عصريًا.',
      en: 'Stretch ceilings in matte, gloss, backlit and printed finishes, with lighting built in — installed quickly and cleanly.',
    },
  },
  {
    id: 'fitout',
    index: '04',
    title: { ar: 'أعمال الـFit-\u2060Out', en: 'Interior Fit-\u2060Out' },
    short: { ar: 'أعمال الـFit-\u2060Out', en: 'Fit-\u2060Out' },
    tagline: { ar: 'مساحات جاهزة للاستخدام', en: 'Spaces ready for use' },
    description: {
      ar: 'تنفيذ وتجهيز المساحات الداخلية للمشاريع السكنية والتجارية، لتكون جاهزة للتشغيل من اليوم الأول.',
      en: 'Complete fit-out of residential and commercial interiors, delivered ready to operate from day one.',
    },
    scope: {
      ar: ['المكاتب والمقرات', 'المحلات وصالات العرض', 'المطاعم والمقاهي'],
      en: ['Offices & headquarters', 'Retail & showrooms', 'Restaurants & cafés'],
    },
    image: 'svc-fitout',
    imageAlt: { ar: 'مساحة مكتبية مجهزة بواجهات زجاجية وتكسيات خشبية', en: 'Fitted-out office with glass partitions and timber cladding' },
    hero: 'hero-fitout',
    heroAlt: { ar: 'ردهة استقبال بتكسيات خشبية ورخامية', en: 'Reception lobby with timber and marble finishes' },
    heroTitle: {
      ar: [{ text: 'جاهزة' }, { text: 'من أول يوم', accent: true }],
      en: [{ text: 'Spaces ready' }, { text: 'from day one', accent: true }],
    },
    heroBody: {
      ar: 'تجهيز داخلي متكامل للمكاتب والمحلات والمطاعم والمساحات السكنية، ضمن جدول زمني يراعي موعد افتتاحك.',
      en: 'Complete fit-out for offices, shops, restaurants and homes — on a schedule built around your opening date.',
    },
  },
];

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
