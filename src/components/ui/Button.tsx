import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'dark' | 'outline' | 'outline-dark';
type Size = 'sm' | 'md' | 'lg';

interface Common {
  variant?: Variant;
  size?: Size;
  /** icon rendered after the label (nudges toward the reading direction on hover) */
  icon?: ReactNode;
  /** icon rendered before the label (static) */
  leadingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: never; to?: never };
type AsAnchor = Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { href: string; to?: never };
type AsRoute = Common & { to: string; href?: never; onClick?: () => void; preventScrollReset?: boolean };
export type ButtonProps = AsButton | AsAnchor | AsRoute;

const base =
  'group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden whitespace-nowrap font-medium transition-[color,background-color,border-color] duration-300 ease-(--ease-brand) ltr:tracking-[0.01em] disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-13 px-7 text-[0.95rem]',
  lg: 'h-14 px-8 text-base sm:h-15 sm:px-9',
};

const sweep =
  "before:absolute before:inset-0 before:-z-10 before:origin-left rtl:before:origin-right before:scale-x-0 before:transition-transform before:duration-500 before:ease-(--ease-brand) before:content-[''] hover:before:scale-x-100";

const variants: Record<Variant, string> = {
  primary: `bg-gold text-graphite-deeper before:bg-gold-light ${sweep}`,
  /** solid graphite — the main action on light (paper) grounds */
  dark: `bg-graphite text-stone hover:text-graphite-deeper before:bg-gold ${sweep}`,
  outline: `border border-stone/30 text-stone hover:border-gold hover:text-graphite-deeper before:bg-gold ${sweep}`,
  'outline-dark': `border border-graphite/25 text-graphite hover:border-graphite hover:text-stone before:bg-graphite ${sweep}`,
};

function Content({ icon, leadingIcon, children }: Pick<Common, 'icon' | 'leadingIcon' | 'children'>) {
  return (
    <>
      {leadingIcon && <span className="grid size-5 place-items-center [&>svg]:size-5">{leadingIcon}</span>}
      <span>{children}</span>
      {icon && (
        <span className="grid size-5 place-items-center transition-transform duration-500 ease-(--ease-brand) group-hover/btn:translate-x-[calc(var(--dir)*0.3rem)] [&>svg]:size-5">
          {icon}
        </span>
      )}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, leadingIcon, className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <Content icon={icon} leadingIcon={leadingIcon}>
      {children}
    </Content>
  );

  if (typeof rest.to === 'string') {
    const route = rest as Omit<AsRoute, keyof Common>;
    return (
      <Link to={route.to} onClick={route.onClick} preventScrollReset={route.preventScrollReset} className={classes}>
        {content}
      </Link>
    );
  }
  if (typeof rest.href === 'string') {
    return (
      <a {...(rest as Omit<AsAnchor, keyof Common>)} className={classes}>
        {content}
      </a>
    );
  }
  const buttonProps = rest as Omit<AsButton, keyof Common>;
  return (
    <button {...buttonProps} type={buttonProps.type ?? 'button'} className={classes}>
      {content}
    </button>
  );
}

interface TextLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  tone?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  to?: string;
}

/** Understated inline link with a hairline that fills with gold on hover. */
export function TextLink({ tone = 'dark', className, children, icon, to, ...rest }: TextLinkProps) {
  const classes = cn(
    'group/link relative inline-flex items-center gap-3 pb-2 text-[0.95rem] font-medium',
    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:content-['']",
    "before:absolute before:inset-x-0 before:bottom-0 before:z-10 before:h-px before:origin-left before:scale-x-0 before:bg-gold before:transition-transform before:duration-500 before:ease-(--ease-brand) before:content-[''] hover:before:scale-x-100 rtl:before:origin-right",
    tone === 'dark' ? 'text-stone after:bg-stone/25' : 'text-graphite after:bg-graphite/25',
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="grid size-4 place-items-center transition-transform duration-500 ease-(--ease-brand) group-hover/link:translate-x-[calc(var(--dir)*0.3rem)] [&>svg]:size-4">
          {icon}
        </span>
      )}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <a {...rest} className={classes}>
      {inner}
    </a>
  );
}
