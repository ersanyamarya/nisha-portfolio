/**
 * Every color used across the case-study component kit funnels through this one map,
 * onto the site's actual theme scales (primary/secondary/success/default in layout.css) —
 * never raw Tailwind palette classes (red-*, green-*, blue-*...), which don't exist here
 * since the theme resets `--color-*` to start from a clean slate.
 */
export type Tone = 'primary' | 'secondary' | 'success' | 'default';

export const TONE_SURFACE: Record<Tone, string> = {
  primary: 'bg-primary-50 border-primary-200 text-primary-900',
  secondary: 'bg-secondary-50 border-secondary-200 text-secondary-900',
  success: 'bg-success-50 border-success-200 text-success-900',
  default: 'bg-default-100 border-default-200 text-default-700',
};

export const TONE_SOLID: Record<Tone, string> = {
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-200',
  secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-200',
  success: 'bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-200',
  default: 'bg-muted text-muted-foreground',
};

export const TONE_TEXT: Record<Tone, string> = {
  primary: 'text-primary-700 dark:text-primary-300',
  // -700 on the tinted secondary-50 panel (FeedbackCallout) clears AA but was
  // only 7.26:1 in light / 7.11:1 in dark — both technically past AAA (7:1)
  // but with no margin to spare. -200 restores real headroom (10.32:1 dark).
  secondary: 'text-secondary-700 dark:text-secondary-200',
  // -700 on the tinted success-50 panel (FeedbackCallout, light mode) was
  // 6.23:1 — missed AAA (7:1). -800 clears it (8.70:1); the same swap is safe
  // for this map's other consumer (a large 2xl stat number on plain
  // background, projects/index.tsx), which only needs 4.5:1 as large text.
  success: 'text-success-800 dark:text-success-300',
  default: 'text-muted-foreground',
};

export const TONE_DOT: Record<Tone, string> = {
  primary: 'bg-primary-200 border-primary-400',
  secondary: 'bg-secondary-200 border-secondary-400',
  success: 'bg-success-200 border-success-400',
  default: 'bg-default-200 border-default-400',
};

export const TONE_GRADIENT_FROM: Record<Tone, string> = {
  primary: 'from-primary-900/85',
  secondary: 'from-secondary-900/85',
  success: 'from-success-900/85',
  default: 'from-default-900/85',
};
