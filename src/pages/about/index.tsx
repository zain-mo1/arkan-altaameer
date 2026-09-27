import { m } from 'framer-motion';
import { FramedImage } from '@/components/page/FramedImage';
import { PageHero } from '@/components/page/PageHero';
import { Section } from '@/components/page/Section';
import { SectionHeading } from '@/components/page/SectionHeading';
import { TitleBlock } from '@/components/page/TitleBlock';
import { StructureToSpace } from '@/components/sections/About';
import { ContactCta } from '@/components/sections/ContactCta';
import {
  ArrowIcon,
  CompassIcon,
  EyeIcon,
  HelmetIcon,
  KeyIcon,
  PlanIcon,
  QualityIcon,
  RulerIcon,
  SetSquareIcon,
  ShieldIcon,
  SwatchIcon,
  TeamIcon,
  WindowMark,
} from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { Parallax, Reveal, RevealImage } from '@/components/ui/Reveal';
import { pageIndex } from '@/config/pages';
import type { MediaKey } from '@/data/media.generated';
import { pad2 } from '@/data/navigation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { EASE, VIEWPORT } from '@/lib/motion';
import { content } from './content';

const VALUE_ICONS = [TeamIcon, QualityIcon, SetSquareIcon, RulerIcon, ShieldIcon];
const QUALITY_ICONS = [PlanIcon, SwatchIcon, HelmetIcon, SetSquareIcon, KeyIcon];
const DETAIL_IMAGES: MediaKey[] = ['detail-joinery', 'detail-stone', 'detail-lighting', 'detail-plaster'];
/** hero title-block anchors → [section id, section number] */
const ANCHORS: [string, string][] = [
  ['who', '01'],
  ['vision', '03'],
  ['values', '04'],
  ['philosophy', '05'],
  ['quality', '07'],
];

const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };

export default function About() {
  const { t, pick, lang } = useLang();
  const c = pick(content);
  useDocumentMeta('about');

  return (
    <>
      <PageHero
        index={pageIndex('about')}
        label={t.nav.about}
        title={c.hero.title}
        lead={c.hero.lead}
        image={{ id: 'page-about', alt: c.hero.imageAlt }}
        strip={
          <TitleBlock label={c.hero.stripLabel} items={ANCHORS.map(([target, index], i) => ({ target, index, label: c.hero.strip[i] }))} />
        }
      />

      {/* 01 — who we are */}
      <Section id="who" tone="ivory" labelledBy="who-title">
        <div className="grid items-start gap-x-10 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="who-title" index="01" label={c.who.label} title={c.who.title} layout="stack" />
            <div className="mt-10 space-y-6">
              {c.who.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className={i === 0 ? 'type-lead text-graphite' : 'type-body text-slate'}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <FramedImage id="about-site" alt={c.who.imageAlt} sizes="(min-width: 1024px) 38vw, 100vw" frameClassName="aspect-[4/5]" />
          </div>
        </div>

        {/* company card — ruled like a drawing's title block */}
        <Reveal className="mt-24 lg:mt-32">
          <div className="border border-graphite/15">
            <p className="flex items-center gap-3 border-b border-graphite/15 px-6 py-4 text-[0.82rem] font-semibold text-graphite">
              <WindowMark className="size-3 text-gold-dark" />
              {c.who.profileTitle}
            </p>
            {/* hairline grid: 1px gaps over a tinted ground */}
            <dl className="grid gap-px bg-graphite/10 sm:grid-cols-2 lg:grid-cols-5">
              {c.who.profile.map((row, i, rows) => (
                <div
                  key={row.label}
                  className={cn('bg-ivory px-6 py-6', i === rows.length - 1 && rows.length % 2 === 1 && 'sm:col-span-2 lg:col-span-1')}
                >
                  <dt className="text-[0.75rem] text-steel">{row.label}</dt>
                  <dd className="mt-2 text-[0.95rem] leading-7 font-medium text-graphite">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Section>

      {/* 02 — the name */}
      <Section id="name" tone="darker" labelledBy="name-title">
        <SectionHeading id="name-title" index="02" label={c.name.label} title={c.name.title} intro={c.name.intro} tone="dark" />
        <m.ol
          className="mt-16 grid border-t border-mist/15 lg:mt-24 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          transition={{ staggerChildren: 0.12 }}
        >
          {c.name.words.map((w, i) => (
            <m.li
              key={w.word}
              variants={rise}
              className="group relative border-b border-mist/15 py-12 lg:border-s lg:border-b-0 lg:px-10 lg:py-16 lg:first:border-s-0 lg:first:ps-0"
            >
              <span
                aria-hidden
                className="absolute start-0 -top-px h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-(--ease-brand) group-hover:scale-x-100 rtl:origin-right"
              />
              <span className="numerals text-[0.7rem] tracking-[0.2em] text-mist/60">{pad2(i + 1)}</span>
              <p
                className={cn(
                  'mt-6 gold-text pt-[0.12em] font-display leading-[1.05] font-bold',
                  lang === 'ar' ? 'text-[clamp(3.2rem,2rem+4vw,5.6rem)]' : 'text-[clamp(2.5rem,1.5rem+2.5vw,3.9rem)] tracking-[-0.03em]',
                )}
              >
                {w.word}
              </p>
              <p className="mt-4 text-[0.95rem] font-medium text-gold-light">{w.meaning}</p>
              <p className="mt-4 max-w-sm type-body text-mist">{w.text}</p>
            </m.li>
          ))}
        </m.ol>
      </Section>

      {/* 03 — vision & mission */}
      <section id="vision" aria-labelledby="vision-title" className="grain relative isolate overflow-hidden bg-graphite-deeper text-stone">
        <Parallax className="-z-10" distance={70}>
          <Picture id="about-vision" alt="" sizes="100vw" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 -z-10 bg-graphite-deeper/70" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent,rgb(16_20_26/0.9))]"
        />

        <div className="relative shell section-y">
          <SectionHeading id="vision-title" index="03" label={c.vision.label} title={c.vision.title} tone="dark" layout="center" />
          <m.div
            className="mx-auto mt-16 grid max-w-6xl gap-px bg-gold/25 md:grid-cols-2 lg:mt-20"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            transition={{ staggerChildren: 0.15 }}
          >
            {[
              { ...c.vision.vision, Icon: EyeIcon },
              { ...c.vision.mission, Icon: CompassIcon },
            ].map(({ title, text, Icon }) => (
              <m.div key={title} variants={rise} className="bg-graphite-deeper/85 p-9 backdrop-blur-sm sm:p-12 lg:p-14">
                <Icon className="size-12 text-gold" />
                <h3 className="mt-9 type-h3 text-stone">{title}</h3>
                <p className="mt-5 type-lead text-haze">{text}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* 04 — values */}
      <Section id="values" tone="paper" labelledBy="values-title">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="values-title"
                index="04"
                label={c.values.label}
                title={c.values.title}
                intro={c.values.intro}
                layout="stack"
              />
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {c.values.items.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <li key={v.title} className="group relative border-t border-graphite/12 py-10 last:border-b sm:py-12">
                  <span
                    aria-hidden
                    className="absolute start-0 -top-px h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-(--ease-brand) group-hover:scale-x-100 rtl:origin-right"
                  />
                  <Reveal className="grid grid-cols-[3.5rem_1fr] gap-6 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
                    <span className="grid size-14 place-items-center border border-graphite/15 text-gold-dark transition-colors duration-500 group-hover:border-gold-dark sm:size-[4.5rem]">
                      <Icon className="size-8 sm:size-9" />
                    </span>
                    <div>
                      <span className="numerals text-[0.7rem] tracking-[0.2em] text-bronze">{pad2(i + 1)}</span>
                      <h3 className="mt-2 type-h3 text-graphite">{v.title}</h3>
                      <p className="mt-3 max-w-xl type-body text-slate">{v.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* 05 — philosophy: from structure to space */}
      <Section id="philosophy" tone="ivory" labelledBy="philosophy-title">
        <div className="grid items-center gap-x-10 gap-y-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="philosophy-title" index="05" label={c.philosophy.label} title={c.philosophy.title} layout="stack" />
            <Reveal delay={0.1}>
              <p className="mt-8 type-body text-slate">{c.philosophy.text}</p>
            </Reveal>
            <m.ol
              className="mt-12 grid grid-cols-3 border-y border-graphite/12"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              transition={{ staggerChildren: 0.15 }}
            >
              {c.philosophy.stages.map((s, i) => (
                <m.li key={s.title} variants={rise} className={cn('relative py-6', i > 0 && 'border-s border-graphite/12 ps-4 sm:ps-6')}>
                  <span className="numerals text-[0.68rem] text-bronze">{pad2(i + 1)}</span>
                  <p className="mt-2 font-display text-lg text-graphite sm:text-xl">{s.title}</p>
                  <p className="mt-1.5 text-[0.82rem] leading-6 text-slate">{s.text}</p>
                  {i < 2 && (
                    <ArrowIcon
                      aria-hidden
                      className="absolute -end-2.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 bg-ivory text-gold-dark sm:block"
                    />
                  )}
                </m.li>
              ))}
            </m.ol>
          </div>
          <Reveal className="lg:col-span-6 lg:ps-6" y={40}>
            <StructureToSpace />
          </Reveal>
        </div>
      </Section>

      {/* 06 — why Arkan */}
      <Section id="why" tone="darker" labelledBy="why-title">
        <SectionHeading id="why-title" index="06" label={c.why.label} title={c.why.title} intro={c.why.intro} tone="dark" />
        <ol className="mt-16 lg:mt-24">
          {t.why.items.map((item, i) => (
            <li key={item.title} className="group relative border-t border-mist/15 last:border-b">
              <span
                aria-hidden
                className="absolute start-0 -top-px h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-(--ease-brand) group-hover:scale-x-100 rtl:origin-right"
              />
              <Reveal className="grid gap-4 py-10 sm:grid-cols-[6rem_1fr] sm:gap-8 lg:grid-cols-12 lg:items-baseline lg:gap-10 lg:py-12">
                {/* grid cell stays direction-neutral; the figure inside is LTR */}
                <span className="lg:col-span-2">
                  <span className="numerals text-5xl leading-none font-light text-gold-dark transition-colors duration-500 outline-text group-hover:text-gold lg:text-6xl">
                    {pad2(i + 1)}
                  </span>
                </span>
                <h3 className="type-h3 text-stone lg:col-span-4">{item.title}</h3>
                <p className="type-body text-mist sm:col-start-2 lg:col-span-5 lg:col-start-8">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* 07 — quality & professionalism */}
      <Section id="quality" tone="paper" labelledBy="quality-title">
        <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <FramedImage
                id="about-quality"
                alt={c.quality.imageAlt}
                sizes="(min-width: 1024px) 38vw, 100vw"
                frameClassName="aspect-[4/5]"
                offset="start"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <SectionHeading
              id="quality-title"
              index="07"
              label={c.quality.label}
              title={c.quality.title}
              intro={c.quality.intro}
              layout="stack"
            />
            <m.ul
              className="mt-14 grid gap-px bg-graphite/10 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              transition={{ staggerChildren: 0.08 }}
            >
              {c.quality.items.map((q, i) => {
                const Icon = QUALITY_ICONS[i];
                return (
                  <m.li
                    key={q.title}
                    variants={rise}
                    className={cn('bg-paper p-7 sm:p-8', i === c.quality.items.length - 1 && 'sm:col-span-2')}
                  >
                    <Icon className="size-10 text-gold-dark" />
                    <h3 className="mt-6 type-h4 text-graphite">{q.title}</h3>
                    <p className="mt-2.5 text-[0.95rem] leading-8 text-slate">{q.text}</p>
                  </m.li>
                );
              })}
            </m.ul>
          </div>
        </div>
      </Section>

      {/* 08 — attention to detail */}
      <Section id="details" tone="dark" labelledBy="details-title">
        <SectionHeading id="details-title" index="08" label={c.details.label} title={c.details.title} intro={c.details.intro} tone="dark" />
        <div className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {c.details.items.map((d, i) => (
            <figure key={d.title} className={cn(i % 2 === 1 && 'lg:mt-20')}>
              <RevealImage className="aspect-[3/4] bg-graphite" delay={0.08 * i}>
                <div className="absolute inset-0 transition-transform duration-[1600ms] ease-(--ease-brand) hover:scale-[1.05]">
                  <Picture id={DETAIL_IMAGES[i]} alt={d.alt} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" />
                </div>
              </RevealImage>
              <figcaption className="mt-5 border-t border-mist/15 pt-4">
                <span className="numerals text-[0.68rem] tracking-[0.2em] text-gold">{pad2(i + 1)}</span>
                <p className="mt-2 type-h4 text-stone">{d.title}</p>
                <p className="mt-1 text-[0.9rem] text-mist">{d.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <ContactCta id="start" index="09" label={c.cta.label} title={c.cta.title} intro={c.cta.intro} waMessage={t.wa.about} />
    </>
  );
}
