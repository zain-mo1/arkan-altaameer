import { m } from 'framer-motion';
import { ClockIcon, HelmetIcon, LayersIcon, QualityIcon, SetSquareIcon } from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { Parallax, Reveal } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { sectionIndex } from '@/data/navigation';
import { useLang } from '@/i18n/context';
import { EASE, VIEWPORT } from '@/lib/motion';

const ICONS = [QualityIcon, HelmetIcon, SetSquareIcon, ClockIcon, LayersIcon];

export function WhyArkan() {
  const { t, lang } = useLang();

  return (
    <section id="why" aria-labelledby="why-title" className="grain relative overflow-hidden bg-graphite-deeper text-stone">
      {/* cinematic header band */}
      <div className="relative">
        <Parallax distance={50}>
          {/* mirrored in Arabic so the copy always sits over the dark wall, never over the timber */}
          <Picture id="why-detail" alt="" sizes="100vw" className="rtl:-scale-x-100" />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-graphite-deeper via-graphite-deeper/75 to-graphite-deeper/10 rtl:bg-linear-to-l"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-graphite-deeper to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-graphite-deeper/80 to-transparent" />

        <div className="relative shell section-t pb-24 lg:pb-36">
          <div className="max-w-4xl">
            <SectionLabel index={sectionIndex('why')} label={t.why.label} />
            <RevealHeading id="why-title" lines={t.why.title} className="mt-8 type-h2" accentClassName="text-gold" />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-xl type-lead text-haze">{t.why.intro}</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* reasons */}
      <div className="relative shell section-b">
        <m.ol
          className="grid border-t border-mist/15 sm:grid-cols-2 lg:grid-cols-5"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          transition={{ staggerChildren: 0.1 }}
        >
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <m.li
                key={item.title}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }}
                className="group relative border-b border-mist/15 py-10 sm:max-lg:px-6 sm:max-lg:odd:ps-0 lg:border-s lg:border-b-0 lg:px-7 lg:py-12 lg:first:border-s-0 lg:first:ps-0"
              >
                <span
                  aria-hidden
                  className="absolute start-0 -top-px h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-(--ease-brand) group-hover:scale-x-100 rtl:origin-right"
                />
                <div className="flex items-start justify-between">
                  <Icon className="size-11 text-gold transition-transform duration-700 ease-(--ease-brand) group-hover:-translate-y-1" />
                  <span className="numerals text-[0.7rem] tracking-[0.2em] text-mist/50">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-9 type-h4 text-stone">{item.title}</h3>
                <p className={lang === 'ar' ? 'mt-3 text-[0.95rem] leading-8 text-mist' : 'mt-3 text-[0.92rem] leading-7 text-mist'}>
                  {item.text}
                </p>
              </m.li>
            );
          })}
        </m.ol>
      </div>
    </section>
  );
}
