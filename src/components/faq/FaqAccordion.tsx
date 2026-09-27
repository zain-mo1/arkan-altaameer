import { useState } from 'react';
import { TextLink } from '@/components/ui/Button';
import { ArrowIcon, PlusIcon } from '@/components/ui/Icons';
import { pages } from '@/config/pages';
import type { FaqItem } from '@/data/faq';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';

interface FaqAccordionProps {
  items: FaqItem[];
  /** prefix for element ids (unique per list) */
  idPrefix: string;
  /** item open on first render */
  defaultOpen?: string | null;
  className?: string;
}

/** Question list — one answer open at a time; the panel height animates with CSS grid rows (no layout JS). */
export function FaqAccordion({ items, idPrefix, defaultOpen = null, className }: FaqAccordionProps) {
  const { pick, path } = useLang();
  const [open, setOpen] = useState<string | null>(defaultOpen);

  return (
    <div className={cn('border-t border-graphite/10', className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const id = `${idPrefix}-${item.id}`;
        return (
          <div key={item.id} id={id} className="border-b border-graphite/10">
            <h3>
              <button
                type="button"
                id={`${id}-q`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-start sm:py-7"
              >
                <span
                  className={cn(
                    'type-h4 transition-colors duration-300',
                    isOpen ? 'text-graphite' : 'text-graphite/85 group-hover:text-bronze',
                  )}
                >
                  {pick(item.q)}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 grid size-9 shrink-0 place-items-center border transition-colors duration-500',
                    isOpen ? 'border-graphite bg-graphite text-gold' : 'border-graphite/20 text-graphite group-hover:border-bronze',
                  )}
                >
                  <PlusIcon className={cn('size-4 transition-transform duration-500 ease-(--ease-brand)', isOpen && 'rotate-45')} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a`}
              role="region"
              aria-labelledby={`${id}-q`}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-(--ease-brand)',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="max-w-3xl pe-4 pb-8 sm:pe-16">
                  <p className="type-body text-slate">{pick(item.a)}</p>
                  {item.link && (
                    <TextLink to={path(pages[item.link.page].path)} tone="light" icon={<ArrowIcon />} className="mt-5">
                      {pick(item.link.label)}
                    </TextLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
