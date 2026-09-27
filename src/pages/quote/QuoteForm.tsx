import { m } from 'framer-motion';
import { useId, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { ChoiceGroup, FieldShell, FieldsetTitle, TextArea, TextInput } from '@/components/forms/fields';
import { FileDrop } from '@/components/forms/FileDrop';
import { FormActions } from '@/components/forms/FormActions';
import { FormSent, type Sent } from '@/components/forms/FormResult';
import { CloseIcon, PhoneIcon, WhatsAppIcon, WindowMark } from '@/components/ui/Icons';
import { site } from '@/config/site';
import { projectBySlug } from '@/data/projects';
import { serviceById, services, type ServiceId } from '@/data/services';
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
import { telLink, toLatinDigits, waLink } from '@/lib/links';
import { EASE } from '@/lib/motion';
import { content, type ProjectType, type Stage, type Start } from './content';

type Values = {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: ProjectType | '';
  services: ServiceId[];
  location: string;
  stage: Stage | '';
  area: string;
  start: Start | '';
  description: string;
};
type Field = 'name' | 'phone' | 'email' | 'projectType' | 'services' | 'location' | 'description';

const PROJECT_TYPES: ProjectType[] = ['villa', 'apartment', 'building', 'office', 'retail', 'hospitality', 'other'];
const STAGES: Stage[] = ['new', 'shell', 'renovation', 'fitout'];
const STARTS: Start[] = ['asap', 'soon', 'later', 'planning'];
const ORDER: Field[] = ['name', 'phone', 'email', 'projectType', 'services', 'location', 'description'];
const isService = (v: string | null): v is ServiceId => services.some((s) => s.id === v);

export function QuoteForm() {
  const { t, pick, lang } = useLang();
  const c = pick(content);
  const uid = useId();
  const [params] = useSearchParams();

  const empty = (): Values => ({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: '',
    services: [],
    location: '',
    stage: '',
    area: '',
    start: '',
    description: '',
  });
  const [values, setValues] = useState<Values>(() => {
    const v = empty();
    const service = params.get('service');
    if (isService(service)) v.services = [service];
    return v;
  });
  const [reference, setReference] = useState(() => projectBySlug(params.get('project')));
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [attempted, setAttempted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const servicesRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const id = (k: string) => `${uid}-${k}`;

  const validate = (v: Values) => {
    const e: Partial<Record<Field, string>> = {};
    if (v.name.trim().length < 2) e.name = t.form.errors.name;
    if (!isValidPhone(v.phone)) e.phone = t.form.errors.phone;
    if (v.email.trim() && !isValidEmail(v.email)) e.email = t.form.errors.email;
    if (!v.projectType) e.projectType = t.form.errors.select;
    if (!v.services.length) e.services = t.form.errors.services;
    if (v.location.trim().length < 2) e.location = t.form.errors.required;
    if (v.description.trim().length < 10) e.description = t.form.errors.message;
    return e;
  };

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  };

  // required fields completed — drives the progress rule in the side panel
  const checks = [
    values.name.trim().length >= 2,
    isValidPhone(values.phone),
    !!values.projectType,
    values.services.length > 0,
    values.location.trim().length >= 2,
    values.description.trim().length >= 10,
  ];
  const done = checks.filter(Boolean).length;

  const list = (items: string[]) => items.join(lang === 'ar' ? '، ' : ', ');
  const rows = () =>
    [
      [t.form.msg.name, values.name],
      [t.form.msg.company, values.company],
      [t.form.msg.phone, normalizePhone(values.phone)],
      [t.form.msg.email, values.email],
      [t.form.msg.projectType, values.projectType ? c.fields.projectTypes[values.projectType] : ''],
      [t.form.msg.services, list(values.services.map((s) => pick(serviceById(s).title)))],
      [t.form.msg.location, values.location],
      [t.form.msg.stage, values.stage ? c.fields.stages[values.stage] : ''],
      [t.form.msg.area, values.area ? `${values.area} ${c.fields.areaUnit}` : ''],
      [t.form.msg.start, values.start ? c.fields.starts[values.start] : ''],
      [t.form.msg.reference, reference ? `${pick(reference.name)} (${reference.code})` : ''],
      [t.form.msg.description, values.description],
    ] as const;

  const submit = async (via: 'primary' | 'email', e?: FormEvent) => {
    e?.preventDefault();
    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    const first = ORDER.find((f) => found[f]);
    if (first) {
      const targets = {
        name: nameRef,
        phone: phoneRef,
        email: emailRef,
        projectType: typeRef,
        services: servicesRef,
        location: locationRef,
        description: descriptionRef,
      };
      targets[first].current?.focus();
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
        await postToEndpoint({ form: 'quote', language: lang, ...Object.fromEntries(rows().map(([k, v]) => [k, v ?? ''])) }, files);
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

  const reset = () => {
    setValues(empty());
    setFiles([]);
    setErrors({});
    setAttempted(false);
    setSent(null);
  };

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8 xl:col-span-7">
        {sent ? (
          <FormSent sent={sent} onReset={reset} />
        ) : (
          <form noValidate onSubmit={(e) => submit('primary', e)} className="grid gap-16">
            {reference && (
              <div className="flex items-center justify-between gap-4 border border-gold-dark/30 bg-gold/[0.07] px-5 py-4">
                <p className="text-[0.92rem] text-graphite">
                  {c.reference.label} <strong className="font-semibold">«{pick(reference.name)}»</strong>{' '}
                  <span className="numerals text-[0.75rem] text-bronze">{reference.code}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setReference(undefined)}
                  aria-label={c.reference.remove}
                  className="grid size-8 shrink-0 place-items-center text-steel transition-colors hover:text-graphite"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>
            )}

            {/* 01 — contact details */}
            <fieldset className="grid gap-9">
              <legend className="sr-only">{c.sections[0].title}</legend>
              <FieldsetTitle index="01" title={c.sections[0].title} text={c.sections[0].text} />
              <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8">
                <FieldShell id={id('name')} label={t.form.name} error={errors.name}>
                  <TextInput
                    inputRef={nameRef}
                    id={id('name')}
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => set('name', e.target.value)}
                    error={errors.name}
                  />
                </FieldShell>
                <FieldShell id={id('company')} label={t.form.company} optional>
                  <TextInput
                    id={id('company')}
                    name="company"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => set('company', e.target.value)}
                  />
                </FieldShell>
                <FieldShell id={id('phone')} label={t.form.phone} error={errors.phone}>
                  <TextInput
                    inputRef={phoneRef}
                    id={id('phone')}
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
                <FieldShell id={id('email')} label={t.form.email} optional error={errors.email}>
                  <TextInput
                    inputRef={emailRef}
                    id={id('email')}
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
              </div>
            </fieldset>

            {/* 02 — the project */}
            <fieldset className="grid gap-10">
              <legend className="sr-only">{c.sections[1].title}</legend>
              <FieldsetTitle index="02" title={c.sections[1].title} text={c.sections[1].text} />
              <FieldShell id={id('type')} label={c.fields.projectType} error={errors.projectType} group>
                <ChoiceGroup
                  id={id('type')}
                  name="projectType"
                  firstRef={typeRef}
                  options={PROJECT_TYPES.map((v) => ({ value: v, label: c.fields.projectTypes[v] }))}
                  value={values.projectType}
                  onChange={(v) => set('projectType', v as ProjectType)}
                  error={errors.projectType}
                />
              </FieldShell>
              <FieldShell id={id('services')} label={c.fields.services} hint={c.fields.servicesHint} error={errors.services} group>
                <ChoiceGroup
                  id={id('services')}
                  name="services"
                  multiple
                  firstRef={servicesRef}
                  options={services.map((s) => ({ value: s.id, label: pick(s.title) }))}
                  value={values.services}
                  onChange={(v) => set('services', v as ServiceId[])}
                  error={errors.services}
                />
              </FieldShell>
              <div className="grid gap-9 sm:grid-cols-[1fr_12rem] sm:gap-x-8">
                <FieldShell id={id('location')} label={c.fields.location} error={errors.location}>
                  <TextInput
                    inputRef={locationRef}
                    id={id('location')}
                    name="location"
                    autoComplete="address-level2"
                    placeholder={c.fields.locationPlaceholder}
                    value={values.location}
                    onChange={(e) => set('location', e.target.value)}
                    error={errors.location}
                  />
                </FieldShell>
                <FieldShell id={id('area')} label={c.fields.area} optional>
                  <div className="relative">
                    <TextInput
                      id={id('area')}
                      name="area"
                      inputMode="numeric"
                      dir="ltr"
                      placeholder="350"
                      value={values.area}
                      onChange={(e) =>
                        set(
                          'area',
                          toLatinDigits(e.target.value)
                            .replace(/[^\d.,]/g, '')
                            .slice(0, 7),
                        )
                      }
                      className="pe-10 text-start rtl:text-right"
                    />
                    <span className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2 text-[0.9rem] text-steel">
                      {c.fields.areaUnit}
                    </span>
                  </div>
                </FieldShell>
              </div>
              <FieldShell id={id('stage')} label={c.fields.stage} optional group>
                <ChoiceGroup
                  id={id('stage')}
                  name="stage"
                  options={STAGES.map((v) => ({ value: v, label: c.fields.stages[v] }))}
                  value={values.stage}
                  onChange={(v) => set('stage', v as Stage)}
                />
              </FieldShell>
              <FieldShell id={id('start')} label={c.fields.start} optional group>
                <ChoiceGroup
                  id={id('start')}
                  name="start"
                  options={STARTS.map((v) => ({ value: v, label: c.fields.starts[v] }))}
                  value={values.start}
                  onChange={(v) => set('start', v as Start)}
                />
              </FieldShell>
            </fieldset>

            {/* 03 — description + files */}
            <fieldset className="grid gap-9">
              <legend className="sr-only">{c.sections[2].title}</legend>
              <FieldsetTitle index="03" title={c.sections[2].title} text={c.sections[2].text} />
              <FieldShell id={id('description')} label={c.fields.description} error={errors.description}>
                <TextArea
                  textareaRef={descriptionRef}
                  id={id('description')}
                  name="description"
                  rows={6}
                  placeholder={c.fields.descriptionPlaceholder}
                  value={values.description}
                  onChange={(e) => set('description', e.target.value)}
                  error={errors.description}
                />
              </FieldShell>
              {hasFormEndpoint ? (
                <FieldShell id={id('files')} label={t.form.attachments.label} hint={t.form.attachments.hint} optional group>
                  <FileDrop files={files} onChange={setFiles} />
                </FieldShell>
              ) : (
                <p className="flex gap-4 border-s-2 border-gold-dark/50 bg-white/50 py-4 ps-5 pe-4 text-[0.9rem] leading-7 text-slate">
                  {t.form.attachments.viaWhatsapp}
                </p>
              )}
            </fieldset>

            <FormActions busy={busy} failed={failed} onEmail={() => submit('email')} />
          </form>
        )}
      </div>

      {/* side panel: progress, what happens next, direct line */}
      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="space-y-8 lg:sticky lg:top-32">
          <div className="bg-graphite p-7 text-stone sm:p-8">
            {!sent && (
              <div className="mb-8 border-b border-mist/15 pb-7">
                <p className="text-[0.82rem] text-mist" aria-live="polite">
                  {c.progress(done, checks.length)}
                </p>
                <div className="mt-3 h-px bg-mist/20">
                  <m.div
                    className="h-full origin-left bg-gold rtl:origin-right"
                    animate={{ scaleX: done / checks.length }}
                    transition={{ duration: 0.6, ease: EASE }}
                    initial={false}
                  />
                </div>
              </div>
            )}
            <p className="type-h4 text-stone">{c.steps.title}</p>
            <ol className="mt-7 space-y-6">
              {c.steps.items.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.25rem_1fr] gap-3">
                  <span className="grid size-9 place-items-center border border-gold/40 text-gold">
                    <span className="numerals text-[0.7rem] font-semibold">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <span>
                    <span className="block font-medium text-stone">{step.title}</span>
                    <span className="mt-1 block text-[0.88rem] leading-7 text-mist">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-graphite/12 p-7 sm:p-8">
            <p className="flex items-center gap-3 text-[0.9rem] font-medium text-graphite">
              <WindowMark className="size-3 text-gold-dark" />
              {c.talk}
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href={waLink(t.wa.quote)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[0.95rem] text-graphite transition-colors hover:text-bronze"
              >
                <WhatsAppIcon className="size-4 text-bronze" />
                {t.cta.whatsapp}
              </a>
              <a href={telLink} className="flex items-center gap-3 text-[0.95rem] text-graphite transition-colors hover:text-bronze">
                <PhoneIcon className="size-4 text-bronze" />
                <bdi>{site.contact.phoneDisplay}</bdi>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
