import type { MediaKey } from '@/data/media.generated';
import type { ServiceId } from '@/data/services';
import type { HeadingLines, Localized } from '@/i18n/types';

type Item = { title: string; text: string };

export interface ChapterCopy {
  lead: string;
  includes: string[];
  benefits: Item[];
  /** fit-out: sectors served · ceilings: finishes */
  extra?: string[];
}

interface ServicesContent {
  hero: { title: HeadingLines; lead: string; stripLabel: string };
  system: { label: string; title: HeadingLines; text: string; benefits: Item[]; diagramLabel: string };
  labels: {
    service: string;
    includes: string;
    benefits: string;
    finishes: string;
    sectors: string;
    quote: string;
    whatsapp: string;
  };
  chapters: Record<ServiceId, ChapterCopy>;
  cta: { label: string; title: HeadingLines; intro: string };
}

/**
 * Photography per chapter: a wide lead image and a portrait detail. Alt texts default to the service's
 * `heroAlt` / `imageAlt`; `detailAlt` overrides it when the chapter uses a different detail photo.
 */
export const chapterImages: Record<ServiceId, { main: MediaKey; detail: MediaKey; detailAlt?: Localized }> = {
  contracting: { main: 'hero-contracting', detail: 'svc-contracting' },
  finishing: { main: 'hero-finishing', detail: 'svc-finishing' },
  ceiling: {
    main: 'hero-ceiling',
    detail: 'svc-ceiling-2',
    detailAlt: { ar: 'أسطح سقف منحنية ناعمة حول فتحة إضاءة طولية', en: 'Smooth curved ceiling surfaces around a linear skylight' },
  },
  fitout: { main: 'hero-fitout', detail: 'svc-fitout' },
};

/**
 * NOTE: the "includes" lists describe typical scope for each discipline — confirm them with the client.
 */
