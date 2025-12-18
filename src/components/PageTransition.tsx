import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pageTransitions, getRandomTransition } from '../utils/pageTransitions';
import { initSmoothScroll } from '../utils/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

interface PageTransitionProps {
  children: React.ReactNode;
  transitionType?: 'curtain' | 'elegant' | 'slide' | 'zoom' | 'fade' | 'random';
}

/**
 * Page Transition Wrapper Component
 * Handles smooth page transitions between routes
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  transitionType = 'random' 
}) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousLocation = useRef(location.pathname);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If location changed, trigger transition
    if (previousLocation.current !== location.pathname && previousLocation.current !== '') {
      setIsTransitioning(true);

      // Use simple fade for best performance
      const transition = pageTransitions.simpleFade;

      // Play enter animation
      const timeline = transition.enter(container);
      timeline.eventCallback('onComplete', () => {
        setIsTransitioning(false);
        
        // Refresh ScrollTrigger after transition
        ScrollTrigger.refresh();
      });
    }

    previousLocation.current = location.pathname;
  }, [location.pathname, transitionType]);

  // Initial page load animation and smooth scroll setup
  useEffect(() => {
    // Initialize smooth scroll
    initSmoothScroll();
    
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(container,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`page-transition-container ${isTransitioning ? 'transitioning' : ''}`}
      style={{ willChange: isTransitioning ? 'transform, opacity' : 'auto' }}
    >
      {children}
    </div>
  );
};

/**
 * Scroll Reveal Wrapper Component
 * Reveals children when scrolled into view
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  triggerOnce = true
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Detect mobile for adjusted animations
    const isMobile = window.innerWidth < 768;
    const distance = isMobile ? 30 : 50;

    // Set initial state based on direction
    const initialState: any = { opacity: 0 };
    const animateState: any = { opacity: 1 };

    switch (direction) {
      case 'up':
        initialState.y = distance;
        animateState.y = 0;
        break;
      case 'down':
        initialState.y = -distance;
        animateState.y = 0;
        break;
      case 'left':
        initialState.x = distance;
        animateState.x = 0;
        break;
      case 'right':
        initialState.x = -distance;
        animateState.x = 0;
        break;
      case 'scale':
        initialState.scale = 0.95;
        animateState.scale = 1;
        break;
      case 'fade':
        // Already set opacity
        break;
    }

    gsap.fromTo(element, initialState, {
      ...animateState,
      duration: 0.5,
      delay: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 92%',
        toggleActions: triggerOnce ? 'play none none none' : 'play reverse play reverse'
      }
    });
  }, [direction, delay, duration, triggerOnce]);

  return (
    <div ref={ref} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
};

/**
 * Parallax Scroll Component
 * Creates parallax effect on scroll
 */
interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  speed = 0.5,
  direction = 'vertical'
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = direction === 'vertical'
      ? { y: () => -(window.scrollY * speed) }
      : { x: () => -(window.scrollY * speed) };

    gsap.to(element, {
      ...animation,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, [speed, direction]);

  return (
    <div ref={ref} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
};

/**
 * Stagger Reveal Component
 * Reveals children with stagger effect
 */
interface StaggerRevealProps {
  children: React.ReactNode;
  staggerDelay?: number;
  duration?: number;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  staggerDelay = 0.1,
  duration = 0.6
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.children;
    const isMobile = window.innerWidth < 768;

    gsap.fromTo(items,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [staggerDelay, duration]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

/**
 * Magnetic Button Component
 * Button that follows cursor with magnetic effect
 */
interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  className = '',
  onClick
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    // Disable magnetic effect on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      style={{ willChange: 'transform' }}
    >
      {children}
    </button>
  );
};

/**
 * Text Reveal Animation Component
 * Animates text character by character
 */
interface TextRevealProps {
  children: string;
  stagger?: number;
  className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  stagger = 0.03,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const chars = element.querySelectorAll('.char');

    gsap.fromTo(chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [stagger]);

  const chars = children.split('').map((char, i) => (
    <span key={i} className="char" style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {chars}
    </div>
  );
};
