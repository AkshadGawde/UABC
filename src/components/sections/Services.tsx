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

  const { scrollYProgress } = disableParallax
    ? ({ scrollYProgress: null } as any)
    : useScroll({ target: ref, offset: ['start end', 'end start'] });

  const xBgText = disableParallax
    ? 0
    : useTransform(scrollYProgress, [0, 1], [300, -300]);

  const services = [
    {
      icon: ShieldCheck,
      title: 'Risk & Security',
      description:
        'Advanced threat assessment and security architecture planning for physical and digital assets.'
    },
    {
      icon: BarChart3,
      title: 'Actuarial Finance',
      description:
        'Strategic capital allocation, risk management, and M&A support for sustainable financial health.'
    },
    {
      icon: BrainCircuit,
      title: 'Digital Transformation',
      description:
        'Leveraging AI and automation to streamline operations and unlock new revenue streams.'
    },
    {
      icon: Building2,
      title: 'Corporate Strategy',
      description:
        'Long-term vision planning and organizational restructuring to maximize efficiency.'
    },
    {
      icon: Users,
      title: 'Human Capital',
      description:
        'Talent acquisition strategies and leadership development programs.'
    },
    {
      icon: Globe2,
      title: 'Global Expansion',
      description:
        'Market entry strategies and regulatory compliance for international growth.'
    }
  ];

  return (
    <section
      ref={ref}
      id="services"
      className="py-10 sm:py-12 lg:py-16 min-h-screen flex flex-col justify-center bg-slate-50 dark:bg-[#01040f] relative border-t border-slate-200 dark:border-white/5 overflow-hidden"
    >
      {/* BACKGROUND BRAND — CENTERED */}
      {!disableParallax && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden">
          {/* UABC Text */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[140vw] pointer-events-none z-0">
            <div className="flex justify-center items-center">
              {['U', 'A', 'B', 'C'].map((letter, i) => (
                <span
                  key={i}
                  className={`
                    text-[22vw] sm:text-[18vw] lg:text-[14vw]
                    font-extrabold uppercase select-none leading-none
                    text-slate dark:text-white/5
                    ${i !== 3 ? 'mr-[0.4em]' : ''}
                  `}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Marquee Text Below UABC */}
          <div className="absolute top-[58%] left-1/2 -translate-x-1/2 w-full overflow-hidden flex justify-center pointer-events-none z-0">
            <motion.div
              className="flex whitespace-nowrap justify-center"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration: 30
              }}
            >
              {[...Array(2)].map((_, i) => (
                <span
                  key={i}
                  className="text-[4vw] sm:text-[3vw] lg:text-[2vw] font-extrabold text-accent-600/[0.08] dark:text-accent-500/[0.08] uppercase px-8 text-center"
                >
                  Offering a wide range of Actuarial & Benefit Services
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 gap-4">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} 
              className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3 text-slate-900 dark:text-white"
            >
              Our{' '}
              <span className="text-accent-600 dark:text-accent-500">
                Expertise
              </span>
            </motion.h2>

            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-xl">
              Offering a wide range of <span className="font-semibold text-accent-600 dark:text-accent-500">Actuarial & Benefit Services</span>
            </p>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 sm:px-6 py-2.5 border border-slate-300 dark:border-white/20 hover:border-accent-500 hover:bg-accent-500 hover:text-white text-slate-700 dark:text-white rounded-full transition-all flex items-center gap-2 text-sm whitespace-nowrap"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.08}
              className="text-left"
            />
          ))}
        </div>
      </div>
    </section>
  );
};