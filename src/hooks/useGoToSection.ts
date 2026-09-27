import { useReducedMotion } from 'framer-motion';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useLang } from '@/i18n/context';
import { easeInOutCubic } from '@/lib/motion';
import { useLenis } from '@/lib/smooth-scroll';

/**
 * Smoothly scrolls to a section of the current page ("top" = page top).
 * When the section isn't on this page, it navigates to the home page section instead.
 */
export function useGoToSection() {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const { home } = useLang();

  return useCallback(
    (id: string) => {
      const target = id === 'top' ? 0 : document.getElementById(id);
      if (target === null) {
        navigate(`${home}#${id}`);
        return;
      }

      if (lenis) {
        lenis.scrollTo(target, { duration: 1.5, easing: easeInOutCubic });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      } else {
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
      // Reflect the section in the address bar. Static previews route in memory and read the hash as a
      // page name on load, so they leave the URL alone. Some embedded viewers forbid history writes too.
      if (import.meta.env.MODE === 'artifact') return;
      try {
        const url = id === 'top' ? window.location.pathname + window.location.search : `#${id}`;
        window.history.replaceState(window.history.state, '', url);
      } catch {
        /* not essential */
      }
    },
    [home, lenis, navigate, reduce],
  );
}
