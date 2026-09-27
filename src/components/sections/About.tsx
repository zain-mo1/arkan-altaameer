import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowIcon, WindowMark } from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/Button';
import { pages } from '@/config/pages';
import { sectionIndex } from '@/data/navigation';
import { useLang } from '@/i18n/context';
import { EASE, VIEWPORT } from '@/lib/motion';

/**
 * Brand concept made tangible: the raw structure (start side) gives way to the finished space
 * as the section scrolls through the viewport.
 */
export function StructureToSpace() {
  const { t, isRTL } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 35%'] });
  // share of the frame still showing the structure, measured from the start edge
  const split = useTransform(scrollYProgress, [0, 1], reduce ? [42, 42] : [68, 34]);
  const clipPath = useTransform(split, (v) => (isRTL ? `inset(0% 0% 0% ${100 - v}%)` : `inset(0% ${100 - v}% 0% 0%)`));
  const seam = useTransform(split, (v) => `${v}%`);

  return (
    <div ref={ref} className="relative">
      {/* offset drafting frame */}
      <div
        aria-hidden
        className="absolute -inset-3 translate-x-[calc(var(--dir)*1.25rem)] translate-y-5 border border-gold/40 sm:-inset-4"
      />

      <div className="relative aspect-[4/5] overflow-hidden bg-graphite sm:aspect-[5/4] lg:aspect-[6/5]">
        <Picture id="about-space" alt={t.about.spaceAlt} sizes="(min-width: 1024px) 55vw, 100vw" />

        <m.div className="absolute inset-0" style={{ clipPath }}>
          <Picture
            id="about-structure"
            alt={t.about.structureAlt}
            sizes="(min-width: 1024px) 55vw, 100vw"
            imgClassName="grayscale-[0.55] contrast-[1.05] brightness-[0.82]"
          />
          <div className="absolute inset-0 bg-graphite-deeper/20" />
        </m.div>

        {/* the gold seam */}
        <m.div aria-hidden className="absolute inset-y-0 z-10 w-0" style={{ insetInlineStart: seam }}>
          <span className="absolute inset-y-0 -start-px w-[2px] bg-gold shadow-[0_0_24px_rgba(212,175,55,0.55)]" />
          <span className="absolute -start-4 top-1/2 grid size-8 -translate-y-1/2 place-items-center bg-gold text-graphite-deeper">
            <WindowMark className="size-3" />
          </span>
        </m.div>

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-graphite-deeper/80 to-transparent" />

        <div className="absolute start-5 bottom-5 z-10 sm:start-7 sm:bottom-7">
          <p className="font-display text-lg text-stone sm:text-2xl">{t.about.structure}</p>
        </div>
        <div className="absolute end-5 bottom-5 z-10 text-end sm:end-7 sm:bottom-7">
          <p className="font-display text-lg text-stone sm:text-2xl">{t.about.space}</p>
        </div>
      </div>
    </div>
  );
}

export function About() {
  const { t, path } = useLang();

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-paper text-graphite">
      <div aria-hidden className="pointer-events-none absolute inset-0 draft-grid-light fade-mask" />

      <div className="relative shell section-y">
        <div className="grid items-center gap-x-10 gap-y-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index={sectionIndex('about')} label={t.about.label} tone="light" />
            <RevealHeading id="about-title" lines={t.about.title} className="mt-8 type-h2 text-graphite" accentClassName="text-gold-dark" />
            <Reveal delay={0.1}>
              <p className="mt-8 type-lead text-graphite">{t.about.lead}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 type-body text-slate">{t.about.body}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <TextLink to={path(pages.about.path)} tone="light" icon={<ArrowIcon />}>
                {t.about.more}
              </TextLink>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7 lg:ps-6" y={40}>
            <StructureToSpace />
          </Reveal>
        </div>

        {/* values band */}
        <div className="mt-24 border-y border-graphite/10 py-8 sm:mt-32 lg:py-10">
          <h3 className="sr-only">{t.about.valuesLabel}</h3>
          <m.ul
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-9 lg:justify-between"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            transition={{ staggerChildren: 0.09 }}
          >
            {t.about.values.map((value) => (
              <m.li
                key={value}
                className="flex items-center gap-3 font-display text-lg font-light text-graphite sm:gap-4 sm:text-2xl lg:text-[1.7rem]"
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
              >
                <span aria-hidden className="size-1.5 shrink-0 rotate-45 bg-gold sm:size-2" />
                {value}
              </m.li>
            ))}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
