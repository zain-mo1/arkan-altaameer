import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { PageHero } from '@/components/page/PageHero';
import { Section } from '@/components/page/Section';
import { SectionHeading } from '@/components/page/SectionHeading';
import { TitleBlock } from '@/components/page/TitleBlock';
import { Button, TextLink } from '@/components/ui/Button';
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, TimeIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { pageIndex, pages } from '@/config/pages';
import { site } from '@/config/site';
import { faq } from '@/data/faq';
import { pad2 } from '@/data/navigation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { mailLink, telLink, waLink } from '@/lib/links';
import { EASE, VIEWPORT } from '@/lib/motion';
import { ContactForm } from './ContactForm';
import { content } from './content';
import { SiteReference } from './SiteReference';

/** Questions surfaced on the contact page — [group id, item id] from src/data/faq.ts */
const FAQ_PICKS: [string, string][] = [
  ['quote', 'how'],
  ['quote', 'visit'],
  ['contact', 'files'],
  ['contact', 'reply'],
];

function ChannelCard({
  href,
  external,
  icon,
  label,
  value,
  action,
  featured,
}: {
  href: string;
  external?: boolean;
  icon: ReactNode;
  label: string;
  value: ReactNode;
  action: string;
  featured?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group relative flex h-full flex-col justify-between gap-12 overflow-hidden border p-7 transition-colors duration-500 sm:p-8',
        featured
          ? 'border-graphite bg-graphite text-stone hover:bg-graphite-deep'
          : 'border-graphite/12 bg-white/50 text-graphite hover:border-graphite/40',
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-(--ease-brand) group-hover:scale-x-100 rtl:origin-right"
      />
      <span
        className={cn(
          'grid size-12 place-items-center border transition-colors duration-500 [&>svg]:size-5',
          featured
            ? 'border-gold/40 text-gold group-hover:bg-gold group-hover:text-graphite-deeper'
            : 'border-graphite/15 text-bronze group-hover:border-bronze',
        )}
      >
        {icon}
      </span>
      <span>
        <span className={cn('block text-[0.82rem]', featured ? 'text-mist' : 'text-steel')}>{label}</span>
        <span className={cn('mt-1.5 block text-[1.05rem] font-medium break-words', featured ? 'text-stone' : 'text-graphite')}>
          {value}
        </span>
        <span
          className={cn('mt-6 inline-flex items-center gap-2 text-[0.85rem] font-medium', featured ? 'text-gold-light' : 'text-bronze')}
        >
          {action}
          <ArrowIcon className="size-4 transition-transform duration-500 ease-(--ease-brand) group-hover:translate-x-[calc(var(--dir)*0.3rem)]" />
        </span>
      </span>
    </a>
  );
}

