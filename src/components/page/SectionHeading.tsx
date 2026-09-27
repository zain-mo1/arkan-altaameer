import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { HeadingLines } from '@/i18n/types';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  id: string;
  index: string;
  label: string;
  title: HeadingLines;
  intro?: ReactNode;
  tone?: 'light' | 'dark';
  /** split: heading + intro side by side on desktop (home-page pattern) · stack · center */
  layout?: 'split' | 'stack' | 'center';
  as?: 'h2' | 'h3';
  className?: string;
}

/** Label + word-reveal heading + intro — the same pattern the home-page sections use. */
export function SectionHeading({
  id,
  index,
  label,
  title,
  intro,
  tone = 'light',
  layout = 'split',
  as = 'h2',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  const heading = (
    <>
      <SectionLabel index={index} label={label} tone={dark ? 'dark' : 'light'} align={layout === 'center' ? 'center' : 'start'} />
      <RevealHeading
        as={as}
        id={id}
        lines={title}
        className={cn('mt-8 type-h2', dark ? 'text-stone' : 'text-graphite')}
        accentClassName={dark ? 'text-gold' : 'text-gold-dark'}
      />
    </>
  );
  const introBlock = intro && (
    <Reveal delay={0.15}>
      <div className={cn('type-lead', dark ? 'text-mist' : 'text-slate')}>{intro}</div>
    </Reveal>
  );

  if (layout === 'split') {
    return (
      <div className={cn('grid gap-8 lg:grid-cols-12 lg:items-end', className)}>
        <div className="lg:col-span-7">{heading}</div>
        {introBlock && <div className="lg:col-span-4 lg:col-start-9">{introBlock}</div>}
      </div>
    );
  }
  return (
    <div className={cn(layout === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      {heading}
      {introBlock && <div className={cn('mt-8 max-w-2xl', layout === 'center' && 'mx-auto')}>{introBlock}</div>}
    </div>
  );
}
