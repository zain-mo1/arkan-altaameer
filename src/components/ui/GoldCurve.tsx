import { m } from 'framer-motion';
import { useId } from 'react';
import { cn } from '@/lib/cn';
import { EASE_CURTAIN } from '@/lib/motion';

/**
 * The gold "foundation" curve from the Arkan symbol — a crescent that tapers at both ends.
 * Draws open from its centre when it enters the viewport (trigger on the unclipped wrapper).
 */
export function GoldCurve({ className, delay = 0.2 }: { className?: string; delay?: number }) {
  const id = 'gc' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <m.div aria-hidden className={cn('block', className)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }}>
      <m.svg
        viewBox="0 0 600 44"
        preserveAspectRatio="none"
        className="block h-auto w-full"
        variants={{
          hidden: { clipPath: 'inset(0% 50% 0% 50%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.6, ease: EASE_CURTAIN, delay } },
        }}
      >
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#9A7727" stopOpacity="0" />
            <stop offset="0.28" stopColor="#B8932C" />
            <stop offset="0.5" stopColor="#EBD28A" />
            <stop offset="0.72" stopColor="#B8932C" />
            <stop offset="1" stopColor="#9A7727" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 40 Q300 -6 600 40 Q300 12 0 40 Z" fill={`url(#${id})`} />
      </m.svg>
    </m.div>
  );
}
