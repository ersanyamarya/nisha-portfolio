import { Link } from 'gatsby';
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Renders on the dark footer plate, where the wordmark inverts to Oat Milk. */
  inverted?: boolean;
}

/**
 * The wordmark: a minimalist Playfair "Nisha." with a terracotta full stop.
 * Per docs/Brand.md §5 the logo stays strictly typographic — the coffee bean
 * character does the thematic lifting elsewhere in the UI.
 */
export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Nisha Kumari — home"
      className={cn(
        'inline-flex min-h-11 items-center font-serif text-2xl font-medium tracking-tight transition-colors',
        inverted ? 'text-default-50' : 'text-foreground hover:text-primary',
        className
      )}>
      Nisha<span className="text-primary">.</span>
    </Link>
  );
}
