import { m } from 'framer-motion';
import { site } from '@/config/site';
import { useLang } from '@/i18n/context';
import { EASE, EASE_CURTAIN } from '@/lib/motion';

/**
 * Location panel. With an office map embed configured (site.location.mapEmbedUrl) it shows the live map;
 * until then, an abstract surveyor's "site reference" for the city — clearly not a street map.
 */
export function SiteReference({ north, title }: { north: string; title: string }) {
  const { pick } = useLang();

  if (site.location.mapEmbedUrl) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        <iframe
          src={site.location.mapEmbedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0 contrast-[1.05] grayscale-[0.6]"
        />
      </div>
    );
  }

  return (
    <m.div
      className="relative aspect-square overflow-hidden border border-gold/20 bg-graphite-deep sm:aspect-[4/3]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div aria-hidden className="absolute inset-0 draft-grid opacity-80" />
      <svg aria-hidden viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" fill="none">
        {/* valley and main roads — abstract, not to scale */}
        <m.path
          d="M170 -10C130 120 220 220 160 330S90 520 150 610"
          stroke="rgb(212 175 55 / 0.16)"
          strokeWidth="14"
          strokeLinecap="round"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 2.2, ease: EASE } } }}
        />
        <m.path
          d="M60 560 740 40"
          stroke="rgb(236 233 227 / 0.14)"
          strokeWidth="2"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.8, ease: EASE, delay: 0.2 } } }}
        />
        <m.path
          d="M-10 350C200 330 420 310 810 250"
          stroke="rgb(236 233 227 / 0.12)"
          strokeWidth="2"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.8, ease: EASE, delay: 0.35 } } }}
        />
        <path d="M-10 150H810M-10 470H810M260 -10V610M560 -10V610" stroke="rgb(236 233 227 / 0.05)" strokeWidth="1" />
        {/* survey rings */}
        {[70, 140, 210].map((r, i) => (
          <m.circle
            key={r}
            cx="400"
            cy="300"
            r={r}
            stroke="rgb(212 175 55 / 0.28)"
            strokeWidth="1"
            strokeDasharray={i === 1 ? '0' : '5 7'}
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE_CURTAIN, delay: 0.3 + i * 0.12 } },
            }}
            style={{ transformOrigin: '400px 300px' }}
          />
        ))}
        <path d="M400 60V540M160 300H640" stroke="rgb(212 175 55 / 0.22)" strokeDasharray="8 8" />
        {/* scale bar */}
        <path d="M48 552h120M48 546v12M88 548v8M128 548v8M168 546v12" stroke="rgb(236 233 227 / 0.35)" />
      </svg>

      {/* north arrow */}
      <div aria-hidden className="absolute end-6 top-6 flex flex-col items-center gap-1 text-gold">
        <svg viewBox="0 0 20 28" className="h-7 w-5" fill="currentColor">
          <path d="M10 0 19 26 10 20 1 26Z" opacity="0.9" />
        </svg>
        <span className="text-[0.7rem] font-semibold">{north}</span>
      </div>

      {/* the pin */}
      <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2">
        <span aria-hidden className="absolute -inset-5 animate-wa-pulse rounded-full bg-gold/40" />
        <span
          aria-hidden
          className="relative block size-4 rounded-full border-2 border-graphite-deep bg-gold shadow-[0_0_0_6px_rgb(212_175_55/0.2)]"
        />
      </div>
      <m.div
        className="absolute start-1/2 top-1/2 ms-6 -mt-14 border border-gold/30 bg-graphite-deeper/85 px-4 py-2.5 backdrop-blur-sm"
        variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.9 } } }}
      >
        <p className="font-display text-base text-stone">{pick(site.location.city)}</p>
        <p className="mt-0.5 text-[0.7rem] text-gold/80">{pick(site.location.coordinates)}</p>
      </m.div>
    </m.div>
  );
}
