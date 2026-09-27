import { m } from 'framer-motion';
import { PageHero } from '@/components/page/PageHero';
import { Section } from '@/components/page/Section';
import type { SectionTone } from '@/components/page/tone';
import { SectionHeading } from '@/components/page/SectionHeading';
import { TitleBlock } from '@/components/page/TitleBlock';
import { ContactCta } from '@/components/sections/ContactCta';
import { Process } from '@/components/sections/Process';
import { WindowMark } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { pageIndex } from '@/config/pages';
import { pad2 } from '@/data/navigation';
import { services } from '@/data/services';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useGoToSection } from '@/hooks/useGoToSection';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { EASE, EASE_CURTAIN, VIEWPORT } from '@/lib/motion';
import { content } from './content';
import { ServiceChapter } from './ServiceChapter';

const TONES: SectionTone[] = ['darker', 'paper', 'dark', 'ivory'];

/** The four services drawn as the four squares of the Arkan window mark — each opens its chapter. */
function FourSquare({ label }: { label: string }) {
  const { pick } = useLang();
  const goTo = useGoToSection();
  return (
    <m.div className="relative mx-auto aspect-square w-full max-w-[30rem]" initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {/* construction lines */}
      <m.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute -inset-[9%] size-[118%] text-gold-dark/35"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.25"
        variants={{ hidden: { opacity: 0, rotate: -8 }, show: { opacity: 1, rotate: 0, transition: { duration: 1.6, ease: EASE } } }}
      >
        <circle cx="50" cy="50" r="49" strokeDasharray="1 1.4" />
        <path d="M50 0v100M0 50h100" strokeDasharray="1.6 1.2" />
        <path d="M8 8 92 92M92 8 8 92" strokeWidth="0.18" />
      </m.svg>

      <ol aria-label={label} className="relative grid size-full grid-cols-2 gap-[5%]">
        {services.map((s, i) => (
          <m.li
            key={s.id}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE_CURTAIN, delay: 0.15 * i } },
            }}
          >
            <button
              type="button"
              onClick={() => goTo(s.id)}
              className="group relative flex size-full flex-col justify-between overflow-hidden bg-graphite p-4 text-start text-stone transition-colors duration-500 hover:bg-gold hover:text-graphite-deeper sm:p-6"
            >
              <span className="numerals text-[0.7rem] font-semibold tracking-[0.2em] text-gold transition-colors duration-500 group-hover:text-graphite-deeper">
                {s.index}
              </span>
              <span className="font-display text-[0.95rem] leading-snug sm:text-lg">{pick(s.title)}</span>
              <WindowMark
                aria-hidden
                className="absolute end-4 top-4 size-3 text-gold/40 transition-colors duration-500 group-hover:text-graphite-deeper sm:end-6 sm:top-6"
              />
            </button>
          </m.li>
        ))}
      </ol>
    </m.div>
  );
}

export default function Services() {
  const { t, pick } = useLang();
  const c = pick(content);
  useDocumentMeta('services');

  return (
    <>
      <PageHero
        index={pageIndex('services')}
        label={t.nav.services}
        title={c.hero.title}
        lead={c.hero.lead}
        image={{ id: 'page-services', alt: '' }}
        strip={
          <TitleBlock
            label={c.hero.stripLabel}
            items={services.map((s) => ({ target: s.id, index: s.index, label: pick(s.title), caption: pick(s.tagline) }))}
          />
        }
      />

      {/* 00 — one system */}
      <Section id="system" tone="ivory" labelledBy="system-title">
        <div className="grid items-center gap-x-10 gap-y-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="system-title" index="00" label={c.system.label} title={c.system.title} layout="stack" />
            <Reveal delay={0.1}>
              <p className="mt-8 type-body text-slate">{c.system.text}</p>
            </Reveal>
            <m.ul
              className="mt-12 border-t border-graphite/12"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              transition={{ staggerChildren: 0.1 }}
            >
              {c.system.benefits.map((b, i) => (
                <m.li
                  key={b.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-graphite/12 py-5 sm:grid-cols-[3rem_1fr]"
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
                >
                  <span className="pt-1">
                    <span className="numerals text-[0.72rem] font-semibold tracking-[0.2em] text-bronze">{pad2(i + 1)}</span>
                  </span>
                  <span>
                    <span className="block type-h4 text-graphite">{b.title}</span>
                    <span className="mt-1 block text-[0.95rem] leading-7 text-slate">{b.text}</span>
                  </span>
                </m.li>
              ))}
            </m.ul>
          </div>
          <div className={cn('px-6 sm:px-10 lg:col-span-5 lg:col-start-8 lg:px-0')}>
            <FourSquare label={c.system.diagramLabel} />
          </div>
        </div>
      </Section>

      {services.map((s, i) => (
        <ServiceChapter key={s.id} service={s} copy={c.chapters[s.id]} labels={c.labels} tone={TONES[i]} flip={i % 2 === 1} />
      ))}

      <Process index="05" />

      <ContactCta id="start" index="06" label={c.cta.label} title={c.cta.title} intro={c.cta.intro} waMessage={t.wa.services} />
    </>
  );
}
