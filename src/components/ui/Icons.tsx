import type { SVGProps } from 'react';
import type { SocialId } from '@/config/site';
import { cn } from '@/lib/cn';

type IconProps = SVGProps<SVGSVGElement>;

const line = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  'aria-hidden': true,
  ...props,
});

const solid = (props: IconProps) => ({ viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, ...props });

/* ---------- UI ---------- */

/** Points toward the reading direction's end (→ in English, ← in Arabic). */
export const ArrowIcon = ({ className, ...p }: IconProps) => (
  <svg {...line(p)} className={cn('rtl:-scale-x-100', className)}>
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
);

export const ArrowDiagIcon = ({ className, ...p }: IconProps) => (
  <svg {...line(p)} className={cn('rtl:-scale-x-100', className)}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const ArrowUpIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M12 20V4M6 10l6-6 6 6" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...line({ strokeLinecap: 'round', strokeLinejoin: 'round', ...p })}>
    <path d="M21 16.4v2.9a1.9 1.9 0 0 1-2.1 1.9 18.9 18.9 0 0 1-8.2-2.9 18.6 18.6 0 0 1-5.7-5.7A18.9 18.9 0 0 1 2.1 4.3 1.9 1.9 0 0 1 4 2.2h2.9a1.9 1.9 0 0 1 1.9 1.6c.1.9.4 1.8.7 2.7a1.9 1.9 0 0 1-.4 2L7.8 9.8a15.2 15.2 0 0 0 5.7 5.7l1.3-1.3a1.9 1.9 0 0 1 2-.4c.9.3 1.8.6 2.7.7a1.9 1.9 0 0 1 1.5 1.9Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M3.5 5.5h17v13h-17z" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...line({ strokeLinejoin: 'round', ...p })}>
    <path d="M12 21.2s-7-6.1-7-11.6a7 7 0 0 1 14 0c0 5.5-7 11.6-7 11.6Z" />
    <path d="M12 12.1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const ChevronIcon = ({ className, ...p }: IconProps) => (
  <svg {...line(p)} className={cn('rtl:-scale-x-100', className)}>
    <path d="m9.5 6 6 6-6 6" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M12 4.5v15M4.5 12h15" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <circle cx="10.5" cy="10.5" r="6.25" />
    <path d="m15.2 15.2 5.3 5.3" />
  </svg>
);

export const UploadIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M12 15.5V4M7.5 8.5 12 4l4.5 4.5M4 14.5v5.5h16v-5.5" />
  </svg>
);

export const FileIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M6 3h8.5L19 7.5V21H6z" />
    <path d="M14 3v5h5M9 13h7M9 16.5h5" />
  </svg>
);

export const TimeIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const ExpandIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);

export const AlertIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v5.5M12 16v.6" />
  </svg>
);

/* ---------- "Why Arkan" — architectural line icons (40×40 grid) ---------- */

const arch = (props: IconProps) => ({
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinejoin: 'miter' as const,
  'aria-hidden': true,
  ...props,
});

/** Execution quality — cut gem */
export const QualityIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M9 15 14.5 8h11L31 15 20 32 9 15Z" />
    <path d="M9 15h22M14.5 8 17 15l3 17M25.5 8 23 15l-3 17M17 15l3-7 3 7" />
  </svg>
);

/** Hands-on expertise — safety helmet */
export const HelmetIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M7 27h26M9 27v-3.5C9 16.6 13.9 11 20 11s11 5.6 11 12.5V27" />
    <path d="M16.5 11.6V19M23.5 11.6V19M18 11h4v-2.5h-4V11Z" />
    <path d="M5 30h30" />
  </svg>
);

/** Attention to detail — drafting set square */
export const SetSquareIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M8 32V8l24 24H8Z" />
    <path d="M13 27v-7.5l7.5 7.5H13Z" />
    <path d="M8 12h3M8 16h2M8 20h3M8 24h2M12 32v-3M16 32v-2M20 32v-3M24 32v-2" />
  </svg>
);

/** On-time delivery — clock */
export const ClockIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <circle cx="20" cy="20" r="12.5" />
    <path d="M20 12.5V20l5 3.5M20 5v2.5M20 32.5V35M5 20h2.5M32.5 20H35" />
  </svg>
);

/** Integrated solutions — stacked layers */
export const LayersIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M20 7 34 14.5 20 22 6 14.5 20 7Z" />
    <path d="m6 20.5 14 7.5 14-7.5M6 26.5 20 34l14-7.5" />
  </svg>
);

/** Vision — eye */
export const EyeIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M4 20c4.6-6.8 10-10.2 16-10.2S31.4 13.2 36 20c-4.6 6.8-10 10.2-16 10.2S8.6 26.8 4 20Z" />
    <circle cx="20" cy="20" r="5.5" />
    <path d="M20 4v3M20 33v3" />
  </svg>
);

/** Mission — drafting compass */
export const CompassIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <circle cx="20" cy="9.5" r="2.5" />
    <path d="M20 4v3M18.9 11.8 12 35M21.1 11.8 28 35M14.3 27.5h11.4" />
  </svg>
);

