import React from 'react';
import { cn } from '@/lib/utils';

interface HatchBackgroundProps {
  className?: string;
  /** 0-1 viewport-relative focal point the crosshatch glints build up around. */
  focalPoint?: { x: number; y: number };
}

/**
 * An engraved-plate ambient background: crosshatched hairlines that thin to blank paper
 * near the focal point's opposite side (kept clear for headline copy), with a slow warm
 * glow breathing at the focal point itself. Decorative only — aria-hidden, reduced-motion safe.
 */
export function HatchBackground({ className, focalPoint = { x: 0.78, y: 0.4 } }: HatchBackgroundProps) {
  const focalPct = `${focalPoint.x * 100}% ${focalPoint.y * 100}%`;

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        // Lighter on narrow screens, where the headline sits over the focal point
        // instead of beside it and the hatching would compete with the copy.
        className="absolute inset-0 opacity-25 md:opacity-45 dark:opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(-45deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 12px)',
          maskImage: `radial-gradient(ellipse 65% 85% at ${focalPct}, black 0%, black 35%, transparent 72%)`,
          WebkitMaskImage: `radial-gradient(ellipse 65% 85% at ${focalPct}, black 0%, black 35%, transparent 72%)`,
        }}
      />
      <div
        className="absolute size-[560px] animate-[ring-pulse_8s_ease-in-out_infinite] rounded-full opacity-60 motion-reduce:animate-none"
        style={{
          left: `calc(${focalPct.split(' ')[0]} - 280px)`,
          top: `calc(${focalPct.split(' ')[1]} - 280px)`,
          background: 'radial-gradient(circle at 50% 50%, var(--color-primary-300) 0%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />
    </div>
  );
}
