import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import useTheme, { originOf, ROAST_LABEL } from '../../hooks/useTheme';
import { BeanIcon } from './beanIcon';

const MAX_CURSOR_TILT = 14;
const NEAR_RADIUS = 200;
/** Degrees of spin per pixel scrolled — enough that the bean visibly rolls rather than drifts. */
const ROLL_PER_PX = 0.45;
/** Scroll speed (px/s) at which the bean is fully leaned over and glowing. */
const FULL_TILT_VELOCITY = 2200;

/** A 3px-wide annulus, so the conic-gradient renders as a ring rather than a filled disc. */
const RING_MASK = 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))';

/** Shared by the tooltip's rest and revealed states, so hover reads as one settling motion. */
const TOOLTIP_BASE =
  'pointer-events-none absolute right-full mr-4 origin-right rounded-2xl px-4 py-2.5 text-right whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] glass-panel';
const TOOLTIP_REST = '-translate-x-2 rotate-[-9deg] scale-90 opacity-0';
const TOOLTIP_SHOWN =
  'group-hover:translate-x-0 group-hover:rotate-[-3deg] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:rotate-[-3deg] group-focus-visible:scale-100 group-focus-visible:opacity-100';

/**
 * The bean character, and the site's roast switch. It rolls as the page scrolls, leans
 * into the direction of travel, warms up when you scroll fast or bring the cursor close,
 * and wears a ring showing how far through the page you are. Click it to flip the roast:
 * the bean tumbles and the new theme wipes in behind an expanding circle.
 */
export function CoffeeBean() {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { next, toggleTheme } = useTheme();

  const { scrollY, scrollYProgress } = useScroll();

  // Roll: unbounded rotation driven by scroll distance, eased so flicks feel weighty.
  const roll = useSpring(
    useTransform(scrollY, y => y * ROLL_PER_PX),
    { stiffness: 90, damping: 22, restDelta: 0.5 }
  );

  // Lean + stretch: scroll velocity, smoothed so the bean settles instead of jittering.
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 180, damping: 40, restDelta: 2 });
  const lean = useTransform(smoothVelocity, [-FULL_TILT_VELOCITY, 0, FULL_TILT_VELOCITY], [18, 0, -18], { clamp: true });
  const stretch = useTransform(smoothVelocity, v => 1 + Math.min(Math.abs(v) / FULL_TILT_VELOCITY, 1) * 0.12);
  const heat = useTransform(smoothVelocity, v => Math.min(Math.abs(v) / FULL_TILT_VELOCITY, 1));

  // A one-off tumble each time the roast changes.
  const flip = useMotionValue(0);

  // Brew ring: how far down the page you are.
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });
  const progressPct = useTransform(progress, v => `${v * 100}%`);
  const ring = useMotionTemplate`conic-gradient(from 180deg, var(--color-primary-500) ${progressPct}, rgba(194, 120, 91, 0.16) 0)`;

  // Cursor proximity.
  const tiltX = useSpring(0, { stiffness: 120, damping: 14 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 14 });
  const near = useSpring(0, { stiffness: 90, damping: 16 });

  const glow = useTransform([near, heat], ([n, h]: number[]) => 0.12 + Math.max(n, h) * 0.5);
  const scale = useTransform(near, [0, 1], [1, 1.08]);

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const proximity = Math.max(0, 1 - Math.hypot(dx, dy) / NEAR_RADIUS);

      near.set(proximity);
      tiltX.set(proximity > 0 ? (dy / NEAR_RADIUS) * -MAX_CURSOR_TILT * proximity : 0);
      tiltY.set(proximity > 0 ? (dx / NEAR_RADIUS) * MAX_CURSOR_TILT * proximity : 0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion, near, tiltX, tiltY]);

  const switchRoast = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!reducedMotion) animate(flip, flip.get() + 360, { type: 'spring', stiffness: 110, damping: 13 });
    toggleTheme(originOf(event.currentTarget));
  };

  return (
    <div
      ref={wrapperRef}
      className="fixed right-5 bottom-6 z-30 md:right-8 md:bottom-10">
      <motion.button
        type="button"
        onClick={switchRoast}
        aria-label={`Switch to ${ROAST_LABEL[next].toLowerCase()}`}
        className="group relative flex size-14 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none md:size-16"
        style={{ scale: reducedMotion ? 1 : scale }}>
        <motion.span
          aria-hidden="true"
          className="absolute inset-[-28%] rounded-full bg-primary-400 blur-2xl"
          style={{ opacity: reducedMotion ? 0.18 : glow }}
        />

        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ background: ring, maskImage: RING_MASK, WebkitMaskImage: RING_MASK }}
        />

        <motion.span
          aria-hidden="true"
          className="relative block size-8 md:size-9"
          style={{ rotate: reducedMotion ? 0 : lean }}>
          <motion.span
            className="block size-full"
            style={{ rotate: reducedMotion ? 0 : flip }}>
            <motion.span
              className="block size-full drop-shadow-[0_10px_18px_rgba(41,37,36,0.28)]"
              style={reducedMotion ? undefined : { rotate: roll, rotateX: tiltX, rotateY: tiltY, scaleY: stretch }}>
              <BeanIcon className="size-full" />
            </motion.span>
          </motion.span>
        </motion.span>

        <span
          aria-hidden="true"
          className={`${TOOLTIP_BASE} ${TOOLTIP_REST} ${TOOLTIP_SHOWN}`}>
          <span className="block text-[9px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">Switch to</span>
          <span className="block font-serif text-sm text-primary italic">{ROAST_LABEL[next]}</span>
        </span>
      </motion.button>
    </div>
  );
}
