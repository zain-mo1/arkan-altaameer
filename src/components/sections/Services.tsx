import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TextLink } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { pages } from '@/config/pages';
import { sectionIndex } from '@/data/navigation';
import { services } from '@/data/services';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

export function Services() {
  const { t, lang, pick, path } = useLang();
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLElement | null)[]>([]);

  // The row crossing the centre of the viewport drives the sticky image panel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    rows.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = services[active];

  return (
    <section id="services" aria-labelledby="services-title" className="grain relative bg-graphite-deep text-stone">
      <div aria-hidden className="pointer-events-none absolute inset-0 draft-grid fade-mask opacity-70" />

      <div className="relative shell section-y">
        {/* heading */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index={sectionIndex('services')} label={t.services.label} />
            <RevealHeading id="services-title" lines={t.services.title} className="mt-8 type-h2" accentClassName="text-gold" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="type-lead text-mist">{t.services.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-16 lg:mt-24 lg:grid-cols-12">
          {/* sticky photo panel (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <Reveal y={40}>
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-4 translate-x-[calc(var(--dir)*-1.25rem)] translate-y-5 border border-gold/25"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                    {services.map((s, i) => (
                      <div
                        key={s.id}
                        aria-hidden={i !== active}
                        className={cn(
                          'absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-(--ease-brand)',
                          i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0',
                        )}
                      >
                        <Picture id={s.image} alt={pick(s.imageAlt)} sizes="(min-width: 1024px) 38vw, 1px" />
                      </div>
                    ))}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-graphite-deeper/90 to-transparent" />
                    <div className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-6">
                      <AnimatePresence mode="wait" initial={false}>
                        <m.span
                          key={current.id}
                          className="numerals text-6xl leading-none font-extralight text-stone/90"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.5, ease: EASE }}
                        >
                          {current.index}
                        </m.span>
                      </AnimatePresence>
                      <span className={lang === 'ar' ? 'pb-1 text-end text-[0.9rem] text-gold' : 'label-latin pb-1 text-end text-gold'}>
                        {pick(current.short)}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* service index */}
          <ol className="lg:col-span-7">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li
                  key={s.id}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  data-index={i}
                  data-active={isActive}
                  onMouseEnter={() => setActive(i)}
                  className="group relative border-t border-mist/15 py-11 transition-opacity duration-700 last:border-b lg:py-14 lg:hover:opacity-100 lg:data-[active=false]:opacity-45"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'absolute start-0 -top-px h-px w-full origin-left bg-gold transition-transform duration-[900ms] ease-(--ease-brand) rtl:origin-right',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                  <Reveal className="grid gap-5 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
                    <span className="numerals pt-1.5 text-sm font-medium tracking-[0.18em] text-gold">{s.index}</span>
                    <div>
                      <h3 className="type-h3 text-stone">{pick(s.title)}</h3>
                      <p className="mt-3 text-[0.95rem] text-gold-light/85">{pick(s.tagline)}</p>
                      <p className="mt-5 max-w-xl type-body text-mist">{pick(s.description)}</p>
                      <ul className="mt-7 flex flex-wrap gap-2">
                        {pick(s.scope).map((item) => (
                          <li key={item} className="border border-mist/15 px-3.5 py-1.5 text-[0.8rem] text-haze">
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="relative mt-9 aspect-[4/3] overflow-hidden lg:hidden">
                        <Picture id={s.image} alt={pick(s.imageAlt)} sizes="(max-width: 1023px) 92vw, 1px" />
                      </div>
                      <div className="mt-8">
                        <TextLink to={`${path(pages.services.path)}#${s.id}`} icon={<ArrowIcon />}>
                          {t.services.more}
                        </TextLink>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
