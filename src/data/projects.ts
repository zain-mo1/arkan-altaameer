import type { Localized } from '@/i18n/types';
import type { MediaKey } from './media.generated';
import type { ServiceId } from './services';

export type ProjectCategory = 'residential' | 'offices' | 'retail' | 'hospitality';

export const PROJECT_CATEGORIES: Record<ProjectCategory, Localized> = {
  residential: { ar: 'سكني', en: 'Residential' },
  offices: { ar: 'مكاتب وشركات', en: 'Offices' },
  retail: { ar: 'محلات ومعارض', en: 'Retail & showrooms' },
  hospitality: { ar: 'مطاعم وضيافة', en: 'Hospitality' },
};

export interface Project {
  /** used in links: /projects?project=<slug> */
  slug: string;
  code: string;
  name: Localized;
  category: ProjectCategory;
  location: Localized;
  services: ServiceId[];
  /** one or two sentences on the scope delivered */
  summary: Localized;
  cover: MediaKey;
  coverAlt: Localized;
  /** extra photos shown in the project viewer */
  gallery?: { image: MediaKey; alt: Localized }[];
  status?: 'completed' | 'in-progress';
  /**
   * Optional facts — rendered only when provided. Fill them in from the client's records;
   * never estimate them.
   */
  facts?: Partial<Record<'client' | 'area' | 'year' | 'duration', Localized>>;
  /** shown on the home page (first four) */
  featured?: boolean;
}

const RIYADH: Localized = { ar: 'الرياض', en: 'Riyadh' };

/**
 * ⚠️ SAMPLE DATA — the names are generic descriptions and the photos are placeholders for layout review.
 * Replace with the client's real projects (add their photos to assets/photos + scripts/media.config.mjs,
 * run `npm run media`, then edit this list).
 */
