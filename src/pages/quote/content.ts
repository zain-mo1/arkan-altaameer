import type { HeadingLines, Localized } from '@/i18n/types';

export type ProjectType = 'villa' | 'apartment' | 'building' | 'office' | 'retail' | 'hospitality' | 'other';
export type Stage = 'new' | 'shell' | 'renovation' | 'fitout';
export type Start = 'asap' | 'soon' | 'later' | 'planning';

interface QuoteContent {
  hero: { title: HeadingLines; lead: string; imageAlt: string; caption: string };
  steps: { title: string; items: { title: string; text: string }[] };
  sections: { title: string; text: string }[];
  fields: {
    projectType: string;
    projectTypes: Record<ProjectType, string>;
    services: string;
    servicesHint: string;
    location: string;
    locationPlaceholder: string;
    stage: string;
    stages: Record<Stage, string>;
    area: string;
    areaUnit: string;
    start: string;
    starts: Record<Start, string>;
    description: string;
    descriptionPlaceholder: string;
  };
  reference: { label: string; remove: string };
  progress: (done: number, total: number) => string;
  talk: string;
  waTitle: string;
  emailSubject: string;
  faq: { label: string; title: HeadingLines };
}

export const content: Localized<QuoteContent> = {
  ar: {
    hero: {
      title: [{ text: 'خطوتك الأولى' }, { text: 'نحو مساحة أفضل', accent: true }],
      lead: 'شاركنا تفاصيل مشروعك في دقائق، وسيراجعها فريقنا ثم يتواصل معك لاستيضاح ما يلزم وترتيب الخطوات التالية.',
      imageAlt: 'مخططات معمارية على طاولة عمل',
      caption: 'كل مشروع يبدأ بمخطط واضح',
    },
    steps: {
      title: 'ماذا يحدث بعد الإرسال؟',
      items: [
        { title: 'نراجع طلبك', text: 'يدرس فريقنا التفاصيل وأي مخططات أو صور ترسلها.' },
        { title: 'نتواصل معك', text: 'نستوضح ما يلزم، ونرتّب زيارة للموقع عند الحاجة.' },
        { title: 'نرسل عرض السعر', text: 'عرض واضح يحدد نطاق الأعمال والمواد والتكلفة والمدة.' },
      ],
    },
    sections: [
      { title: 'بيانات التواصل', text: 'لنعرف مع من نتواصل.' },
      { title: 'تفاصيل المشروع', text: 'نوع المشروع، وموقعه، والخدمات التي تحتاجها.' },
      { title: 'وصف المشروع', text: 'كلما كانت التفاصيل أوضح، كان العرض أدق.' },
    ],
    fields: {
      projectType: 'نوع المشروع',
      projectTypes: {
        villa: 'فيلا',
        apartment: 'شقة',
        building: 'مبنى أو مجمّع',
        office: 'مكتب أو مقر إداري',
        retail: 'محل أو صالة عرض',
        hospitality: 'مطعم أو مقهى أو فندق',
        other: 'أخرى',
      },
      services: 'الخدمات المطلوبة',
      servicesHint: 'يمكنك اختيار أكثر من خدمة.',
      location: 'موقع المشروع',
      locationPlaceholder: 'المدينة والحي — مثال: الرياض، حي النرجس',
      stage: 'حالة المشروع',
      stages: {
        new: 'مشروع جديد (أرض أو هيكل)',
        shell: 'مبنى قائم يحتاج تشطيبًا',
        renovation: 'تجديد مساحة قائمة',
        fitout: 'تجهيز مساحة تجارية أو مكتبية',
      },
      area: 'المساحة التقريبية',
      areaUnit: 'م²',
      start: 'موعد البدء المتوقع',
      starts: {
        asap: 'في أقرب وقت',
        soon: 'خلال 1–3 أشهر',
        later: 'خلال 3–6 أشهر',
        planning: 'ما زلت في مرحلة التخطيط',
      },
      description: 'وصف المشروع',
      descriptionPlaceholder: 'صف المشروع ونطاق الأعمال المطلوبة، ومستوى التشطيب الذي تتطلع إليه، وأي ملاحظات مهمة…',
    },
    reference: { label: 'بخصوص مشروع مشابه لـ', remove: 'إزالة المشروع المرجعي' },
    progress: (done, total) => `اكتمل ${done} من ${total} من الحقول المطلوبة`,
    talk: 'تفضّل المحادثة المباشرة؟',
    waTitle: 'طلب عرض سعر',
    emailSubject: 'طلب عرض سعر',
    faq: { label: 'عن عروض الأسعار', title: [{ text: 'أسئلة' }, { text: 'قبل الطلب', accent: true }] },
  },
  en: {
    hero: {
      title: [{ text: 'The first step' }, { text: 'to a better space', accent: true }],
      lead: 'Share your project details in a few minutes. Our team will review them, then contact you to clarify anything needed and arrange the next steps.',
      imageAlt: 'Architectural drawings on a work table',
      caption: 'Every project starts with a clear plan',
    },
    steps: {
      title: 'What happens next?',
      items: [
        { title: 'We review your request', text: 'Our team studies the details and any drawings or photos you send.' },
        { title: 'We get in touch', text: 'We clarify what’s needed and arrange a site visit where required.' },
        { title: 'You receive a quotation', text: 'A clear proposal setting out the scope, materials, cost and timeline.' },
      ],
    },
    sections: [
      { title: 'Your details', text: 'So we know who to get back to.' },
      { title: 'The project', text: 'What kind of project it is, where it is, and what you need.' },
      { title: 'Description', text: 'The clearer the details, the more accurate the quotation.' },
    ],
    fields: {
      projectType: 'Project type',
      projectTypes: {
        villa: 'Villa',
        apartment: 'Apartment',
        building: 'Building or compound',
        office: 'Office or headquarters',
        retail: 'Shop or showroom',
        hospitality: 'Restaurant, café or hotel',
        other: 'Other',
      },
      services: 'Services required',
      servicesHint: 'Choose as many as apply.',
      location: 'Project location',
      locationPlaceholder: 'City and district — e.g. Riyadh, Al Narjis',
      stage: 'Project stage',
      stages: {
        new: 'New build (plot or frame)',
        shell: 'Existing shell to finish',
        renovation: 'Renovating an existing space',
        fitout: 'Fitting out a commercial space',
      },
      area: 'Approximate area',
      areaUnit: 'm²',
      start: 'Expected start',
      starts: {
        asap: 'As soon as possible',
        soon: 'Within 1–3 months',
        later: 'Within 3–6 months',
        planning: 'Still planning',
      },
      description: 'Project description',
      descriptionPlaceholder:
        'Describe the project and the scope of work, the level of finish you’re after, and anything else we should know…',
    },
    reference: { label: 'Regarding a project similar to', remove: 'Remove the reference project' },
    progress: (done, total) => `${done} of ${total} required fields complete`,
    talk: 'Prefer to talk it through?',
    waTitle: 'Quote request',
    emailSubject: 'Quote request',
    faq: { label: 'About quotations', title: [{ text: 'Questions' }, { text: 'before you ask', accent: true }] },
  },
};
