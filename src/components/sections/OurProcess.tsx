import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  FileText, 
  CheckCircle2,
  Clock
} from 'lucide-react';

/**
 * Our Process Section - Enhanced Timeline with Parallax
 */
export const OurProcess = () => {
  const processRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  const timelineProgress = useTransform(processScroll, [0, 1], [0, 100]);
  const leftTimelineX = useTransform(processScroll, [0, 1], [-100, 0]);
  const rightTimelineX = useTransform(processScroll, [0, 1], [100, 0]);

  const processSteps = [
    {
      step: 1,
      icon: Users,
      title: "Consultation",
      description: "We start with understanding your unique challenges and objectives."
    },
    {
      step: 2,
      icon: BarChart3,
      title: "Analysis",
      description: "Deep dive into your data and current risk landscape."
    },
    {
      step: 3,
      icon: FileText,
      title: "Modeling",
      description: "Develop customized models and solutions for your specific needs."
    },
    {
      step: 4,
      icon: CheckCircle2,
      title: "Implementation",
      description: "Deploy solutions with ongoing support and monitoring."
    }
  ];

  return (
    <section ref={processRef} className="py-6 sm:py-10 md:py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-3 sm:mb-4">
            <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-accent-600 dark:text-accent-400" />
            <span className="text-xs sm:text-sm font-bold text-accent-600 dark:text-accent-500 tracking-wide uppercase">
              Our Process
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-slate-900 dark:text-white">
            How We Work With You
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
            A streamlined approach that delivers results at every stage
          </p>
        </motion.div>

          {/* Enhanced Timeline */}
          <div className="max-w-6xl mx-auto relative">
            {/* Center Line with Progress */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
              {/* Background line */}
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-full" />
              {/* Animated progress line */}
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent-500 via-blue-500 to-accent-600 rounded-full origin-top shadow-lg shadow-accent-500/50"
                style={{ 
                  scaleY: useTransform(processScroll, [0.2, 0.8], [0, 1]),
                }}
              />
              {/* Glowing effect at the tip */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-accent-500 rounded-full shadow-lg shadow-accent-500/50"
                style={{ 
                  top: timelineProgress.get() + '%',
                  opacity: useTransform(processScroll, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0])
                }}
              />
            </div>
            
            {/* Timeline Steps */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="md:hidden absolute left-1.5 sm:left-3 top-6 sm:top-8 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-accent-500 rounded-full shadow-lg shadow-accent-500/50" />
                    <div className="md:hidden absolute left-2.5 sm:left-3.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500/50 to-transparent" />

                    <div className={`flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Content Card - Left/Right */}
                      <motion.div
                        style={{ 
                          x: isLeft ? leftTimelineX : rightTimelineX,
                        }}
                        className="flex-1 ml-8 sm:ml-10 md:ml-0"
                      >
                        <motion.div
                          initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className={`relative group ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                        >
                          <div className="relative bg-white dark:bg-dark-card rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-lg md:shadow-xl hover:shadow-lg sm:hover:shadow-lg md:hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-700 overflow-hidden">
                            {/* Decorative corner gradient */}
                            <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-gradient-to-br from-accent-500/10 to-transparent rounded-full -translate-y-12 sm:-translate-y-14 md:-translate-y-16 ${isLeft ? 'translate-x-12 sm:translate-x-14 md:translate-x-16' : '-translate-x-12 sm:-translate-x-14 md:-translate-x-16'}`} />
                            
                            <div className="relative z-10">
                              {/* Icon and Number Badge */}
                              <div className={`flex items-center gap-1.5 sm:gap-2 md:gap-4 mb-2 sm:mb-3 md:mb-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                                <div className="relative">
                                  <div className="absolute inset-0 bg-accent-500/20 rounded-lg blur-md" />
                                  <div className="relative w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg sm:rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                                    <IconComponent className="w-4 sm:w-5 md:w-7 h-4 sm:h-5 md:h-7 text-white" />
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                                  <span className="text-[10px] sm:text-xs md:text-sm font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider">
                                    Step
                                  </span>
                                  <div className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 rounded-full bg-accent-500/10 flex items-center justify-center border-2 border-accent-500 flex-shrink-0">
                                    <span className="text-xs sm:text-sm md:text-lg font-bold text-accent-600 dark:text-accent-400">
                                      {step.step}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Title */}
                              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 md:mb-3">
                                {step.title}
                              </h3>

                              {/* Description */}
                              <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                {step.description}
                              </p>

                              {/* Progress indicator */}
                              <div className={`mt-2 sm:mt-3 md:mt-4 flex items-center gap-1 sm:gap-1.5 md:gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                                <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-gradient-to-r from-accent-500 to-blue-500"
                                    initial={{ width: '0%' }}
                                    whileInView={{ width: '100%' }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                  />
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-accent-600 dark:text-accent-400">
                                  {Math.round((index + 1) / processSteps.length * 100)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Connecting line to center (desktop only) */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${isLeft ? '-right-6 lg:-right-12' : '-left-6 lg:-left-12'} w-6 lg:w-12 h-0.5`}>
                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700" />
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-accent-500 to-blue-500"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.6, delay: index * 0.2 }}
                              style={{ transformOrigin: isLeft ? 'right' : 'left' }}
                            />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Center Circle (desktop only) */}
                      <div className="hidden md:block flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: false }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.15,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="relative"
                        >
                          {/* Outer glow ring */}
                          <div className="absolute inset-0 bg-accent-500/20 rounded-full blur-lg sm:blur-xl animate-pulse" />
                          
                          {/* Main circle */}
                          <div className="relative w-14 md:w-16 h-14 md:h-16 bg-gradient-to-br from-accent-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl sm:shadow-2xl shadow-accent-500/30 border-3 md:border-4 border-white dark:border-dark-bg">
                            <span className="text-xl md:text-2xl font-bold text-white">
                              {step.step}
                            </span>
                          </div>

                          {/* Rotating ring effect */}
                          <motion.div
                            className="absolute inset-0 border-2 border-dashed border-accent-400 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      </div>

                      {/* Empty space for alignment (desktop only) */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
    </section>
  );
};