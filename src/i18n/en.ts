import type { Dictionary } from './ar';
import type { HeadingLines } from './types';

/** English UI copy — written as native corporate English, not a literal translation. */
export const en: Dictionary = {
  a11y: {
    skip: 'Skip to content',
    home: 'Arkan Altaameer United Co. — Home',
    mainNav: 'Main navigation',
    footerNav: 'Site links',
    breadcrumb: 'Breadcrumb',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    backToTop: 'Back to top',
    social: 'Our social media profiles',
    prev: 'Previous',
    next: 'Next',
  },

  nav: {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    projects: 'Projects',
    faq: 'FAQ',
    quote: 'Request a Quote',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
  },

  cta: {
    quote: 'Request a quote',
    quoteShort: 'Get a quote',
    contact: 'Contact us',
    whatsapp: 'Chat on WhatsApp',
    whatsappShort: 'WhatsApp',
    call: 'Call us',
    email: 'Email us',
    projects: 'Explore our projects',
    services: 'Explore our services',
    faq: 'Browse the FAQ',
    home: 'Back to home',
  },

  wa: {
    home: 'Hello, I’d like to enquire about Arkan Altaameer United’s services.',
    about: 'Hello, I’ve read about Arkan Altaameer United and would like to talk to you about a project.',
    services: 'Hello, I’d like to enquire about your services.',
    service: (name: string) => `Hello, I’d like to enquire about your ${name} service.`,
    projects: 'Hello, I’ve seen your projects and would like to discuss a project of mine.',
    project: (name: string) => `Hello, I saw the “${name}” project and would like something similar delivered.`,
    faq: 'Hello, I have a question that isn’t answered in your FAQ.',
    quote: 'Hello, I’d like to request a quotation for my project.',
    contact: 'Hello, I’d like to get in touch with the Arkan Altaameer United team.',
  },

  common: {
    onThisPage: 'On this page',
    lastUpdated: 'Last updated',
    all: 'All',
  },

  form: {
    optional: 'optional',
    name: 'Full name',
    company: 'Company or organisation',
    phone: 'Mobile number',
    phonePlaceholder: '+966 5X XXX XXXX',
    email: 'Email address',
    emailPlaceholder: 'name@company.com',
    errors: {
      name: 'Please enter your name',
      phone: 'Please enter a valid mobile number',
      email: 'Please enter a valid email address',
      required: 'Please fill in this field',
      select: 'Please choose an option',
      services: 'Please choose at least one service',
      message: 'Please add a short description (at least 10 characters)',
      fileType: (name: string) => `“${name}” isn’t supported — please attach PDFs or images`,
      fileSize: (name: string, mb: number) => `“${name}” is larger than ${mb} MB`,
      fileCount: (n: number) => `You can attach up to ${n} files`,
    },
    submit: 'Send request',
    submitWhatsapp: 'Send via WhatsApp',
    sending: 'Sending…',
    orEmail: 'Or send the details by email',
    whatsappNote: 'WhatsApp will open with a ready-made message containing your details — just press “Send”.',
    consent: ['By submitting this form, you agree to your data being processed in line with our ', 'Privacy Policy', '.'],
    sent: {
      title: 'Your message is ready to send',
      whatsapp: 'Finish sending from WhatsApp and our team will be in touch shortly. If WhatsApp didn’t open, use the button below.',
      email: 'Finish sending from your email app and our team will be in touch shortly. If it didn’t open, use the button below.',
      serverTitle: 'Thank you — we’ve received your request',
      server: 'Our team will review the details and contact you shortly on the mobile number you provided.',
      openWhatsapp: 'Open WhatsApp to send',
      openEmail: 'Open email',
      again: 'Send another request',
    },
    error: {
      title: 'We couldn’t send your request',
      text: 'Something went wrong while sending. Please try again, or send the details via WhatsApp.',
    },
    attachments: {
      label: 'Attachments',
      hint: 'Drawings, site photos, bills of quantities…',
      drop: 'Drag and drop files here, or',
      browse: 'browse your device',
      limits: (n: number, mb: number) => `PDF or images · up to ${n} files · ${mb} MB each`,
      remove: (name: string) => `Remove ${name}`,
      viaWhatsapp:
        'Have drawings, site photos or a bill of quantities? Share them with us in the WhatsApp chat once you’ve sent your request, and we’ll add them to your project file.',
    },
    msg: {
      name: 'Name',
      company: 'Company',
      phone: 'Mobile',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      projectType: 'Project type',
      services: 'Services required',
      location: 'Project location',
      stage: 'Project stage',
      area: 'Approximate area',
      start: 'Expected start',
      description: 'Project description',
      reference: 'Reference project',
      via: 'via website',
    },
  },

  hero: {
    place: 'Riyadh · Saudi Arabia',
    scroll: 'Scroll',
    strip: 'What we do',
  },

  about: {
    label: 'About us',
    title: [{ text: 'The spaces' }, { text: 'you deserve', accent: true }] as HeadingLines,
    lead: 'Arkan Altaameer United is a Saudi contracting and interior finishing company based in Riyadh, serving residential, commercial and corporate clients.',
    body: 'We take every project from the structural phase to the final detail, bringing construction expertise and finishing precision together in one team and one delivery system — so we hand over complete, ready-to-use spaces built to the standard their owners expect.',
    structure: 'From structure',
    space: 'to space',
    structureAlt: 'Concrete frame of a building under construction',
    spaceAlt: 'A fully finished interior space',
    values: ['Professionalism', 'Quality', 'Attention to detail', 'Precise execution', 'Reliability'],
    valuesLabel: 'Our values',
    more: 'Discover Arkan',
  },

  services: {
    label: 'Our services',
    title: [{ text: 'From the structure' }, { text: 'to the final detail', accent: true }] as HeadingLines,
    intro: 'Four disciplines working as one system — delivering your project complete, with a single point of accountability.',
    more: 'Service details',
  },

  projects: {
    label: 'Projects',
    title: [{ text: 'Turning vision' }, { text: 'into reality', accent: true }] as HeadingLines,
    intro: 'A selection of projects we have delivered across contracting, interior finishing and stretch ceilings.',
    all: 'View all projects',
    services: 'Services delivered',
  },

  why: {
    label: 'Why Arkan',
    title: [{ text: 'One partner,' }, { text: 'from structure to handover', accent: true }] as HeadingLines,
    intro: 'A clear methodology that places quality, precision and commitment at the heart of every phase of your project.',
    items: [
      { title: 'Execution quality', text: 'Rigorous standards and carefully selected materials, reflected in everything we deliver.' },
      { title: 'Hands-on expertise', text: 'Practical, site-proven knowledge of what different types of projects demand.' },
      { title: 'Attention to detail', text: 'From the overall structure to the finishing touches — nothing is left to chance.' },
      { title: 'On-time delivery', text: 'Organised management of every phase, with clear schedules we commit to.' },
      { title: 'Integrated solutions', text: 'Contracting and finishing within one system, under one accountable team.' },
    ],
  },

  process: {
    label: 'Our process',
    title: [{ text: 'How' }, { text: 'we work', accent: true }] as HeadingLines,
    intro: 'Four clear stages that give you full visibility of your project — from the first meeting to handover.',
    steps: [
      { title: 'Consultation', text: 'We listen closely to understand your project’s needs and objectives.' },
      { title: 'Planning', text: 'We define the scope of work, execution requirements and timeline.' },
      { title: 'Execution', text: 'Works proceed according to plan, under continuous supervision.' },
      { title: 'Handover', text: 'A thorough final review — then your project is handed over, ready to use.' },
    ],
  },

  contact: {
    label: 'Contact',
    title: [{ text: 'Have a project?' }, { text: 'Let’s talk.', accent: true }] as HeadingLines,
    intro: 'Tell us about your requirements, and together we’ll define the right solution.',
    phone: 'Phone',
    email: 'Email',
    location: 'Location',
  },

  footer: {
    about:
      'General contracting, interior finishing, stretch ceilings and interior fit-out for residential and commercial projects across Saudi Arabia.',
    explore: 'Explore',
    services: 'Services',
    contact: 'Contact',
    rights: 'All rights reserved.',
    watermark: 'ARKAN',
  },

  notFound: {
    label: 'Page not found',
    title: [{ text: 'We couldn’t find' }, { text: 'this page', accent: true }] as HeadingLines,
    text: 'The link may have changed, or the page is no longer available. Head back home or continue from the links below.',
  },
};
