import { useId, useRef, useState, type FormEvent } from 'react';
import { ChoiceGroup, FieldShell, TextArea, TextInput } from '@/components/forms/fields';
import { FormActions } from '@/components/forms/FormActions';
import { FormSent, type Sent } from '@/components/forms/FormResult';
import { useLang } from '@/i18n/context';
import {
  composeMessage,
  hasFormEndpoint,
  isValidEmail,
  isValidPhone,
  mailtoUrl,
  normalizePhone,
  openWhatsApp,
  postToEndpoint,
  whatsappUrl,
} from '@/lib/forms';
import { content, type Subject } from './content';

type Values = { name: string; phone: string; email: string; subject: Subject; message: string };
type Field = 'name' | 'phone' | 'email' | 'message';
const EMPTY: Values = { name: '', phone: '', email: '', subject: 'general', message: '' };
const SUBJECTS: Subject[] = ['general', 'service', 'project', 'supply', 'other'];

export function ContactForm() {
  const { t, pick, lang } = useLang();
  const c = pick(content).form;
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [attempted, setAttempted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const ids = { name: `${uid}-name`, phone: `${uid}-phone`, email: `${uid}-email`, subject: `${uid}-subject`, message: `${uid}-message` };

  const validate = (v: Values) => {
    const e: Partial<Record<Field, string>> = {};
    if (v.name.trim().length < 2) e.name = t.form.errors.name;
    if (!isValidPhone(v.phone)) e.phone = t.form.errors.phone;
    if (v.email.trim() && !isValidEmail(v.email)) e.email = t.form.errors.email;
    if (v.message.trim().length < 10) e.message = t.form.errors.message;
    return e;
  };

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  };

  const rows = () =>
    [
      [t.form.msg.name, values.name],
      [t.form.msg.phone, normalizePhone(values.phone)],
      [t.form.msg.email, values.email],
      [t.form.msg.subject, c.subjects[values.subject]],
      [t.form.msg.message, values.message],
    ] as const;

  const submit = async (via: 'primary' | 'email', e?: FormEvent) => {
    e?.preventDefault();
    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    const first = (['name', 'phone', 'email', 'message'] as Field[]).find((f) => found[f]);
    if (first) {
      ({ name: nameRef, phone: phoneRef, email: emailRef, message: messageRef })[first].current?.focus();
      return;
    }

    if (via === 'email') {
      const url = mailtoUrl(`${c.emailSubject} — ${values.name.trim()}`, composeMessage(c.waTitle, rows(), { bold: false }));
      window.location.assign(url);
      setSent({ via: 'email', url });
      return;
    }
    if (hasFormEndpoint) {
      setBusy(true);
      setFailed(false);
      try {
        await postToEndpoint({
          form: 'contact',
          language: lang,
          name: values.name.trim(),
          phone: normalizePhone(values.phone),
          email: values.email.trim(),
          subject: c.subjects[values.subject],
          message: values.message.trim(),
        });
        setSent({ via: 'endpoint' });
      } catch {
        setFailed(true);
      } finally {
        setBusy(false);
      }
      return;
    }
    const url = whatsappUrl(composeMessage(`${c.waTitle} — ${t.form.msg.via}`, rows()));
    openWhatsApp(url);
    setSent({ via: 'whatsapp', url });
  };

  if (sent) {
    return (
      <FormSent
        sent={sent}
        onReset={() => {
          setValues(EMPTY);
          setErrors({});
          setAttempted(false);
          setSent(null);
        }}
      />
    );
  }

  return (
    <form noValidate onSubmit={(e) => submit('primary', e)} className="grid gap-9">
      <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8">
        <FieldShell id={ids.name} label={t.form.name} error={errors.name}>
          <TextInput
            inputRef={nameRef}
            id={ids.name}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            error={errors.name}
          />
        </FieldShell>
        <FieldShell id={ids.phone} label={t.form.phone} error={errors.phone}>
          <TextInput
            inputRef={phoneRef}
            id={ids.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={t.form.phonePlaceholder}
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            error={errors.phone}
            className="text-start rtl:text-right"
          />
        </FieldShell>
      </div>

      <FieldShell id={ids.email} label={t.form.email} optional error={errors.email}>
        <TextInput
          inputRef={emailRef}
          id={ids.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          placeholder={t.form.emailPlaceholder}
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          error={errors.email}
          className="text-start rtl:text-right"
        />
      </FieldShell>

      <FieldShell id={ids.subject} label={c.subject} group>
        <ChoiceGroup
          id={ids.subject}
          name="subject"
          options={SUBJECTS.map((s) => ({ value: s, label: c.subjects[s] }))}
          value={values.subject}
          onChange={(v) => set('subject', v as Subject)}
        />
      </FieldShell>

      <FieldShell id={ids.message} label={c.message} error={errors.message}>
        <TextArea
          textareaRef={messageRef}
          id={ids.message}
          name="message"
          rows={5}
          placeholder={c.messagePlaceholder}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          error={errors.message}
        />
      </FieldShell>

      <FormActions busy={busy} failed={failed} onEmail={() => submit('email')} />
    </form>
  );
}
