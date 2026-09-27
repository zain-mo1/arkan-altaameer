import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { ArrowIcon, ChevronIcon, CloseIcon, WhatsAppIcon, WindowMark } from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { pages } from '@/config/pages';
import { PROJECT_CATEGORIES, type Project } from '@/data/projects';
import { serviceById } from '@/data/services';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { trapTab } from '@/lib/focus';
import { waLink } from '@/lib/links';
import { EASE, EASE_CURTAIN } from '@/lib/motion';
import { content } from './content';

interface ProjectViewerProps {
  project: Project | undefined;
  /** position within the current (filtered) list, for the counter and prev / next */
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

const FACT_KEYS = ['client', 'area', 'year', 'duration'] as const;

/** Full-screen project sheet: large photography, the scope delivered and a direct way to ask for something similar. */
export function ProjectViewer({ project, index, total, onClose, onStep }: ProjectViewerProps) {
  const { t, pick, path, isRTL } = useLang();
  const c = pick(content).viewer;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const open = !!project;
  useScrollLock(open);

  const images = project ? [{ image: project.cover, alt: project.coverAlt }, ...(project.gallery ?? [])] : [];

  // new project → first image (adjusting state during render, keyed by the slug)
  const [shownSlug, setShownSlug] = useState(project?.slug);
  if (project?.slug !== shownSlug) {
    setShownSlug(project?.slug);
    setImageIndex(0);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onStep(isRTL ? -1 : 1);
      else if (e.key === 'ArrowLeft') onStep(isRTL ? 1 : -1);
      else trapTab(e, panelRef.current);
    };
    document.addEventListener('keydown', onKey);
    const id = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('keydown', onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, onStep, isRTL]);

  const facts = project?.facts ? FACT_KEYS.filter((k) => project.facts?.[k]) : [];

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[70]">
          <m.div
            className="absolute inset-0 bg-night/85 backdrop-blur-[3px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={c.label}
            data-lenis-prevent
            className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain bg-graphite-deeper text-stone lg:inset-6 lg:flex-row lg:overflow-hidden xl:inset-10"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease: EASE_CURTAIN }}
          >
            {/* photography */}
            <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-graphite sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:w-[62%]">
              <AnimatePresence initial={false}>
                <m.div
                  key={`${project.slug}-${imageIndex}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <Picture
                    id={images[imageIndex].image}
                    alt={pick(images[imageIndex].alt)}
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    priority
                  />
                </m.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-graphite-deeper/70 to-transparent" />
              <span className="absolute start-5 top-5 bg-graphite-deeper/75 px-3 py-1.5 backdrop-blur-sm">
                <span className="block numerals text-[0.7rem] tracking-[0.25em] text-gold">{project.code}</span>
              </span>
              {images.length > 1 && (
                <div className="absolute end-5 bottom-5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
                    aria-label={c.prevImage}
                    className="grid size-10 place-items-center bg-graphite-deeper/75 text-stone backdrop-blur-sm transition-colors hover:text-gold"
                  >
                    <ChevronIcon className="size-4 -scale-x-100 rtl:scale-x-100" />
                  </button>
                  <span className="numerals text-xs text-stone">
                    {imageIndex + 1}/{images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                    aria-label={c.nextImage}
                    className="grid size-10 place-items-center bg-graphite-deeper/75 text-stone backdrop-blur-sm transition-colors hover:text-gold"
                  >
                    <ChevronIcon className="size-4" />
                  </button>
                </div>
              )}
            </div>

            {/* details */}
            <div className="relative flex flex-1 flex-col lg:overflow-y-auto">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-72 draft-grid [mask-image:linear-gradient(#000,transparent)] opacity-60"
              />

              <div className="relative flex items-center justify-between gap-4 border-b border-mist/10 px-6 py-4 sm:px-10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onStep(-1)}
                    aria-label={c.prevProject}
                    className="grid size-10 place-items-center border border-mist/20 text-stone transition-colors hover:border-gold hover:text-gold"
                  >
                    <ChevronIcon className="size-4 -scale-x-100 rtl:scale-x-100" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onStep(1)}
                    aria-label={c.nextProject}
                    className="grid size-10 place-items-center border border-mist/20 text-stone transition-colors hover:border-gold hover:text-gold"
                  >
                    <ChevronIcon className="size-4" />
                  </button>
                  <span className="ms-3 numerals text-xs tracking-[0.2em] text-mist">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={c.close}
                  className="grid size-11 place-items-center border border-mist/20 text-stone transition-colors hover:border-gold hover:text-gold"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={project.slug}
                  className="relative flex flex-1 flex-col px-6 py-10 sm:px-10 lg:py-12"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="flex flex-wrap items-center gap-3 text-[0.85rem] text-mist">
                    <span>{pick(PROJECT_CATEGORIES[project.category])}</span>
                    <span className="text-gold">·</span>
                    <span>{pick(project.location)}</span>
                    {project.status && (
                      <span
                        className={cn(
                          'ms-2 border px-2.5 py-0.5 text-[0.72rem]',
                          project.status === 'completed' ? 'border-gold/40 text-gold-light' : 'border-mist/30 text-haze',
                        )}
                      >
                        {c.status[project.status]}
                      </span>
                    )}
                  </p>
                  <h2 className="mt-5 type-h2 text-stone">{pick(project.name)}</h2>
                  <p className="mt-6 type-lead text-haze">{pick(project.summary)}</p>

                  <div className="mt-10">
                    <h3 className="text-[0.82rem] font-semibold text-stone">{c.services}</h3>
                    <ul className="mt-4 border-t border-mist/10">
                      {project.services.map((id) => {
                        const s = serviceById(id);
                        return (
                          <li key={id} className="border-b border-mist/10">
                            <Link
                              to={`${path(pages.services.path)}#${id}`}
                              className="group flex items-center justify-between gap-4 py-3.5 text-[0.95rem] text-haze transition-colors hover:text-gold-light"
                            >
                              <span className="flex items-center gap-3">
                                <WindowMark className="size-2 text-gold" />
                                {pick(s.title)}
                              </span>
                              <span className="numerals text-[0.7rem] text-mist/70">{s.index}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {facts.length > 0 && (
                    <dl className="mt-8 grid grid-cols-2 gap-px bg-mist/10">
                      {facts.map((k) => (
                        <div key={k} className="bg-graphite-deeper py-4 pe-4">
                          <dt className="text-[0.75rem] text-mist">{c.facts[k]}</dt>
                          <dd className="mt-1 text-stone">{pick(project.facts![k]!)}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="mt-auto flex flex-wrap gap-3 pt-12">
                    <Button to={`${path(pages.quote.path)}?project=${project.slug}`} icon={<ArrowIcon />}>
                      {c.quote}
                    </Button>
                    <Button
                      href={waLink(t.wa.project(pick(project.name)))}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      leadingIcon={<WhatsAppIcon />}
                    >
                      {c.whatsapp}
                    </Button>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
