import type { Localized } from '@/i18n/types';
import type { LegalDoc } from './LegalPage';

/**
 * Privacy policy — a professional baseline written for a Saudi company (Personal Data Protection Law).
 * Have it reviewed by the client's legal adviser before launch, and update it if analytics, cookies or
 * new data processors are added to the site.
 */
export const privacy: Localized<LegalDoc> = {
  ar: {
    title: [{ text: 'سياسة' }, { text: 'الخصوصية', accent: true }],
    lead: 'نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضّح هذه السياسة البيانات التي نجمعها عند استخدامك موقعنا الإلكتروني أو تواصلك معنا، وكيف نستخدمها ونحميها.',
    sections: [
      {
        id: 'about',
        title: 'نطاق هذه السياسة',
        body: [
          'تنطبق هذه السياسة على الموقع الإلكتروني لشركة أركان التعمير المتحدة («الشركة» أو «نحن»)، ومقرّها الرياض، المملكة العربية السعودية، وعلى المراسلات التي تتم من خلاله.',
          'باستخدامك الموقع أو تواصلك معنا، فإنك تقرّ بأنك اطّلعت على هذه السياسة.',
        ],
      },
      {
        id: 'data',
        title: 'البيانات التي نجمعها',
        body: [
          'نجمع البيانات التي تقدّمها لنا بنفسك، ومنها:',
          {
            list: [
              'بيانات التواصل: الاسم، ورقم الجوال، والبريد الإلكتروني، واسم الشركة أو الجهة.',
              'تفاصيل المشروع: نوعه وموقعه ومساحته والخدمات المطلوبة ووصفه، وأي مخططات أو صور ترسلها إلينا.',
              'محتوى رسائلك إلينا عبر نماذج الموقع أو واتساب أو البريد الإلكتروني أو الهاتف.',
            ],
          },
          'وقد تُسجَّل تلقائيًا بعض البيانات التقنية عند زيارة الموقع — مثل عنوان الإنترنت الخاص بجهازك، ونوع المتصفح والجهاز، والصفحات التي تمت زيارتها — ضمن سجلات الخادم لدى مزوّد الاستضافة، لأغراض تشغيل الموقع وحمايته.',
        ],
      },
      {
        id: 'cookies',
        title: 'ملفات تعريف الارتباط',
        body: [
          'لا يستخدم الموقع حاليًا ملفات تعريف ارتباط إعلانية أو أدوات تتبّع تابعة لأطراف ثالثة. وإذا أضفنا مستقبلًا أدوات لتحليل الزيارات أو ما يشابهها، فسنحدّث هذه السياسة لتوضيح ذلك.',
        ],
      },
      {
        id: 'use',
        title: 'كيف نستخدم بياناتك',
        body: [
          {
            list: [
              'الرد على استفساراتك وطلباتك والتواصل معك بشأنها.',
              'إعداد عروض الأسعار، وترتيب زيارات الموقع، ومتابعة تنفيذ المشاريع.',
              'تحسين الموقع وخدماتنا وتجربة استخدامهما.',
              'الوفاء بالتزاماتنا النظامية والتعاقدية.',
            ],
          },
          'لا نبيع بياناتك الشخصية، ولا نستخدمها لأغراض تسويقية دون موافقتك.',
        ],
      },
      {
        id: 'basis',
        title: 'الأساس النظامي للمعالجة',
        body: [
          'نعالج بياناتك بناءً على موافقتك عند تواصلك معنا، أو لاتخاذ خطوات تطلبها قبل التعاقد ولتنفيذ العقد، أو للوفاء بالتزام نظامي؛ وذلك وفق الأنظمة المعمول بها في المملكة العربية السعودية، ومنها نظام حماية البيانات الشخصية ولوائحه التنفيذية.',
        ],
      },
      {
        id: 'sharing',
        title: 'مشاركة البيانات',
        body: [
          'لا نشارك بياناتك إلا في الحدود اللازمة لتقديم خدماتنا، ومن ذلك:',
          {
            list: [
              'مقدّمو الخدمات الذين يدعمون تشغيل الموقع ومراسلاتنا، مثل خدمات الاستضافة والبريد الإلكتروني واستقبال النماذج.',
              'الجهات الحكومية أو القضائية عندما يتطلب النظام ذلك.',
            ],
          },
          'ونحرص على أن يلتزم مقدّمو هذه الخدمات بحماية البيانات واستخدامها للغرض المحدد فقط.',
        ],
      },
      {
        id: 'third-parties',
        title: 'واتساب والروابط الخارجية',
        body: [
          'عند تواصلك معنا عبر واتساب، أو فتحك روابط خارجية مثل الخرائط ومنصات التواصل الاجتماعي، تخضع البيانات التي تُعالَج على تلك المنصات لسياسات الخصوصية الخاصة بها، ولا نتحمّل مسؤولية ممارساتها.',
        ],
      },
      {
        id: 'retention',
        title: 'مدة الاحتفاظ بالبيانات',
        body: [
          'نحتفظ ببياناتك طوال المدة اللازمة لتحقيق الغرض الذي جُمعت من أجله، أو المدة التي تتطلبها الأنظمة، ثم نُتلفها أو نُزيل ما يدل على هويتك بطريقة آمنة.',
        ],
      },
      {
        id: 'security',
        title: 'حماية البيانات',
        body: [
          'نتخذ تدابير تقنية وتنظيمية معقولة لحماية بياناتك من الوصول غير المصرّح به أو الفقد أو سوء الاستخدام. ومع ذلك، لا توجد وسيلة نقل أو تخزين إلكتروني آمنة بصورة مطلقة.',
        ],
      },
      {
        id: 'rights',
        title: 'حقوقك',
        body: [
          'وفقًا للأنظمة المعمول بها، يحق لك:',
          {
            list: [
              'العلم بكيفية جمع بياناتك الشخصية ومعالجتها والغرض من ذلك.',
              'الاطلاع على بياناتك لدينا والحصول على نسخة منها.',
              'طلب تصحيح بياناتك أو تحديثها أو استكمالها.',
              'طلب إتلاف بياناتك متى انتفت الحاجة إليها، ما لم يوجد مسوّغ نظامي للاحتفاظ بها.',
              'الرجوع عن موافقتك على معالجة بياناتك في أي وقت.',
            ],
          },
          'ولممارسة أيٍّ من هذه الحقوق، تواصل معنا عبر البيانات الموضّحة أدناه.',
        ],
      },
      {
        id: 'children',
        title: 'خصوصية الأطفال',
        body: ['الموقع موجّه إلى البالغين، ولا نجمع عن قصد بيانات شخصية من الأطفال.'],
      },
      {
        id: 'changes',
        title: 'التعديلات على هذه السياسة',
        body: [
          'قد نحدّث هذه السياسة من وقت لآخر، ويُعمل بالنسخة المعدّلة من تاريخ نشرها على هذه الصفحة، مع تحديث تاريخ «آخر تحديث» الظاهر أعلاها.',
        ],
      },
    ],
    contact: {
      title: 'للاستفسار عن هذه السياسة',
      text: 'لأي سؤال أو طلب يتعلق ببياناتك الشخصية، يسعدنا تواصلك معنا عبر إحدى القنوات التالية.',
    },
  },
  en: {
    title: [{ text: 'Privacy' }, { text: 'Policy', accent: true }],
    lead: 'We respect your privacy and are committed to protecting your personal data. This policy explains what we collect when you use our website or contact us, and how we use and protect it.',
    sections: [
      {
        id: 'about',
        title: 'Scope of this policy',
        body: [
          'This policy applies to the website of Arkan Altaameer United Co. (“the Company”, “we” or “us”), based in Riyadh, Saudi Arabia, and to correspondence that takes place through it.',
          'By using the website or contacting us, you acknowledge that you have read this policy.',
        ],
      },
      {
        id: 'data',
        title: 'Data we collect',
        body: [
          'We collect the information you choose to give us, including:',
          {
            list: [
              'Contact details: your name, mobile number, email address and company or organisation.',
              'Project details: its type, location, area, the services required and your description, plus any drawings or photos you send.',
              'The content of your messages to us through the website’s forms, WhatsApp, email or phone.',
            ],
          },
          'Some technical data may also be recorded automatically when you visit the website — such as your device’s IP address, browser and device type, and the pages visited — in the server logs kept by our hosting provider, to run and protect the site.',
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies',
        body: [
          'The website does not currently use advertising cookies or third-party tracking tools. If we add visitor analytics or similar tools in the future, we will update this policy to explain it.',
        ],
      },
      {
        id: 'use',
        title: 'How we use your data',
        body: [
          {
            list: [
              'To respond to your enquiries and requests, and to communicate with you about them.',
              'To prepare quotations, arrange site visits and manage the delivery of projects.',
              'To improve the website, our services and how people experience them.',
              'To meet our legal and contractual obligations.',
            ],
          },
          'We do not sell your personal data, and we do not use it for marketing without your consent.',
        ],
      },
      {
        id: 'basis',
        title: 'Legal basis for processing',
        body: [
          'We process your data on the basis of your consent when you contact us, to take steps you request before entering into a contract and to perform that contract, or to comply with a legal obligation — in accordance with the laws in force in the Kingdom of Saudi Arabia, including the Personal Data Protection Law and its implementing regulations.',
        ],
      },
      {
        id: 'sharing',
        title: 'Sharing your data',
        body: [
          'We only share your data as far as needed to provide our services, for example with:',
          {
            list: [
              'Service providers that support the website and our correspondence, such as hosting, email and form-handling services.',
              'Government or judicial authorities, where the law requires it.',
            ],
          },
          'We take care that these providers protect the data and use it only for the specified purpose.',
        ],
      },
      {
        id: 'third-parties',
        title: 'WhatsApp and external links',
        body: [
          'When you contact us on WhatsApp, or open external links such as maps and social media, any data processed on those platforms is subject to their own privacy policies, and we are not responsible for their practices.',
        ],
      },
      {
        id: 'retention',
        title: 'How long we keep data',
        body: [
          'We keep your data for as long as needed for the purpose it was collected for, or for as long as the law requires, and then destroy or anonymise it securely.',
        ],
      },
      {
        id: 'security',
        title: 'Protecting your data',
        body: [
          'We take reasonable technical and organisational measures to protect your data against unauthorised access, loss or misuse. No method of electronic transmission or storage, however, is completely secure.',
        ],
      },
      {
        id: 'rights',
        title: 'Your rights',
        body: [
          'Under the applicable laws, you have the right to:',
          {
            list: [
              'Be informed of how and why your personal data is collected and processed.',
              'Access the data we hold about you and obtain a copy of it.',
              'Ask for your data to be corrected, updated or completed.',
              'Ask for your data to be destroyed once it is no longer needed, unless there is a legal reason to keep it.',
              'Withdraw your consent to the processing of your data at any time.',
            ],
          },
          'To exercise any of these rights, contact us using the details below.',
        ],
      },
      {
        id: 'children',
        title: 'Children’s privacy',
        body: ['The website is intended for adults, and we do not knowingly collect personal data from children.'],
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        body: [
          'We may update this policy from time to time. The revised version applies from the date it is published on this page, and the “Last updated” date above will change accordingly.',
        ],
      },
    ],
    contact: {
      title: 'Questions about this policy',
      text: 'For any question or request about your personal data, we’d be glad to hear from you through any of the channels below.',
    },
  },
};
