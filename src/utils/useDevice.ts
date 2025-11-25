import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// Hook to detect mobile by width and touch support
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < breakpoint : false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
};

// Hook to detect if user prefers reduced motion (or if we explicitly want to reduce on mobile)
export const useShouldReduceMotion = (forceReduceOnMobile = true) => {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  return reduced || (forceReduceOnMobile && isMobile);
};
