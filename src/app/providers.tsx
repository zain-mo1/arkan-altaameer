import { domAnimation, LazyMotion, MotionConfig, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useState, type ReactNode } from 'react';
import { LenisContext } from '@/lib/smooth-scroll';

/** Framer Motion with lazily-loaded DOM features; honours the OS "reduce motion" setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/** Inertial smooth scrolling (Lenis) — disabled for users who prefer reduced motion. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduce) return;
    const instance = new Lenis({ lerp: 0.09, smoothWheel: true, autoRaf: true });
    // Lenis is an external system: its instance is shared with consumers through context.
    // oxlint-disable-next-line react/set-state-in-effect
    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
