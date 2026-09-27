import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { GoldCurve } from '@/components/ui/GoldCurve';
import { Picture } from '@/components/ui/Picture';
import { Parallax, Reveal } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { sectionIndex } from '@/data/navigation';
import { useLang } from '@/i18n/context';
import type { HeadingLines } from '@/i18n/types';
import { mailLink, telLink, waLink } from '@/lib/links';

function Detail({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-5 px-2 py-7 transition-colors duration-300 sm:justify-center sm:px-6"
    >
      <span className="grid size-12 shrink-0 place-items-center border border-gold/35 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-graphite-deeper [&>svg]:size-5">
        {icon}
      </span>
      <span>
        <span className="block text-[0.78rem] text-mist">{label}</span>
        <span className="mt-1 block text-[0.98rem] text-stone transition-colors group-hover:text-gold-light">{value}</span>
      </span>
    </a>
  );
}

interface ContactCtaProps {
  /** section id (the home page links to #contact) */
  id?: string;
  index?: string;
  label?: string;
  title?: HeadingLines;
  intro?: string;
  /** WhatsApp message that matches the page */
  waMessage?: string;
}

/** Closing call-to-action over the Riyadh skyline — ends the home page and every inner page. */
export function ContactCta({ id = 'contact', index = sectionIndex('contact'), label, title, intro, waMessage }: ContactCtaProps) {
  const { t, pick, path } = useLang();
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className="grain relative isolate overflow-hidden bg-graphite-deeper text-stone">
      <Parallax className="-z-10" distance={70}>
        <Picture id="cta-riyadh" alt="" sizes="100vw" />
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-graphite-deeper/65" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_35%,transparent,rgb(16_20_26/0.85))]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 draft-grid fade-mask opacity-60" />

      <div className="relative shell section-y">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel index={index} label={label ?? t.contact.label} align="center" />
          <RevealHeading id={titleId} lines={title ?? t.contact.title} className="mt-9 type-display" accentClassName="text-gold" />
          <GoldCurve className="mx-auto mt-9 w-56 sm:w-80" delay={0.5} />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl type-lead text-haze">{intro ?? t.contact.intro}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-11 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button size="lg" icon={<ArrowIcon />} to={path(pages.quote.path)}>
              {t.cta.quote}
            </Button>
            <Button
              size="lg"
              variant="outline"
              href={waLink(waMessage ?? t.wa.home)}
              target="_blank"
              rel="noopener noreferrer"
              leadingIcon={<WhatsAppIcon />}
            >
              {t.cta.whatsapp}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mx-auto mt-20 max-w-5xl border-y border-mist/15 sm:mt-24">
          <div className="grid divide-y divide-mist/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <Detail icon={<PhoneIcon />} label={t.contact.phone} value={<bdi>{site.contact.phoneDisplay}</bdi>} href={telLink} />
            <Detail icon={<MailIcon />} label={t.contact.email} value={<bdi>{site.contact.email}</bdi>} href={mailLink} />
            <Detail icon={<PinIcon />} label={t.contact.location} value={pick(site.location.full)} href={site.location.mapsUrl} external />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
