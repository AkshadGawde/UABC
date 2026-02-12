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
  Zap,
  Activity,
  Landmark,
  Factory,
  Stethoscope,
  GraduationCap,
  Plane,
  ShoppingBag,
  Cpu
} from 'lucide-react';

/**
 * Partners & Awards Section with Dual Marquee
 */
export const Partners = () => {
  const partners = [
    { name: "Pharmaceuticals", icon: Stethoscope },
    { name: "Information Technology", icon: Cpu },
    { name: "Financial Services", icon: Landmark },
    { name: "Manufacturing", icon: Factory },
    { name: "Healthcare", icon: Activity },
    { name: "Education", icon: GraduationCap },
    { name: "Retail", icon: ShoppingBag },
    { name: "Aviation & Aerospace", icon: Plane },
    { name: "Insurance", icon: Shield },
    { name: "Investment Banking", icon: TrendingUp },
    { name: "Corporate Services", icon: Building2 },
    { name: "Professional Services", icon: Briefcase },
  ];

  // const awards = [
  //   { name: "Top Actuarial Firm 2024", icon: Award, color: "text-yellow-500" },
  //   { name: "Employee Benefits Excellence", icon: Trophy, color: "text-blue-500" },
  //   { name: "Retirement Planning Leader", icon: Star, color: "text-purple-500" },
  //   { name: "Risk Management Innovation", icon: Zap, color: "text-orange-500" },
  //   { name: "Client Trust Award", icon: Target, color: "text-green-500" },
  //   { name: "Pension Consulting Expert", icon: Shield, color: "text-indigo-500" },
  //   { name: "Insurance Advisory Excellence", icon: Building2, color: "text-cyan-500" },
  //   { name: "Healthcare Benefits Specialist", icon: Activity, color: "text-red-500" },
  // ];

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-slate-50 dark:bg-[#030612] relative border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-900/5 dark:to-black/20 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8 lg:mb-12 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           className="inline-flex items-center gap-2 mb-3 sm:mb-4"
        >
           <span className="w-4 sm:w-8 h-[1px] bg-accent-500"></span>
           <span className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase text-[10px] sm:text-sm">Global Ecosystem</span>
           <span className="w-4 sm:w-8 h-[1px] bg-accent-500"></span>
        </motion.div>
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           className="text-xl sm:text-2xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3"
        >
          Trusted by Industry Leaders
        </motion.h2>
      </div>

      {/* Marquee 1 - Partners (Left) */}
      <div className="relative w-full mb-8 sm:mb-12 group">
         <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-[#030612] to-transparent z-20 pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-[#030612] to-transparent z-20 pointer-events-none" />
         
         <div className="flex overflow-hidden">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity, repeatType: "loop" }}
              className="flex flex-shrink-0 gap-4 sm:gap-8 lg:gap-12 items-center px-4 sm:px-8"
            >
              {[...partners, ...partners].map((partner, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer group/item shrink-0">
                   <div className="p-2 sm:p-3 bg-white dark:bg-white/5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-white/10 shadow-sm group-hover/item:scale-110 transition-transform">
                      <partner.icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-brand-600 dark:text-brand-400 group-hover/item:text-accent-500 transition-colors" />
                   </div>
                   <span className="text-xs sm:text-sm lg:text-lg font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{partner.name}</span>
                </div>
              ))}
            </motion.div>
         </div>
      </div>

      {/* Marquee 2 - Awards (Right) */}
      {/* <div className="relative w-full group">
         <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-[#030612] to-transparent z-20 pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-[#030612] to-transparent z-20 pointer-events-none" />

         <div className="flex overflow-hidden">
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 50, ease: "linear", repeat: Infinity, repeatType: "loop" }}
              className="flex flex-shrink-0 gap-4 sm:gap-8 lg:gap-12 items-center px-4 sm:px-8"
            >
              {[...awards, ...awards].map((award, i) => (
                <div key={i} className="flex items-center gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-accent-500/30 transition-all cursor-default text-xs sm:text-xs shrink-0">
                   <award.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${award.color}`} />
                   <span className="text-xs sm:text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{award.name}</span>
                </div>
              ))}
            </motion.div>
         </div>
      </div> */}
    </section>
  );
};
