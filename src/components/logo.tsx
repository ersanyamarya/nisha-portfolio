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
        inverted ? 'text-default-50' : 'text-foreground hover:text-primary-700 dark:hover:text-primary-300',
        className
      )}>
      {/* Bare `text-primary` reads as accent text here, not a fill — since the
          global `--color-primary` recolor (see layout.css) exists to clear
          AAA for text sitting ON a solid primary fill, the bare token alone
          fails AA outright as foreground text on the page background
          (2.12:1). -700/-300 restore the light/dark pairing this needs — but
          keyed off `inverted`, not the `dark:` variant: `inverted` means "on
          the footer's always-dark plate" regardless of site theme, while
          `dark:` tracks the site theme. Using `dark:` here made the dot
          nearly invisible (2.40:1) on the footer plate within a light-themed
          page, where `dark:` never activates. */}
      Nisha<span className={inverted ? 'text-primary-300' : 'text-primary-700 dark:text-primary-300'}>.</span>
    </Link>
  );
}
