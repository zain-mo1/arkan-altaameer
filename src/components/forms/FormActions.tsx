import { AnimatePresence, m } from 'framer-motion';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { AlertIcon, ArrowIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { pages } from '@/config/pages';
import { useLang } from '@/i18n/context';
import { hasFormEndpoint } from '@/lib/forms';

interface FormActionsProps {
  busy?: boolean;
  /** the endpoint rejected the last attempt */
  failed?: boolean;
  /** sends the same content through the visitor's e-mail app (only offered without an endpoint) */
  onEmail: () => void;
}

/** Consent line, submit button (endpoint or WhatsApp) and the e-mail alternative. */
export function FormActions({ busy, failed, onEmail }: FormActionsProps) {
  const { t, path } = useLang();
  const [before, link, after] = t.form.consent;

  return (
    <div>
      <AnimatePresence initial={false}>
        {failed && (
          <m.div
            role="alert"
            className="mb-7 flex gap-3 border border-danger/30 bg-danger/[0.06] p-4 text-[0.88rem] leading-7 text-graphite"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertIcon className="mt-1 size-5 shrink-0 text-danger" />
            <p>
              <strong className="font-semibold">{t.form.error.title}</strong> — {t.form.error.text}
            </p>
          </m.div>
        )}
      </AnimatePresence>

      <p className="text-[0.8rem] leading-6 text-steel">
        {before}
        <Link
          to={path(pages.privacy.path)}
          className="text-bronze underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze"
        >
          {link}
        </Link>
        {after}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
        <Button
          type="submit"
          variant="dark"
          size="lg"
          disabled={busy}
          leadingIcon={hasFormEndpoint ? undefined : <WhatsAppIcon />}
          icon={hasFormEndpoint ? <ArrowIcon /> : undefined}
        >
          {busy ? t.form.sending : hasFormEndpoint ? t.form.submit : t.form.submitWhatsapp}
        </Button>
        {!hasFormEndpoint && (
          <button
            type="button"
            onClick={onEmail}
            className="text-[0.9rem] font-medium text-graphite underline decoration-graphite/30 underline-offset-8 transition-colors hover:text-bronze hover:decoration-bronze"
          >
            {t.form.orEmail}
          </button>
        )}
      </div>
      {!hasFormEndpoint && <p className="mt-5 max-w-lg text-[0.78rem] leading-6 text-steel">{t.form.whatsappNote}</p>}
    </div>
  );
}
