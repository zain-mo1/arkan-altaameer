import type { ReactNode } from 'react';
import { Picture } from '@/components/ui/Picture';
import { RevealImage } from '@/components/ui/Reveal';
import type { MediaKey } from '@/data/media.generated';
import { cn } from '@/lib/cn';

interface FramedImageProps {
  id: MediaKey;
  alt: string;
  sizes: string;
  /** aspect / height classes of the photo frame */
  frameClassName?: string;
  /** which way the offset drafting frame is pushed */
  offset?: 'end' | 'start';
  tone?: 'light' | 'dark';
  delay?: number;
  className?: string;
  imgClassName?: string;
  /** overlay content (captions, badges) drawn above the photo */
  children?: ReactNode;
}

/** Photo with the offset hairline frame used across the site (echoes a drawing sheet's border). */
export function FramedImage({
  id,
  alt,
  sizes,
  frameClassName = 'aspect-[4/5]',
  offset = 'end',
  tone = 'light',
  delay = 0,
  className,
  imgClassName,
  children,
}: FramedImageProps) {
  return (
    <div className={cn('relative', className)}>
      <div
        aria-hidden
        className={cn(
          'absolute -inset-3 translate-y-5 border sm:-inset-4',
          offset === 'end' ? 'translate-x-[calc(var(--dir)*1.25rem)]' : 'translate-x-[calc(var(--dir)*-1.25rem)]',
          tone === 'light' ? 'border-gold-dark/35' : 'border-gold/30',
        )}
      />
      <RevealImage className={cn('bg-graphite', frameClassName)} delay={delay}>
        <Picture id={id} alt={alt} sizes={sizes} imgClassName={imgClassName} />
        {children}
      </RevealImage>
    </div>
  );
}
