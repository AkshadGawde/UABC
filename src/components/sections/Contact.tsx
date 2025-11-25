import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile, useShouldReduceMotion } from '../../utils/useDevice';
import { MapPin, Mail, Phone } from 'lucide-react';

/**
 * Contact Section
 */
export const Contact = () => {
  const isMobile = useIsMobile();
  const shouldReduce = useShouldReduceMotion();
  const disableMotion = isMobile || shouldReduce;
  return (
    <section id="contact" className="py-24 min-h-screen flex items-center snap-start bg-light-bg dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white dark:bg-[#050a18] border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-16 overflow-hidden relative shadow-2xl transition-colors duration-300">
          
          {/* Animated Blobs in Contact Card */}
          {!disableMotion && (
            <>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 dark:bg-accent-900/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
              />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/5 dark:bg-brand-900/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" 
              />
            </>
          )}
          
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div>
              <div className="inline-block px-3 py-1 bg-accent-500/10 border border-accent-500/20 text-accent-600 dark:text-accent-500 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                Contact Us
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Let's Discuss <br/>Your Future</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
                Ready to transform your business? Reach out to our team of experts for a preliminary consultation.
              </p>
              
              <div className="space-y-8">
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-5">
                  <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5">
                    <MapPin className="text-accent-600 dark:text-accent-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Headquarters</h4>
                    <p className="text-slate-600 dark:text-slate-400">Zurich, Switzerland</p>
                    <p className="text-slate-600 dark:text-slate-400">Bahnhofstrasse 10, 8001</p>
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-5">
                  <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5">
                    <Mail className="text-accent-600 dark:text-accent-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Email Us</h4>
                    <p className="text-slate-600 dark:text-slate-400">contact@acutrials.com</p>
                    <p className="text-slate-600 dark:text-slate-400">support@acutrials.com</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-5">
                  <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5">
                    <Phone className="text-accent-600 dark:text-accent-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-slate-600 dark:text-slate-400">+41 44 123 45 67</p>
                    <p className="text-slate-500 text-sm mt-1">Mon-Fri, 9am - 6pm CET</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <form className="space-y-6 p-8 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">First Name</label>
                  <input type="text" className="w-full bg-white dark:bg-dark-bg/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-accent-500 transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Name</label>
                  <input type="text" className="w-full bg-white dark:bg-dark-bg/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-accent-500 transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                <input type="email" className="w-full bg-white dark:bg-dark-bg/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-accent-500 transition-colors" placeholder="john@company.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message</label>
                <textarea rows={4} className="w-full bg-white dark:bg-dark-bg/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-accent-500 transition-colors" placeholder="Tell us about your project..."></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg hover:shadow-accent-500/25 mt-4"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
