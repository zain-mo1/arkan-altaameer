import { m, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { ArrowIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { HEADER_NAV } from '@/data/navigation';
import { useGoToSection } from '@/hooks/useGoToSection';
import { usePage, usePageWhatsAppMessage } from '@/hooks/usePage';
import { useLang } from '@/i18n/context';
import { publicUrl } from '@/lib/assets';
import { cn } from '@/lib/cn';
import { waLink } from '@/lib/links';
import { EASE } from '@/lib/motion';
import { LangSwitch } from './LangSwitch';
import { MobileMenu } from './MobileMenu';

function MenuButton({ open, onClick, label }: { open: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="relative grid size-10 place-items-center border border-stone/20 text-stone transition-colors hover:border-gold xl:hidden"
    >
      <span
        className={cn(
          'absolute h-px w-5 bg-current transition-transform duration-500 ease-(--ease-brand)',
          open ? 'rotate-45' : '-translate-y-[3.5px]',
        )}
      />
      <span
        className={cn(
          'absolute h-px w-5 bg-current transition-transform duration-500 ease-(--ease-brand)',
          open ? '-rotate-45' : 'translate-y-[3.5px]',
        )}
      />
    </button>
  );
}

export function Header() {
  const { t, lang, home, path, pick } = useLang();
  const page = usePage();
  const goTo = useGoToSection();
  const waMessage = usePageWhatsAppMessage();

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // first entrance waits for the hero's opening; later hide/show is immediate
  const [entered, setEntered] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (menuOpen) return;
    if (y > 640 && y > prev + 4) setHidden(true);
    else if (y < prev - 4 || y < 640) setHidden(false);
  });

  const solid = scrolled && !menuOpen;

  return (
    // the menu traps keyboard focus inside this wrapper (header + menu)
    <div id="site-top" className="contents">
      <m.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: '-100%' }}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.8, ease: EASE, delay: entered ? 0 : 0.5 }}
        onAnimationComplete={() => !entered && setEntered(true)}
      >
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 border-b border-gold/10 bg-graphite-deeper/80 backdrop-blur-xl transition-opacity duration-500',
            solid ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={cn(
            'relative shell flex items-center justify-between gap-5 transition-[height] duration-500 ease-(--ease-brand)',
            solid ? 'h-[4.5rem] lg:h-20' : 'h-20 lg:h-24',
          )}
        >
          <Link
            to={home}
            aria-label={t.a11y.home}
            onClick={(e) => {
              if (page !== 'home') return;
              e.preventDefault();
              goTo('top');
            }}
            className="shrink-0"
          >
            {/* the symbol leads in the reading direction: on the right in Arabic, on the left in English */}
            <img
              src={publicUrl(lang === 'ar' ? 'brand/lockup-on-dark.webp' : 'brand/lockup-ltr-on-dark.webp')}
              width={640}
              height={117}
              alt={pick(site.name)}
              className={cn('w-auto transition-[height] duration-500 ease-(--ease-brand)', solid ? 'h-8 2xl:h-9' : 'h-8 sm:h-9 2xl:h-11')}
            />
          </Link>

          <nav aria-label={t.a11y.mainNav} className="hidden xl:block">
            <ul className="flex items-center gap-7 2xl:gap-9">
              {HEADER_NAV.map((key) => {
                const active = page === key;
                return (
                  <li key={key}>
                    <Link
                      to={path(pages[key].path)}
                      aria-current={active ? 'page' : undefined}
                      onClick={(e) => {
                        // the home link doubles as "back to top" while on the home page
                        if (key !== 'home' || page !== 'home') return;
                        e.preventDefault();
                        goTo('top');
                      }}
                      className={cn(
                        "relative py-2 text-[0.92rem] whitespace-nowrap transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-500 after:ease-(--ease-brand) after:content-[''] rtl:after:origin-right",
                        active ? 'text-stone after:scale-x-100' : 'text-stone/70 after:scale-x-0 hover:text-stone hover:after:scale-x-100',
                      )}
                    >
                      {t.nav[key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <LangSwitch compact className="sm:hidden" />
            <LangSwitch className="hidden sm:flex" />
            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.cta.whatsapp}
              title={t.cta.whatsapp}
              className="hidden size-10 place-items-center border border-stone/20 text-stone transition-colors duration-300 hover:border-whatsapp hover:text-whatsapp md:grid"
            >
              <WhatsAppIcon className="size-[1.15rem]" />
            </a>
            <span className="hidden sm:block">
              <Button to={path(pages.quote.path)} size="sm" variant={page === 'quote' ? 'outline' : 'primary'} icon={<ArrowIcon />}>
                {t.nav.quote}
              </Button>
            </span>
            <MenuButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu} />
          </div>
        </div>
      </m.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
