import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile, useShouldReduceMotion } from '../../utils/useDevice';
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Globe2, 
  Users, 
  BrainCircuit, 
  Building2 
} from 'lucide-react';
import { ServiceCard } from '../ui/ServiceCard';

/**
 * Services Section
 */
export const Services = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const shouldReduce = useShouldReduceMotion();
  const disableParallax = isMobile || shouldReduce;
  const { scrollYProgress } = disableParallax ? { scrollYProgress: null } as any : useScroll({ target: ref, offset: ["start end", "end start"] });
  // Horizontal Typography Parallax
  const xBgText = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [300, -300]);

  const services = [
    {
      icon: ShieldCheck,
      title: "Risk & Security",
      description: "Advanced threat assessment and security architecture planning for physical and digital assets."
    },
    {
      icon: BarChart3,
      title: "Actuarial Finance",
      description: "Strategic capital allocation, risk management, and M&A support for sustainable financial health."
    },
    {
      icon: BrainCircuit,
      title: "Digital Transformation",
      description: "Leveraging AI and automation to streamline operations and unlock new revenue streams."
    },
    {
      icon: Building2,
      title: "Corporate Strategy",
      description: "Long-term vision planning and organizational restructuring to maximize efficiency."
    },
    {
      icon: Users,
      title: "Human Capital",
      description: "Talent acquisition strategies and leadership development programs."
    },
    {
      icon: Globe2,
      title: "Global Expansion",
      description: "Market entry strategies and regulatory compliance for international growth."
    }
  ];

  return (
    <section ref={ref} id="services" className="py-8 sm:py-10 lg:py-14 min-h-screen flex flex-col justify-center snap-start bg-slate-50 dark:bg-[#01040f] relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300 overflow-hidden">
      {/* Background Parallax Typography */}
    {!disableParallax && (
    <div className="absolute top-10 sm:top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.08] dark:opacity-[0.05]">
      <motion.div style={{ x: xBgText }} className="text-[12vw] sm:text-[15vw] lg:text-[20vw] font-bold leading-none whitespace-nowrap text-slate-900 dark:text-white uppercase select-none">
        U A B C
      </motion.div>
    </div>
    )}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-8 lg:mb-10 gap-4 sm:gap-6">
          <div className="max-w-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: disableParallax ? 5 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: disableParallax ? 0.3 : 0.6 }}
          className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white"
        >
              Our<span className="text-accent-600 dark:text-accent-500"> Expertise</span>
            </motion.h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base">
              Comprehensive solutions tailored to the unique challenges of modern enterprises.
            </p>
          </div>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 sm:px-6 py-2 sm:py-3 border border-slate-300 dark:border-white/20 hover:border-accent-500 hover:bg-accent-500 hover:text-white text-slate-700 dark:text-white rounded-full transition-all flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
          >
            View All Services <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * (disableParallax ? 0.05 : 0.1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
