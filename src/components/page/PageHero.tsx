import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { Picture } from '@/components/ui/Picture';
import { RevealHeading } from '@/components/ui/RevealHeading';
import type { MediaKey } from '@/data/media.generated';
import { useLang } from '@/i18n/context';
import type { HeadingLines } from '@/i18n/types';
import { cn } from '@/lib/cn';
import { EASE, EASE_CURTAIN } from '@/lib/motion';
import { Breadcrumbs } from './Breadcrumbs';

interface PageHeroProps {
  /** sheet number of the page, e.g. "02" */
  index: string;
  /** page name — eyebrow label and breadcrumb */
  label: string;
  title: HeadingLines;
  lead: ReactNode;
  /** full-bleed photograph (preloaded from the page's static HTML — keep sizes="100vw") */
  image?: { id: MediaKey; alt: string; position?: string };
  /** content under the lead (buttons, search …) */
  children?: ReactNode;
  /** side column on desktop (compact heroes) */
  aside?: ReactNode;
  /** drawing-sheet "title block" band along the bottom edge */
  strip?: ReactNode;
  /** shorter hero for utility pages (content starts sooner) */
  compact?: boolean;
}

/**
 * Opening of every inner page: the photograph rises from a gold foundation line, the headline climbs
 * word by word — the home-page hero's language, one register quieter.
 */
export function PageHero({ index, label, title, lead, image, children, aside, strip, compact }: PageHeroProps) {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.1]);

  const intro = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section
      ref={ref}
      aria-labelledby="page-title"
      className={cn(
        'grain relative isolate flex flex-col overflow-hidden bg-graphite-deeper text-stone',
        image && !compact ? 'min-h-[max(34rem,86svh)]' : image ? 'min-h-[max(30rem,70svh)]' : 'min-h-[max(28rem,62svh)]',
      )}
    >
      {image ? (
        <m.div className="absolute inset-0 -z-10" style={{ y: mediaY }}>
          <m.div
            className="absolute inset-0"
            initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.3, ease: EASE_CURTAIN, delay: 0.1 }}
          >
            <m.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.6, ease: EASE }}
            >
              <Picture id={image.id} alt={image.alt} sizes="100vw" priority position={image.position} />
            </m.div>
          </m.div>
          {/* veils: reading side, bottom, top (header) */}
          <div className="absolute inset-0 bg-linear-to-r from-graphite-deeper/92 via-graphite-deeper/55 via-50% to-graphite-deeper/10 rtl:bg-linear-to-l" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-graphite-deeper via-graphite-deeper/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-graphite-deeper/85 to-transparent" />
        </m.div>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 draft-grid fade-mask" />
          {/* text-only heroes carry their sheet number, drawn large in outline */}
          {!aside && (
            // positioned wrapper stays direction-neutral: `numerals` sets direction:ltr, which would flip `end`
            <m.div
              aria-hidden
              className="pointer-events-none absolute end-[clamp(1.25rem,0.6rem+3.4vw,4.5rem)] bottom-6 -z-10 hidden select-none md:block"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            >
              <span className="block numerals text-[clamp(9rem,5rem+14vw,19rem)] leading-none font-extralight text-gold/20 outline-text">
                {index}
              </span>
            </m.div>
          )}
        </>
      )}

      {/* the foundation line the photograph rises from */}
      {image && !reduce && (
        <m.span
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-px origin-center bg-gold"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          transition={{ scaleX: { duration: 0.6, ease: EASE }, opacity: { duration: 1.6, times: [0, 0.6, 1] } }}
        />
      )}

      {/* drafting-sheet margins */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] shell hidden md:block">
        <div className="h-full border-x border-stone/[0.07]" />
      </div>

      <m.div className="relative shell flex flex-1 flex-col pt-32 pb-14 sm:pt-36 lg:pb-20" style={{ y: contentY, opacity: contentOpacity }}>
        <m.div {...intro(0.15)}>
          <Breadcrumbs current={label} />
        </m.div>

        <div className={cn('mt-auto pt-16', !!aside && 'grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10')}>
          <div className={cn(aside ? 'lg:col-span-7' : 'max-w-4xl')}>
            <m.p className="flex items-center gap-4" {...intro(0.3)}>
              <span className="numerals text-xs font-semibold tracking-[0.2em] text-gold">{index}</span>
              <span aria-hidden className="h-px w-10 bg-gold/60 sm:w-14" />
              <span className={lang === 'ar' ? 'text-[0.95rem] font-medium text-stone' : 'label-latin text-stone'}>{label}</span>
            </m.p>

            <RevealHeading
              as="h1"
              id="page-title"
              lines={title}
              trigger="mount"
              delay={reduce ? 0 : 0.35}
              className="mt-7 type-display text-stone"
              accentClassName="text-gold"
            />

            <m.div className="mt-7 max-w-2xl type-lead text-haze" {...intro(0.7)}>
              {lead}
            </m.div>

            {children && (
              <m.div className="mt-9" {...intro(0.85)}>
                {children}
              </m.div>
            )}
          </div>

          {aside && (
            <m.div className="lg:col-span-5" {...intro(0.6)}>
              {aside}
            </m.div>
          )}
        </div>
      </m.div>

      {strip && (
        <m.div
          className="relative border-t border-gold/20 bg-graphite-deeper/60 backdrop-blur-md"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: '0%' }}
          transition={{ duration: 1.1, ease: EASE, delay: reduce ? 0 : 0.8 }}
        >
          {strip}
        </m.div>
      )}
    </section>
  );
}
