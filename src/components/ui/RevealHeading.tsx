import { m, type Variants } from 'framer-motion';
import { Fragment, type ElementType } from 'react';
import type { HeadingLines } from '@/i18n/types';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

interface RevealHeadingProps {
  lines: HeadingLines;
  as?: ElementType;
  id?: string;
  className?: string;
  accentClassName?: string;
  /** "view": reveal when scrolled into view · "mount": reveal immediately (hero) */
  trigger?: 'view' | 'mount';
  delay?: number;
  stagger?: number;
}

const word: Variants = {
  // far enough that Arabic dots/hamza never peek out of the mask's padding
  hidden: { y: '135%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1.05, ease: EASE, delay: i } }),
};

/**
 * Headline that rises word-by-word from behind a mask.
 * Words are never split into letters — Arabic letterforms must stay joined.
 */
export function RevealHeading({
  lines,
  as: Tag = 'h2',
  id,
  className,
  accentClassName,
  trigger = 'view',
  delay = 0,
  stagger = 0.075,
}: RevealHeadingProps) {
  let n = 0;
  const label = lines.map((l) => l.text).join(' ');

  return (
    <Tag id={id} className={className} aria-label={label}>
      <m.span
        aria-hidden
        className="block"
        initial="hidden"
        {...(trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.5 } })}
      >
        {lines.map((line, li) => (
          <span key={li} className={cn('block', line.accent && accentClassName)}>
            {line.text.split(' ').map((w, wi, arr) => {
              const i = n++;
              return (
                <Fragment key={wi}>
                  <span className="reveal-mask">
                    <m.span className="inline-block will-change-transform" variants={word} custom={delay + i * stagger}>
                      {w}
                    </m.span>
                  </span>
                  {wi < arr.length - 1 && ' '}
                </Fragment>
              );
            })}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
