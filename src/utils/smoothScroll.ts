/**
 * Ultra-smooth scroll configuration for professional experience
 */

export const initSmoothScroll = () => {
  // Enable smooth scrolling globally
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Optimize scroll performance
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    html {
      scroll-behavior: smooth;
      overflow-x: hidden;
    }
    
    body {
      overflow-x: hidden;
      overscroll-behavior-y: none;
    }
    
    /* Smooth scroll for all devices */
    @media (prefers-reduced-motion: no-preference) {
      html {
        scroll-behavior: smooth;
      }
      
      * {
        scroll-behavior: smooth;
      }
    }
    
    /* Enhanced smoothness for webkit browsers */
    @supports (-webkit-overflow-scrolling: touch) {
      body {
        -webkit-overflow-scrolling: touch;
      }
    }
    
    /* Prevent layout shifts */
    img, video, iframe {
      max-width: 100%;
      height: auto;
    }
    
    /* GPU acceleration for transforms */
    .will-change-transform {
      will-change: transform;
      transform: translateZ(0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
    
    /* Smooth transitions for interactive elements */
    a, button {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Mobile scroll optimization */
    @media (max-width: 768px) {
      html {
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      
      body {
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
      }
      
      * {
        -webkit-tap-highlight-color: transparent;
      }
    }
    
    /* Prevent flash of unstyled content */
    .page-transition-container {
      min-height: 100vh;
    }
    
    /* Loading state optimization */
    [data-loading="true"] {
      pointer-events: none;
      opacity: 0.7;
    }
  `;
  
  document.head.appendChild(style);
};

/**
 * Smooth scroll to element with offset
 */
export const smoothScrollTo = (element: HTMLElement | null, offset: number = 80) => {
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

/**
 * Smooth scroll to top
 */
export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Lock scroll (for modals/overlays)
 */
export const lockScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

/**
 * Unlock scroll
 */
export const unlockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

/**
 * Debounced scroll handler for performance
 */
export const createScrollHandler = (callback: () => void, delay: number = 100) => {
  let timeoutId: NodeJS.Timeout;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};
