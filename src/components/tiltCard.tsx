import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum rotation, in degrees, at the corners of the card. */
  max?: number;
}

/**
 * Tilts its child toward the cursor for a tactile, layered feel (docs/Brand.md §5).
 * Pointer-driven via inline transform so React never re-renders mid-gesture;
 * coarse pointers and reduced-motion users get a plain, flat card.
 */
export function TiltCard({ max = 8, className, children, ...props }: TiltCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const enabled = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el || !enabled()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -2 * max;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * max;
    el.style.transition = '';
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    el.style.transform = '';
  };

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="h-full"
      style={{ perspective: '1200px' }}
      {...props}>
      <div
        ref={innerRef}
        className={cn('h-full', className)}
        style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
