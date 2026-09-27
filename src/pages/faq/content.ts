import type { HeadingLines, Localized } from '@/i18n/types';

interface FaqContent {
  title: HeadingLines;
  lead: string;
  search: { label: string; placeholder: string; clear: string };
  summary: (questions: number, topics: number) => string;
  results: (n: number) => string;
  topics: string;
  empty: { title: string; text: string };
  cta: { label: string; title: HeadingLines; intro: string };
}

export const content: Localized<FaqContent> = {
  ar: {
    title: [{ text: 'إجابات واضحة' }, { text: 'لأسئلتك', accent: true }],
    lead: 'جمعنا هنا أكثر ما يسألنا عنه العملاء حول خدماتنا، والأسقف الفرنسية، وآلية تنفيذ المشاريع، وطلب عروض الأسعار.',
    search: {
      label: 'ابحث في الأسئلة',
      placeholder: 'اكتب كلمة مثل: السقف، عرض السعر، المدة…',
      clear: 'مسح البحث',
    },
    summary: (q, g) => `${q} سؤالًا في ${g} محاور`,
    results: (n) => (n === 1 ? 'نتيجة واحدة' : n === 2 ? 'نتيجتان' : n <= 10 ? `${n} نتائج` : `${n} نتيجة`),
    topics: 'المحاور',
    empty: {
      title: 'لم نجد سؤالًا مطابقًا',
      text: 'جرّب كلمة أخرى، أو اسألنا مباشرة وسنجيبك.',
    },
    cta: {
      label: 'ما زال لديك سؤال؟',
      title: [{ text: 'لم تجد' }, { text: 'إجابتك؟', accent: true }],
      intro: 'تواصل معنا مباشرة، ويسعد فريقنا بالإجابة عن سؤالك.',
    },
  },
  en: {
    title: [{ text: 'Clear answers' }, { text: 'to your questions', accent: true }],
    lead: 'The questions clients ask us most — about our services, stretch ceilings, how projects run and requesting a quotation.',
    search: {
      label: 'Search the questions',
      placeholder: 'Try “ceiling”, “quotation”, “timeline”…',
      clear: 'Clear search',
    },
    summary: (q, g) => `${q} questions across ${g} topics`,
    results: (n) => `${n} result${n === 1 ? '' : 's'}`,
    topics: 'Topics',
    empty: {
      title: 'No matching questions',
      text: 'Try another word — or ask us directly and we’ll answer.',
    },
    cta: {
      label: 'Still wondering?',
      title: [{ text: 'Still have' }, { text: 'a question?', accent: true }],
      intro: 'Get in touch directly — our team will be glad to answer.',
    },
  },
};
