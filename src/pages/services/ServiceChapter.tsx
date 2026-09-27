import { m } from 'framer-motion';
import type { ComponentType, SVGProps } from 'react';
import { Section } from '@/components/page/Section';
import { isDarkTone, type SectionTone } from '@/components/page/tone';
import { Button, TextLink } from '@/components/ui/Button';
import {
  ArrowIcon,
  BuildingIcon,
  CalendarIcon,
  DropIcon,
  EyeIcon,
  KeyIcon,
  LayersIcon,
  LightIcon,
  SetSquareIcon,
  SparkleIcon,
  SpaceIcon,
  SwatchIcon,
  WhatsAppIcon,
  WindowMark,
} from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { Reveal, RevealImage } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { pages } from '@/config/pages';
import type { Service, ServiceId } from '@/data/services';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { waLink } from '@/lib/links';
import { EASE, VIEWPORT } from '@/lib/motion';
import { chapterImages, type ChapterCopy } from './content';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const BENEFIT_ICONS: Record<ServiceId, Icon[]> = {
  contracting: [BuildingIcon, CalendarIcon, LayersIcon],
  finishing: [SwatchIcon, SetSquareIcon, KeyIcon],
  ceiling: [SpaceIcon, LightIcon, SparkleIcon, DropIcon],
  fitout: [KeyIcon, CalendarIcon, EyeIcon],
};

/** Stretch-ceiling finishes, drawn as material swatches (matte · gloss · satin · backlit · printed). */
const SWATCHES = [
  'bg-[#e7e3dc]',
  'bg-[linear-gradient(135deg,#2b3039_0%,#1a1e25_44%,#6b7282_50%,#1a1e25_57%,#10141a_100%)]',
  'bg-[linear-gradient(160deg,#d6cfc2,#efe9df_48%,#cbc3b4)]',
  'bg-[radial-gradient(circle_at_50%_45%,#fffaf0_0%,#f4e4bd_42%,#c7a558_100%)]',
  'bg-[radial-gradient(ellipse_40%_22%_at_30%_40%,#fff_0%,transparent_100%),radial-gradient(ellipse_35%_18%_at_70%_62%,#fff_0%,transparent_100%),linear-gradient(180deg,#86acd6_0%,#cadcee_62%,#f2efe8_100%)]',
];

interface ServiceChapterProps {
  service: Service;
  copy: ChapterCopy;
  labels: { service: string; includes: string; benefits: string; finishes: string; sectors: string; quote: string; whatsapp: string };
  tone: SectionTone;
  /** photo on the start side (even chapters) or the end side */
  flip?: boolean;
}

