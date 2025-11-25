import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile, useShouldReduceMotion } from '../../utils/useDevice';
import { Counter } from '../ui/Counter';

/**
 * Stats Section
 */
export const Stats = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const shouldReduce = useShouldReduceMotion();
  const disableParallax = isMobile || shouldReduce;
  const { scrollYProgress } = disableParallax ? { scrollYProgress: null } as any : useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [0, -100]);
  const xBg = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="py-24 snap-start bg-brand-900 dark:bg-brand-950/30 border-y border-brand-800 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
       {/* Background pattern - Parallaxed */}
  <motion.div 
   style={{ y: yBg, x: xBg }}
   className={"absolute inset-0 mix-blend-overlay scale-110 " + (disableParallax ? 'opacity-5' : 'opacity-10')} 
  >
        <div className="w-full h-[120%] -mt-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
       </motion.div>
       
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
            { label: "Projects Completed", value: 1250, suffix: "+" },
            { label: "Client Satisfaction", value: 98, suffix: "%" },
            { label: "Experts Worldwide", value: 450, suffix: "" },
            { label: "Years Experience", value: 15, suffix: "+" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center group cursor-default"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-4 group-hover:text-accent-400 transition-colors transform group-hover:scale-105 duration-300">
                <Counter from={0} to={stat.value} duration={isMobile ? 1 : 2} />{stat.suffix}
              </div>
              <div className="text-brand-200 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
