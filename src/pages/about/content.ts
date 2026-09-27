import type { HeadingLines, Localized } from '@/i18n/types';

type Item = { title: string; text: string };

interface AboutContent {
  hero: { title: HeadingLines; lead: string; imageAlt: string; strip: string[]; stripLabel: string };
  who: {
    label: string;
    title: HeadingLines;
    paragraphs: string[];
    imageAlt: string;
    profileTitle: string;
    /** company card rows — add facts (founded, CR number …) here once the client provides them */
    profile: { label: string; value: string }[];
  };
  name: { label: string; title: HeadingLines; intro: string; words: { word: string; meaning: string; text: string }[] };
  vision: { label: string; title: HeadingLines; vision: Item; mission: Item };
  values: { label: string; title: HeadingLines; intro: string; items: Item[] };
  philosophy: { label: string; title: HeadingLines; text: string; stages: Item[] };
  why: { label: string; title: HeadingLines; intro: string };
  quality: { label: string; title: HeadingLines; intro: string; items: Item[]; imageAlt: string };
  details: { label: string; title: HeadingLines; intro: string; items: (Item & { alt: string })[] };
  cta: { label: string; title: HeadingLines; intro: string };
}

export const content: Localized<AboutContent> = {
  ar: {
    hero: {
      title: [{ text: 'من البناء' }, { text: 'إلى المساحة', accent: true }],
      lead: 'شركة أركان التعمير المتحدة شركة سعودية مقرّها الرياض، تعمل في المقاولات العامة والتشطيبات الداخلية والأسقف الفرنسية وأعمال الـFit-\u2060Out. نرافق المشروع من أول مرحلة في الهيكل حتى آخر تفصيلة في المساحة.',
      imageAlt: '',
      strip: ['من نحن', 'رؤيتنا ورسالتنا', 'قيمنا', 'فلسفتنا', 'الجودة والتفاصيل'],
      stripLabel: 'محتويات الصفحة',
    },
    who: {
      label: 'من نحن',
      title: [{ text: 'شركة سعودية' }, { text: 'تبني بعناية', accent: true }],
      paragraphs: [
        'تنطلق أركان التعمير المتحدة من قناعة بسيطة: المساحة الجيدة لا تتحقق إلا عندما يُبنى الهيكل بإتقان ويُنفَّذ التشطيب بعناية، والفصل بين المرحلتين كثيرًا ما يكون مصدر الخلل.',
        'لذلك نجمع المقاولات العامة والتشطيبات الداخلية والأسقف الفرنسية وأعمال الـFit-\u2060Out في منظومة عمل واحدة، يقودها فريق واحد مسؤول أمامك عن المشروع كاملًا: من التخطيط والتنفيذ، إلى المتابعة والتسليم.',
        'نخدم أصحاب المنازل والشركات والمنشآت التجارية في مشاريع سكنية وتجارية ومكتبية، ونتعامل مع كل مشروع — مهما كان حجمه — بالمعايير نفسها من الدقّة والالتزام.',
      ],
      imageAlt: 'أعمال تنفيذ في موقع إنشائي',
      profileTitle: 'بطاقة الشركة',
      profile: [
        { label: 'الاسم', value: 'شركة أركان التعمير المتحدة' },
        { label: 'المقر', value: 'الرياض، المملكة العربية السعودية' },
        { label: 'مجالات العمل', value: 'المقاولات العامة · التشطيبات الداخلية · الأسقف الفرنسية · أعمال الـFit-\u2060Out' },
        { label: 'القطاعات', value: 'السكني · التجاري · قطاع الأعمال' },
        { label: 'شعارنا', value: 'نبني مساحات أفضل' },
      ],
    },
    name: {
      label: 'اسمنا',
      title: [{ text: 'اسمٌ يحمل' }, { text: 'منهجنا في العمل', accent: true }],
      intro: 'لكل كلمة في اسمنا معنى نعمل به كل يوم.',
      words: [
        {
          word: 'أركان',
          meaning: 'الأسس والأعمدة',
          text: 'الأركان هي الأعمدة التي يقوم عليها البناء، ومنها نستمد التزامنا بأن يقوم كل مشروع على أسس متينة.',
        },
        {
          word: 'التعمير',
          meaning: 'البناء والإعمار',
          text: 'التعمير هو البناء وإحياء المكان، وهو جوهر ما نقوم به: أن نحوّل الأرض والهيكل إلى مساحات تنبض بالحياة.',
        },
        {
          word: 'المتحدة',
          meaning: 'فريق واحد',
          text: 'تخصصات متعددة تعمل كفريق واحد، بمسؤولية واحدة، ونحو هدف واحد: مساحة متكاملة جاهزة للاستخدام.',
        },
      ],
    },
    vision: {
      label: 'رؤيتنا ورسالتنا',
      title: [{ text: 'رؤية واضحة،' }, { text: 'ورسالة نلتزم بها', accent: true }],
      vision: {
        title: 'رؤيتنا',
        text: 'أن نكون الشريك الذي يُعتمد عليه في بناء المساحات وتشطيبها في المملكة العربية السعودية، وأن يكون اسم «أركان» مرادفًا للجودة والدقّة والالتزام.',
      },
      mission: {
        title: 'رسالتنا',
        text: 'أن ننفّذ مشاريع سكنية وتجارية متكاملة، من الهيكل حتى التسليم، بمعايير تنفيذ عالية وإدارة منظّمة وتواصل شفاف؛ لنسلّم مساحات جاهزة للاستخدام تليق بأصحابها.',
      },
    },
    values: {
      label: 'قيمنا',
      title: [{ text: 'قيم نعمل بها' }, { text: 'في كل مشروع', accent: true }],
      intro: 'خمس قيم ترسم طريقة عملنا، وتظهر في كل مرحلة من مراحل المشروع.',
      items: [
        { title: 'الاحترافية', text: 'نتعامل مع كل مشروع بمنهجية واضحة، وفريق يعرف دوره، وتواصل منظّم في كل مرحلة.' },
        { title: 'الجودة', text: 'نختار المواد بعناية، ونراقب جودة التنفيذ في كل مرحلة، لا في النهاية فقط.' },
        { title: 'الاهتمام بالتفاصيل', text: 'الوصلات والزوايا والحواف والإضاءة… التفاصيل الصغيرة هي ما يصنع الفرق في المساحة النهائية.' },
        { title: 'دقّة التنفيذ', text: 'نلتزم بالمخططات والمواصفات والقياسات، ونعالج أي ملاحظة قبل الانتقال إلى المرحلة التالية.' },
        { title: 'الموثوقية', text: 'نفي بما نتفق عليه من نطاق وجودة ومواعيد، ونكون واضحين معك في كل مستجد.' },
      ],
    },
    philosophy: {
      label: 'فلسفتنا',
      title: [{ text: 'المساحة الجيدة' }, { text: 'تبدأ من هيكل سليم', accent: true }],
      text: 'نرى المشروع رحلة واحدة متصلة: هيكل مُتقن يحمل المساحة، وتشطيب دقيق يمنحها شخصيتها، وتفاصيل مدروسة تجعلها صالحة للحياة والعمل. وحين تُدار هذه المراحل معًا، تأتي النتيجة متناسقة، ويختفي كثير مما يربك المشاريع عادةً من تعارض وتأخير وإعادة عمل.',
      stages: [
        { title: 'الهيكل', text: 'أساس متين وتنفيذ وفق المخططات.' },
        { title: 'التشطيب', text: 'مواد مختارة وتنفيذ دقيق.' },
        { title: 'المساحة', text: 'مساحة متكاملة جاهزة للاستخدام.' },
      ],
    },
    why: {
      label: 'لماذا أركان؟',
      title: [{ text: 'ما الذي يجعلنا' }, { text: 'شريكك المناسب؟', accent: true }],
      intro: 'نعمل بمنهجية واضحة تضع الجودة والدقّة والالتزام في قلب كل مرحلة من مراحل المشروع.',
    },
    quality: {
      label: 'الجودة والاحترافية',
      title: [{ text: 'الجودة منهج عمل،' }, { text: 'لا مرحلة أخيرة', accent: true }],
      intro: 'لا ننتظر نهاية المشروع لنتحقق من جودته؛ بل نبنيها في كل خطوة، من اختيار المواد حتى التسليم.',
      items: [
        { title: 'تخطيط قبل التنفيذ', text: 'نطاق أعمال واضح، وجدول زمني، وتسلسل منطقي للمراحل قبل أن نبدأ.' },
        { title: 'مواد معتمدة مسبقًا', text: 'نستعرض الخيارات معك، ونعتمد العيّنات قبل التوريد.' },
        { title: 'إشراف في الموقع', text: 'متابعة مستمرة للأعمال، مع الالتزام باشتراطات السلامة وتنظيم الموقع.' },
        { title: 'مراجعة كل مرحلة', text: 'نفحص الأعمال عند نهاية كل مرحلة، ونعالج الملاحظات قبل الانتقال إلى ما بعدها.' },
        { title: 'تسليم بعد مراجعة نهائية', text: 'نراجع التفاصيل معك قبل التسليم، لتستلم مساحة جاهزة للاستخدام.' },
      ],
      imageAlt: 'قياس دقيق أثناء أعمال التشطيب',
    },
    details: {
      label: 'الاهتمام بالتفاصيل',
      title: [{ text: 'التفاصيل' }, { text: 'تصنع الفرق', accent: true }],
      intro:
        'في المساحات التي ننفّذها، نولي عناية خاصة لما تلاحظه العين المدرّبة: استقامة الخطوط، وتلاقي الخامات، وانسياب الإضاءة، ونظافة الحواف.',
      items: [
        { title: 'الأعمال الخشبية', text: 'تجميع دقيق ووصلات نظيفة.', alt: 'تفصيل لأعمال خشبية' },
        { title: 'الحجر والرخام', text: 'تطابق العروق واستقامة الفواصل.', alt: 'تفصيل لسطح رخامي' },
        { title: 'الإضاءة', text: 'إضاءة مدمجة تُظهر جمال المساحة.', alt: 'تفصيل لإضاءة مخفية' },
        { title: 'الحواف والزوايا', text: 'زوايا حادة وأسطح مستوية.', alt: 'تفصيل لزاوية وحافة جدار' },
      ],
    },
    cta: {
      label: 'لنبدأ',
      title: [{ text: 'لنبنِ' }, { text: 'مساحتك القادمة معًا', accent: true }],
      intro: 'حدّثنا عن مشروعك، ولنمضِ به من الهيكل حتى آخر تفصيلة.',
    },
  },
  en: {
    hero: {
      title: [{ text: 'From structure' }, { text: 'to space', accent: true }],
      lead: 'Arkan Altaameer United is a Saudi company based in Riyadh, working in general contracting, interior finishing, stretch ceilings and interior fit-out. We stay with each project from the first stage of the structure to the final detail of the space.',
      imageAlt: '',
      strip: ['Who we are', 'Vision & mission', 'Our values', 'Our philosophy', 'Quality & detail'],
      stripLabel: 'On this page',
    },
    who: {
      label: 'Who we are',
      title: [{ text: 'A Saudi company' }, { text: 'that builds with care', accent: true }],
      paragraphs: [
        'Arkan Altaameer United starts from a simple conviction: a great space only happens when the structure is built well and the finishing is carried out with care — and separating the two is often where things go wrong.',
        'That’s why we bring general contracting, interior finishing, stretch ceilings and interior fit-out together in one delivery system, led by one team that is accountable to you for the whole project: from planning and execution to supervision and handover.',
        'We work with homeowners, companies and commercial businesses on residential, commercial and office projects — and we bring the same precision and commitment to every project, whatever its size.',
      ],
      imageAlt: 'Works under way on a construction site',
      profileTitle: 'Company profile',
      profile: [
        { label: 'Name', value: 'Arkan Altaameer United Co.' },
        { label: 'Based in', value: 'Riyadh, Saudi Arabia' },
        { label: 'Disciplines', value: 'General contracting · Interior finishing · Stretch ceilings · Interior fit-out' },
        { label: 'Sectors', value: 'Residential · Commercial · Corporate' },
        { label: 'Our promise', value: 'We build better spaces' },
      ],
    },
    name: {
      label: 'Our name',
      title: [{ text: 'A name that carries' }, { text: 'the way we work', accent: true }],
      intro: 'Every word in our name stands for something we practise every day.',
      words: [
        {
          word: 'Arkan',
          meaning: 'Cornerstones',
          text: 'Arkan are the pillars a building stands on — and the reason every project we take on starts from solid foundations.',
        },
        {
          word: 'Altaameer',
          meaning: 'Building',
          text: 'To build, develop and bring a place to life. It’s the heart of what we do: turning plots and structures into spaces that are lived in.',
        },
        {
          word: 'United',
          meaning: 'One team',
          text: 'Several disciplines working as one team — with one responsibility and one goal: a complete space, ready to use.',
        },
      ],
    },
    vision: {
      label: 'Vision & mission',
      title: [{ text: 'A clear vision,' }, { text: 'a mission we stand by', accent: true }],
      vision: {
        title: 'Our vision',
        text: 'To be the partner people rely on to build and finish spaces in Saudi Arabia — and for the name Arkan to stand for quality, precision and commitment.',
      },
      mission: {
        title: 'Our mission',
        text: 'To deliver complete residential and commercial projects, from structure to handover, with high execution standards, organised management and transparent communication — handing over ready-to-use spaces that do their owners justice.',
      },
    },
    values: {
      label: 'Our values',
      title: [{ text: 'Values we bring' }, { text: 'to every project', accent: true }],
      intro: 'Five values shape the way we work — and show at every stage of a project.',
      items: [
        {
          title: 'Professionalism',
          text: 'Every project runs on a clear methodology, a team that knows its role and organised communication at every stage.',
        },
        { title: 'Quality', text: 'We choose materials carefully and check the quality of the work at every stage — not only at the end.' },
        {
          title: 'Attention to detail',
          text: 'Joints, corners, edges, light — the small details are what make the difference in the finished space.',
        },
        {
          title: 'Precise execution',
          text: 'We work to the drawings, specifications and measurements, and resolve every issue before moving to the next stage.',
        },
        {
          title: 'Reliability',
          text: 'We deliver the scope, quality and timelines we agree — and we’re upfront with you about anything that changes.',
        },
      ],
    },
    philosophy: {
      label: 'Our philosophy',
      title: [{ text: 'A great space starts' }, { text: 'with a sound structure', accent: true }],
      text: 'We see a project as one continuous journey: a well-built structure that carries the space, precise finishing that gives it character, and considered details that make it work for living and working. When these stages are managed together, the result is coherent — and much of what usually troubles projects, from clashes to delays and rework, simply falls away.',
      stages: [
        { title: 'Structure', text: 'Solid foundations, built to the drawings.' },
        { title: 'Finishing', text: 'Chosen materials, precisely installed.' },
        { title: 'Space', text: 'A complete space, ready to use.' },
      ],
    },
    why: {
      label: 'Why Arkan',
      title: [{ text: 'What makes us' }, { text: 'the right partner?', accent: true }],
      intro: 'A clear methodology that places quality, precision and commitment at the heart of every phase of your project.',
    },
    quality: {
      label: 'Quality & professionalism',
      title: [{ text: 'Quality is a method,' }, { text: 'not a final stage', accent: true }],
      intro:
        'We don’t wait until the end of a project to check its quality — we build it into every step, from choosing materials to handover.',
      items: [
        { title: 'Planning before building', text: 'A clear scope, a schedule and a logical sequence of stages before work begins.' },
        { title: 'Materials agreed upfront', text: 'We review the options with you and agree samples before anything is ordered.' },
        { title: 'On-site supervision', text: 'Continuous oversight of the works, with safety requirements and an organised site.' },
        { title: 'Stage-by-stage checks', text: 'Works are inspected at the end of each stage, and issues resolved before moving on.' },
        {
          title: 'Handover after a final review',
          text: 'We go through the details with you before handover, so you receive a space that’s ready to use.',
        },
      ],
      imageAlt: 'Precise measuring during finishing works',
    },
    details: {
      label: 'Attention to detail',
      title: [{ text: 'Details' }, { text: 'make the difference', accent: true }],
      intro:
        'In the spaces we deliver, we pay particular attention to what a trained eye notices: straight lines, clean junctions between materials, the flow of light and crisp edges.',
      items: [
        { title: 'Joinery', text: 'Precise assembly, clean joints.', alt: 'Joinery detail' },
        { title: 'Stone & marble', text: 'Matched veining, true joints.', alt: 'Marble surface detail' },
        { title: 'Lighting', text: 'Integrated light that reveals the space.', alt: 'Concealed lighting detail' },
        { title: 'Edges & corners', text: 'Sharp corners, true surfaces.', alt: 'Wall corner and edge detail' },
      ],
    },
    cta: {
      label: 'Let’s begin',
      title: [{ text: 'Let’s build' }, { text: 'your next space together', accent: true }],
      intro: 'Tell us about your project — and we’ll take it from the structure to the final detail.',
    },
  },
};
