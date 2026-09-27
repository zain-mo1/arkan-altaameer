import { m } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckIcon, MailIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { useLang } from '@/i18n/context';
import { EASE } from '@/lib/motion';

export type Sent = { via: 'whatsapp' | 'email'; url: string } | { via: 'endpoint' };

/** Confirmation shown in place of the form. WhatsApp / e-mail hand-offs repeat their link as a button. */
export function FormSent({ sent, onReset }: { sent: Sent; onReset: () => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  // announce + move focus to the confirmation
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);

  const title = sent.via === 'endpoint' ? t.form.sent.serverTitle : t.form.sent.title;
  const text = sent.via === 'endpoint' ? t.form.sent.server : sent.via === 'whatsapp' ? t.form.sent.whatsapp : t.form.sent.email;

  return (
    <m.div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="border border-gold-dark/30 bg-white/60 px-7 py-14 text-center outline-none sm:px-12"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-graphite text-gold">
        <CheckIcon className="size-7" />
      </span>
      <h3 className="mt-7 type-h3 text-graphite">{title}</h3>
      <p className="mx-auto mt-4 max-w-md type-body text-slate">{text}</p>
      <div className="mt-9 flex flex-col items-center gap-6">
        {sent.via === 'whatsapp' && (
          <Button href={sent.url} target="_blank" rel="noopener noreferrer" leadingIcon={<WhatsAppIcon />}>
            {t.form.sent.openWhatsapp}
          </Button>
        )}
        {sent.via === 'email' && (
          <Button href={sent.url} leadingIcon={<MailIcon />}>
            {t.form.sent.openEmail}
          </Button>
        )}
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-bronze underline decoration-bronze/40 underline-offset-8 hover:decoration-bronze"
        >
          {t.form.sent.again}
        </button>
      </div>
    </m.div>
  );
}
