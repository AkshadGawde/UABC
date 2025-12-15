import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  Globe2, 
  TrendingUp, 
  Shield, 
  Award,
  Star,
  Trophy,
  Target,
  Zap
} from 'lucide-react';

/**
 * Partners & Awards Section with Dual Marquee
 */
export const Partners = () => {
  const partners = [
    { name: "Global Trust Corp", icon: Building2 },
    { name: "Venture Partners", icon: Briefcase },
    { name: "International Group", icon: Globe2 },
    { name: "Growth Capital", icon: TrendingUp },
    { name: "Security Alliance", icon: Shield },
    { name: "Prime Investments", icon: Target },
  ];

  const awards = [
    { name: "Best Consulting Firm 2024", icon: Award, color: "text-yellow-500" },
    { name: "Industry Excellence Award", icon: Trophy, color: "text-blue-500" },
    { name: "Top Rated Service", icon: Star, color: "text-purple-500" },
    { name: "Innovation Leader", icon: Zap, color: "text-orange-500" },
    { name: "Client Choice Award", icon: Target, color: "text-green-500" },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#030612] relative border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-900/5 dark:to-black/20 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-16 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           className="inline-flex items-center gap-2 mb-4"
        >
           <span className="w-8 h-[1px] bg-accent-500"></span>
           <span className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase text-sm">Global Ecosystem</span>
           <span className="w-8 h-[1px] bg-accent-500"></span>
        </motion.div>
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Trusted by Industry Leaders
        </motion.h2>
      </div>

      {/* Marquee 1 - Partners (Left) */}
      <div className="relative w-full mb-12 group">
         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#030612] to-transparent z-20 pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#030612] to-transparent z-20 pointer-events-none" />
         
         <div className="flex overflow-hidden">
            <motion.div 
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex flex-shrink-0 gap-16 items-center px-8"
            >
              {[...partners, ...partners, ...partners].map((partner, i) => (
                <div key={i} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer group/item">
                   <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm group-hover/item:scale-110 transition-transform">
                      <partner.icon className="w-8 h-8 text-brand-600 dark:text-brand-400 group-hover/item:text-accent-500 transition-colors" />
                   </div>
                   <span className="text-xl font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{partner.name}</span>
                </div>
              ))}
            </motion.div>
         </div>
      </div>

      {/* Marquee 2 - Awards (Right) */}
      <div className="relative w-full group">
         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#030612] to-transparent z-20 pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#030612] to-transparent z-20 pointer-events-none" />

         <div className="flex overflow-hidden">
            <motion.div 
              initial={{ x: "-50%" }}
              animate={{ x: 0 }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
              className="flex flex-shrink-0 gap-12 items-center px-8"
            >
              {[...awards, ...awards, ...awards].map((award, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-accent-500/30 transition-all cursor-default">
                   <award.icon className={`w-5 h-5 ${award.color}`} />
                   <span className="text-sm font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{award.name}</span>
                </div>
              ))}
            </motion.div>
         </div>
      </div>
    </section>
  );
};
