import { Link } from 'react-router';
import { PageHero } from '@/components/page/PageHero';
import { Section } from '@/components/page/Section';
import { MailIcon, PhoneIcon, WhatsAppIcon, WindowMark } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { pageIndex, pages, type PageKey } from '@/config/pages';
import { site } from '@/config/site';
import { pad2 } from '@/data/navigation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useGoToSection } from '@/hooks/useGoToSection';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLang } from '@/i18n/context';
import type { HeadingLines, Lang } from '@/i18n/types';
import { cn } from '@/lib/cn';
import { mailLink, telLink, waLink } from '@/lib/links';

export type Block = string | { list: string[] } | { text: string; link: { page: PageKey; label: string }; after?: string };

export interface LegalDoc {
  title: HeadingLines;
  lead: string;
  sections: { id: string; title: string; body: Block[] }[];
  contact: { title: string; text: string };
}

/** ISO date of the current version of the legal texts. */
export const LEGAL_UPDATED = '2026-09-26';

const formatDate = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T12:00:00`));

function Paragraph({ block }: { block: Block }) {
  const { path } = useLang();
  if (typeof block === 'string') return <p>{block}</p>;
  if ('list' in block) {
    return (
      <ul className="space-y-3">
        {block.list.map((item) => (
          <li key={item} className="flex gap-4">
            <WindowMark className="mt-[0.7em] size-2 shrink-0 text-gold-dark" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      {block.text}{' '}
      <Link
        to={path(pages[block.link.page].path)}
        className="text-bronze underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze"
      >
        {block.link.label}
      </Link>
      {block.after}
    </p>
  );
}

/** Privacy policy / terms — a numbered document with a sticky table of contents. */
export function LegalPage({ page, doc }: { page: 'privacy' | 'terms'; doc: LegalDoc }) {
  const { t, lang } = useLang();
  useDocumentMeta(page);
  const goTo = useGoToSection();
  const ids = doc.sections.map((s) => `sec-${s.id}`);
  const active = useScrollSpy(ids);

  return (
    <>
      <PageHero
        index={pageIndex(page)}
        label={t.nav[page]}
        title={doc.title}
        lead={
          <>
            <p>{doc.lead}</p>
            <p className="mt-6 flex items-center gap-3 text-[0.85rem] text-mist">
              <span className="h-px w-6 bg-gold/60" />
              {t.common.lastUpdated}: <time dateTime={LEGAL_UPDATED}>{formatDate(LEGAL_UPDATED, lang)}</time>
            </p>
          </>
        }
      />

      <Section tone="paper" labelledBy="page-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <nav aria-label={t.common.onThisPage} className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <p className="text-[0.8rem] font-semibold text-steel">{t.common.onThisPage}</p>
              <ol className="mt-6 space-y-1 border-s border-graphite/10">
                {doc.sections.map((s, i) => {
                  const on = active === `sec-${s.id}`;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goTo(`sec-${s.id}`)}
                        className={cn(
                          'relative flex w-full items-baseline gap-3 py-1.5 ps-5 text-start text-[0.88rem] leading-6 transition-colors duration-300',
                          on ? 'text-graphite' : 'text-slate hover:text-graphite',
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'absolute inset-y-1 -start-px w-px bg-gold transition-transform duration-500',
                            on ? 'scale-y-100' : 'scale-y-0',
                          )}
                        />
                        <span className={cn('numerals text-[0.66rem]', on ? 'text-bronze' : 'text-steel')}>{pad2(i + 1)}</span>
                        {s.title}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          <article className="max-w-3xl lg:col-span-8 lg:col-start-5">
            {doc.sections.map((s, i) => (
              <section
                key={s.id}
                id={`sec-${s.id}`}
                aria-labelledby={`sec-${s.id}-title`}
                className="border-t border-graphite/10 py-11 first:border-t-0 first:pt-0"
              >
                <h2 id={`sec-${s.id}-title`} className="flex items-baseline gap-4 type-h4 text-graphite">
                  <span className="numerals text-xs font-semibold tracking-[0.2em] text-bronze">{pad2(i + 1)}</span>
                  {s.title}
                </h2>
                <div className="mt-5 space-y-5 type-body text-slate">
                  {s.body.map((block, j) => (
                    <Paragraph key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}

            <Reveal className="mt-6 bg-graphite p-8 text-stone sm:p-10">
              <p className="type-h4">{doc.contact.title}</p>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-8 text-mist">{doc.contact.text}</p>
              <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-4 text-[0.95rem]">
                <li>
                  <a href={mailLink} className="flex items-center gap-3 transition-colors hover:text-gold-light">
                    <MailIcon className="size-4 text-gold" />
                    <bdi>{site.contact.email}</bdi>
                  </a>
                </li>
                <li>
                  <a href={telLink} className="flex items-center gap-3 transition-colors hover:text-gold-light">
                    <PhoneIcon className="size-4 text-gold" />
                    <bdi>{site.contact.phoneDisplay}</bdi>
                  </a>
                </li>
                <li>
                  <a
                    href={waLink(t.wa.contact)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-colors hover:text-gold-light"
                  >
                    <WhatsAppIcon className="size-4 text-gold" />
                    {t.cta.whatsapp}
                  </a>
                </li>
              </ul>
            </Reveal>
          </article>
        </div>
      </Section>
    </>
  );
}
