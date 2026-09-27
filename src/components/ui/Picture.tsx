import { useCallback, useState, type CSSProperties } from 'react';
import { media, type MediaKey } from '@/data/media.generated';
import { publicUrl } from '@/lib/assets';
import { cn } from '@/lib/cn';

const file = (id: string, w: number, ext: 'avif' | 'webp') => publicUrl(`media/${id}-${w}.${ext}`);

/**
 * Static previews (`npm run build:artifact`) ship a reduced set — WebP only, at most two widths per photo —
 * to stay within the preview host's file limits. Keep in sync with scripts/build-artifact.mjs.
 */
const PREVIEW = import.meta.env.MODE === 'artifact';
const previewWidths = (widths: readonly number[]) => {
  const small = widths.filter((w) => w <= 1000).at(-1) ?? widths[0];
  const large = widths.filter((w) => w <= 2000).at(-1) ?? widths[widths.length - 1];
  return small === large ? [small] : [small, large];
};

interface PictureProps {
  id: MediaKey;
  alt: string;
  /** e.g. "100vw" or "(min-width: 1024px) 40vw, 100vw" */
  sizes: string;
  /** above-the-fold image: eager + high fetch priority */
  priority?: boolean;
  /** absolutely fill the nearest positioned parent (default) — otherwise the wrapper is relative */
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  /** overrides the focal point from the media manifest (CSS object-position) */
  position?: string;
  style?: CSSProperties;
  onLoad?: () => void;
}

/**
 * Responsive, art-directed photo.
 * AVIF → WebP sources, dominant-colour background and a blurred preview that fades out once loaded.
 */
export function Picture({ id, alt, sizes, priority, fill = true, className, imgClassName, position, style, onLoad }: PictureProps) {
  const asset = media[id];
  const [loaded, setLoaded] = useState(false);
  const focal = position ?? asset.focal;

  const markLoaded = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // Cached images may be complete before React attaches onLoad
  const ref = useCallback(
    (img: HTMLImageElement | null) => {
      if (img?.complete && img.naturalWidth > 0) markLoaded();
    },
    [markLoaded],
  );

  const widths = PREVIEW ? previewWidths(asset.widths) : asset.widths;
  const srcSet = (ext: 'avif' | 'webp') => widths.map((w) => `${file(id, w, ext)} ${w}w`).join(', ');
  const fallback = widths.find((w) => w >= 1080) ?? widths[widths.length - 1];

  return (
    <div
      className={cn(fill ? 'absolute inset-0' : 'relative', 'overflow-hidden', className)}
      style={{ backgroundColor: asset.color, ...style }}
    >
      <div
        aria-hidden
        className={cn('absolute inset-0 scale-110 bg-cover blur-xl transition-opacity duration-700', loaded ? 'opacity-0' : 'opacity-100')}
        style={{ backgroundImage: `url(${asset.lqip})`, backgroundPosition: focal }}
      />
      <picture>
        {!PREVIEW && <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />}
        <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
        <img
          ref={ref}
          src={file(id, fallback, 'webp')}
          width={asset.w}
          height={asset.h}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
          onLoad={markLoaded}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
          style={{ objectPosition: focal }}
        />
      </picture>
    </div>
  );
}
