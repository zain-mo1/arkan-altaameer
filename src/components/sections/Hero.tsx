import { m, useInView, usePageInView, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Fragment, useEffect, useRef, useState, type FocusEvent, type ReactNode } from 'react';
import { Button, TextLink } from '@/components/ui/Button';
import { ArrowIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { services, type Service } from '@/data/services';
import { useGoToSection } from '@/hooks/useGoToSection';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { waLink } from '@/lib/links';
import { EASE, EASE_CURTAIN } from '@/lib/motion';

const SLIDE_MS = 8000;
/** Autoplay starts once the opening sequence has finished */
const INTRO_MS = 1500;
/** A new slide's copy waits for the previous one to leave */
const ENTER_DELAY = 0.45;

/** Opening sequence: a gold seam is drawn, then the photograph opens from it — "from structure to space". */
function Curtain({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className="absolute inset-0">{children}</div>;
  return (
    <>
      <m.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0% 49.8% 0% 49.8%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.25, ease: EASE_CURTAIN, delay: 0.2 }}
      >
        {children}
      </m.div>
      <m.span
        aria-hidden
        className="absolute inset-y-0 start-1/2 z-10 w-px origin-top bg-gold"
        initial={{ scaleY: 0, opacity: 1 }}
        animate={{ scaleY: 1, opacity: [1, 1, 0] }}
        transition={{ scaleY: { duration: 0.45, ease: EASE }, opacity: { duration: 1.4, times: [0, 0.5, 1] } }}
      />
    </>
  );
}

/* Slide copy states: "hidden" (waiting below its mask) → "in" → "out" (leaves upward). Labels, not target
   objects, so re-renders of the hero never restart an animation. */