export default function Contact() {
  const { t, pick, path } = useLang();
  const c = pick(content);
  useDocumentMeta('contact');

  const faqItems = FAQ_PICKS.map(([g, i]) => faq.find((x) => x.id === g)!.items.find((x) => x.id === i)!);
  const sections = ['channels', 'message', 'location', 'faq'];

  return (
    <>
      <PageHero
        index={pageIndex('contact')}
        label={t.nav.contact}
        title={c.hero.title}
        lead={c.hero.lead}
        image={{ id: 'page-contact', alt: '' }}
        strip={
          <TitleBlock
            label={c.hero.stripLabel}
            items={c.hero.strip.map((label, i) => ({ target: sections[i], index: pad2(i + 1), label }))}
          />
        }
      >
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button size="lg" href={waLink(t.wa.contact)} target="_blank" rel="noopener noreferrer" leadingIcon={<WhatsAppIcon />}>
            {t.cta.whatsapp}
          </Button>
          <Button size="lg" variant="outline" href={telLink} leadingIcon={<PhoneIcon />}>
            {t.cta.call}
          </Button>
        </div>
      </PageHero>

      {/* ---------- channels ---------- */}
      <Section id="channels" tone="ivory" labelledBy="channels-title">
        <SectionHeading id="channels-title" index="01" label={c.channels.label} title={c.channels.title} intro={c.channels.intro} />
        <m.ul
          className={cn('mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20', site.contact.hours ? 'lg:grid-cols-5' : 'lg:grid-cols-4')}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          transition={{ staggerChildren: 0.08 }}
        >
          {[
            <ChannelCard
              key="wa"
              featured
              href={waLink(t.wa.contact)}
              external
              icon={<WhatsAppIcon />}
              label={c.channels.whatsapp.label}
              value={<bdi>{site.contact.phoneDisplay}</bdi>}
              action={c.channels.whatsapp.action}
            />,
            <ChannelCard
              key="phone"
              href={telLink}
              icon={<PhoneIcon />}
              label={c.channels.phone.label}
              value={<bdi>{site.contact.phoneDisplay}</bdi>}
              action={c.channels.phone.action}
            />,
            <ChannelCard
              key="email"
              href={mailLink}
              icon={<MailIcon />}
              label={c.channels.email.label}
              value={<bdi>{site.contact.email}</bdi>}
              action={c.channels.email.action}
            />,
            <ChannelCard
              key="map"
              href={site.location.mapsUrl}
              external
              icon={<PinIcon />}
              label={c.channels.location.label}
              value={pick(site.location.full)}
              action={c.channels.location.action}
            />,
            ...(site.contact.hours
              ? [
                  <div key="hours" className="flex h-full flex-col justify-between gap-12 border border-graphite/12 bg-white/50 p-7 sm:p-8">
                    <span className="grid size-12 place-items-center border border-graphite/15 text-bronze">
                      <TimeIcon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[0.82rem] text-steel">{c.channels.hours}</span>
                      <span className="mt-1.5 block text-[1.05rem] font-medium text-graphite">{pick(site.contact.hours)}</span>
                    </span>
                  </div>,
                ]
              : []),
          ].map((card, i) => (
            <m.li
              key={i}
              variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
            >
              {card}
            </m.li>
          ))}
        </m.ul>
      </Section>

      {/* ---------- message form ---------- */}
      <Section id="message" tone="paper" labelledBy="message-title">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="message-title" index="02" label={c.form.label} title={c.form.title} intro={c.form.intro} layout="stack" />

              <Reveal delay={0.2} className="mt-12 border border-graphite/12 bg-ivory p-7 sm:p-8">
                <p className="type-h4 text-graphite">{c.form.quote.title}</p>
                <p className="mt-3 text-[0.95rem] leading-8 text-slate">{c.form.quote.text}</p>
                <TextLink to={path(pages.quote.path)} tone="light" icon={<ArrowIcon />} className="mt-6">
                  {c.form.quote.cta}
                </TextLink>
              </Reveal>

              <Reveal delay={0.3} className="mt-10">
                <p className="text-[0.82rem] font-medium text-steel">{c.form.direct}</p>
                <ul className="mt-4 space-y-3 text-[0.95rem] text-graphite">
                  <li>
                    <a
                      href={waLink(t.wa.contact)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-bronze"
                    >
                      <WhatsAppIcon className="size-4 text-bronze" />
                      {t.cta.whatsapp}
                    </a>
                  </li>
                  <li>
                    <a href={telLink} className="flex items-center gap-3 hover:text-bronze">
                      <PhoneIcon className="size-4 text-bronze" />
                      <bdi>{site.contact.phoneDisplay}</bdi>
                    </a>
                  </li>
                  <li>
                    <a href={mailLink} className="flex items-center gap-3 hover:text-bronze">
                      <MailIcon className="size-4 text-bronze" />
                      <bdi>{site.contact.email}</bdi>
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>

          <Reveal className="lg:col-span-7 lg:col-start-6 lg:ps-10 xl:ps-16" y={36}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* ---------- location ---------- */}
      <Section id="location" tone="darker" labelledBy="location-title">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading id="location-title" index="03" label={c.location.label} title={c.location.title} tone="dark" layout="stack" />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md type-lead text-haze">{c.location.text}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <dl className="mt-10 grid grid-cols-2 border-y border-mist/15">
                <div className="py-5 pe-4">
                  <dt className="text-[0.78rem] text-mist">{c.location.city}</dt>
                  <dd className="mt-1 text-stone">{pick(site.location.full)}</dd>
                </div>
                <div className="border-s border-mist/15 py-5 ps-5">
                  <dt className="text-[0.78rem] text-mist">{c.location.reference}</dt>
                  <dd className="mt-1 text-[0.9rem] text-gold-light">{pick(site.location.coordinates)}</dd>
                </div>
              </dl>
            </Reveal>
            {site.location.address && (
              <Reveal delay={0.3}>
                <p className="mt-6 flex items-start gap-3 text-stone">
                  <PinIcon className="mt-1 size-4 shrink-0 text-gold" />
                  {pick(site.location.address)}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.35} className="mt-10">
              <Button href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline" leadingIcon={<PinIcon />}>
                {c.location.open}
              </Button>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6 lg:ps-6" y={36}>
            <SiteReference north={c.location.north} title={c.location.label} />
          </Reveal>
        </div>
      </Section>

      {/* ---------- questions ---------- */}
      <Section id="faq" tone="paper" labelledBy="contact-faq-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeading id="contact-faq-title" index="04" label={c.faq.label} title={c.faq.title} layout="stack" />
            <Reveal delay={0.2} className="mt-10">
              <TextLink to={path(pages.faq.path)} tone="light" icon={<ArrowIcon />}>
                {c.faq.more}
              </TextLink>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-8" y={30}>
            <FaqAccordion items={faqItems} idPrefix="contact-faq" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
