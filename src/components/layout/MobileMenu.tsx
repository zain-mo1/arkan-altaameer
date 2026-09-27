import { AnimatePresence, m } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { PhoneIcon, SocialIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { MAIN_NAV, pad2 } from '@/data/navigation';
import { usePage, usePageWhatsAppMessage } from '@/hooks/usePage';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { trapTab } from '@/lib/focus';
import { telLink, waLink } from '@/lib/links';
import { EASE, EASE_CURTAIN } from '@/lib/motion';
import { LangSwitch } from './LangSwitch';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen menu below the xl breakpoint — the site's index, drawn like a drawing-sheet register. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t, path, pick } = useLang();
  const page = usePage();
  const waMessage = usePageWhatsAppMessage();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // keep focus within the header (menu button) + the menu while it is open
      else trapTab(e, document.getElementById('site-top'));
    };
    const onResize = () => window.innerWidth >= 1280 && onClose();
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          data-lenis-prevent
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-graphite-deeper text-stone xl:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease: EASE_CURTAIN }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 draft-grid fade-mask" />

          <nav aria-label={t.a11y.mainNav} className="relative shell flex-1 pt-28 pb-10 sm:pt-32">
            <ol className="border-t border-mist/10 md:grid md:grid-cols-2 md:gap-x-10">
              {MAIN_NAV.map((key, i) => {
                const active = page === key;
                return (
                  <m.li
                    key={key}
                    className="border-b border-mist/10"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: EASE }}
                  >
                    <Link
                      to={path(pages[key].path)}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className="group flex items-baseline gap-5 py-4 sm:py-5"
                    >
                      <span className={cn('numerals text-xs', active ? 'text-gold' : 'text-gold/60')}>{pad2(i + 1)}</span>
                      <span
                        className={cn(
                          'font-display text-[1.6rem] leading-tight transition-colors sm:text-3xl',
                          active ? 'text-gold-light' : 'text-stone group-hover:text-gold-light',
                        )}
                      >
                        {t.nav[key]}
                      </span>
                    </Link>
                  </m.li>
                );
              })}
            </ol>
          </nav>

          <m.div
            className="relative shell pb-[max(2rem,env(safe-area-inset-bottom))]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: EASE }}
          >
            <div className="grid grid-cols-2 gap-3 sm:max-w-md">
              <Button href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" leadingIcon={<WhatsAppIcon />}>
                {t.cta.whatsappShort}
              </Button>
              <Button href={telLink} variant="outline" leadingIcon={<PhoneIcon />}>
                {t.cta.call}
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-5 text-xs text-mist">
              <LangSwitch />
              <span>{pick(site.location.full)}</span>
              <ul className="flex items-center gap-4" aria-label={t.a11y.social}>
                {site.social
                  .filter((s) => s.url)
                  .map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        aria-label={s.label}
                        className="text-mist transition-colors hover:text-gold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon id={s.id} className="size-4" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
