import { useEffect } from 'react';
import { useLenis } from '@/lib/smooth-scroll';

/** Freezes page scrolling while an overlay (menu, dialog) is open. */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevPadding = root.style.paddingInlineEnd;
    const scrollbar = window.innerWidth - root.clientWidth;

    lenis?.stop();
    root.style.overflow = 'hidden';
    if (scrollbar > 0) root.style.paddingInlineEnd = `${scrollbar}px`;

    return () => {
      root.style.overflow = prevOverflow;
      root.style.paddingInlineEnd = prevPadding;
      lenis?.start();
    };
  }, [locked, lenis]);
}
