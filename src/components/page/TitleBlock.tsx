import type { ReactNode } from 'react';
import { useGoToSection } from '@/hooks/useGoToSection';
import { cn } from '@/lib/cn';

export interface TitleBlockItem {
  /** id of the section on this page to scroll to */
  target?: string;
  /** extra action on click (e.g. apply a filter) — cells without target or action are static */
  onSelect?: () => void;
  /** marks the cell as the current choice */
  active?: boolean;
  index?: string;
  label: ReactNode;
  caption?: ReactNode;
}

/**
 * The drawing sheet's "title block" — a ruled band of cells along the bottom of a page hero.
 * Cells with a target scroll to that section (an on-page index).
 */
export function TitleBlock({ items, label }: { items: TitleBlockItem[]; label: string }) {
  const goTo = useGoToSection();

  return (
    <div className="shell">
      <ol
        aria-label={label}
        className="-mx-[clamp(1.25rem,0.6rem+3.4vw,4.5rem)] flex snap-x [scrollbar-width:none] overflow-x-auto px-[clamp(1.25rem,0.6rem+3.4vw,4.5rem)] md:mx-0 md:grid md:overflow-visible md:px-0"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item, i) => {
          const body = (
            <>
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-(--ease-brand) group-hover:scale-x-100 rtl:origin-right"
              />
              {item.index && <span className="numerals text-[0.7rem] tracking-[0.2em] text-gold/80">{item.index}</span>}
              <span className="font-display text-[0.95rem] leading-snug text-stone transition-colors duration-500 group-hover:text-gold-light lg:text-base">
                {item.label}
              </span>
              {item.caption && <span className="text-[0.75rem] text-mist">{item.caption}</span>}
            </>
          );
          const cell = 'group relative flex w-full min-w-[11rem] flex-col items-start gap-1.5 px-5 py-5 text-start sm:py-6 lg:px-6';
          return (
            <li key={i} className={cn('relative shrink-0 snap-start md:min-w-0', i > 0 && 'border-s border-mist/10')}>
              {item.target || item.onSelect ? (
                <button
                  type="button"
                  aria-pressed={item.onSelect ? !!item.active : undefined}
                  onClick={() => {
                    item.onSelect?.();
                    if (item.target) goTo(item.target);
                  }}
                  className={cn(cell, item.active && '[&>span:first-child]:scale-x-100')}
                >
                  {body}
                </button>
              ) : (
                <div className={cell}>{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
