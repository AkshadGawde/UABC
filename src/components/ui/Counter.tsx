import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animated Counter Component
 */
export const Counter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const node = nodeRef.current;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const value = Math.floor(progress * (to - from) + from);
      node.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
};
