import type { PageKey } from '@/config/pages';
import type { Localized } from '@/i18n/types';

export interface FaqItem {
  id: string;
  q: Localized;
  a: Localized;
  /** optional follow-up link under the answer */
  link?: { page: PageKey; label: Localized };
}

export interface FaqGroup {
  id: string;
  title: Localized;
  items: FaqItem[];
}

/**
 * Frequently asked questions. Answers describe how the work is approached — they deliberately avoid
 * company-specific facts (years, numbers, warranties, certifications) that the client hasn't provided.
 */
export const faq: FaqGroup[] = [
  {
    id: 'company',
    title: { ar: 'عن الشركة', en: 'The company' },
    items: [
      {
        id: 'who',
        q: { ar: 'من هي شركة أركان التعمير المتحدة؟', en: 'Who is Arkan Altaameer United?' },
        a: {
          ar: 'شركة سعودية مقرّها الرياض، متخصصة في المقاولات العامة والتشطيبات الداخلية والأسقف الفرنسية وأعمال الـFit-\u2060Out، وتخدم المشاريع السكنية والتجارية وقطاع الأعمال. نعمل على المشروع من مرحلة الهيكل حتى التسليم ضمن منظومة واحدة.',
          en: 'A Saudi company based in Riyadh, specialising in general contracting, interior finishing, stretch ceilings and interior fit-out for residential, commercial and corporate clients. We take projects from the structural stage to handover within one integrated system.',
        },
        link: { page: 'about', label: { ar: 'تعرّف على أركان', en: 'About Arkan' } },
      },
      {
        id: 'where',
        q: { ar: 'أين تعملون؟', en: 'Where do you work?' },
        a: {
          ar: 'مقرّنا في الرياض. وإن كان مشروعك في مدينة أخرى داخل المملكة، يسعدنا أن تتواصل معنا لمناقشة موقعه ومتطلباته.',
          en: 'We’re based in Riyadh. If your project is in another city in the Kingdom, get in touch and we’ll discuss its location and requirements.',
        },
      },
      {
        id: 'difference',
        q: { ar: 'ما الذي يميّز العمل مع أركان؟', en: 'What sets Arkan apart?' },
        a: {
          ar: 'نجمع المقاولات والتشطيبات لدى جهة واحدة مسؤولة عن المشروع من الهيكل حتى التسليم، بمنهجية واضحة تضع الجودة والدقّة والالتزام بالمواعيد في قلب كل مرحلة، واهتمام بالتفاصيل يظهر في النتيجة النهائية.',
          en: 'Contracting and finishing come together under one team that is accountable for the project from structure to handover — with a clear methodology built around quality, precision and on-time delivery, and an attention to detail that shows in the finished space.',
        },
      },
    ],
  },
  {
    id: 'services',
    title: { ar: 'الخدمات', en: 'Services' },
    items: [
      {
        id: 'what',
        q: { ar: 'ما الخدمات التي تقدمونها؟', en: 'What services do you offer?' },
        a: {
          ar: 'أربعة تخصصات رئيسية: المقاولات العامة، والتشطيبات الداخلية، والأسقف الفرنسية، وأعمال الـFit-\u2060Out (التجهيز الداخلي للمساحات التجارية والمكتبية والسكنية). ويمكن تنفيذها منفصلة، أو ضمن مشروع متكامل.',
          en: 'Four core disciplines: general contracting, interior finishing, stretch ceilings and interior fit-out for commercial, office and residential spaces. They can be delivered individually or as one integrated project.',
        },
        link: { page: 'services', label: { ar: 'استكشف خدماتنا', en: 'Explore our services' } },
      },
      {
        id: 'combined',
        q: { ar: 'هل يمكن تنفيذ أكثر من خدمة في المشروع نفسه؟', en: 'Can you deliver several services on one project?' },
        a: {
          ar: 'نعم، وهذا من أهم ما نقدّمه: تنسيق الأعمال الإنشائية والتشطيبات والأسقف والتجهيز ضمن خطة واحدة وفريق واحد، بما يقلل التعارض بين الأطراف ويجعل المسؤولية واضحة.',
          en: 'Yes — it’s one of our main strengths. Structural works, finishing, ceilings and fit-out are coordinated in one plan by one team, which avoids clashes between trades and keeps accountability clear.',
        },
      },
      {
        id: 'design',
        q: { ar: 'هل تقدّمون خدمات التصميم؟', en: 'Do you provide design services?' },
        a: {
          ar: 'تركيزنا الأساسي على التنفيذ. إن كانت لديك مخططات أو تصاميم جاهزة ننفّذها بدقّة، وإن لم تكن لديك، أخبرنا عن مشروعك لنناقش معك الخيارات المناسبة للمرحلة التي أنت فيها.',
          en: 'Our core focus is execution. If you already have drawings or designs, we deliver them precisely; if you don’t, tell us about your project and we’ll talk through the right options for the stage you’re at.',
        },
      },
      {
        id: 'sectors',
        q: { ar: 'هل تعملون في المشاريع السكنية والتجارية؟', en: 'Do you work on both residential and commercial projects?' },
        a: {
          ar: 'نعم؛ نعمل في المشاريع السكنية كالفلل والشقق والمباني السكنية، وفي المشاريع التجارية كالمكاتب والمحلات وصالات العرض والمطاعم والمقاهي.',
          en: 'Yes. We work on residential projects such as villas, apartments and residential buildings, and on commercial projects including offices, shops, showrooms, restaurants and cafés.',
        },
      },
    ],
  },
  {
    id: 'projects',
    title: { ar: 'المشاريع', en: 'Projects' },
    items: [
      {
        id: 'portfolio',
        q: { ar: 'هل يمكنني الاطلاع على أعمالكم؟', en: 'Can I see examples of your work?' },
        a: {
          ar: 'يمكنك تصفّح مختارات من أعمالنا في صفحة «مشاريعنا». ولمعرفة المزيد عن مشروع مشابه لمشروعك، تواصل معنا.',
          en: 'You can browse a selection of our work on the Projects page. To hear more about a project similar to yours, get in touch.',
        },
        link: { page: 'projects', label: { ar: 'تصفّح المشاريع', en: 'Browse projects' } },
      },
      {
        id: 'size',
        q: { ar: 'ما أحجام المشاريع التي تنفّذونها؟', en: 'What size of project do you take on?' },
        a: {
          ar: 'نتعامل مع مشاريع بأحجام مختلفة، من تشطيب مساحة واحدة إلى تنفيذ مبنى متكامل. أرسل لنا تفاصيل مشروعك، وسنوضح لك كيف يمكننا المساعدة.',
          en: 'Projects of different sizes — from finishing a single space to delivering a complete building. Send us your project details and we’ll explain how we can help.',
        },
      },
      {
        id: 'after',
        q: { ar: 'ماذا بعد التسليم؟', en: 'What happens after handover?' },
        a: {
          ar: 'نسلّم المشروع بعد مراجعة نهائية دقيقة للأعمال. أما ما بعد التسليم — كالضمان والصيانة — فيُحدَّد بوضوح في عرض السعر والعقد، وفق طبيعة الأعمال والمواد المستخدمة.',
          en: 'We hand over after a thorough final review of the works. Anything after handover — such as warranty and maintenance — is set out clearly in the quotation and contract, according to the type of work and the materials used.',
        },
      },
    ],
  },
  {
    id: 'construction',
    title: { ar: 'المقاولات والتشطيبات', en: 'Construction & finishing' },
    items: [
      {
        id: 'contracting',
        q: { ar: 'ما الذي تشمله أعمال المقاولات العامة؟', en: 'What does general contracting cover?' },
        a: {
          ar: 'تشمل الأعمال الإنشائية وأعمال البناء وإدارة التنفيذ في الموقع وفق المخططات ومتطلبات المشروع، وصولًا إلى تسليم المبنى جاهزًا لمرحلة التشطيب أو مكتملًا، بحسب نطاق العقد.',
          en: 'Structural works, building works and on-site construction management according to the drawings and project requirements — through to handing over the building ready for finishing, or fully complete, depending on the contract scope.',
        },
      },
      {
        id: 'finishing',
        q: { ar: 'ما الذي تشمله التشطيبات الداخلية؟', en: 'What does interior finishing include?' },
        a: {
          ar: 'تشمل عادةً الأرضيات والجدران وأعمال الجبس والدهانات والأعمال الخشبية والأسقف وتجهيزات الإضاءة. ويُحدَّد النطاق الدقيق لكل مشروع في عرض السعر.',
          en: 'Typically floors, walls, gypsum work, paintwork, joinery, ceilings and lighting installations. The exact scope for each project is defined in the quotation.',
        },
      },
      {
        id: 'materials',
        q: { ar: 'هل تساعدوننا في اختيار المواد؟', en: 'Do you help with choosing materials?' },
        a: {
          ar: 'نعم؛ نستعرض معك الخيارات التي تناسب ميزانيتك وطبيعة استخدام المساحة، ونعتمد العيّنات معك قبل التوريد والتنفيذ، لتأتي النتيجة كما توقعتها.',
          en: 'Yes. We go through the options that suit your budget and how the space will be used, and agree samples with you before anything is ordered or installed — so the result matches what you expect.',
        },
      },
      {
        id: 'occupied',
        q: { ar: 'هل يمكن التنفيذ في مسكن مأهول أو منشأة تعمل؟', en: 'Can you work in an occupied home or an operating business?' },
        a: {
          ar: 'يمكن ذلك في كثير من الحالات، بتخطيط مراحل العمل وأوقاته بما يقلل الإزعاج ويحافظ على سلامة المكان ومن فيه. نناقش التفاصيل معك خلال زيارة الموقع.',
          en: 'In many cases, yes — by phasing and scheduling the works to minimise disruption and keep the space and the people in it safe. We’ll go through the details with you during the site visit.',
        },
      },
    ],
  },
  {
    id: 'ceilings',
    title: { ar: 'الأسقف الفرنسية', en: 'Stretch ceilings' },
    items: [
      {
        id: 'what',
        q: { ar: 'ما هو السقف الفرنسي؟', en: 'What is a stretch ceiling?' },
        a: {
          ar: 'السقف الفرنسي — ويُعرف أيضًا بالسقف المشدود — غشاء من الـPVC أو من قماش خاص يُشدّ على إطار يُثبَّت على محيط الجدران أسفل السقف الأصلي، فيمنح سطحًا ناعمًا ومتصلًا بتشطيبات متعددة: مطفي، ولامع، وساتان، ومضيء، ومطبوع.',
          en: 'A PVC or special fabric membrane stretched onto a perimeter frame that is fixed to the walls just below the existing ceiling. It creates one smooth, continuous surface in a range of finishes — matte, gloss, satin, backlit or printed.',
        },
      },
      {
        id: 'where',
        q: { ar: 'أين يمكن استخدام الأسقف الفرنسية؟', en: 'Where can stretch ceilings be used?' },
        a: {
          ar: 'في الصالات وغرف النوم والمجالس والمكاتب والمحلات والقاعات. وكثير من أنواع أغشية الـPVC مقاومة للرطوبة، ما يجعلها خيارًا مناسبًا للمطابخ ودورات المياه أيضًا، ونرشّح لك النوع الملائم لكل مساحة.',
          en: 'Living rooms, bedrooms, majlis rooms, offices, shops and halls. Many PVC membranes are moisture-resistant, which makes them a good option for kitchens and bathrooms too — we’ll recommend the right type for each space.',
        },
      },
      {
        id: 'lighting',
        q: { ar: 'هل يمكن دمج الإضاءة في السقف الفرنسي؟', en: 'Can lighting be built into a stretch ceiling?' },
        a: {
          ar: 'نعم، وهي من أبرز مزاياه: يمكن دمج الإضاءات الموضعية والخطوط الضوئية والإضاءة المخفية، أو تنفيذ سقف مضيء بالكامل بغشاء شفاف تُركَّب الإضاءة خلفه.',
          en: 'Yes — it’s one of the system’s main advantages. Spotlights, linear lights and concealed lighting can all be integrated, or the whole ceiling can glow using a translucent membrane with the lighting installed behind it.',
        },
      },
      {
        id: 'install',
        q: { ar: 'كم يستغرق التركيب؟ وهل يسبب فوضى؟', en: 'How long does installation take — and is it messy?' },
        a: {
          ar: 'يُعدّ تركيبه سريعًا ونظيفًا مقارنةً بكثير من أنظمة الأسقف التقليدية، إذ لا يتطلب أعمال هدم أو لياسة واسعة. وتعتمد المدة على المساحة والتصميم ونوع الإضاءة، ونوضّحها في عرض السعر.',
          en: 'Installation is generally quick and clean compared with many conventional ceiling systems, as it doesn’t involve heavy demolition or plastering. The duration depends on the area, design and lighting, and is set out in the quotation.',
        },
      },
      {
        id: 'care',
        q: { ar: 'كيف أعتني بالسقف الفرنسي؟', en: 'How do I look after a stretch ceiling?' },
        a: {
          ar: 'تكفي إزالة الغبار، أو المسح بقطعة قماش ناعمة ورطبة ومنظّف لطيف عند الحاجة، مع تجنّب الأدوات الحادة أو الكاشطة التي قد تخدش الغشاء.',
          en: 'Dusting — or wiping with a soft, damp cloth and a mild cleaner when needed — is usually all it takes. Avoid sharp or abrasive tools that could damage the membrane.',
        },
      },
    ],
  },
  {
    id: 'process',
    title: { ar: 'آلية العمل', en: 'How projects run' },
    items: [
      {
        id: 'stages',
        q: { ar: 'ما مراحل تنفيذ المشروع لديكم؟', en: 'What are the stages of a project?' },
        a: {
          ar: 'أربع مراحل واضحة: الاستشارة لفهم احتياجاتك، ثم التخطيط لتحديد نطاق الأعمال والجدول الزمني، ثم التنفيذ بإشراف ومتابعة مستمرة، وأخيرًا التسليم بعد مراجعة دقيقة للأعمال.',
          en: 'Four clear stages: consultation, to understand your needs; planning, to define the scope and timeline; execution, under continuous supervision; and handover, after a thorough review of the works.',
        },
      },
      {
        id: 'duration',
        q: { ar: 'كم تستغرق مدة التنفيذ؟', en: 'How long will my project take?' },
        a: {
          ar: 'تختلف المدة بحسب حجم المشروع ونطاق الأعمال والمواد المختارة. نحدد جدولًا زمنيًا واضحًا في مرحلة التخطيط، ونلتزم به، ونطلعك على أي مستجدات أولًا بأول.',
          en: 'It depends on the project’s size, scope and chosen materials. We set a clear timeline during planning, commit to it, and keep you informed of any developments as they happen.',
        },
      },
      {
        id: 'follow',
        q: { ar: 'كيف أتابع سير العمل؟', en: 'How will I follow progress?' },
        a: {
          ar: 'نحدد لك جهة تواصل واحدة، ونشاركك تحديثات دورية عن تقدّم الأعمال، ويمكنك زيارة الموقع ومراجعة المراحل الرئيسية معنا.',
          en: 'You’ll have a single point of contact and regular progress updates — and you’re welcome to visit the site and review the key milestones with us.',
        },
      },
      {
        id: 'changes',
        q: { ar: 'هل يمكن تعديل التفاصيل أثناء التنفيذ؟', en: 'Can details change during the works?' },
        a: {
          ar: 'نعم، في حدود ما تسمح به مرحلة التنفيذ. نوثّق أي تعديل، ونوضح أثره على التكلفة والمدة قبل اعتماده، لتبقى الصورة واضحة أمامك.',
          en: 'Yes, within what the stage of works allows. Every change is documented, and its effect on cost and timing is agreed with you before it goes ahead — so you always have a clear picture.',
        },
      },
    ],
  },
  {
    id: 'quote',
    title: { ar: 'طلب عرض السعر', en: 'Requesting a quote' },
    items: [
      {
        id: 'how',
        q: { ar: 'كيف أطلب عرض سعر؟', en: 'How do I request a quotation?' },
        a: {
          ar: 'املأ نموذج «طلب عرض سعر» بتفاصيل مشروعك، أو راسلنا مباشرة عبر واتساب. نراجع التفاصيل، ثم نتواصل معك لاستيضاح ما يلزم.',
          en: 'Fill in the Request a Quote form with your project details, or message us directly on WhatsApp. We review the details, then contact you to clarify anything we need.',
        },
        link: { page: 'quote', label: { ar: 'اطلب عرض سعر', en: 'Request a quote' } },
      },
      {
        id: 'info',
        q: { ar: 'ما المعلومات التي تساعد على إعداد عرض دقيق؟', en: 'What information helps you prepare an accurate quote?' },
        a: {
          ar: 'نوع المشروع وموقعه، والخدمات المطلوبة، والمساحة التقريبية، وأي مخططات أو صور للموقع أو جداول كميات متوفرة لديك، إضافة إلى موعد البدء المتوقع ومستوى التشطيب المطلوب.',
          en: 'The project type and location, the services you need, the approximate area, any drawings, site photos or bills of quantities you have — plus your expected start date and the level of finish you’re after.',
        },
      },
      {
        id: 'visit',
        q: { ar: 'هل تحتاجون إلى زيارة الموقع قبل التسعير؟', en: 'Do you need to visit the site before pricing?' },
        a: {
          ar: 'في أغلب المشاريع نعم؛ فالمعاينة تتيح لنا أخذ القياسات وفهم حالة الموقع بدقّة، وهو ما ينعكس على دقّة عرض السعر. نحدد موعد الزيارة معك بعد استلام طلبك.',
          en: 'For most projects, yes. A site visit lets us take measurements and understand the site’s condition properly, which makes the quotation more accurate. We’ll arrange a time with you once we receive your request.',
        },
      },
      {
        id: 'binding',
        q: { ar: 'هل عرض السعر ملزم؟', en: 'Is the quotation binding?' },
        a: {
          ar: 'يوضّح عرض السعر نطاق الأعمال والمواد والتكلفة والمدة بناءً على المعلومات المتاحة، ويصبح ملزمًا للطرفين بعد اعتماده وتوقيع العقد.',
          en: 'The quotation sets out the scope, materials, cost and timing based on the information available. It becomes binding on both parties once it has been approved and the contract signed.',
        },
      },
    ],
  },
  {
    id: 'contact',
    title: { ar: 'التواصل', en: 'Getting in touch' },
    items: [
      {
        id: 'channels',
        q: { ar: 'كيف أتواصل معكم؟', en: 'How can I reach you?' },
        a: {
          ar: 'راسلنا مباشرة عبر واتساب، أو اتصل بنا، أو اكتب لنا عبر البريد الإلكتروني أو نموذج التواصل في الموقع — اختر الطريقة التي تناسبك.',
          en: 'Message us directly on WhatsApp, call us, or write to us by email or through the contact form on this website — whichever suits you best.',
        },
        link: { page: 'contact', label: { ar: 'صفحة التواصل', en: 'Contact page' } },
      },
      {
        id: 'files',
        q: { ar: 'هل يمكنني إرسال المخططات والصور؟', en: 'Can I send drawings and photos?' },
        a: {
          ar: 'بالتأكيد؛ أرسلها لنا عبر واتساب أو البريد الإلكتروني، فهي تساعدنا على فهم مشروعك وإعداد عرض أدق.',
          en: 'Of course — send them via WhatsApp or email. They help us understand your project and prepare a more accurate quotation.',
        },
      },
      {
        id: 'reply',
        q: { ar: 'متى سيتواصل معي فريقكم؟', en: 'When will your team get back to me?' },
        a: {
          ar: 'نحرص على الرد على الطلبات في أقرب وقت ممكن. ولتسهيل التواصل، تأكد من صحة رقم الجوال الذي تُدخله، ويمكنك متابعة طلبك معنا عبر واتساب.',
          en: 'We aim to reply to every request as soon as possible. To make it easy, double-check the mobile number you enter — and you can follow up on your request with us on WhatsApp.',
        },
      },
    ],
  },
];
