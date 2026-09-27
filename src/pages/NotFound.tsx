import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { ArrowIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { pages } from '@/config/pages';
import { MAIN_NAV, pad2 } from '@/data/navigation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useLang } from '@/i18n/context';
import { waLink } from '@/lib/links';

/** Unknown URLs (also served as 404.html by static hosts). */
export default function NotFound() {
  const { t, home, lang, path } = useLang();
  useDocumentMeta(null);

  return (
    <section className="grain relative isolate flex min-h-svh items-center overflow-hidden bg-graphite-deeper text-stone">
      <div aria-hidden className="absolute inset-0 -z-10 draft-grid fade-mask" />
      <div aria-hidden className="absolute inset-y-0 end-0 -z-10 hidden w-[38%] lg:block">
        <Picture id="texture-slats" alt="" sizes="38vw" />
        <div className="absolute inset-0 bg-linear-to-r from-graphite-deeper to-transparent rtl:bg-linear-to-l" />
      </div>

      <div className="relative shell py-40">
        <div className="max-w-2xl">
          <Reveal>
            <p className="flex items-center gap-4">
              <span className="numerals text-xs font-semibold tracking-[0.2em] text-gold">404</span>
              <span className="h-px w-10 bg-gold/60" />
              <span className={lang === 'ar' ? 'text-[0.95rem] text-stone' : 'label-latin text-stone'}>{t.notFound.label}</span>
            </p>
          </Reveal>
          <RevealHeading
            as="h1"
            lines={t.notFound.title}
            trigger="mount"
            delay={0.2}
            className="mt-8 type-display"
            accentClassName="text-gold"
          />
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-lg type-lead text-haze">{t.notFound.text}</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-11 flex flex-wrap gap-3 sm:gap-4">
            <Button to={home} size="lg" icon={<ArrowIcon />}>
              {t.cta.home}
            </Button>
            <Button
              size="lg"
              variant="outline"
              href={waLink(t.wa.home)}
              target="_blank"
              rel="noopener noreferrer"
              leadingIcon={<WhatsAppIcon />}
            >
              {t.cta.whatsapp}
            </Button>
          </Reveal>
          <Reveal delay={0.5}>
            <ul className="mt-14 grid grid-cols-2 gap-x-8 border-t border-mist/10 pt-8 sm:grid-cols-3">
              {MAIN_NAV.filter((k) => k !== 'home').map((key, i) => (
                <li key={key}>
                  <Link
                    to={path(pages[key].path)}
                    className="group flex items-baseline gap-3 py-2 text-[0.95rem] text-mist transition-colors hover:text-gold-light"
                  >
                    <span className="numerals text-[0.65rem] text-gold/60">{pad2(i + 2)}</span>
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
