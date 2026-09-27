import { Link } from 'react-router';
import { ChevronIcon } from '@/components/ui/Icons';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';

/** "الرئيسية ‹ من نحن" — home link + current page. */
export function Breadcrumbs({ current, className }: { current: string; className?: string }) {
  const { t, home } = useLang();
  return (
    <nav aria-label={t.a11y.breadcrumb} className={className}>
      <ol className="flex flex-wrap items-center gap-2.5 text-[0.8rem] text-mist">
        <li>
          <Link to={home} className="transition-colors duration-300 hover:text-gold-light">
            {t.nav.home}
          </Link>
        </li>
        <li aria-hidden>
          <ChevronIcon className="size-3.5 text-gold/70" />
        </li>
        <li aria-current="page" className={cn('text-stone')}>
          {current}
        </li>
      </ol>
    </nav>
  );
}
