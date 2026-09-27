import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { FramedImage } from '@/components/page/FramedImage';
import { PageHero } from '@/components/page/PageHero';
import { Section } from '@/components/page/Section';
import { SectionHeading } from '@/components/page/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { pageIndex } from '@/config/pages';
import { faq } from '@/data/faq';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useLang } from '@/i18n/context';
import { content } from './content';
import { QuoteForm } from './QuoteForm';

export default function Quote() {
  const { t, pick } = useLang();
  const c = pick(content);
  useDocumentMeta('quote');
  const quoteFaq = faq.find((g) => g.id === 'quote')!.items.filter((i) => i.id !== 'how');

  return (
    <>
      <PageHero
        index={pageIndex('quote')}
        label={t.nav.quote}
        title={c.hero.title}
        lead={c.hero.lead}
        aside={
          <FramedImage
            id="page-quote"
            alt={c.hero.imageAlt}
            sizes="(min-width: 1024px) 36vw, 100vw"
            frameClassName="aspect-[4/3] lg:aspect-[5/4]"
            tone="dark"
            delay={0.4}
          >
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-graphite-deeper/85 to-transparent px-6 pt-16 pb-5">
              <p className="text-[0.85rem] text-stone">{c.hero.caption}</p>
            </div>
          </FramedImage>
        }
      />

      <Section id="request" tone="paper" labelledBy="page-title">
        <QuoteForm />
      </Section>

      <Section id="questions" tone="ivory" labelledBy="quote-faq-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeading id="quote-faq-title" index="04" label={c.faq.label} title={c.faq.title} layout="stack" />
          </div>
          <Reveal className="lg:col-span-8" y={30}>
            <FaqAccordion items={quoteFaq} idPrefix="quote-faq" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
