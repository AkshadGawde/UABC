import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Target, Lightbulb } from 'lucide-react';
import { useIsMobile, useShouldReduceMotion } from '../../utils/useDevice';

// --- Types & Data ---

const cardsData = [
  {
    title: "Our Mission",
    icon: Target,
    content: "To deliver innovative, scalable, and secure IT solutions that empower businesses to thrive in a digital-first world. We turn complexity into clarity.",
    gradient: "from-blue-500/20 via-indigo-500/5 to-transparent",
    border: "group-hover:border-blue-500/50",
    iconColor: "text-blue-400"
  },
  {
    title: "Our Vision",
    icon: Lightbulb,
    content: "We aspire to be the catalyst for global digital transformation, setting new standards in technology excellence and client-centric innovation.",
    gradient: "from-purple-500/20 via-fuchsia-500/5 to-transparent",
    border: "group-hover:border-purple-500/50",
    iconColor: "text-purple-400"
  }
];

// --- Sub-Components ---

const InfoCard = ({ card, xMotion }: { card: typeof cardsData[0], xMotion: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{ x: xMotion }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl border bg-white dark:bg-slate-800 backdrop-blur-md p-6 md:p-12 transition-colors duration-500 border-slate-300 dark:border-slate-700 ${card.border}`}
    >
      {/* Hover Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay`} />

      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700 p-3 md:p-4 border border-slate-200 dark:border-slate-600 shadow-inner">
          <card.icon className={`h-7 w-7 md:h-8 md:w-8 text-slate-700 dark:text-slate-300`} />
        </div>
        <h3 className="mb-4 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          {card.title}
        </h3>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300/90">
          {card.content}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * Main Stats Section Component
 */
export const Stats = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const shouldReduce = useShouldReduceMotion();
  const disableParallax = isMobile || shouldReduce;

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const xLeft = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const xRight = disableParallax ? 0 : useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden bg-light-bg dark:bg-dark-bg py-20 md:py-32 border-y border-slate-200/40 dark:border-slate-700"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" aria-hidden />
        <motion.div 
          style={{ y: yBackground }}
          className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 m-auto h-[260px] w-[260px] rounded-full bg-accent-50 dark:bg-brand-500 opacity-8 dark:opacity-20 blur-[100px]" 
          aria-hidden
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          className="absolute right-0 bottom-0 -z-10 h-[340px] w-[340px] rounded-full bg-accent-50 dark:bg-purple-500 opacity-4 dark:opacity-10 blur-[120px]" 
          aria-hidden
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-24 text-center max-w-3xl mx-auto px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <h2 className="text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3">
              Who We Are
            </h2> */}

            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Driving Digital
              <span className="text-accent-600 dark:text-accent-500"> Transformation </span>
            </h2>
            <p className="text-slate-700 dark:text-slate-400 text-lg md:text-xl">
              Building the future with precision, passion, and unparalleled expertise.
            </p>
          </motion.div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <InfoCard card={cardsData[0]} xMotion={xLeft} />
          <InfoCard card={cardsData[1]} xMotion={xRight} />
        </div>

      </div>
    </section>
  );
};
