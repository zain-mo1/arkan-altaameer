import { AnimatePresence, m } from 'framer-motion';
import type { InputHTMLAttributes, ReactNode, Ref, TextareaHTMLAttributes } from 'react';
import { CheckIcon } from '@/components/ui/Icons';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';

/* Forms sit on the light "paper" ground: graphite ink, hairline rules, gold-dark focus. */

interface FieldShellProps {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  /** for groups (chips) the label is a legend-like element, not <label for> */
  group?: boolean;
  className?: string;
  children: ReactNode;
}

const errorId = (id: string) => `${id}-error`;
const hintId = (id: string) => `${id}-hint`;

/** Label, optional marker, hint and animated error message around a control. */
export function FieldShell({ id, label, optional, hint, error, group, className, children }: FieldShellProps) {
  const { t } = useLang();
  const LabelTag = group ? 'span' : 'label';
  return (
    <div className={className} {...(group ? { role: 'group', 'aria-labelledby': `${id}-label` } : {})}>
      <LabelTag
        id={`${id}-label`}
        {...(group ? {} : { htmlFor: id })}
        className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[0.85rem] font-medium text-graphite"
      >
        <span>{label}</span>
        {optional && <span className="text-[0.72rem] font-normal text-steel">{t.form.optional}</span>}
      </LabelTag>
      {hint && (
        <p id={hintId(id)} className="mt-1 text-[0.78rem] leading-6 text-steel">
          {hint}
        </p>
      )}
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={errorId(id)}
            className="mt-2 text-[0.8rem] font-medium text-danger"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const control =
  'block w-full border-0 border-b bg-transparent px-0 py-3 text-[1rem] text-graphite transition-colors duration-300 placeholder:text-steel/55 focus:outline-none focus-visible:outline-none';
const rule = (error?: string) => (error ? 'border-danger' : 'border-graphite/20 hover:border-graphite/40 focus:border-gold-dark');

type ControlProps = { id: string; error?: string; hint?: string; inputRef?: Ref<HTMLInputElement> };

export function TextInput({ id, error, hint, inputRef, className, ...rest }: ControlProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      ref={inputRef}
      id={id}
      aria-invalid={!!error || undefined}
      aria-describedby={cn(hint && hintId(id), error && errorId(id)) || undefined}
      className={cn(control, rule(error), className)}
      {...rest}
    />
  );
}

export function TextArea({
  id,
  error,
  hint,
  textareaRef,
  className,
  ...rest
}: Omit<ControlProps, 'inputRef'> & { textareaRef?: Ref<HTMLTextAreaElement> } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      ref={textareaRef}
      id={id}
      aria-invalid={!!error || undefined}
      aria-describedby={cn(hint && hintId(id), error && errorId(id)) || undefined}
      className={cn(control, 'min-h-32 resize-y leading-8', rule(error), className)}
      {...rest}
    />
  );
}

interface ChoiceGroupProps<T extends string> {
  id: string;
  name: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  /** single choice (radio) or several (checkbox) */
  multiple?: boolean;
  value: T | T[] | '';
  onChange: (value: T | T[]) => void;
  error?: string;
  /** focus target for "jump to the first error" */
  firstRef?: Ref<HTMLInputElement>;
  className?: string;
}

/** Chips backed by real radio / checkbox inputs (keyboard and screen-reader friendly). */
export function ChoiceGroup<T extends string>({
  id,
  name,
  options,
  multiple,
  value,
  onChange,
  error,
  firstRef,
  className,
}: ChoiceGroupProps<T>) {
  const selected = (v: T) => (Array.isArray(value) ? value.includes(v) : value === v);
  const toggle = (v: T) => {
    if (!multiple) return onChange(v);
    const list = Array.isArray(value) ? value : [];
    onChange(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  };

  return (
    <div className={cn('mt-4 flex flex-wrap gap-2', className)} aria-describedby={error ? errorId(id) : undefined}>
      {options.map((o, i) => {
        const on = selected(o.value);
        return (
          <label
            key={o.value}
            className={cn(
              'relative inline-flex cursor-pointer items-center gap-2.5 border px-4 py-2.5 text-[0.9rem] transition-colors duration-300 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold',
              on
                ? 'border-graphite bg-graphite text-stone'
                : error
                  ? 'border-danger/50 text-slate hover:border-graphite/50'
                  : 'border-graphite/15 text-slate hover:border-graphite/45 hover:text-graphite',
            )}
          >
            <input
              ref={i === 0 ? firstRef : undefined}
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={o.value}
              checked={on}
              onChange={() => toggle(o.value)}
              aria-invalid={(!!error && i === 0) || undefined}
              className="sr-only"
            />
            <span
              aria-hidden
              className={cn(
                'grid size-4 shrink-0 place-items-center border transition-colors duration-300',
                multiple ? '' : 'rounded-full',
                on ? 'border-gold bg-gold text-graphite-deeper' : 'border-graphite/30',
              )}
            >
              {on && <CheckIcon className="size-3" strokeWidth={2.5} />}
            </span>
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

/** Numbered fieldset header — "01 ─ Your details" — like the zones of a drawing sheet. */
export function FieldsetTitle({ index, title, text }: { index: string; title: string; text?: string }) {
  return (
    <div className="flex items-start gap-5 border-b border-graphite/10 pb-6">
      <span className="numerals pt-1.5 text-xs font-semibold tracking-[0.2em] text-bronze">{index}</span>
      <div>
        <h2 className="type-h4 text-graphite">{title}</h2>
        {text && <p className="mt-1.5 text-[0.9rem] leading-7 text-slate">{text}</p>}
      </div>
    </div>
  );
}
