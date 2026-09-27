import { m, useReducedMotion } from 'framer-motion';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { useLang } from '@/i18n/context';
import { LangProvider } from '@/i18n/LangProvider';
import type { Lang } from '@/i18n/types';
import { EASE, EASE_CURTAIN } from '@/lib/motion';
import { MotionProvider, SmoothScrollProvider } from './providers';

/**
 * Page transition: on client navigation a gold seam runs across the top edge while the new page settles in.
 * The first page of a visit renders immediately (its own hero choreography takes over).
 */
function PageTransition() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const first = location.key === 'default';

  return (
    <>
      {!first && !reduce && (
        <m.span
          key={`seam-${location.pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold rtl:origin-right"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ scaleX: { duration: 0.8, ease: EASE_CURTAIN }, opacity: { duration: 0.5, delay: 0.75 } }}
        />
      )}
      <m.div
        key={location.pathname}
        initial={first ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Outlet />
      </m.div>
    </>
  );
}

function Shell() {
  const { t } = useLang();
  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-4 z-[80] -translate-y-24 bg-gold px-5 py-3 text-sm font-semibold text-graphite-deeper transition-transform focus:translate-y-0"
      >
        {t.a11y.skip}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <PageTransition />
      </main>
      <Footer />
      <WhatsAppFloat />
      {/* New navigations start at the top and back/forward restores; the first history entry is always
          keyed "default", so it is keyed by path instead (otherwise offsets leak between documents). */}
      <ScrollRestoration getKey={(location) => (location.key === 'default' ? location.pathname : location.key)} />
    </>
  );
}

export function SiteLayout({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <MotionProvider>
        <SmoothScrollProvider>
          <Shell />
        </SmoothScrollProvider>
      </MotionProvider>
    </LangProvider>
  );
}
