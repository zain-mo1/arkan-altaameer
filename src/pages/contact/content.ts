import type { HeadingLines, Localized } from '@/i18n/types';

export type Subject = 'general' | 'service' | 'project' | 'supply' | 'other';

interface ContactContent {
  hero: { title: HeadingLines; lead: string; strip: [string, string, string, string]; stripLabel: string };
  channels: {
    label: string;
    title: HeadingLines;
    intro: string;
    whatsapp: { label: string; action: string };
    phone: { label: string; action: string };
    email: { label: string; action: string };
    location: { label: string; action: string };
    hours: string;
  };
  form: {
    label: string;
    title: HeadingLines;
    intro: string;
    subject: string;
    subjects: Record<Subject, string>;
    message: string;
    messagePlaceholder: string;
    waTitle: string;
    emailSubject: string;
    quote: { title: string; text: string; cta: string };
    direct: string;
  };
  location: {
    label: string;
    title: HeadingLines;
    text: string;
    city: string;
    reference: string;
    open: string;
    north: string;
  };
  faq: { label: string; title: HeadingLines; more: string };
}

export const content: Localized<ContactContent> = {
  ar: {
    hero: {
      title: [{ text: 'لنبدأ الحديث' }, { text: 'عن مشروعك', accent: true }],
      lead: 'يسعدنا أن نستمع إلى متطلباتك ونجيب عن أسئلتك. اختر قناة التواصل التي تناسبك، أو أرسل رسالتك مباشرة من هذه الصفحة.',
      strip: ['قنوات التواصل', 'أرسل رسالة', 'موقعنا', 'أسئلة شائعة'],
      stripLabel: 'محتويات الصفحة',
    },
    channels: {
      label: 'قنوات التواصل',
      title: [{ text: 'اختر الطريقة' }, { text: 'التي تناسبك', accent: true }],
      intro: 'واتساب للمحادثة المباشرة، والهاتف للاتصال، والبريد الإلكتروني للمراسلات الرسمية وإرسال الملفات.',
      whatsapp: { label: 'واتساب', action: 'ابدأ المحادثة' },
      phone: { label: 'الهاتف', action: 'اتصل الآن' },
      email: { label: 'البريد الإلكتروني', action: 'أرسل رسالة' },
      location: { label: 'الموقع', action: 'افتح في الخرائط' },
      hours: 'ساعات العمل',
    },
    form: {
      label: 'نموذج التواصل',
      title: [{ text: 'أرسل لنا' }, { text: 'رسالتك', accent: true }],
      intro: 'اكتب لنا استفسارك، وسيتواصل معك فريقنا على رقم الجوال الذي تُدخله.',
      subject: 'موضوع الرسالة',
      subjects: {
        general: 'استفسار عام',
        service: 'الاستفسار عن خدمة',
        project: 'متابعة مشروع قائم',
        supply: 'الموردون والشراكات',
        other: 'موضوع آخر',
      },
      message: 'رسالتك',
      messagePlaceholder: 'اكتب استفسارك أو نبذة عن مشروعك…',
      waTitle: 'رسالة من صفحة التواصل',
      emailSubject: 'رسالة من الموقع الإلكتروني',
      quote: {
        title: 'تبحث عن عرض سعر لمشروعك؟',
        text: 'نموذج طلب عرض السعر يجمع التفاصيل التي نحتاجها لإعداد عرض دقيق: نوع المشروع والخدمات المطلوبة والموقع والمساحة.',
        cta: 'اطلب عرض سعر',
      },
      direct: 'أو تواصل مباشرة',
    },
    location: {
      label: 'موقعنا',
      title: [{ text: 'من قلب' }, { text: 'الرياض', accent: true }],
      text: 'مقرّنا في مدينة الرياض بالمملكة العربية السعودية. للاجتماعات والزيارات، يُرجى التنسيق معنا مسبقًا عبر واتساب أو الهاتف.',
      city: 'المدينة',
      reference: 'مرجع الموقع',
      open: 'افتح في خرائط جوجل',
      north: 'ش',
    },
    faq: {
      label: 'أسئلة شائعة',
      title: [{ text: 'قبل أن' }, { text: 'تتواصل معنا', accent: true }],
      more: 'جميع الأسئلة الشائعة',
    },
  },
  en: {
    hero: {
      title: [{ text: 'Let’s talk about' }, { text: 'your project', accent: true }],
      lead: 'We’d be glad to hear about your requirements and answer your questions. Choose the channel that suits you, or send your message straight from this page.',
      strip: ['Ways to reach us', 'Send a message', 'Our location', 'Common questions'],
      stripLabel: 'On this page',
    },
    channels: {
      label: 'Contact channels',
      title: [{ text: 'Choose the way' }, { text: 'that suits you', accent: true }],
      intro: 'WhatsApp for a direct conversation, the phone for a call, and email for formal correspondence and files.',
      whatsapp: { label: 'WhatsApp', action: 'Start a chat' },
      phone: { label: 'Phone', action: 'Call now' },
      email: { label: 'Email', action: 'Write to us' },
      location: { label: 'Location', action: 'Open in Maps' },
      hours: 'Working hours',
    },
    form: {
      label: 'Contact form',
      title: [{ text: 'Send us' }, { text: 'a message', accent: true }],
      intro: 'Tell us what you need, and our team will get back to you on the mobile number you provide.',
      subject: 'Subject',
      subjects: {
        general: 'General enquiry',
        service: 'A specific service',
        project: 'An ongoing project',
        supply: 'Suppliers & partnerships',
        other: 'Something else',
      },
      message: 'Your message',
      messagePlaceholder: 'Your question, or a few words about your project…',
      waTitle: 'Message from the contact page',
      emailSubject: 'Message from the website',
      quote: {
        title: 'Looking for a quotation?',
        text: 'The quote request form gathers what we need to prepare an accurate proposal: project type, services, location and area.',
        cta: 'Request a quote',
      },
      direct: 'Or reach us directly',
    },
    location: {
      label: 'Our location',
      title: [{ text: 'Based in' }, { text: 'Riyadh', accent: true }],
      text: 'We’re based in Riyadh, Saudi Arabia. For meetings and visits, please arrange a time with us in advance via WhatsApp or phone.',
      city: 'City',
      reference: 'Site reference',
      open: 'Open in Google Maps',
      north: 'N',
    },
    faq: {
      label: 'Common questions',
      title: [{ text: 'Before you' }, { text: 'get in touch', accent: true }],
      more: 'All frequently asked questions',
    },
  },
};