/** One service, told as a chapter: photography, what's included, the value to the client and a direct call to action. */
export function ServiceChapter({ service, copy, labels, tone, flip }: ServiceChapterProps) {
  const { t, pick, path } = useLang();
  const dark = isDarkTone(tone);
  const images = chapterImages[service.id];
  const icons = BENEFIT_ICONS[service.id];
  const title = pick(service.title);

  return (
    <Section id={service.id} tone={tone} labelledBy={`${service.id}-title`} grid={false}>
      <div className="grid items-start gap-x-10 gap-y-16 lg:grid-cols-12">
        {/* photography: wide lead image + framed portrait detail */}
        <div className={cn('relative lg:col-span-6', flip ? 'lg:order-2 lg:col-start-7' : 'lg:order-1')}>
          {/* wrapper stays direction-neutral so start/end follow the page (numerals sets direction:ltr) */}
          <span aria-hidden className={cn('pointer-events-none absolute -top-10 z-0 select-none sm:-top-16', flip ? 'end-0' : 'start-0')}>
            <span
              className={cn(
                'block numerals text-[clamp(7rem,4rem+10vw,13rem)] leading-none font-extralight outline-text',
                dark ? 'text-gold/25' : 'text-gold-dark/25',
              )}
            >
              {service.index}
            </span>
          </span>
          <RevealImage className="z-[1] aspect-[4/3] bg-graphite sm:aspect-[5/4] lg:mt-10">
            <Picture id={images.main} alt={pick(service.heroAlt)} sizes="(min-width: 1024px) 46vw, 100vw" />
          </RevealImage>
          <div
            className={cn(
              'relative z-[2] -mt-24 w-[46%] max-w-72 sm:-mt-36 lg:-mt-40',
              flip ? 'ms-auto -me-3 sm:-me-6 lg:ms-auto lg:-me-10' : '-ms-3 sm:-ms-6 lg:-ms-10',
            )}
          >
            <div
              className={cn(
                'border-[6px] sm:border-8',
                dark ? 'border-graphite-deeper' : tone === 'ivory' ? 'border-ivory' : 'border-paper',
              )}
            >
              <RevealImage className="aspect-[4/5] bg-graphite" delay={0.25}>
                <Picture id={images.detail} alt={pick(images.detailAlt ?? service.imageAlt)} sizes="(min-width: 1024px) 18rem, 46vw" />
              </RevealImage>
            </div>
          </div>
        </div>

        {/* copy */}
        <div className={cn('lg:col-span-5', flip ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-8')}>
          <Reveal>
            <p className="flex items-center gap-4">
              <span className={cn('numerals text-xs font-semibold tracking-[0.2em]', dark ? 'text-gold' : 'text-bronze')}>
                {service.index}
              </span>
              <span aria-hidden className={cn('h-px w-10 sm:w-14', dark ? 'bg-gold/60' : 'bg-bronze/45')} />
              <span className={cn('text-[0.9rem] font-medium', dark ? 'text-mist' : 'text-slate')}>{labels.service}</span>
            </p>
          </Reveal>
          <RevealHeading
            id={`${service.id}-title`}
            lines={[{ text: title }]}
            className={cn('mt-7 type-h2', dark ? 'text-stone' : 'text-graphite')}
          />
          <Reveal delay={0.1}>
            <p className={cn('mt-4 font-display text-lg sm:text-xl', dark ? 'text-gold-light' : 'text-gold-dark')}>
              {pick(service.tagline)}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={cn('mt-7 type-body', dark ? 'text-haze' : 'text-slate')}>{copy.lead}</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <h3 className={cn('text-[0.85rem] font-semibold', dark ? 'text-stone' : 'text-graphite')}>{labels.includes}</h3>
            <ul className={cn('mt-5 grid gap-x-8 border-t sm:grid-cols-2', dark ? 'border-mist/15' : 'border-graphite/12')}>
              {copy.includes.map((item) => (
                <li
                  key={item}
                  className={cn(
                    'flex items-start gap-3 border-b py-3.5 text-[0.92rem] leading-7',
                    dark ? 'border-mist/10 text-haze' : 'border-graphite/10 text-slate',
                  )}
                >
                  <WindowMark className={cn('mt-[0.55rem] size-2 shrink-0', dark ? 'text-gold' : 'text-gold-dark')} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {copy.extra && (
            <Reveal delay={0.25} className="mt-10">
              <h3 className={cn('text-[0.85rem] font-semibold', dark ? 'text-stone' : 'text-graphite')}>
                {service.id === 'ceiling' ? labels.finishes : labels.sectors}
              </h3>
              {service.id === 'ceiling' ? (
                <ul className="mt-5 grid grid-cols-5 gap-2.5 sm:gap-3">
                  {copy.extra.map((finish, i) => (
                    <li key={finish}>
                      <span
                        aria-hidden
                        className={cn(
                          'block aspect-square border shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]',
                          SWATCHES[i],
                          dark ? 'border-mist/20' : 'border-graphite/15',
                        )}
                      />
                      <span className={cn('mt-2 block text-center text-[0.78rem]', dark ? 'text-mist' : 'text-slate')}>{finish}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {copy.extra.map((sector) => (
                    <li
                      key={sector}
                      className={cn(
                        'border px-3.5 py-1.5 text-[0.82rem]',
                        dark ? 'border-mist/20 text-haze' : 'border-graphite/15 text-slate',
                      )}
                    >
                      {sector}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          )}
        </div>
      </div>

      {/* value to the client */}
      <div className={cn('mt-20 border-t pt-10 lg:mt-28', dark ? 'border-mist/15' : 'border-graphite/12')}>
        <Reveal>
          <h3 className={cn('text-[0.85rem] font-semibold', dark ? 'text-stone' : 'text-graphite')}>{labels.benefits}</h3>
        </Reveal>
        <m.ul
          className={cn('mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2', copy.benefits.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          transition={{ staggerChildren: 0.1 }}
        >
          {copy.benefits.map((b, i) => {
            const Icon = icons[i];
            return (
              <m.li
                key={b.title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
              >
                <Icon className={cn('size-10', dark ? 'text-gold' : 'text-gold-dark')} />
                <p className={cn('mt-5 type-h4', dark ? 'text-stone' : 'text-graphite')}>{b.title}</p>
                <p className={cn('mt-2.5 text-[0.95rem] leading-8', dark ? 'text-mist' : 'text-slate')}>{b.text}</p>
              </m.li>
            );
          })}
        </m.ul>

        <Reveal className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Button to={`${path(pages.quote.path)}?service=${service.id}`} variant={dark ? 'primary' : 'dark'} icon={<ArrowIcon />}>
            {labels.quote}
          </Button>
          <TextLink
            href={waLink(t.wa.service(title))}
            target="_blank"
            rel="noopener noreferrer"
            tone={dark ? 'dark' : 'light'}
            icon={<WhatsAppIcon />}
          >
            {labels.whatsapp}
          </TextLink>
        </Reveal>
      </div>
    </Section>
  );
}
