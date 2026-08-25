import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface RevealProps extends React.ComponentProps<typeof motion.div> {
  /** Stagger, in seconds, for siblings revealing as a group. */
  delay?: number;
}

/** Fades content up as it scrolls into view, once. Honours prefers-reduced-motion. */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}>
      {children}
    </motion.div>
  );
}
