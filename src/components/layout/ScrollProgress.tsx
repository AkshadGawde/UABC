import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll Progress Bar
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 to-accent-500 origin-left z-[100] hidden md:block"
      style={{ scaleX }}
    />
  );
};