/** Reliability — shield */
export const ShieldIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M20 5 32 9.5V19c0 7.4-4.9 12.6-12 16-7.1-3.4-12-8.6-12-16V9.5L20 5Z" />
    <path d="m14.5 19.5 4 4 7.5-8" />
  </svg>
);

/** Precise execution — ruler */
export const RulerIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M5 29 29 5l6 6-24 24-6-6Z" />
    <path d="m10.5 23.5 3 3M14.5 19.5l2 2M18.5 15.5l3 3M22.5 11.5l2 2M26.5 7.5l3 3" />
  </svg>
);

/** Handover — key */
export const KeyIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <circle cx="12.5" cy="20" r="6.5" />
    <path d="M19 20h16M30.5 20v5M25.5 20v3.5" />
  </svg>
);

/** One team — people */
export const TeamIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <circle cx="20" cy="13" r="4.5" />
    <path d="M11.5 32c0-4.9 3.8-8.8 8.5-8.8s8.5 3.9 8.5 8.8" />
    <circle cx="9" cy="17" r="3" />
    <circle cx="31" cy="17" r="3" />
    <path d="M3.5 29c0-3.5 2.4-6 5.5-6M36.5 29c0-3.5-2.4-6-5.5-6" />
  </svg>
);

/** Schedule — calendar */
export const CalendarIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M6 9h28v25H6z" />
    <path d="M6 16h28M13 5v7M27 5v7M11 22h4M18 22h4M25 22h4M11 28h4M18 28h4" />
  </svg>
);

/** Transparency — conversation */
export const MessageIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M6 8h28v19H17.5L10 33v-6H6V8Z" />
    <path d="M12 15h16M12 20.5h10" />
  </svg>
);

/** Plans — drawing sheet */
export const PlanIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M6 7h28v26H6z" />
    <path d="M6 26h28M24 26v7M11 12h9v9h-9zM24 12h6M24 16.5h6M24 21h4" />
  </svg>
);

/** Materials — layered samples */
export const SwatchIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M7 11h18v22H7z" />
    <path d="M11 7h18v4M15 3h18v22h-4" />
    <path d="M7 27h18" />
  </svg>
);

/** Lighting — ceiling light */
export const LightIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M4 8h32" />
    <path d="M13 8v3.5h14V8" />
    <path d="M20 16v6M13.5 15l-3 4.5M26.5 15l3 4.5M9 25.5l-2.5 1.5M31 25.5l2.5 1.5M20 26v9" />
  </svg>
);

/** Moisture resistant — droplet */
export const DropIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M20 5c5.3 7.1 9.5 12.3 9.5 17.5a9.5 9.5 0 0 1-19 0C10.5 17.3 14.7 12.1 20 5Z" />
    <path d="M15.5 23.5a4.5 4.5 0 0 0 4.5 4.5" />
  </svg>
);

/** Clean installation — sparkle */
export const SparkleIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M18 6c.9 6.6 3.4 9.1 10 10-6.6.9-9.1 3.4-10 10-.9-6.6-3.4-9.1-10-10 6.6-.9 9.1-3.4 10-10Z" />
    <path d="M30 24c.4 2.9 1.5 4 4.5 4.5-3 .4-4.1 1.5-4.5 4.5-.4-3-1.5-4.1-4.5-4.5 3-.5 4.1-1.6 4.5-4.5Z" />
  </svg>
);

/** Structure — building frame */
export const BuildingIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M8 34V12l12-6 12 6v22" />
    <path d="M4 34h32M14 17h4M22 17h4M14 23h4M22 23h4M17 34v-6h6v6" />
  </svg>
);

/** Space — room in perspective */
export const SpaceIcon = (p: IconProps) => (
  <svg {...arch(p)}>
    <path d="M5 5h30v30H5z" />
    <path d="M13 13h14v14H13zM5 5l8 8M35 5l-8 8M5 35l8-8M35 35l-8-8" />
  </svg>
);

/* ---------- Brand marks ---------- */

/** The four-square window from the Arkan symbol. */
export const WindowMark = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...p}>
    <rect x="0" y="0" width="7" height="7" />
    <rect x="9" y="0" width="7" height="7" />
    <rect x="0" y="9" width="7" height="7" />
    <rect x="9" y="9" width="7" height="7" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...solid(p)}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const InstagramIcon = (p: IconProps) => (
  <svg {...solid(p)}>
    <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
  </svg>
);

const XIcon = (p: IconProps) => (
  <svg {...solid(p)}>
    <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
  </svg>
);

const LinkedInIcon = (p: IconProps) => (
  <svg {...solid(p)}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TikTokIcon = (p: IconProps) => (
  <svg {...solid(p)}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const SOCIAL = { instagram: InstagramIcon, x: XIcon, linkedin: LinkedInIcon, tiktok: TikTokIcon } satisfies Record<SocialId, unknown>;

/** Brand glyph for a social network id. */
export function SocialIcon({ id, ...props }: IconProps & { id: SocialId }) {
  const Icon = SOCIAL[id];
  return <Icon {...props} />;
}
