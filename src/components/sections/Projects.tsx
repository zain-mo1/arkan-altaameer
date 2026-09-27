import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { pages } from '@/config/pages';
import { sectionIndex } from '@/data/navigation';
import { projects } from '@/data/projects';
import { useLang } from '@/i18n/context';

export function Projects() {
  const { t, path } = useLang();
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative overflow-hidden bg-ivory text-graphite">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] draft-grid-light [mask-image:linear-gradient(#000,transparent)]"
      />

      <div className="relative shell section-y">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index={sectionIndex('projects')} label={t.projects.label} tone="light" />
            <RevealHeading
              id="projects-title"
              lines={t.projects.title}
              className="mt-8 type-h2 text-graphite"
              accentClassName="text-gold-dark"
            />
          </div>
          <Reveal className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="type-lead text-slate">{t.projects.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-16 sm:mt-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24">
          {featured.map((p, i) => {
            // editorial rhythm: wide / narrow, then narrow / wide
            const wide = i % 4 === 0 || i % 4 === 3;
            return (
              <ProjectCard
                key={p.slug}
                project={p}
                className={wide ? 'lg:col-span-7' : 'lg:col-span-5'}
                sizes={wide ? '(min-width: 1024px) 56vw, 100vw' : '(min-width: 1024px) 40vw, 100vw'}
                frameClassName={`${wide ? 'aspect-[4/3]' : 'aspect-[4/5]'} lg:aspect-auto lg:h-[clamp(26rem,38vw,38rem)]`}
              />
            );
          })}
        </div>

        <Reveal className="mt-20 flex justify-center sm:mt-24">
          <Button to={path(pages.projects.path)} variant="outline-dark" size="lg" icon={<ArrowIcon />}>
            {t.projects.all}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
