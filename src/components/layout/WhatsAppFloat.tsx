import { m, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { usePage, usePageWhatsAppMessage } from '@/hooks/usePage';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { waLink } from '@/lib/links';

/** Always-visible WhatsApp shortcut (bottom corner, mirrored for RTL) with a message that fits the page. */
export function WhatsAppFloat() {
  const { t } = useLang();
  const page = usePage();
  const message = usePageWhatsAppMessage();
  const { scrollY } = useScroll();
  const [atTop, setAtTop] = useState(() => typeof window === 'undefined' || window.scrollY < 120);
  useMotionValueEvent(scrollY, 'change', (y) => setAtTop(y < 120));

  // The home hero has its own WhatsApp button: on phones and tablets the floating one waits until the visitor
  // scrolls, so it never covers the hero copy. (visibility + translate: framer owns opacity/transform here)
  const tucked = atTop && page === 'home';

  return (
    <m.a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.cta.whatsapp}
      className={cn(
        'group fixed end-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex items-center transition-[translate,visibility] duration-500 ease-(--ease-brand) sm:end-7 sm:bottom-7',
        tucked && 'max-lg:invisible max-lg:translate-y-8',
      )}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <span className="pointer-events-none me-3 hidden translate-y-1 bg-graphite-deeper/90 px-4 py-2.5 text-sm whitespace-nowrap text-stone opacity-0 shadow-xl backdrop-blur transition-all duration-500 ease-(--ease-brand) group-hover:translate-y-0 group-hover:opacity-100 lg:block">
        {t.cta.whatsapp}
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.7)] transition-transform duration-500 ease-(--ease-brand) group-hover:scale-105 sm:size-[3.75rem]">
        <span aria-hidden className="absolute inset-0 animate-wa-pulse rounded-full bg-whatsapp" />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </m.a>
  );
}
