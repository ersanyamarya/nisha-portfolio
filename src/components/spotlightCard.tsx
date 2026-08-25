import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: number;
  color?: string;
}

/** A glass surface with a pointer-following radial glow — CSS custom properties only, no re-render. */
export function SpotlightCard({ radius = 320, color = 'rgba(194, 120, 91, 0.25)', className, children, ...props }: SpotlightCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    overlayRef.current?.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    overlayRef.current?.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onPointerMove={handleMove}
      onPointerEnter={() => overlayRef.current?.style.setProperty('opacity', '1')}
      onPointerLeave={() => overlayRef.current?.style.setProperty('opacity', '0')}
      {...props}>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 motion-reduce:hidden"
        style={{ background: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 70%)` }}
      />
      {children}
    </div>
  );
}
