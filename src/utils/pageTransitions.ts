import gsap from 'gsap';

/**
 * Lightweight, performance-optimized page transitions
 * Using only opacity and transform for GPU acceleration
 */

export const pageTransitions = {
  // Simple fade - fastest and smoothest
  simpleFade: {
    leave: (container: HTMLElement) => {
      return gsap.to(container, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut'
      });
    },
    enter: (container: HTMLElement) => {
      return gsap.fromTo(container,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  },

  // Elegant fade with subtle movement
  elegantFade: {
    leave: (container: HTMLElement) => {
      return gsap.to(container, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    },
    enter: (container: HTMLElement) => {
      return gsap.fromTo(container,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  },

  // Slide transition
  slideAndFade: {
    leave: (container: HTMLElement) => {
      return gsap.to(container, {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    },
    enter: (container: HTMLElement) => {
      return gsap.fromTo(container,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  },

  // Scale transition
  scaleTransition: {
    leave: (container: HTMLElement) => {
      return gsap.to(container, {
        opacity: 0,
        scale: 0.97,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    },
    enter: (container: HTMLElement) => {
      return gsap.fromTo(container,
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }
};

/**
 * Scroll-based animations - optimized for performance
 */
export const scrollAnimations = {
  // Parallax elements
  initParallax: (elements: NodeListOf<Element>) => {
    elements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
      
      gsap.to(el, {
        y: (i, target) => {
          const rect = target.getBoundingClientRect();
          return -(rect.top * speed);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  },

  // Reveal on scroll
  initRevealOnScroll: (elements: NodeListOf<Element>) => {
    elements.forEach((el, index) => {
      gsap.fromTo(el,
        { 
          opacity: 0, 
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  },

  // Stagger fade in
  initStaggerFade: (container: Element, childSelector: string) => {
    const children = container.querySelectorAll(childSelector);
    
    gsap.fromTo(children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
};

/**
 * Random transition selector - using only fast transitions
 */
export const getRandomTransition = () => {
  const transitions = [
    pageTransitions.simpleFade,
    pageTransitions.elegantFade,
    pageTransitions.slideAndFade
  ];
  
  return transitions[Math.floor(Math.random() * transitions.length)];
};