export const content: Localized<ServicesContent> = {
  ar: {
    hero: {
      title: [{ text: 'أربعة تخصصات،' }, { text: 'منظومة واحدة', accent: true }],
      lead: 'أربعة تخصصات تعمل كمنظومة واحدة: نبني الهيكل، ونشطّب المساحة، وننفّذ الأسقف، ونجهّز المساحات التجارية والمكتبية — بمسؤولية جهة واحدة.',
      stripLabel: 'خدماتنا',
    },
    system: {
      label: 'منظومة واحدة',
      title: [{ text: 'جهة واحدة' }, { text: 'مسؤولة عن النتيجة', accent: true }],
      text: 'في كثير من المشاريع، يتنقّل المالك بين مقاول للهيكل وآخر للتشطيب وثالث للأسقف، فتضيع المسؤولية بين الأطراف. في أركان، تعمل التخصصات الأربعة ضمن خطة واحدة وفريق واحد؛ فيتسلّم كل تخصص من سابقه دون فجوات، وتبقى جهة واحدة مسؤولة أمامك عن النتيجة.',
      benefits: [
        { title: 'جهة مسؤولة واحدة', text: 'مرجع واحد للتواصل والقرارات والنتيجة النهائية.' },
        { title: 'تنسيق بلا تعارض', text: 'تسلسل مدروس للأعمال يقلل إعادة العمل والتأخير.' },
        { title: 'جودة متسقة', text: 'المعايير نفسها من الهيكل حتى آخر تفصيلة.' },
      ],
      diagramLabel: 'التخصصات الأربعة',
    },
    labels: {
      service: 'الخدمة',
      includes: 'ما تشمله الخدمة',
      benefits: 'القيمة لك',
      finishes: 'التشطيبات والأنواع',
      sectors: 'القطاعات',
      quote: 'اطلب عرض سعر لهذه الخدمة',
      whatsapp: 'استفسر عبر واتساب',
    },
    chapters: {
      contracting: {
        lead: 'ننفّذ أعمال المقاولات العامة وفق المخططات والمواصفات ومتطلبات المشروع: الأعمال الإنشائية وأعمال البناء، مع إدارة التنفيذ في الموقع والتنسيق بين مراحله، حتى تسليم المبنى جاهزًا لمرحلة التشطيب، أو مكتملًا بحسب نطاق العقد.',
        includes: [
          'الأعمال الإنشائية والخرسانة المسلحة',
          'أعمال المباني والجدران',
          'إدارة التنفيذ والإشراف في الموقع',
          'التنسيق بين مراحل المشروع',
          'تجهيز المبنى لمرحلة التشطيب',
        ],
        benefits: [
          { title: 'أساس متين', text: 'تنفيذ وفق المخططات والمواصفات، لهيكل يُبنى عليه بثقة.' },
          { title: 'إدارة منظّمة', text: 'جدول زمني واضح، ومتابعة مستمرة لكل مرحلة.' },
          { title: 'انتقال سلس إلى التشطيب', text: 'لأن الفريق نفسه يستكمل التشطيب، يُجهَّز الهيكل لما بعده منذ البداية.' },
        ],
      },
      finishing: {
        lead: 'نحوّل المساحات من هيكل خام إلى بيئات مكتملة وجاهزة للاستخدام، عبر تنفيذ متكامل لأعمال التشطيب الداخلي بمواد مختارة بعناية، ودقّة في كل تفصيلة.',
        includes: [
          'الأرضيات: البورسلان والرخام والباركيه',
          'الجدران: الدهانات والتكسيات وورق الجدران',
          'أعمال الجبس والأسقف المعلّقة',
          'الأعمال الخشبية: الأبواب والخزائن والتكسيات',
          'تجهيزات الإضاءة',
          'تشطيب المطابخ ودورات المياه',
        ],
        benefits: [
          { title: 'مواد مختارة بعناية', text: 'نساعدك على اختيار خامات تناسب ميزانيتك واستخدام المساحة، ونعتمد العيّنات قبل التوريد.' },
          { title: 'دقّة في التفاصيل', text: 'استقامة الخطوط، ونظافة الوصلات، وتلاقي الخامات بإتقان.' },
          { title: 'مساحة جاهزة للاستخدام', text: 'نسلّم المساحة مكتملة ونظيفة، جاهزة لتسكنها أو تعمل فيها.' },
        ],
      },
      ceiling: {
        lead: 'الأسقف الفرنسية — أو الأسقف المشدودة — حل عصري يمنح المساحة سقفًا ناعمًا ومتصلًا دون فواصل، بتشطيبات متعددة وطرق مختلفة لدمج الإضاءة. ننفّذها بتصاميم تناسب كل مساحة: من الغرف والمجالس إلى المكاتب والمحلات والقاعات.',
        includes: [
          'دراسة المساحة واختيار نوع الغشاء',
          'تركيب الإطارات على محيط الجدران',
          'تمديد الغشاء وتشطيب الحواف',
          'دمج الإضاءة والفتحات والتجهيزات',
        ],
        benefits: [
          { title: 'سطح متصل بلا فواصل', text: 'سقف ناعم ومستوٍ يُخفي عيوب السقف الأصلي والتمديدات.' },
          { title: 'إضاءة مدمجة', text: 'إضاءات موضعية وخطوط ضوئية، أو سقف مضيء بالكامل.' },
          { title: 'تركيب سريع ونظيف', text: 'دون أعمال هدم أو لياسة واسعة، وبأقل إزعاج للمكان.' },
          { title: 'يناسب مساحات متعددة', text: 'كثير من الأغشية مقاوم للرطوبة، فيناسب المطابخ ودورات المياه أيضًا.' },
        ],
        extra: ['مطفي', 'لامع', 'ساتان', 'مضيء', 'مطبوع'],
      },
      fitout: {
        lead: 'نجهّز المساحات الداخلية للمكاتب والمحلات وصالات العرض والمطاعم والمقاهي — والمساحات السكنية — لتكون جاهزة للتشغيل من اليوم الأول: من القواطع والأسقف والتشطيبات، إلى الإضاءة والأعمال الخشبية والتجهيزات، ضمن جدول زمني يراعي موعد افتتاحك.',
        includes: [
          'القواطع الجبسية والزجاجية',
          'الأسقف والإضاءة',
          'الأرضيات وتكسيات الجدران',
          'الأعمال الخشبية ووحدات العرض',
          'التنسيق مع أعمال التكييف والكهرباء',
        ],
        benefits: [
          { title: 'جاهزية من اليوم الأول', text: 'مساحة مكتملة تستقبل فريقك أو عملاءك مباشرة.' },
          { title: 'التزام بموعد الافتتاح', text: 'جدول زمني مبني على موعد تشغيلك، ومتابعة مستمرة للتقدّم.' },
          { title: 'هوية واضحة', text: 'تنفيذ يحترم هوية علامتك التجارية وطبيعة عملك.' },
        ],
        extra: ['المكاتب والمقرات الإدارية', 'المحلات وصالات العرض', 'المطاعم والمقاهي', 'المساحات السكنية'],
      },
    },
    cta: {
      label: 'ابدأ مشروعك',
      title: [{ text: 'أيّ خدمة' }, { text: 'يحتاجها مشروعك؟', accent: true }],
      intro: 'أخبرنا عن مشروعك، وسنقترح عليك النطاق المناسب — خدمة واحدة أو حلًا متكاملًا.',
    },
  },
  en: {
    hero: {
      title: [{ text: 'Four disciplines,' }, { text: 'one system', accent: true }],
      lead: 'Four disciplines working as one system: we build the structure, finish the space, install the ceilings and fit out commercial and office interiors — with one accountable team.',
      stripLabel: 'Our services',
    },
    system: {
      label: 'One system',
      title: [{ text: 'One team,' }, { text: 'fully accountable', accent: true }],
      text: 'On many projects, owners move between one contractor for the structure, another for the finishing and a third for the ceilings — and responsibility gets lost between them. At Arkan, the four disciplines work within one plan and one team: each picks up seamlessly from the last, and one party stays accountable to you for the result.',
      benefits: [
        { title: 'One accountable party', text: 'A single point of contact for communication, decisions and the final result.' },
        { title: 'Coordination without clashes', text: 'A planned sequence of works that reduces rework and delays.' },
        { title: 'Consistent quality', text: 'The same standards from the structure to the final detail.' },
      ],
      diagramLabel: 'The four disciplines',
    },
    labels: {
      service: 'Service',
      includes: 'What’s included',
      benefits: 'What you gain',
      finishes: 'Finishes & types',
      sectors: 'Sectors',
      quote: 'Request a quote for this service',
      whatsapp: 'Ask on WhatsApp',
    },
    chapters: {
      contracting: {
        lead: 'We carry out general contracting works to the drawings, specifications and project requirements — structural and building works, with on-site construction management and coordination between stages — through to handing over the building ready for finishing, or complete, depending on the contract scope.',
        includes: [
          'Structural and reinforced-concrete works',
          'Blockwork and walls',
          'On-site construction management and supervision',
          'Coordination between project stages',
          'Preparing the building for the finishing stage',
        ],
        benefits: [
          { title: 'A solid base', text: 'Built to the drawings and specifications — a structure you can build on with confidence.' },
          { title: 'Organised management', text: 'A clear schedule and continuous oversight of every stage.' },
          {
            title: 'A smooth hand-off to finishing',
            text: 'The same team carries on with the finishing, so the structure is prepared for it from day one.',
          },
        ],
      },
      finishing: {
        lead: 'We turn raw shells into complete, ready-to-use interiors — delivering the full range of interior finishing works with carefully chosen materials and precision in every detail.',
        includes: [
          'Flooring: porcelain, marble and parquet',
          'Walls: paintwork, cladding and wallcoverings',
          'Gypsum work and suspended ceilings',
          'Joinery: doors, cabinetry and panelling',
          'Lighting installations',
          'Kitchen and bathroom finishing',
        ],
        benefits: [
          {
            title: 'Carefully chosen materials',
            text: 'We help you choose finishes that suit your budget and how the space is used, and agree samples before ordering.',
          },
          { title: 'Precision in the details', text: 'True lines, clean joints and materials that meet exactly.' },
          { title: 'Ready to use', text: 'The space is handed over complete and clean, ready to live or work in.' },
        ],
      },
      ceiling: {
        lead: 'Stretch ceilings are a contemporary solution that gives a space one smooth, continuous ceiling — with a choice of finishes and many ways to integrate lighting. We install them to suit each space, from rooms and majlis areas to offices, shops and halls.',
        includes: [
          'Assessing the space and choosing the membrane',
          'Fixing the perimeter profiles to the walls',
          'Stretching the membrane and finishing the edges',
          'Integrating lighting, openings and fixtures',
        ],
        benefits: [
          { title: 'A seamless surface', text: 'A smooth, level ceiling that hides imperfections and the services above.' },
          { title: 'Integrated lighting', text: 'Spotlights, light lines or a fully illuminated ceiling.' },
          { title: 'Quick, clean installation', text: 'No heavy demolition or plastering — and minimal disruption to the space.' },
          { title: 'Suits many spaces', text: 'Many membranes are moisture-resistant, so they suit kitchens and bathrooms too.' },
        ],
        extra: ['Matte', 'Gloss', 'Satin', 'Backlit', 'Printed'],
      },
      fitout: {
        lead: 'We fit out interiors for offices, shops, showrooms, restaurants and cafés — as well as residential spaces — ready to operate from day one: partitions, ceilings and finishes, lighting, joinery and fixtures, on a schedule built around your opening date.',
        includes: [
          'Gypsum and glass partitions',
          'Ceilings and lighting',
          'Flooring and wall cladding',
          'Joinery and display units',
          'Coordination with HVAC and electrical works',
        ],
        benefits: [
          { title: 'Ready from day one', text: 'A finished space that welcomes your team or customers straight away.' },
          {
            title: 'Built around your opening',
            text: 'A schedule planned around when you need to open, with continuous progress tracking.',
          },
          { title: 'A clear identity', text: 'Execution that respects your brand identity and the way you operate.' },
        ],
        extra: ['Offices & headquarters', 'Shops & showrooms', 'Restaurants & cafés', 'Residential spaces'],
      },
    },
    cta: {
      label: 'Start your project',
      title: [{ text: 'Which service' }, { text: 'does your project need?', accent: true }],
      intro: 'Tell us about your project and we’ll suggest the right scope — a single service or a complete solution.',
    },
  },
};