export const projects: Project[] = [
  {
    slug: 'private-villa',
    code: 'P—01',
    name: { ar: 'فيلا خاصة', en: 'Private Villa' },
    category: 'residential',
    location: RIYADH,
    services: ['contracting', 'finishing', 'ceiling'],
    summary: {
      ar: 'تنفيذ متكامل لفيلا سكنية، من الهيكل الخرساني حتى التشطيبات الداخلية والأسقف والإضاءة.',
      en: 'End-to-end delivery of a private residence — from the concrete frame to the interior finishes, ceilings and lighting.',
    },
    cover: 'prj-villa',
    coverAlt: { ar: 'واجهة فيلا حديثة بالحجر والزجاج عند الغروب', en: 'Modern stone-and-glass villa façade at sunset' },
    status: 'completed',
    featured: true,
  },
  {
    slug: 'corporate-headquarters',
    code: 'P—02',
    name: { ar: 'مقر إداري', en: 'Corporate Headquarters' },
    category: 'offices',
    location: RIYADH,
    services: ['fitout', 'ceiling'],
    summary: {
      ar: 'تجهيز داخلي لردهة الاستقبال ومساحات العمل في مقر إداري، شمل الأسقف والتكسيات والإضاءة.',
      en: 'Interior fit-out of a headquarters’ reception lobby and workspaces, including ceilings, wall cladding and lighting.',
    },
    cover: 'prj-hq',
    coverAlt: { ar: 'ردهة مقر إداري بأرضيات رخامية وسقف خشبي', en: 'Headquarters lobby with marble floors and a timber ceiling' },
    status: 'completed',
    featured: true,
  },
  {
    slug: 'restaurant-cafe',
    code: 'P—03',
    name: { ar: 'مطعم ومقهى', en: 'Restaurant & Café' },
    category: 'hospitality',
    location: RIYADH,
    services: ['fitout', 'finishing'],
    summary: {
      ar: 'تجهيز مطعم ومقهى بتصميم داخلي دافئ، يشمل الأعمال الخشبية والتشطيبات والإضاءة ومنطقة الخدمة.',
      en: 'Fit-out of a restaurant and café with a warm interior — joinery, finishes, lighting and the service counter.',
    },
    cover: 'prj-restaurant',
    coverAlt: { ar: 'مطعم بتصميم داخلي داكن وشرائح خشبية', en: 'Restaurant interior with dark tones and timber slats' },
    status: 'completed',
    featured: true,
  },
  {
    slug: 'residential-tower-lobby',
    code: 'P—04',
    name: { ar: 'ردهة برج سكني', en: 'Residential Tower Lobby' },
    category: 'residential',
    location: RIYADH,
    services: ['finishing', 'ceiling'],
    summary: {
      ar: 'تشطيب ردهة الاستقبال في برج سكني بالرخام والتكسيات، مع سقف مضيء بإضاءة مدمجة.',
      en: 'Finishing of a residential tower’s reception lobby in marble and cladding, with a backlit ceiling and integrated lighting.',
    },
    cover: 'prj-residence',
    coverAlt: { ar: 'ردهة استقبال رخامية بسقف مضيء', en: 'Marble reception lobby with an illuminated ceiling' },
    status: 'completed',
    featured: true,
  },
  {
    slug: 'open-plan-office',
    code: 'P—05',
    name: { ar: 'مساحة عمل مفتوحة', en: 'Open-Plan Office' },
    category: 'offices',
    location: RIYADH,
    services: ['fitout', 'ceiling'],
    summary: {
      ar: 'تجهيز مساحة عمل مفتوحة بقواطع زجاجية وأسقف وإضاءة ملائمة لبيئة العمل اليومية.',
      en: 'Fit-out of an open-plan workspace with glass partitions, ceilings and lighting suited to everyday work.',
    },
    cover: 'prj-office',
    coverAlt: {
      ar: 'مكتب حديث يضم غرفة اجتماعات زجاجية منحنية ومحطات عمل',
      en: 'Modern office with a curved glass meeting room and workstations',
    },
    status: 'completed',
  },
  {
    slug: 'retail-showroom',
    code: 'P—06',
    name: { ar: 'صالة عرض تجارية', en: 'Retail Showroom' },
    category: 'retail',
    location: RIYADH,
    services: ['fitout', 'finishing', 'ceiling'],
    summary: {
      ar: 'تجهيز صالة عرض تجارية بوحدات عرض مخصصة وتشطيبات وإضاءة تُبرز المنتجات.',
      en: 'Fit-out of a retail showroom with bespoke display units, finishes and lighting that puts the product first.',
    },
    cover: 'prj-retail',
    coverAlt: {
      ar: 'جدار منحنٍ من وحدات عرض خشبية مع إضاءة مخفية وأرضية رخامية',
      en: 'Curved wall of timber display niches with concealed lighting and a marble floor',
    },
    status: 'completed',
  },
  {
    slug: 'majlis-reception',
    code: 'P—07',
    name: { ar: 'مجلس وصالة استقبال', en: 'Majlis & Reception Hall' },
    category: 'residential',
    location: RIYADH,
    services: ['finishing', 'ceiling'],
    summary: {
      ar: 'تشطيب مجلس وصالة استقبال في مسكن خاص، مع أعمال الجبس والتكسيات والإضاءة المخفية.',
      en: 'Finishing of a majlis and reception hall in a private home, with gypsum work, wall cladding and concealed lighting.',
    },
    cover: 'prj-majlis',
    coverAlt: {
      ar: 'مجلس استقبال بطابع عربي بأرائك كريمية وستارة مشربية وفوانيس معلّقة',
      en: 'Arabic-style majlis with cream sofas, a lattice screen and lantern pendants',
    },
    status: 'completed',
  },
  {
    slug: 'specialty-cafe',
    code: 'P—08',
    name: { ar: 'مقهى مختص', en: 'Specialty Café' },
    category: 'hospitality',
    location: RIYADH,
    services: ['fitout', 'finishing'],
    summary: {
      ar: 'تجهيز مقهى مختص بخامات طبيعية ومنطقة تحضير مفتوحة وجلسات مريحة.',
      en: 'Fit-out of a specialty café with natural materials, an open preparation bar and comfortable seating.',
    },
    cover: 'prj-cafe',
    coverAlt: {
      ar: 'مقهى مختص بطاولة خدمة طويلة من الخشب الفاتح وكراسٍ خشبية عالية',
      en: 'Specialty café with a long light-wood counter and wooden bar stools',
    },
    status: 'completed',
  },
  {
    slug: 'residential-apartment',
    code: 'P—09',
    name: { ar: 'شقة سكنية', en: 'Residential Apartment' },
    category: 'residential',
    location: RIYADH,
    services: ['finishing', 'ceiling'],
    summary: {
      ar: 'تشطيب داخلي متكامل لشقة سكنية: الأرضيات والجدران والأسقف والمطبخ والإضاءة.',
      en: 'Complete interior finishing of an apartment — floors, walls, ceilings, kitchen and lighting.',
    },
    cover: 'prj-apartment',
    coverAlt: {
      ar: 'شقة بتصميم مفتوح تجمع المعيشة والمطبخ بإضاءة دافئة مخفية',
      en: 'Open-plan apartment living room and kitchen with warm concealed lighting',
    },
    status: 'completed',
  },
  {
    slug: 'residential-building-structure',
    code: 'P—10',
    name: { ar: 'مبنى سكني — أعمال الهيكل', en: 'Residential Building — Structural Works' },
    category: 'residential',
    location: RIYADH,
    services: ['contracting'],
    summary: {
      ar: 'أعمال الهيكل الإنشائي لمبنى سكني متعدد الأدوار: الخرسانة المسلحة والمباني، تمهيدًا لمرحلة التشطيب.',
      en: 'Structural works for a multi-storey residential building — reinforced concrete and blockwork, ready for the finishing stage.',
    },
    cover: 'prj-structure',
    coverAlt: { ar: 'هيكل خرساني لمبنى قيد الإنشاء عند الغروب', en: 'Concrete frame of a building under construction at sunset' },
    status: 'in-progress',
  },
  {
    slug: 'feature-ceiling-hall',
    code: 'P—11',
    name: { ar: 'قاعة بسقف مميّز', en: 'Hall with a Feature Ceiling' },
    category: 'hospitality',
    location: RIYADH,
    services: ['ceiling', 'finishing'],
    summary: {
      ar: 'تنفيذ سقف مميّز لقاعة دائرية واسعة، بتصميم شعاعي وإضاءة مدمجة تمنح المكان حضوره.',
      en: 'A feature ceiling for a large circular hall — a radial design with integrated lighting that gives the space its presence.',
    },
    cover: 'prj-hall',
    coverAlt: {
      ar: 'قاعة دائرية بأعمدة تحت سقف شرائحي شعاعي بإضاءة دافئة',
      en: 'Circular hall with columns under a radial, warmly lit slatted ceiling',
    },
    status: 'completed',
  },
];

export const projectBySlug = (slug: string | null) => projects.find((p) => p.slug === slug);
