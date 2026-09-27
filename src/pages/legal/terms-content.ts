import type { Localized } from '@/i18n/types';
import type { LegalDoc } from './LegalPage';

/**
 * Terms & conditions for the use of the website — a professional baseline.
 * Have it reviewed by the client's legal adviser before launch.
 */
export const terms: Localized<LegalDoc> = {
  ar: {
    title: [{ text: 'الشروط' }, { text: 'والأحكام', accent: true }],
    lead: 'تنظّم هذه الشروط استخدامك الموقع الإلكتروني لشركة أركان التعمير المتحدة. يُرجى قراءتها بعناية؛ فاستخدامك الموقع يعني موافقتك عليها.',
    sections: [
      {
        id: 'acceptance',
        title: 'القبول',
        body: [
          'باستخدامك هذا الموقع، فإنك توافق على هذه الشروط والأحكام وعلى سياسة الخصوصية. وإن لم توافق عليها، يُرجى عدم استخدام الموقع.',
        ],
      },
      {
        id: 'purpose',
        title: 'طبيعة الموقع',
        body: [
          'الموقع وسيلة للتعريف بشركة أركان التعمير المتحدة وخدماتها، وقناة لاستقبال الاستفسارات وطلبات عروض الأسعار. والمعلومات المنشورة فيه ذات طابع عام، ولا تُعدّ عرضًا ملزمًا أو استشارة فنية لمشروع بعينه.',
        ],
      },
      {
        id: 'quotes',
        title: 'طلبات عروض الأسعار والتعاقد',
        body: [
          {
            list: [
              'لا يُنشئ إرسال طلب عرض سعر عبر الموقع أي التزام تعاقدي على أيٍّ من الطرفين.',
              'تُحدَّد الأسعار ونطاق الأعمال والمواد والمدد في عرض سعر مكتوب، ولا تصبح ملزمة إلا بعد اعتمادها وتوقيع العقد.',
              'عند التعاقد، تحكم العلاقةَ بين الطرفين بنودُ العقد الموقّع، وتُقدَّم على ما ورد في هذا الموقع عند التعارض.',
            ],
          },
        ],
      },
      {
        id: 'content',
        title: 'دقة المحتوى والصور',
        body: [
          'نحرص على دقة المعلومات المنشورة وتحديثها، دون أن نضمن خلوّها من الأخطاء أو اكتمالها في جميع الأوقات. وقد تكون بعض الصور المعروضة توضيحية، وتختلف المواصفات النهائية لكل مشروع بحسب ما يُتّفق عليه.',
        ],
      },
      {
        id: 'ip',
        title: 'الملكية الفكرية',
        body: [
          'جميع محتويات الموقع — من نصوص وتصاميم وشعارات وعلامات وصور — مملوكة للشركة أو مرخّصة لها، ولا يجوز نسخها أو إعادة نشرها أو استخدامها تجاريًا دون إذن كتابي مسبق من الشركة.',
        ],
      },
      {
        id: 'use',
        title: 'الاستخدام المقبول',
        body: [
          'عند استخدامك الموقع، فإنك تلتزم بما يلي:',
          {
            list: [
              'تقديم معلومات صحيحة في النماذج والمراسلات.',
              'عدم استخدام الموقع لأي غرض مخالف للأنظمة أو مضرّ بالغير.',
              'عدم محاولة الوصول غير المصرّح به إلى الموقع أو تعطيله أو التأثير في عمله.',
              'عدم إرسال محتوى مسيء أو مضلّل أو برمجيات ضارة.',
            ],
          },
        ],
      },
      {
        id: 'links',
        title: 'الروابط الخارجية',
        body: [
          'قد يتضمن الموقع روابط إلى مواقع وخدمات خارجية، مثل واتساب وخرائط جوجل ومنصات التواصل الاجتماعي. نوفّرها لتسهيل الوصول فقط، ولا نتحمّل مسؤولية محتواها أو ممارساتها.',
        ],
      },
      {
        id: 'liability',
        title: 'حدود المسؤولية',
        body: [
          'يُقدَّم الموقع ومحتواه «كما هو». وفي الحدود التي تسمح بها الأنظمة، لا تتحمّل الشركة المسؤولية عن أي أضرار غير مباشرة تنتج عن استخدام الموقع، أو تعذّر الوصول إليه، أو الاعتماد على المعلومات المنشورة فيه.',
        ],
      },
      {
        id: 'privacy',
        title: 'الخصوصية',
        body: [
          {
            text: 'يخضع جمع بياناتك الشخصية ومعالجتها لـ',
            link: { page: 'privacy', label: 'سياسة الخصوصية' },
            after: ' المنشورة في الموقع.',
          },
        ],
      },
      {
        id: 'law',
        title: 'النظام الواجب التطبيق',
        body: [
          'تخضع هذه الشروط وتُفسَّر وفقًا للأنظمة المعمول بها في المملكة العربية السعودية، وتختص الجهات القضائية المختصة في المملكة بالنظر في أي نزاع ينشأ عنها.',
        ],
      },
      {
        id: 'changes',
        title: 'التعديلات',
        body: [
          'يحق للشركة تعديل هذه الشروط في أي وقت، ويُعمل بالنسخة المعدّلة من تاريخ نشرها على هذه الصفحة. ويُعدّ استمرارك في استخدام الموقع بعد التعديل موافقةً عليه.',
        ],
      },
    ],
    contact: {
      title: 'للاستفسار عن هذه الشروط',
      text: 'إن كان لديك أي سؤال حول هذه الشروط والأحكام، يسعدنا تواصلك معنا عبر إحدى القنوات التالية.',
    },
  },
  en: {
    title: [{ text: 'Terms &' }, { text: 'Conditions', accent: true }],
    lead: 'These terms govern your use of the Arkan Altaameer United Co. website. Please read them carefully — by using the website, you agree to them.',
    sections: [
      {
        id: 'acceptance',
        title: 'Acceptance',
        body: [
          'By using this website, you agree to these terms and conditions and to our Privacy Policy. If you do not agree, please do not use the website.',
        ],
      },
      {
        id: 'purpose',
        title: 'About this website',
        body: [
          'The website introduces Arkan Altaameer United Co. and its services, and is a channel for enquiries and quotation requests. The information on it is general in nature and is not a binding offer or technical advice for any particular project.',
        ],
      },
      {
        id: 'quotes',
        title: 'Quotation requests and contracts',
        body: [
          {
            list: [
              'Submitting a quotation request through the website does not create a contractual obligation for either party.',
              'Prices, scope of work, materials and timelines are set out in a written quotation, and become binding only once approved and the contract is signed.',
              'Once a contract is signed, its terms govern the relationship between the parties and prevail over anything on this website in case of conflict.',
            ],
          },
        ],
      },
      {
        id: 'content',
        title: 'Accuracy of content and images',
        body: [
          'We take care to keep the information on this website accurate and up to date, but we cannot guarantee that it is free from errors or complete at all times. Some images shown may be illustrative, and the final specification of every project depends on what is agreed.',
        ],
      },
      {
        id: 'ip',
        title: 'Intellectual property',
        body: [
          'All content on the website — including text, designs, logos, marks and images — is owned by or licensed to the Company, and may not be copied, republished or used commercially without the Company’s prior written permission.',
        ],
      },
      {
        id: 'use',
        title: 'Acceptable use',
        body: [
          'When using the website, you agree to:',
          {
            list: [
              'Provide accurate information in forms and correspondence.',
              'Not use the website for any unlawful purpose, or in a way that harms others.',
              'Not attempt to gain unauthorised access to the website, disrupt it or interfere with how it works.',
              'Not send offensive or misleading content, or malicious software.',
            ],
          },
        ],
      },
      {
        id: 'links',
        title: 'External links',
        body: [
          'The website may link to external sites and services such as WhatsApp, Google Maps and social media platforms. These links are provided for convenience only, and we are not responsible for their content or practices.',
        ],
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        body: [
          'The website and its content are provided “as is”. To the extent permitted by law, the Company is not liable for any indirect loss arising from the use of the website, from being unable to access it, or from reliance on the information published on it.',
        ],
      },
      {
        id: 'privacy',
        title: 'Privacy',
        body: [
          {
            text: 'The collection and processing of your personal data is governed by our',
            link: { page: 'privacy', label: 'Privacy Policy' },
            after: '.',
          },
        ],
      },
      {
        id: 'law',
        title: 'Governing law',
        body: [
          'These terms are governed by and interpreted in accordance with the laws in force in the Kingdom of Saudi Arabia, and the competent judicial authorities in the Kingdom have jurisdiction over any dispute arising from them.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to these terms',
        body: [
          'The Company may amend these terms at any time. The revised version applies from the date it is published on this page, and continuing to use the website after a change means you accept it.',
        ],
      },
    ],
    contact: {
      title: 'Questions about these terms',
      text: 'If you have any question about these terms and conditions, we’d be glad to hear from you through any of the channels below.',
    },
  },
};
