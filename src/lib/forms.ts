import { site } from '@/config/site';
import { toLatinDigits, waLink } from './links';

/** Where form submissions go: a configured endpoint, otherwise WhatsApp (or the visitor's e-mail app). */
export const hasFormEndpoint = site.forms.endpoint.trim().length > 0;

export type Rows = ReadonlyArray<readonly [label: string, value: string | undefined]>;

/** "Title\n\nLabel: value …" — empty values are skipped. WhatsApp renders *text* in bold. */
export function composeMessage(title: string, rows: Rows, { bold = true } = {}) {
  const body = rows.filter(([, v]) => v && v.trim()).map(([label, v]) => `${label}: ${v!.trim()}`);
  return [bold ? `*${title}*` : title, '', ...body].join('\n');
}

export const whatsappUrl = (message: string) => waLink(message);

export const mailtoUrl = (subject: string, body: string) =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** Opens WhatsApp in a new tab. Pop-ups can be blocked — callers also show the link as a button. */
export function openWhatsApp(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Sends the fields (and files) to the configured endpoint as multipart/form-data. */
export async function postToEndpoint(fields: Record<string, string>, files: File[] = []) {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) if (value) body.append(key, value);
  for (const file of files) body.append('attachments', file, file.name);
  const res = await fetch(site.forms.endpoint, { method: 'POST', body, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Form endpoint answered ${res.status}`);
}

/* ---------- validation ---------- */

export const normalizePhone = (value: string) => toLatinDigits(value).trim();

/** 9–15 digits, optionally with +, spaces, dashes or brackets (Saudi mobiles: 05XXXXXXXX / +9665XXXXXXXX). */
export function isValidPhone(value: string) {
  const v = normalizePhone(value);
  if (/[^\d\s+()-]/.test(v)) return false;
  const digits = v.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15;
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/* ---------- attachments ---------- */

const ACCEPTED = /^(application\/pdf|image\/(jpeg|png|webp|heic|heif))$/;
export const ACCEPT_ATTR = '.pdf,image/jpeg,image/png,image/webp,image/heic,image/heif';

export type FileProblem = { kind: 'type' | 'size'; name: string } | { kind: 'count' };

/** Merges newly picked files into the list, rejecting unsupported types, oversize files and overflow. */
export function addFiles(current: File[], picked: File[]) {
  const problems: FileProblem[] = [];
  const next = [...current];
  for (const file of picked) {
    if (!ACCEPTED.test(file.type) && !/\.(pdf|jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
      problems.push({ kind: 'type', name: file.name });
    } else if (file.size > site.forms.maxFileMb * 1024 * 1024) {
      problems.push({ kind: 'size', name: file.name });
    } else if (next.length >= site.forms.maxFiles) {
      if (!problems.some((p) => p.kind === 'count')) problems.push({ kind: 'count' });
    } else if (!next.some((f) => f.name === file.name && f.size === file.size)) {
      next.push(file);
    }
  }
  return { files: next, problems };
}

export const formatBytes = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
