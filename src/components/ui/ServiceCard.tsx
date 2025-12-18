import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useIsMobile } from '../../utils/useDevice';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  link?: string;
  key?: React.Key | null;
}

/**
 * Service Card Component
 */
export const ServiceCard = ({ icon: Icon, title, description, delay, link }: ServiceCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  const isMobile = useIsMobile();

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isMobile) return; // disable mouse move on mobile/touch
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay, duration: 0.5 }}
      whileHover={isMobile ? undefined : { y: -8 }}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      className="group p-4 sm:p-6 lg:p-8 bg-white/50 dark:bg-brand-900/5 border border-slate-200/50 dark:border-white/5 hover:bg-white/60 dark:hover:bg-brand-900/20 hover:border-accent-300/70 dark:hover:border-accent-500/30 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl rounded-lg sm:rounded-xl backdrop-blur-sm"
      style={isMobile ? undefined : { willChange: 'transform, opacity' }}
    >
      {/* Dynamic Hover Gradient/Spotlight Effect */}
      <motion.div 
        className={"absolute inset-0 bg-gradient-to-r from-accent-500/0 via-accent-500/5 to-accent-500/0 opacity-0 transition-opacity duration-500 pointer-events-none " + (isMobile ? 'hidden' : 'group-hover:opacity-100')}
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.1), transparent 80%)`
        }}
      />
      
      <div className="relative z-10">
        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-brand-50/80 dark:bg-white/5 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 border border-brand-100/80 dark:border-white/10 group-hover:border-accent-200 dark:group-hover:border-accent-500/50">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-brand-600 dark:text-brand-400 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors" />
        </div>
        <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-100 transition-colors">{title}</h3>
        <p className="text-slate-700 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
          {description}
        </p>
        {link ? (
          <a href={link} className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-wider text-accent-600 dark:text-accent-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">
            Learn More <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        ) : (
          <a href="#contact" className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-wider text-accent-600 dark:text-accent-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">
            Learn More <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  );
};
