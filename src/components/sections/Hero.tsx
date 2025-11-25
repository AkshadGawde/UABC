import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useIsMobile, useShouldReduceMotion } from '../../utils/useDevice';
import { optimizeImage } from '../../utils/imageUtils';
import { ArrowRight, TrendingUp, ShieldCheck, FileText } from 'lucide-react';

/**
 * Hero Section
 */
export const Hero = () => {
  const isMobile = useIsMobile();
  const shouldReduce = useShouldReduceMotion();
  const disableParallax = isMobile || shouldReduce;
  const { scrollY } = disableParallax ? { scrollY: null } as any : useScroll();
  // Enhanced Parallax Effects
  let y1: any = 0;
  let y2: any = 0;
  let yBg: any = 0;
  let xBg: any = 0;
  let opacity: any = 1;
  let scale: any = 1;
  if (!disableParallax) {
    y1 = useTransform(scrollY, [0, 500], [0, 200]);
    y2 = useTransform(scrollY, [0, 500], [0, -150]);
    yBg = useTransform(scrollY, [0, 1000], [0, 300]);
    xBg = useTransform(scrollY, [0, 1000], [0, -100]);
    opacity = useTransform(scrollY, [0, 300], [1, 0]);
    scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  }
  
  // Carousel State
  const [currentInsight, setCurrentInsight] = useState(0);
  const insights = [
    {
      category: "Market Analysis",
      title: "Navigating Volatility in 2024 Global Markets",
      image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=800",
      date: "2 Days ago"
    },
    {
      category: "AI & Risk",
      title: "The Algorithmic Future of Insurance Underwriting",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      date: "1 Week ago"
    },
    {
      category: "Sustainability",
      title: "Green Bonds: A Strategic Asset for Growth",
      image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800",
      date: "2 Weeks ago"
    }
  ];

  useEffect(() => {
    const intervalDuration = isMobile ? 8000 : 5000;
    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return; // pause when tab is hidden
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, intervalDuration);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen snap-start flex items-center pt-20 overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Background Effects - Multi-directional Parallax */}
      <motion.div style={{ y: yBg, x: xBg }} className="absolute inset-0 z-0 pointer-events-none">
          {!disableParallax ? (
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                x: [0, 20, -20, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 -left-4 w-96 h-96 bg-brand-500/10 dark:bg-brand-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-30 dark:opacity-20"
              style={{ willChange: 'transform' }}
            />
          ) : (
            <div className="absolute top-0 -left-4 w-80 h-80 bg-brand-500/5 dark:bg-brand-900/5 rounded-full mix-blend-multiply opacity-20" />
          )}
          <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 5, 0],
            y: [0, 30, -30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className={"absolute top-1/4 right-0 w-96 h-96 bg-accent-500/10 dark:bg-accent-900 rounded-full mix-blend-multiply dark:mix-blend-screen " + (disableParallax ? 'opacity-10 blur-sm' : 'filter blur-[100px] opacity-20 dark:opacity-10')}
            style={{ willChange: 'transform' }}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={"absolute -bottom-8 left-1/3 w-72 h-72 bg-brand-300/10 dark:bg-brand-800 rounded-full mix-blend-multiply dark:mix-blend-screen " + (disableParallax ? 'opacity-15 blur-sm' : 'filter blur-[100px] opacity-30 dark:opacity-20')}
          style={{ willChange: 'transform' }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div className="space-y-8" style={{ opacity, scale }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/20 bg-brand-500/5 backdrop-blur-sm">
               <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
               <span className="text-brand-900 dark:text-brand-200 text-xs font-bold uppercase tracking-widest">
                Global Consulting Leaders
               </span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight text-slate-900 dark:text-white"
          >
            Strategic <br />
            <span className="text-brand-950 dark:text-slate-200">Precision.</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-brand-600 dark:from-accent-500 dark:to-brand-400">
              Maximum Impact.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed border-l-2 border-accent-500/30 pl-6"
          >
            Universal Acutrials combines actuarial science with strategic foresight to secure your assets and accelerate growth in an uncertain world.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#services" className="group px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-dark-bg font-bold rounded-md flex items-center gap-2 hover:bg-accent-600 dark:hover:bg-slate-200 transition-colors shadow-lg hover:shadow-accent-500/25">
              Explore Services
              <ArrowRight className="w-4 h-4 text-white dark:text-accent-600 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="px-8 py-4 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-medium rounded-md hover:bg-slate-100 dark:hover:bg-white/5 hover:border-accent-500/50 transition-colors">
              Our Methodology
            </a>
          </motion.div>
        </motion.div>

        <div className="relative hidden md:block h-[600px] w-full perspective-1000">
           {/* Geometric composition mimicking data/structure */}
           <motion.div
             style={{ y: y1, rotate: -2 }}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="relative w-full h-full"
           >
              {/* Main Card */}
              <div className="absolute top-10 left-10 right-10 bottom-10 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] z-10 hover:shadow-2xl transition-shadow duration-500 flex flex-col overflow-hidden">
                 <div className="flex justify-between items-center mb-6 relative z-20">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-lg border border-brand-500/20">
                          <FileText className="text-brand-600 dark:text-brand-400 w-5 h-5" />
                       </div>
                       <span className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Latest Insights</span>
                    </div>
                    <div className="flex gap-1">
                      {insights.map((_, idx) => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentInsight ? 'w-6 bg-accent-500' : 'w-1.5 bg-slate-300 dark:bg-white/20'}`} />
                      ))}
                    </div>
                 </div>
                 
                 {/* Carousel Content */}
                 <div className="relative flex-1 rounded-xl overflow-hidden w-full h-full group">
                    <AnimatePresence mode="wait">
                <motion.div
                  key={currentInsight}
                  initial={disableParallax ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
                  animate={disableParallax ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={disableParallax ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: disableParallax ? 0.2 : 0.8 }}
                  className="absolute inset-0 cursor-pointer"
                >
                              <img 
                                loading="lazy"
                                src={optimizeImage(insights[currentInsight].image, isMobile)}
                                alt={insights[currentInsight].title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                              />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                             <motion.div 
                               initial={{ y: 20, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{ delay: 0.2 }}
                             >
                               <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest text-white bg-accent-600 rounded-full shadow-lg shadow-accent-600/20">
                                  {insights[currentInsight].category}
                               </div>
                               <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-3 drop-shadow-md">
                                  {insights[currentInsight].title}
                               </h3>
                               <p className="text-slate-300 text-xs flex items-center gap-2 font-medium">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                  </span>
                                  {insights[currentInsight].date}
                               </p>
                             </motion.div>
                          </div>
                       </motion.div>
                    </AnimatePresence>
                 </div>
              </div>

              {/* Floating Element 1 - Parallax + Float */}
              <motion.div 
                style={{ y: y2 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-48 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl z-20"
              >
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
                       <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">+124.5%</span>
                 </div>
                 <div className="text-xs text-slate-500">ROI Optimization</div>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 w-64 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl z-20"
              >
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-lg">
                       <ShieldCheck className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-slate-900 dark:text-white">Risk Mitigated</div>
                       <div className="text-xs text-slate-500">99.9% Compliance Rate</div>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};
