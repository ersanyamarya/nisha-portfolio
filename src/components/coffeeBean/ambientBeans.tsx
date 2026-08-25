import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import React from 'react';
import { BeanIcon } from './beanIcon';

/** Each bean drifts at its own depth, so the layer parallaxes rather than sliding as one plane. */
const BEANS = [
  { top: '18%', left: '6%', size: 'size-10', depth: -120, rotate: -18, duration: '7s', opacity: 'opacity-[0.16]' },
  { top: '64%', left: '3%', size: 'size-16', depth: -220, rotate: 24, duration: '9s', opacity: 'opacity-[0.10]' },
  { top: '32%', right: '5%', size: 'size-20', depth: -180, rotate: 12, duration: '8s', opacity: 'opacity-[0.12]' },
  { top: '78%', right: '9%', size: 'size-12', depth: -300, rotate: -32, duration: '6.5s', opacity: 'opacity-[0.14]' },
];

/**
 * A slow-drifting field of coffee beans behind the page — the ambient half of the
 * spatial storytelling in docs/Brand.md §5. Purely decorative and reduced-motion safe;
 * the interactive `CoffeeBean` character stays the foreground actor.
 */
export function AmbientBeans() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {BEANS.map(bean => (
        <Bean
          key={`${bean.top}-${bean.size}`}
          progress={progress}
          {...bean}
        />
      ))}
    </div>
  );
}

type BeanProps = (typeof BEANS)[number] & { progress: ReturnType<typeof useSpring> };

function Bean({ progress, depth, top, left, right, size, rotate, duration, opacity }: BeanProps & { left?: string; right?: string }) {
  const y = useTransform(progress, [0, 1], [0, depth]);

  return (
    <motion.div
      className="absolute"
      style={{ top, left, right, y, rotate }}>
      <div
        className={`${size} ${opacity} blur-[1px]`}
        style={{ animation: `float ${duration} ease-in-out infinite` }}>
        <BeanIcon className="size-full" />
      </div>
    </motion.div>
  );
}
