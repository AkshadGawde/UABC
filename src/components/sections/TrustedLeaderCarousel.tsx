import React from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Shield, Users, Globe, Award } from 'lucide-react';

/**
 * Trusted Leader Carousel Component
 * Shows client logos with infinite scroll
 */
export const TrustedLeaderCarousel = () => {
  const clients = [
    { name: "Global Bank", icon: Building2 },
    { name: "Tech Giant", icon: TrendingUp },
    { name: "Insurance Corp", icon: Shield },
    { name: "Pharma Leader", icon: Users },
    { name: "Finance Group", icon: Globe },
    { name: "Healthcare Plus", icon: Award },
    { name: "Enterprise Ltd", icon: Building2 },
    { name: "Risk Solutions", icon: Shield },
  ];

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-12 md:py-16 bg-slate-50 dark:bg-dark-bg overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-3 text-sm">
            Trusted By Industry Leaders
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Our Trusted Partners
          </h2>
        </motion.div>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8 md:gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30
          }}
        >
          {duplicatedClients.map((client, index) => {
            const IconComponent = client.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700"
              >
                <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-accent-600 dark:text-accent-500" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Gradient Overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-dark-bg dark:to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent dark:from-dark-bg dark:to-transparent pointer-events-none z-10" />
    </section>
  );
};