const word: Variants = {
  hidden: { y: '135%' },
  in: (i: number) => ({ y: ['135%', '0%'], transition: { duration: 1.05, ease: EASE, delay: ENTER_DELAY + i * 0.075 } }),
  out: { y: '-135%', transition: { duration: 0.45, ease: EASE_CURTAIN } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  in: (delay: number) => ({ opacity: [0, 1], y: [16, 0], transition: { duration: 0.9, ease: EASE, delay: ENTER_DELAY + delay } }),
  out: { opacity: 0, y: -10, transition: { duration: 0.35, ease: EASE } },
};

/**
 * Calls to action are drawn in from the reading edge, like the gold seam, once the copy has settled — and
 * leave the way they came, retracting into that edge.
 */
type Draw = { delay: number; from: string };
const SHOWN = 'inset(0% 0% 0% 0%)';
const draw: Variants = {
  hidden: ({ from }: Draw) => ({ opacity: 0, clipPath: from }),
  in: ({ delay, from }: Draw) => ({
    opacity: [0, 1],
    clipPath: [from, SHOWN],
    transition: {
      opacity: { duration: 0.3, ease: 'linear', delay: ENTER_DELAY + delay },
      clipPath: { duration: 0.85, ease: EASE_CURTAIN, delay: ENTER_DELAY + delay },
    },
    // an unclipped button keeps its focus ring
    transitionEnd: { clipPath: 'none' },
  }),
  out: ({ from }: Draw) => ({ opacity: 0, clipPath: from, transition: { duration: 0.4, ease: EASE_CURTAIN } }),
};

/**
 * One slide's copy. All four stay mounted in the same grid cell, so the hero always has the height of the
 * longest slide and never jumps; only the active one is visible and reachable (the others are inert).
 */
function SlideCopy({ service, active }: { service: Service; active: boolean }) {
  const { t, lang, pick, path } = useLang();
  const reduce = useReducedMotion();
  // the wipe starts at the reading edge: the right in Arabic, the left in English
  const from = reduce ? SHOWN : lang === 'ar' ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';
  let n = 0;

  return (
    <m.div
      className="col-start-1 row-start-1 flex flex-col justify-end"
      aria-hidden={!active}
      inert={!active}
      initial={active ? 'hidden' : 'out'}
      animate={active ? 'in' : 'out'}
    >
      <m.p className="flex items-center gap-4 text-[0.95rem] text-haze" variants={fade} custom={0}>
        <span className="numerals text-xs font-semibold tracking-[0.2em] text-gold">{service.index}</span>
        <span aria-hidden className="h-px w-10 bg-gold" />
        <span>
          {pick(service.title)}
          <span className="mx-2.5 text-gold">·</span>
          {pick(site.location.city)}
        </span>
      </m.p>

      <p className="mt-6 type-hero text-balance text-stone sm:mt-7">
        {pick(service.heroTitle).map((line, li) => (
          <span key={li} className={cn('block', line.accent && '[font-weight:var(--t-hero-accent-w)] text-gold')}>
            {line.text.split(' ').map((w, wi, arr) => {
              const i = n++;
              return (
                <Fragment key={wi}>
                  {/* words rise as whole units — Arabic letterforms must stay joined */}
                  <span className="reveal-mask">
                    <m.span className="inline-block will-change-transform" variants={word} custom={i}>
                      {w}
                    </m.span>
                  </span>
                  {wi < arr.length - 1 && ' '}
                </Fragment>
              );
            })}
          </span>
        ))}
      </p>

      <m.p className="mt-5 max-w-xl type-lead text-haze" variants={fade} custom={0.35}>
        {pick(service.heroBody)}
      </m.p>

      <m.div className="mt-5 [@media(max-height:700px)]:hidden" variants={fade} custom={0.45}>
        <TextLink to={`${path(pages.services.path)}#${service.id}`} icon={<ArrowIcon />}>
          {t.services.more}
        </TextLink>
      </m.div>

      {/* calls to action belong to the slide: they leave with its copy and point to its service */}
      <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-4 [@media(min-height:880px)]:sm:mt-10">
        <m.div className="flex" variants={draw} custom={{ delay: 0.5, from }}>
          <Button
            size="lg"
            className="max-sm:gap-2 max-sm:px-4"
            icon={<ArrowIcon />}
            to={`${path(pages.quote.path)}?service=${service.id}`}
          >
            {/* short labels on phones keep both buttons on one row */}
            <span className="sm:hidden">{t.cta.quoteShort}</span>
            <span className="hidden sm:inline">{t.cta.quote}</span>
          </Button>
        </m.div>
        <m.div className="flex" variants={draw} custom={{ delay: 0.62, from }}>
          <Button
            size="lg"
            variant="outline"
            className="max-sm:gap-2 max-sm:px-4"
            href={waLink(t.wa.service(pick(service.title)))}
            target="_blank"
            rel="noopener noreferrer"
            leadingIcon={<WhatsAppIcon />}
          >
            <span className="sm:hidden">{t.cta.whatsappShort}</span>
            <span className="hidden sm:inline">{t.cta.whatsapp}</span>
          </Button>
        </m.div>
      </div>
    </m.div>
  );
}

export function Hero() {
  const { t, lang, pick } = useLang();
  const goTo = useGoToSection();
  const reduce = useReducedMotion();

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const pageVisible = usePageInView();

  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [started, setStarted] = useState(false);
  // autoplay pauses while the visitor points at or tabs through the hero, so a button never changes under them
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), INTRO_MS);
    return () => window.clearTimeout(id);
  }, []);

  const running = started && !reduce && inView && pageVisible && !hovering && !focused;
  const next = () => setActive((a) => (a + 1) % services.length);
  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };
  const pause = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };

  // Content drifts up and fades as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '16%']);

  const intro = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-graphite-deeper text-stone"
      onFocus={() => setFocused(true)}
      onBlur={(e: FocusEvent<HTMLElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      {/* the page's heading: who we are — each slide then speaks for one service */}
      <h1 id="hero-title" className="sr-only">
        {pick(site.name)} — {pick(site.tagline)}
      </h1>

      {/* ---------- photography ---------- */}
      <m.div className="absolute inset-0 -z-10" style={{ y: mediaY }}>
        <Curtain>
          {services.map((s, i) => {
            const isActive = i === active;
            if (i > 0 && !started) return null; // defer the other slides until the LCP image is in
            return (
              <div
                key={s.id}
                aria-hidden={!isActive}
                className={cn(
                  'absolute inset-0 transition-opacity duration-[1600ms] ease-(--ease-brand)',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              >
                {/* slow Ken Burns while active; resets once the cross-fade has finished */}
                <m.div
                  className="absolute inset-0"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: isActive ? 1 : 1.1 }}
                  transition={isActive ? { duration: 9, ease: 'linear' } : { duration: 0, delay: 1.7 }}
                >
                  <Picture id={s.hero} alt={pick(s.heroAlt)} sizes="100vw" priority={i === 0} />
                </m.div>
              </div>
            );
          })}
        </Curtain>
        {/* veils: reading side (desktop), bottom (copy + title block), top (header) */}
        <div className="absolute inset-0 bg-linear-to-r from-graphite-deeper/90 via-graphite-deeper/45 via-45% to-graphite-deeper/5 max-md:hidden rtl:bg-linear-to-l" />
        {/* phones: the copy sits mid-screen across the full width, so the whole photo takes an even veil */}
        <div className="absolute inset-0 bg-graphite-deeper/50 md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-graphite-deeper via-graphite-deeper/55 to-transparent max-md:h-1/2" />
        <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-graphite-deeper/80 to-transparent max-md:h-32" />
      </m.div>

      {/* drafting-sheet margins */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] shell hidden md:block">
        <div className="h-full border-x border-stone/[0.07]" />
      </div>

      {/* ---------- content ---------- */}
      <m.div
        className="relative shell flex flex-1 flex-col justify-center pt-28 pb-10 sm:pb-14 md:justify-end lg:pb-16 [@media(max-height:820px)]:pt-24 [@media(max-height:820px)]:lg:pb-12 [@media(min-height:880px)]:lg:pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* site reference — architectural touch that also answers "where?" */}
        <m.div className="absolute end-[clamp(1.25rem,0.6rem+3.4vw,4.5rem)] top-32 hidden flex-col items-end lg:flex" {...intro(1)}>
          <p className={lang === 'ar' ? 'text-[0.8rem] text-mist/90' : 'label-latin text-mist/80'}>{t.hero.place}</p>
          <p className={cn('mt-2 text-gold/80', lang === 'ar' ? 'text-[0.72rem]' : 'numerals text-[0.7rem] tracking-[0.18em]')}>
            {pick(site.location.coordinates)}
          </p>
        </m.div>

        {/* the four slides share one grid cell */}
        <div className="grid" {...pause}>
          {services.map((s, i) => (
            <SlideCopy key={s.id} service={s} active={i === active} />
          ))}
        </div>

        {/* scroll cue */}
        <m.button
          type="button"
          onClick={() => goTo('about')}
          className="absolute end-[clamp(1.25rem,0.6rem+3.4vw,4.5rem)] bottom-20 hidden flex-col items-center gap-4 text-mist transition-colors hover:text-gold lg:flex"
          {...intro(1.3)}
        >
          <span className="text-[0.7rem] [writing-mode:vertical-rl]">{t.hero.scroll}</span>
          <span className="relative h-16 w-px overflow-hidden bg-mist/20">
            <span className="absolute inset-0 animate-scroll-cue bg-gold" />
          </span>
        </m.button>
      </m.div>

      {/* ---------- title block: service switcher ---------- */}
      <m.div
        className="relative border-t border-gold/20 bg-graphite-deeper/55 backdrop-blur-md"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{ duration: 1.1, ease: EASE, delay: reduce ? 0 : 0.8 }}
        {...pause}
      >
        <div className="shell">
          <ol aria-label={t.hero.strip} className="grid grid-cols-4">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className={cn('relative', i > 0 && 'border-s border-mist/10')}>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px overflow-hidden">
                    {isActive && !reduce ? (
                      <span
                        key={`${active}-${cycle}`}
                        className="block h-full origin-left bg-gold hero-progress-run rtl:origin-right"
                        style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                        onAnimationEnd={next}
                      />
                    ) : (
                      <span
                        className={cn('block h-full bg-gold transition-opacity duration-500', isActive ? 'opacity-100' : 'opacity-0')}
                      />
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className="group flex w-full flex-col items-center gap-1.5 px-2 py-3.5 sm:items-start sm:px-5 sm:py-5 sm:text-start lg:px-6 lg:py-6"
                  >
                    <span
                      className={cn(
                        'numerals text-[0.7rem] tracking-[0.2em] transition-colors duration-500',
                        isActive ? 'text-gold' : 'text-mist/60',
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        'hidden font-display leading-snug transition-colors duration-500 sm:block sm:text-[0.95rem] lg:text-lg',
                        isActive ? 'text-stone' : 'text-mist/70 group-hover:text-stone',
                      )}
                    >
                      <span className="lg:hidden">{pick(s.short)}</span>
                      <span className="hidden lg:inline">{pick(s.title)}</span>
                    </span>
                    <span className="sr-only sm:hidden">{pick(s.title)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </m.div>
    </section>
  );
}
