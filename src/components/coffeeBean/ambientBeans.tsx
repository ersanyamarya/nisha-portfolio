import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import React from 'react';
import { BeanIcon } from './beanIcon';

/** Each bean drifts at its own depth (px of parallax per px scrolled), so the layer
 *  parallaxes rather than sliding as one plane. */
const BEANS = [
  { top: '18%', left: '6%', size: 'size-10', depth: -0.12, rotate: -18, duration: '7s', opacity: 'opacity-40' },
  { top: '60%', left: '4%', size: 'size-16', depth: -0.22, rotate: 24, duration: '9s', opacity: 'opacity-35' },
  { top: '8%', right: '16%', size: 'size-20', depth: -0.18, rotate: 12, duration: '8s', opacity: 'opacity-30' },
  { top: '92%', right: '28%', size: 'size-12', depth: -0.3, rotate: -32, duration: '6.5s', opacity: 'opacity-30' },
];

/**
 * A slow-drifting field of coffee beans across the page — the ambient half of the
 * spatial storytelling in docs/Brand.md §5. Purely decorative; the interactive
 * `CoffeeBean` character stays the foreground actor. With reduced motion, the
 * beans stay put (no parallax, no float) rather than disappearing.
 *
 * z-20 puts them above the page content (z-10) so they read over the hero's crosshatch
 * and glass panels, and below the bean control (z-30) and nav (z-40).
 */
export function AmbientBeans() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const progress = useSpring(scrollY, { stiffness: 60, damping: 20, restDelta: 0.5 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {BEANS.map(bean => (
        <Bean
          key={`${bean.top}-${bean.size}`}
          progress={progress}
          reducedMotion={!!reducedMotion}
          {...bean}
        />
      ))}
    </div>
  );
}

type BeanProps = (typeof BEANS)[number] & { progress: ReturnType<typeof useSpring>; reducedMotion: boolean };

function Bean({ progress, depth, top, left, right, size, rotate, duration, opacity, reducedMotion }: BeanProps & { left?: string; right?: string }) {
  const y = useTransform(progress, v => v * depth);

  return (
    <motion.div
      className="absolute"
      style={{ top, left, right, y: reducedMotion ? 0 : y, rotate }}>
      <div
        className={`${size} ${opacity} blur-[1px]`}
        style={reducedMotion ? undefined : { animation: `float ${duration} ease-in-out infinite` }}>
        <BeanIcon className="size-full" />
      </div>
    </motion.div>
  );
}
