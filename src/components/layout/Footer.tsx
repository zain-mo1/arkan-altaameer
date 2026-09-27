import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowUpIcon, MailIcon, PhoneIcon, PinIcon, SocialIcon, TimeIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { LEGAL_NAV, MAIN_NAV } from '@/data/navigation';
import { services } from '@/data/services';
import { useGoToSection } from '@/hooks/useGoToSection';
import { usePageWhatsAppMessage } from '@/hooks/usePage';
import { useLang } from '@/i18n/context';
import { publicUrl } from '@/lib/assets';
import { mailLink, telLink, waLink } from '@/lib/links';
import { LangSwitch } from './LangSwitch';

function Column({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="flex items-center gap-3 text-[0.8rem] font-semibold text-stone">
        <span className="h-px w-6 bg-gold/70" />
        {title}
      </h2>
      <ul className="mt-7 space-y-3.5 text-[0.92rem]">{children}</ul>
    </div>
  );
}

const linkClass = 'transition-colors duration-300 hover:text-gold-light';
const iconLinkClass = `${linkClass} flex items-center gap-3`;

export function Footer() {
  const { t, pick, path } = useLang();
  const goTo = useGoToSection();
  const waMessage = usePageWhatsAppMessage();
  const year = new Date().getFullYear();
  const name = pick(site.name);

  return (
    <footer className="relative overflow-hidden bg-night text-mist">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 draft-grid [mask-image:linear-gradient(to_bottom,#000,transparent_70%)] opacity-50"
      />

      <div className="relative shell pt-20 sm:pt-24 lg:pt-28">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <img
              src={publicUrl('brand/logo-on-dark.webp')}
              width={560}
              height={487}
              alt={name}
              loading="lazy"
              className="h-auto w-40 sm:w-48"
            />
            <p className="mt-9 font-display text-xl text-gold sm:text-2xl">{pick(site.tagline)}</p>
            <p className="mt-2 text-[0.85rem] text-mist/70">{pick(site.concept)}</p>
            <p className="mt-6 max-w-sm text-[0.9rem] leading-7">{t.footer.about}</p>
            <LangSwitch className="mt-9 w-fit" />
          </div>

          <nav aria-label={t.a11y.footerNav} className="lg:col-span-2 lg:col-start-6">
            <Column title={t.footer.explore}>
              {MAIN_NAV.map((key) => (
                <li key={key}>
                  <Link to={path(pages[key].path)} className={linkClass}>
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </Column>
          </nav>

          <Column title={t.footer.services} className="lg:col-span-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`${path(pages.services.path)}#${s.id}`} className={linkClass}>
                  {pick(s.title)}
                </Link>
              </li>
            ))}
          </Column>

          <Column title={t.footer.contact} className="lg:col-span-3">
            <li>
              <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className={iconLinkClass}>
                <WhatsAppIcon className="size-4 shrink-0 text-gold" />
                {t.cta.whatsapp}
              </a>
            </li>
            <li>
              <a href={telLink} className={iconLinkClass}>
                <PhoneIcon className="size-4 shrink-0 text-gold" />
                <bdi>{site.contact.phoneDisplay}</bdi>
              </a>
            </li>
            <li>
              <a href={mailLink} className={iconLinkClass}>
                <MailIcon className="size-4 shrink-0 text-gold" />
                <bdi>{site.contact.email}</bdi>
              </a>
            </li>
            <li>
              <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className={iconLinkClass}>
                <PinIcon className="size-4 shrink-0 text-gold" />
                {pick(site.location.full)}
              </a>
            </li>
            {site.contact.hours && (
              <li className="flex items-center gap-3">
                <TimeIcon className="size-4 shrink-0 text-gold" />
                {pick(site.contact.hours)}
              </li>
            )}
            <li className="pt-4">
              <ul className="flex items-center gap-3" aria-label={t.a11y.social}>
                {site.social
                  .filter((s) => s.url)
                  .map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid size-10 place-items-center border border-mist/15 text-mist transition-colors duration-300 hover:border-gold hover:text-gold"
                      >
                        <SocialIcon id={s.id} className="size-4" />
                      </a>
                    </li>
                  ))}
              </ul>
            </li>
          </Column>
        </div>
      </div>

      {/* Giant watermark — echoes the typography sheet of the identity guide */}
      <div aria-hidden className="pointer-events-none relative mt-14 select-none sm:mt-20">
        <p className="shell translate-y-[8%] gold-text pt-[0.18em] text-center font-display text-[25vw] leading-[0.9] font-bold opacity-[0.13] lg:text-[21vw]">
          {t.footer.watermark}
        </p>
      </div>

      <div className="relative border-t border-mist/10">
        <div className="shell flex flex-col gap-4 py-6 pe-24 text-xs sm:pe-28 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <span className="inline-block numerals">{year}</span> {name}
            {name.endsWith('.') ? '' : '.'} {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {LEGAL_NAV.map((key) => (
                <li key={key}>
                  <Link to={path(pages[key].path)} className={linkClass}>
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => goTo('top')} className="group flex items-center gap-2 transition-colors hover:text-gold">
              {t.a11y.backToTop}
              <ArrowUpIcon className="size-4 transition-transform duration-500 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
