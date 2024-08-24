import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface WordRotateProps extends React.HTMLAttributes<HTMLDivElement> {
  words: string[];
}

export function WordRotate({ words, ...props }: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 50, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: -50, rotateX: 90 }}
        transition={{ duration: 0.5 }}
        className="absolute mx-2">
        <span {...props}>{words[index]}</span>
      </motion.span>
    </AnimatePresence>
  );
}
