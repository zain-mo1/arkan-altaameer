import { m } from 'framer-motion';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { EASE, VIEWPORT } from '@/lib/motion';

interface SectionLabelProps {
  index: string;
  label: string;
  tone?: 'dark' | 'light';
  align?: 'start' | 'center';
  className?: string;
}

/** "01 ──── من نحن" — styled like the title block of an architectural drawing sheet. */
export function SectionLabel({ index, label, tone = 'dark', align = 'start', className }: SectionLabelProps) {
  const { lang } = useLang();
  const dark = tone === 'dark';

  return (
    <m.div
      className={cn('flex items-center gap-4', align === 'center' && 'justify-center', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span className={cn('numerals text-xs font-semibold tracking-[0.2em]', dark ? 'text-gold' : 'text-bronze')}>{index}</span>
      <m.span
        aria-hidden
        className={cn('h-px w-10 origin-left sm:w-14 rtl:origin-right', dark ? 'bg-gold/60' : 'bg-bronze/45')}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      />
      {lang === 'ar' ? (
        <span className={cn('text-[0.95rem] font-medium', dark ? 'text-stone' : 'text-graphite')}>{label}</span>
      ) : (
        <span className={cn('label-latin', dark ? 'text-stone' : 'text-graphite')}>{label}</span>
      )}
    </m.div>
  );
}
