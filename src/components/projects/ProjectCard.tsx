import { Link } from 'react-router';
import { ArrowDiagIcon } from '@/components/ui/Icons';
import { Picture } from '@/components/ui/Picture';
import { Reveal, RevealImage } from '@/components/ui/Reveal';
import { pages } from '@/config/pages';
import { PROJECT_CATEGORIES, type Project } from '@/data/projects';
import { serviceById } from '@/data/services';
import { useLang } from '@/i18n/context';
import { cn } from '@/lib/cn';

interface ProjectCardProps {
  project: Project;
  /** CSS `sizes` of the cover photo */
  sizes: string;
  /** aspect / height classes of the photo frame */
  frameClassName: string;
  as?: 'h2' | 'h3';
  className?: string;
}

/**
 * Editorial project card. It links to the Projects page with the project open in the viewer
 * (`/projects?project=<slug>`) — on the Projects page itself that only toggles the viewer.
 */
export function ProjectCard({ project, sizes, frameClassName, as: Heading = 'h3', className }: ProjectCardProps) {
  const { t, pick, path } = useLang();

  // One overlay link covers the whole card (photo + details). Its accessible name is exactly the visible title;
  // it sits outside the reveal wrappers, whose transforms would otherwise trap it.
  return (
    <article className={cn('group relative', className)}>
      <Link
        to={`${path(pages.projects.path)}?project=${project.slug}`}
        preventScrollReset
        aria-label={pick(project.name)}
        className="absolute -inset-2 z-10 focus-visible:outline-offset-4"
      />
      <RevealImage className={frameClassName}>
        <div className="absolute inset-0 transition-transform duration-[1600ms] ease-(--ease-brand) group-hover:scale-[1.045]">
          <Picture id={project.cover} alt={pick(project.coverAlt)} sizes={sizes} />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-graphite-deeper/45 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute start-5 top-5 bg-graphite-deeper/75 px-3 py-1.5 backdrop-blur-sm">
          <span className="block numerals text-[0.68rem] tracking-[0.25em] text-gold">{project.code}</span>
        </span>
        <span
          aria-hidden
          className="absolute end-5 bottom-5 grid size-14 scale-75 place-items-center rounded-full bg-gold text-graphite-deeper opacity-0 transition-all duration-500 ease-(--ease-brand) group-hover:scale-100 group-hover:opacity-100 group-has-[a:focus-visible]:scale-100 group-has-[a:focus-visible]:opacity-100"
        >
          <ArrowDiagIcon className="size-5" />
        </span>
      </RevealImage>

      <Reveal
        className="mt-6 flex flex-col gap-4 border-t border-graphite/15 pt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
        delay={0.1}
      >
        <div>
          <Heading className="type-h4 text-graphite transition-colors duration-300 group-hover:text-bronze">{pick(project.name)}</Heading>
          <p className="mt-1.5 text-[0.9rem] text-slate">
            {pick(project.location)}
            <span className="mx-2 text-gold-dark">·</span>
            {pick(PROJECT_CATEGORIES[project.category])}
          </p>
        </div>
        <ul className="flex flex-wrap gap-1.5 sm:max-w-[55%] sm:justify-end" aria-label={t.projects.services}>
          {project.services.map((id) => (
            <li key={id} className="border border-graphite/15 px-2.5 py-1 text-[0.72rem] whitespace-nowrap text-slate">
              {pick(serviceById(id).title)}
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}
