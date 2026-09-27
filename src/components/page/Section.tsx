import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { isDarkTone, type SectionTone } from './tone';

const TONES: Record<SectionTone, string> = {
  paper: 'bg-paper text-graphite',
  ivory: 'bg-ivory text-graphite',
  dark: 'grain bg-graphite-deep text-stone',
  darker: 'grain bg-graphite-deeper text-stone',
};

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  /** id of the heading that names this section */
  labelledBy?: string;
  /** faint drafting grid behind the content */
  grid?: boolean;
  /** vertical rhythm: full section padding (default) or none (caller handles it) */
  padded?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/** A page section on one of the brand grounds, with the drafting-grid texture and the shared vertical rhythm. */
export function Section({ id, tone = 'paper', labelledBy, grid = true, padded = true, className, innerClassName, children }: SectionProps) {
  const dark = isDarkTone(tone);
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative overflow-hidden', TONES[tone], className)}>
      {grid && (
        <div
          aria-hidden
          className={cn('pointer-events-none absolute inset-0 fade-mask', dark ? 'draft-grid opacity-70' : 'draft-grid-light')}
        />
      )}
      <div className={cn('relative shell', padded && 'section-y', innerClassName)}>{children}</div>
    </section>
  );
}
