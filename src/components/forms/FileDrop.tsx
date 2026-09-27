import { useId, useRef, useState, type DragEvent } from 'react';
import { CloseIcon, FileIcon, UploadIcon } from '@/components/ui/Icons';
import { site } from '@/config/site';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { ACCEPT_ATTR, addFiles, formatBytes, type FileProblem } from '@/lib/forms';

/** Drag-and-drop / browse attachment list (PDF + images), used when a form endpoint is configured. */
export function FileDrop({ files, onChange }: { files: File[]; onChange: (files: File[]) => void }) {
  const { t } = useLang();
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [problems, setProblems] = useState<FileProblem[]>([]);
  const { maxFiles, maxFileMb } = site.forms;

  const take = (picked: FileList | null) => {
    if (!picked?.length) return;
    const result = addFiles(files, Array.from(picked));
    setProblems(result.problems);
    onChange(result.files);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    take(e.dataTransfer.files);
  };

  const describe = (p: FileProblem) =>
    p.kind === 'count'
      ? t.form.errors.fileCount(maxFiles)
      : p.kind === 'type'
        ? t.form.errors.fileType(p.name)
        : t.form.errors.fileSize(p.name, maxFileMb);

  return (
    <div className="mt-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={cn(
          'relative flex flex-col items-center gap-3 border border-dashed px-6 py-9 text-center transition-colors duration-300',
          over ? 'border-gold-dark bg-gold/[0.06]' : 'border-graphite/25 bg-white/40',
        )}
      >
        <UploadIcon className="size-7 text-bronze" />
        <p className="text-[0.92rem] text-graphite">
          {t.form.attachments.drop}{' '}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-medium text-bronze underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze"
          >
            {t.form.attachments.browse}
          </button>
        </p>
        <p className="text-[0.75rem] text-steel">{t.form.attachments.limits(maxFiles, maxFileMb)}</p>
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept={ACCEPT_ATTR}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            take(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {problems.length > 0 && (
        <ul className="mt-3 space-y-1 text-[0.8rem] font-medium text-danger" role="alert">
          {problems.map((p, i) => (
            <li key={i}>{describe(p)}</li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-graphite/10 border-y border-graphite/10">
          {files.map((file) => (
            <li key={file.name + file.size} className="flex items-center gap-4 py-3">
              <FileIcon className="size-5 shrink-0 text-bronze" />
              <span className="min-w-0 flex-1">
                <bdi className="block truncate text-[0.9rem] text-graphite">{file.name}</bdi>
                <span className="numerals text-[0.72rem] text-steel">{formatBytes(file.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => onChange(files.filter((f) => f !== file))}
                aria-label={t.form.attachments.remove(file.name)}
                className="grid size-9 place-items-center text-steel transition-colors hover:text-danger"
              >
                <CloseIcon className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
