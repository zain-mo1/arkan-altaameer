import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { WindowMark } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { sectionIndex } from '@/data/navigation';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

/** Faint construction lines, as on the identity guide's "logo construction" sheet. */
function ConstructionLines() {
  return (
    <m.svg
      aria-hidden
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -end-40 -top-24 hidden w-[42rem] text-gold-dark/40 md:block"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: EASE }}
      fill="none"
      stroke="currentColor"
    >
      <circle cx="300" cy="300" r="210" strokeDasharray="6 8" />
      <circle cx="300" cy="300" r="120" strokeWidth="0.75" />
      <path d="M0 300h600M300 0v600" strokeDasharray="10 8" />
      <path d="M90 510 510 90" strokeWidth="0.75" />
      <path d="M150 560h300M150 548v24M450 548v24" strokeWidth="0.9" />
      <rect x="276" y="276" width="48" height="48" strokeWidth="0.9" />
    </m.svg>
  );
}

/** The four delivery stages. `index` renumbers the section label when it's reused on another page. */
export function Process({ index = sectionIndex('process') }: { index?: string }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 78%', 'end 62%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const steps = t.process.steps;
  const [reached, setReached] = useState(reduce ? steps.length : 0);

  // a node lights up once the gold line reaches it (nodes sit at ≈ i/n along the rail)
  useMotionValueEvent(progress, 'change', (v) => {
    if (reduce) return;
    setReached(steps.filter((_, i) => v >= i / steps.length + 0.015).length);
  });

  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden bg-paper text-graphite">
      <div aria-hidden className="pointer-events-none absolute inset-0 draft-grid-light fade-mask" />
      <ConstructionLines />

      <div className="relative shell section-y">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionLabel index={index} label={t.process.label} tone="light" />
            <RevealHeading
              id="process-title"
              lines={t.process.title}
              className="mt-8 type-h2 text-graphite"
              accentClassName="text-gold-dark"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="type-lead text-slate">{t.process.intro}</p>
          </Reveal>
        </div>

        <div ref={track} className="relative mt-20 lg:mt-28">
          {/* progress rail — horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute inset-x-7 top-7 hidden h-px bg-graphite/15 lg:block">
            <m.div className="h-full origin-left bg-gold rtl:origin-right" style={{ scaleX: reduce ? 1 : progress }} />
          </div>
          <div aria-hidden className="absolute start-7 top-7 bottom-7 w-px bg-graphite/15 lg:hidden">
            <m.div className="h-full w-full origin-top bg-gold" style={{ scaleY: reduce ? 1 : progress }} />
          </div>

          <ol className="relative grid gap-14 lg:grid-cols-4 lg:gap-10">
            {steps.map((step, i) => {
              const on = i < reached;
              return (
                <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-6 lg:block">
                  <div
                    className={cn(
                      'relative z-10 grid size-14 place-items-center border transition-colors duration-700 ease-(--ease-brand)',
                      on ? 'border-gold bg-graphite text-gold' : 'border-graphite/20 bg-paper text-graphite/30',
                    )}
                  >
                    <WindowMark className="size-4" />
                  </div>
                  <Reveal className="lg:mt-10" delay={0.08 * i}>
                    <span
                      className={cn(
                        'block numerals text-6xl leading-none font-light transition-colors duration-700 outline-text lg:text-7xl',
                        on ? 'text-gold-dark' : 'text-graphite/25',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-5 type-h3 text-graphite">{step.title}</h3>
                    <p className="mt-3 max-w-xs type-body text-slate">{step.text}</p>
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
