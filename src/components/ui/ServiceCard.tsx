import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useIsMobile } from '../../utils/useDevice';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  key?: React.Key | null;
}

/**
 * Service Card Component
 */
export const ServiceCard = ({ icon: Icon, title, description, delay }: ServiceCardProps) => {
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
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={isMobile ? undefined : { y: -8 }}
  onMouseMove={isMobile ? undefined : handleMouseMove}
    className="group p-8 bg-white dark:bg-brand-900/5 border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-brand-900/20 hover:border-accent-200 dark:hover:border-accent-500/30 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl rounded-xl"
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
        <div className="w-12 h-12 bg-brand-50 dark:bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-brand-100 dark:border-white/10 group-hover:border-accent-200 dark:group-hover:border-accent-500/50">
          <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-100 transition-colors">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <a href="#contact" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-accent-600 dark:text-accent-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">
          Learn More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};
