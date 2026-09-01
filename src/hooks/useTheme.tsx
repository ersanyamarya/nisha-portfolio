import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

/** How the two modes are named in the UI — light roast and dark roast. */
export const ROAST_LABEL: Record<Theme, string> = { light: 'Light roast', dark: 'Dark roast' };

const STORAGE_KEY = 'theme';
const WIPE_DURATION = 620;

export type WipeOrigin = { x: number; y: number };

/**
 * The `dark` class on <html> is the single source of truth — the same thing the
 * pre-hydration script in gatsby-ssr sets — so every control on the page reads the
 * theme from one place and none of them can drift out of sync.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
const getServerSnapshot = (): Theme => 'light';

/** The centre of an element, for a wipe that starts from the control you clicked. */
export function originOf(el: Element | null): WipeOrigin | undefined {
  if (!el) return undefined;
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/**
 * Swaps the theme behind an expanding circle centred on the control. Browsers without
 * the View Transition API (Firefox today) just get the swap, cushioned by the colour
 * transitions already on <body>; so do people who asked for reduced motion.
 */
function applyTheme(next: Theme, origin?: WipeOrigin) {
  const commit = () => {
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the theme still applies for this session */
    }
  };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !origin || typeof document.startViewTransition !== 'function') {
    commit();
    return;
  }

  document
    .startViewTransition(commit)
    .ready.then(() => {
      const { x, y } = origin;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: WIPE_DURATION, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    })
    // `ready` rejects when the transition is skipped (a second click mid-wipe, a hidden
    // tab). The swap has already committed by then — only the wipe is lost.
    .catch(() => {});
}

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  const toggleTheme = useCallback((origin?: WipeOrigin) => applyTheme(next, origin), [next]);

  return { theme, next, toggleTheme };
}
