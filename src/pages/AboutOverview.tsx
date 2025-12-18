import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award } from 'lucide-react';

/**
 * About Us - Overview Page
 */
export const AboutOverview = () => {
  const expertiseAreas = [
    "Actuarial valuation of employee benefits schemes under Indian GAAP (AS 15 R / IND AS 19), IFRS (IAS 19), US GAAP (ASC 712, 715), PAS 19, NAS 19, SLAS 19 etc",
    "Employee Stock Options (ESOP) Design and valuation services under IND AS 102 including Share Appreciation Rights (SAR)",
    "Insurance Consulting (Life, General and Health) including Risk management, Planning & Strategic consulting, Financial & statutory reporting etc",
    "Retirement Consulting including Retirement plans set up, Retirement income adequacy check Governance of retirement trusts, Compliance study of Regulatory benefits etc",
    "Benefits Consulting including Benefits design, Redesign, Merger & Acquisitions in benefits, Flexible Benefits design, Benefits utilization, Benefit cost impact analysis and Benefits Audits",
    "Asset Liability Management strategies for Employee Benefits and other relevant areas",
    "Risk Management, Business and investment consulting advisory"
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              About Universal Actuaries and Benefit Consultants
            </div> */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
              Company
              <span className="text-accent-600 dark:text-accent-500"> Overview</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              ISO 27001-2013 certified firm with 80+ years of combined experience, 
              serving clients across India and worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {/* Company Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About UABC</h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Universal Actuaries and Benefit Consultants (UABC) is an ISO 27001-2013 certified actuarial and Benefits consulting firm serving multiple clients in India and across the world. We have 80+ years of total experience delivering quality service with a singular objective to enhance client value and experience.
              </p>
              
              <div className="flex items-center gap-4 p-4 bg-accent-50 dark:bg-accent-900/20 rounded-lg">
                <Award className="w-8 h-8 text-accent-600 dark:text-accent-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">ISO 27001-2013 Certified</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Ensuring the highest standards of information security management</p>
                </div>
              </div>
            </motion.div>

            {/* Expertise Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Specific Areas of Expertise</h3>
              <div className="space-y-4">
                {expertiseAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-500 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{area}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};