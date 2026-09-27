import { AnimatePresence, m } from 'framer-motion';
import { useDeferredValue, useMemo, useState } from 'react';
import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { PageHero } from '@/components/page/PageHero';
import { Section } from '@/components/page/Section';
import { ContactCta } from '@/components/sections/ContactCta';
import { Button } from '@/components/ui/Button';
import { CloseIcon, SearchIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { pageIndex } from '@/config/pages';
import { faq } from '@/data/faq';
import { pad2 } from '@/data/navigation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useGoToSection } from '@/hooks/useGoToSection';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { waLink } from '@/lib/links';
import { EASE } from '@/lib/motion';
import { matchesQuery } from '@/lib/text';
import { content } from './content';

const GROUP_IDS = faq.map((g) => `faq-${g.id}`);
const TOTAL = faq.reduce((n, g) => n + g.items.length, 0);

export default function Faq() {
  const { t, pick } = useLang();
  const c = pick(content);
  useDocumentMeta('faq');
  const goTo = useGoToSection();

  const [query, setQuery] = useState('');
  const q = useDeferredValue(query.trim());
  const groups = useMemo(
    () =>
      q
        ? faq
            .map((g) => ({ ...g, items: g.items.filter((i) => matchesQuery(`${pick(i.q)} ${pick(i.a)}`, q)) }))
            .filter((g) => g.items.length)
        : faq,
    [q, pick],
  );
  const matches = groups.reduce((n, g) => n + g.items.length, 0);
  const active = useScrollSpy(GROUP_IDS, !q);

  return (
    <>
      <PageHero index={pageIndex('faq')} label={t.nav.faq} title={c.title} lead={c.lead} image={{ id: 'page-faq', alt: '' }} compact>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="max-w-xl">
          <label htmlFor="faq-search" className="sr-only">
            {c.search.label}
          </label>
          <div className="relative flex items-center border-b border-stone/30 transition-colors focus-within:border-gold">
            <SearchIcon className="size-5 shrink-0 text-gold" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={c.search.placeholder}
              autoComplete="off"
              className="w-full bg-transparent px-4 py-4 text-[1.05rem] text-stone placeholder:text-mist/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={c.search.clear}
                className="grid size-9 shrink-0 place-items-center text-mist transition-colors hover:text-gold"
              >
                <CloseIcon className="size-4" />
              </button>
            )}
          </div>
          <p className="mt-4 text-[0.82rem] text-mist" aria-live="polite">
            {q ? c.results(matches) : c.summary(TOTAL, faq.length)}
          </p>
        </form>
      </PageHero>

      <Section tone="paper" labelledBy="page-title" padded={false} innerClassName="section-b pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* topic index */}
          <nav aria-label={c.topics} className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="hidden text-[0.8rem] font-semibold text-steel lg:block">{c.topics}</p>
              <ol className="-mx-[clamp(1.25rem,0.6rem+3.4vw,4.5rem)] flex [scrollbar-width:none] gap-2 overflow-x-auto px-[clamp(1.25rem,0.6rem+3.4vw,4.5rem)] lg:mx-0 lg:mt-6 lg:block lg:space-y-1 lg:overflow-visible lg:border-s lg:border-graphite/10 lg:px-0">
                {faq.map((g, i) => {
                  const on = active === `faq-${g.id}`;
                  const available = groups.some((x) => x.id === g.id);
                  return (
                    <li key={g.id} className="shrink-0">
                      <button
                        type="button"
                        disabled={!available}
                        onClick={() => goTo(`faq-${g.id}`)}
                        className={cn(
                          'relative flex items-baseline gap-3 border px-4 py-2.5 text-start text-[0.9rem] whitespace-nowrap transition-colors duration-300 disabled:opacity-35 lg:w-full lg:border-0 lg:py-2 lg:ps-5',
                          on
                            ? 'border-graphite bg-graphite text-stone lg:bg-transparent lg:text-graphite'
                            : 'border-graphite/15 text-slate hover:text-graphite',
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'absolute inset-y-1 -start-px hidden w-px bg-gold transition-transform duration-500 lg:block',
                            on ? 'scale-y-100' : 'scale-y-0',
                          )}
                        />
                        <span className={cn('numerals text-[0.68rem]', on ? 'text-gold lg:text-bronze' : 'text-steel')}>{pad2(i + 1)}</span>
                        {pick(g.title)}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          {/* questions */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait" initial={false}>
              {groups.length ? (
                <m.div
                  key={q || 'all'}
                  className="space-y-20 sm:space-y-24"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {groups.map((g) => {
                    const n = faq.findIndex((x) => x.id === g.id) + 1;
                    return (
                      <section key={g.id} id={`faq-${g.id}`} aria-labelledby={`faq-${g.id}-title`} className="scroll-mt-28">
                        <Reveal className="mb-6 flex items-end justify-between gap-6">
                          <h2 id={`faq-${g.id}-title`} className="flex items-baseline gap-4 type-h3 text-graphite">
                            <span className="numerals text-sm font-semibold tracking-[0.2em] text-bronze">{pad2(n)}</span>
                            {pick(g.title)}
                          </h2>
                          <span className="numerals pb-2 text-[0.75rem] text-steel">{pad2(g.items.length)}</span>
                        </Reveal>
                        <FaqAccordion items={g.items} idPrefix={`faq-${g.id}`} defaultOpen={q ? g.items[0].id : null} />
                      </section>
                    );
                  })}
                </m.div>
              ) : (
                <m.div
                  key="empty"
                  className="border border-graphite/10 bg-ivory px-7 py-16 text-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <SearchIcon className="mx-auto size-8 text-bronze" />
                  <p className="mt-6 type-h4 text-graphite">{c.empty.title}</p>
                  <p className="mx-auto mt-3 max-w-sm text-slate">{c.empty.text}</p>
                  <div className="mt-8 flex justify-center">
                    <Button href={waLink(t.wa.faq)} target="_blank" rel="noopener noreferrer" variant="dark" leadingIcon={<WhatsAppIcon />}>
                      {t.cta.whatsapp}
                    </Button>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      <ContactCta id="ask" index="09" label={c.cta.label} title={c.cta.title} intro={c.cta.intro} waMessage={t.wa.faq} />
    </>
  );
}
