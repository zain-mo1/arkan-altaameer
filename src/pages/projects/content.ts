import type { HeadingLines, Localized } from '@/i18n/types';

interface ProjectsContent {
  hero: { title: HeadingLines; lead: string; stripLabel: string };
  count: (n: number) => string;
  filter: { label: string; all: string };
  viewer: {
    label: string;
    close: string;
    prevProject: string;
    nextProject: string;
    prevImage: string;
    nextImage: string;
    category: string;
    location: string;
    services: string;
    status: { completed: string; 'in-progress': string };
    facts: { client: string; area: string; year: string; duration: string };
    quote: string;
    whatsapp: string;
  };
  cta: { label: string; title: HeadingLines; intro: string };
}

export const content: Localized<ProjectsContent> = {
  ar: {
    hero: {
      title: [{ text: 'مختارات' }, { text: 'من أعمالنا', accent: true }],
      lead: 'مشاريع سكنية وتجارية ومكتبية نفّذنا فيها أعمال المقاولات والتشطيبات والأسقف الفرنسية والـFit-\u2060Out. تصفّحها حسب القطاع، واطّلع على تفاصيل كل مشروع.',
      stripLabel: 'المشاريع حسب القطاع',
    },
    count: (n) => (n === 1 ? 'مشروع واحد' : n === 2 ? 'مشروعان' : n <= 10 ? `${n} مشاريع` : `${n} مشروعًا`),
    filter: { label: 'تصفية المشاريع حسب القطاع', all: 'جميع المشاريع' },
    viewer: {
      label: 'تفاصيل المشروع',
      close: 'إغلاق',
      prevProject: 'المشروع السابق',
      nextProject: 'المشروع التالي',
      prevImage: 'الصورة السابقة',
      nextImage: 'الصورة التالية',
      category: 'القطاع',
      location: 'الموقع',
      services: 'الخدمات المنفّذة',
      status: { completed: 'مكتمل', 'in-progress': 'قيد التنفيذ' },
      facts: { client: 'العميل', area: 'المساحة', year: 'السنة', duration: 'مدة التنفيذ' },
      quote: 'اطلب مشروعًا مشابهًا',
      whatsapp: 'ناقش مشروعًا مشابهًا',
    },
    cta: {
      label: 'مشروعك التالي',
      title: [{ text: 'مشروعك' }, { text: 'قد يكون التالي', accent: true }],
      intro: 'شاركنا فكرتك، وسنساعدك على تحويلها إلى مساحة متكاملة.',
    },
  },
  en: {
    hero: {
      title: [{ text: 'A selection' }, { text: 'of our work', accent: true }],
      lead: 'Residential, commercial and office projects where we delivered contracting, finishing, stretch ceilings and fit-out. Browse by sector and open any project for its details.',
      stripLabel: 'Projects by sector',
    },
    count: (n) => `${n} project${n === 1 ? '' : 's'}`,
    filter: { label: 'Filter projects by sector', all: 'All projects' },
    viewer: {
      label: 'Project details',
      close: 'Close',
      prevProject: 'Previous project',
      nextProject: 'Next project',
      prevImage: 'Previous image',
      nextImage: 'Next image',
      category: 'Sector',
      location: 'Location',
      services: 'Services delivered',
      status: { completed: 'Completed', 'in-progress': 'In progress' },
      facts: { client: 'Client', area: 'Area', year: 'Year', duration: 'Duration' },
      quote: 'Request a similar project',
      whatsapp: 'Discuss a similar project',
    },
    cta: {
      label: 'Your next project',
      title: [{ text: 'Your project' }, { text: 'could be next', accent: true }],
      intro: 'Share your idea, and we’ll help you turn it into a complete space.',
    },
  },
};
