import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock } from 'lucide-react';

/**
 * About Us - Management Page
 */
export const AboutManagement = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16">
      
      {/* Hero Section */}
      <section className="-mt-16 py-12 md:py-16 lg:py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Leadership &{' '}
              <span className="text-accent-600 dark:text-accent-500">
                Management
              </span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-400">
              Meet the experienced leadership driving UABC&apos;s vision and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-dark-card rounded-2xl p-4 md:p-8 shadow-lg"
          >
            
            {/* Profile Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 items-start">
              
              {/* Image Section */}
              <div className="lg:col-span-1">
                <div className="relative group">
                  {/* Gradient Border */}
                  <div className="p-[3px] rounded-2xl bg-black shadow-xl">
                    
                    {/* Inner Frame */}
                    <div className="rounded-2xl bg-white dark:bg-dark-card p-3">
                      <img
                        src="/Chitrajayasimha.jpeg"
                        alt="Chitra Jayasimha"
                        className="w-full aspect-square object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="lg:col-span-2">
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Chitra Jayasimha
                </h4>
                <p className="text-accent-600 dark:text-accent-500 font-semibold text-base md:text-lg mb-4 md:mb-6">
                  Founder & CEO
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                  {['FIA', 'FIAI', 'FIII'].map((title) => (
                    <span
                      key={title}
                      className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs md:text-sm font-medium text-blue-800 dark:text-blue-300"
                    >
                      <Award className="w-4 h-4 md:w-5 md:h-5" />
                      {title}
                    </span>
                  ))}
                  <span className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-xs md:text-sm font-medium text-orange-800 dark:text-orange-300">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                    35+ Years
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-3 md:space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p className="text-sm md:text-base">
                    Chitra is a Senior Consulting Actuary and Founder of Universal
                    Actuaries and Benefit Consultants with over 35 years of
                    experience across Life, General, Health Insurance, Pension,
                    Retirement, and Employee Benefits.
                  </p>
                  <p className="text-sm md:text-base">
                    She is a Fellow of the Institute and Faculty of Actuaries, UK
                    (FIA), Fellow of the Institute of Actuaries of India (FIAI),
                    and Fellow of the Insurance Institute of India (FIII). She is
                    also an appointed actuary for Samina Life, Nepal.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Professional Experience
              </h5>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Insurance Expertise',
                    text:
                      'Life, General, Health & Reinsurance including pricing, valuation, embedded value, surplus analysis and underwriting.',
                  },
                  {
                    title: 'Employee Benefits',
                    text:
                      'Actuarial valuations under Indian GAAP, IFRS, US GAAP across Asia, Middle East, Australia & Europe.',
                  },
                  {
                    title: 'Benefits Consulting',
                    text:
                      'M&A due diligence, retirement solutions, financial wellness programs, and benefits redesign.',
                  },
                  {
                    title: 'Previous Organizations',
                    text:
                      'Aon Consulting, Mercer Consulting, Swiss Re India, Paternoster (UK), ING Life, LIC of India.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6"
                  >
                    <h6 className="font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h6>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};