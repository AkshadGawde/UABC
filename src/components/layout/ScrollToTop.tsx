import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls to top when route changes
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    // Fallback: ensure scroll happens even in edge cases
    const scrollToTopTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(scrollToTopTimeout);
  }, [pathname]);

  return null;
};