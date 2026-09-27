import { AnimatePresence, m } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PageHero } from '@/components/page/PageHero';
import { TitleBlock } from '@/components/page/TitleBlock';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ContactCta } from '@/components/sections/ContactCta';
import { pageIndex } from '@/config/pages';
import { pad2 } from '@/data/navigation';
import { PROJECT_CATEGORIES, projectBySlug, projects, type ProjectCategory } from '@/data/projects';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import { content } from './content';
import { ProjectViewer } from './ProjectViewer';

type Filter = ProjectCategory | 'all';
const CATEGORIES = Object.keys(PROJECT_CATEGORIES) as ProjectCategory[];

/**
 * Editorial rhythm, repeated every five cards: one full-width feature, then wide/narrow and narrow/wide pairs.
 * [grid span, photo frame, sizes]
 */
const RHYTHM: [string, string, string][] = [
  ['lg:col-span-12', 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]', '(min-width: 1024px) 92vw, 100vw'],
  ['lg:col-span-7', 'aspect-[4/3] lg:aspect-auto lg:h-[clamp(24rem,34vw,34rem)]', '(min-width: 1024px) 56vw, 100vw'],
  ['lg:col-span-5', 'aspect-[4/5] lg:aspect-auto lg:h-[clamp(24rem,34vw,34rem)]', '(min-width: 1024px) 40vw, 100vw'],
  ['lg:col-span-5', 'aspect-[4/5] lg:aspect-auto lg:h-[clamp(24rem,34vw,34rem)]', '(min-width: 1024px) 40vw, 100vw'],
  ['lg:col-span-7', 'aspect-[4/3] lg:aspect-auto lg:h-[clamp(24rem,34vw,34rem)]', '(min-width: 1024px) 56vw, 100vw'],
];

export default function Projects() {
  const { t, pick } = useLang();
  const c = pick(content);
  useDocumentMeta('projects');

  const [filter, setFilter] = useState<Filter>('all');
  const [params, setParams] = useSearchParams();
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  // the viewer follows ?project=<slug>, so projects can be linked and the back button closes it
  const open = projectBySlug(params.get('project'));
  const pool = open && list.includes(open) ? list : projects;
  const openIndex = open ? pool.indexOf(open) : -1;

  const close = useCallback(
    () =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete('project');
          return next;
        },
        { replace: true, preventScrollReset: true },
      ),
    [setParams],
  );
  const step = useCallback(
    (dir: 1 | -1) => {
      if (openIndex < 0) return;
      const target = pool[(openIndex + dir + pool.length) % pool.length];
      setParams({ project: target.slug }, { replace: true, preventScrollReset: true });
    },
    [openIndex, pool, setParams],
  );

  const choose = (f: Filter) => setFilter(f);
  const count = (f: Filter) => (f === 'all' ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <>
      <PageHero
        index={pageIndex('projects')}
        label={t.nav.projects}
        title={c.hero.title}
        lead={c.hero.lead}
        image={{ id: 'page-projects', alt: '' }}
        strip={
          <TitleBlock
            label={c.hero.stripLabel}
            items={(['all', ...CATEGORIES] as Filter[]).map((f, i) => ({
              index: pad2(i),
              label: f === 'all' ? c.filter.all : pick(PROJECT_CATEGORIES[f]),
              caption: c.count(count(f)),
              target: 'work',
              onSelect: () => choose(f),
              active: filter === f,
            }))}
          />
        }
      />

      <section id="work" aria-label={t.nav.projects} className="relative overflow-hidden bg-ivory text-graphite">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] draft-grid-light [mask-image:linear-gradient(#000,transparent)]"
        />

        <div className="relative shell pt-14 section-b sm:pt-20">
          {/* filters */}
          <div role="group" aria-label={c.filter.label} className="flex flex-wrap items-center gap-2 border-b border-graphite/12 pb-8">
            {(['all', ...CATEGORIES] as Filter[]).map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(f)}
                  className={cn(
                    'flex items-baseline gap-2.5 border px-4 py-2.5 text-[0.9rem] transition-colors duration-300',
                    on
                      ? 'border-graphite bg-graphite text-stone'
                      : 'border-graphite/15 text-slate hover:border-graphite/45 hover:text-graphite',
                  )}
                >
                  {f === 'all' ? c.filter.all : pick(PROJECT_CATEGORIES[f])}
                  <span className={cn('numerals text-[0.7rem]', on ? 'text-gold' : 'text-steel')}>{pad2(count(f))}</span>
                </button>
              );
            })}
            <p className="ms-auto hidden text-[0.85rem] text-steel sm:block" aria-live="polite">
              {c.count(list.length)}
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={filter}
              className="mt-14 grid gap-x-6 gap-y-16 sm:mt-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {list.map((p, i) => {
                const [span, frame, sizes] = RHYTHM[i % RHYTHM.length];
                return <ProjectCard key={p.slug} project={p} className={span} frameClassName={frame} sizes={sizes} as="h2" />;
              })}
            </m.div>
          </AnimatePresence>
        </div>
      </section>

      <ContactCta
        id="start"
        index={pad2(CATEGORIES.length + 1)}
        label={c.cta.label}
        title={c.cta.title}
        intro={c.cta.intro}
        waMessage={t.wa.projects}
      />

      <ProjectViewer project={open} index={openIndex} total={pool.length} onClose={close} onStep={step} />
    </>
  );
}
