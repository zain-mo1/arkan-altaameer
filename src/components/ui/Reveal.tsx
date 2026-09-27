import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { EASE, EASE_CURTAIN, VIEWPORT } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}

/** Soft fade-and-rise when the block enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 26, amount = VIEWPORT.amount }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/**
 * Image curtain: the frame wipes open upward while the photo settles from a slight zoom.
 * The viewport trigger sits on an unclipped wrapper — Chromium's IntersectionObserver reports an
 * element fully hidden by its own clip-path as "not intersecting", so it would never reveal.
 */
export function RevealImage({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div className={cn('relative', className)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <m.div
        className="absolute inset-0 overflow-hidden"
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.35, ease: EASE_CURTAIN, delay } },
        }}
      >
        <m.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.16 }, show: { scale: 1, transition: { duration: 2, ease: EASE, delay } } }}
        >
          {children}
        </m.div>
      </m.div>
    </m.div>
  );
}

/** Vertical parallax for a photo inside a clipping frame. The inner layer is oversized so no gaps appear. */
export function Parallax({ children, className, distance = 60 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance, distance]);

  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      <m.div className="absolute inset-x-0" style={{ y, top: -distance, bottom: -distance }}>
        {children}
      </m.div>
    </div>
  );
}
