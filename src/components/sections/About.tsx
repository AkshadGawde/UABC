import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile, useShouldReduceMotion } from '../../utils/useDevice';
import { optimizeImage } from '../../utils/imageUtils';
import { CheckCircle2, Building2 } from 'lucide-react';

/**
 * About Section
 */
export const About = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const shouldReduce = useShouldReduceMotion();
  const disableParallax = isMobile || shouldReduce;
  const { scrollYProgress } = disableParallax ? { scrollYProgress: null } as any : useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Parallax effect for the image column
  const yImage = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yContent = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Horizontal separation effect
  const xContent = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const xImage = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} id="about" className="py-24 min-h-screen flex items-center snap-start bg-light-bg dark:bg-dark-bg relative transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
             style={{ y: yContent, x: xContent }}
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">Who We Are</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Empowering Business <br />
              <span className="text-slate-500">Through Actuarial Science.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              At Universal Acutrials, we don't just advise; we engineer resilience. Our methodology combines deep actuarial industry knowledge with cutting-edge financial technology.
            </p>
            <ul className="space-y-4">
              {[
                "Global Expertise, Local Insight",
                "Data-Driven Decision Making",
                "Sustainable Growth Strategies",
                "Comprehensive Risk Management"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-200 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent-500 group-hover:scale-110 transition-transform" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            style={{ y: yImage, x: xImage }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-slate-200 dark:border-white/5 shadow-2xl">
              <img 
                loading="lazy"
                src={optimizeImage("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", isMobile)} 
                alt="Modern Architecture" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 to-transparent mix-blend-multiply dark:mix-blend-overlay" />
            </div>
            
            <motion.div 
               whileHover={{ y: -5, scale: 1.02 }}
               transition={{ type: "spring", stiffness: 300 }}
               className="absolute -bottom-10 -left-10 bg-white dark:bg-dark-card border-l-4 border-accent-500 p-6 shadow-2xl max-w-xs hidden md:block rounded-r-lg z-10"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-brand-500/10 dark:bg-brand-500/10 rounded-lg">
                  <Building2 className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Industry Standard</div>
                  <div className="text-xs text-slate-500">ISO 9001 Certified</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                 Setting the benchmark for actuarial consulting services across Europe and Asia.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
