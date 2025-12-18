import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * About Us - Success Stories Page
 */
export const AboutSuccessStories = () => {
  const [openAccordion, setOpenAccordion] = useState<number>(0);

  const successStories = [
    {
      title: "Conversion of Defined Benefit Pension Plan (DB) to Defined Contribution Plan (DC) of a Foreign Bank",
      description: "The foreign bank wanted to convert its existing DB Pension Plan to a DC setup. The engagement included:",
      details: [
        "Determination of current liability and additional cost after considering full service pension before and after retirement",
        "Detailed scenario analysis across multiple cost situations for DB to DC conversion",
        "Support on setup and implementation of the conversion"
      ],
      outcome: "The engagement was completed over a 6-month period, covering due diligence, setup, and handover of implemented processes and policies, including communication initiatives and change-management workshops."
    },
    {
      title: "Valuation for a Large Conglomerate with Multiple Entities and Frequent Employee Movement",
      description: "The company faced challenges in financial reporting for employee benefits. UABC provided actuarial and retirement consulting across 10 entities and 8 benefit plans under Local and US GAAP.",
      details: [
        "Timely and structured valuation process improvements",
        "Quarterly budgeting support",
        "Active resolution of auditor queries",
        "Development of an ongoing advisory partnership",
        "Cost impact analysis for benefit changes"
      ],
      outcome: null
    },
    {
      title: "Cost Impact Analysis and Redesign of the Leave Policy",
      description: "A large multinational IT company required a global review of its leave policy to assess utilization, separation costs, encashment, and retirement impact. The objective was to redesign a compliant, competitive, and cost-efficient leave policy.",
      details: [
        "Cost and utilization analysis of existing leave policies",
        "Redesigned leave framework aligned with country-specific regulations",
        "Achieved cost savings while maintaining market competitiveness",
        "Streamlined leave valuation process for improved predictability"
      ],
      outcome: null
    },
    {
      title: "Compliance and Governance Audit: Large Multinational IT Services Company",
      description: "A multinational IT services organization required a comprehensive compliance and governance audit of its retirement plans, including service provider processes and SLAs.",
      details: [
        "End-to-end audit covering compliance, accounting, investments, transactions, provider capability, SLAs, and workflows",
        "Gap analysis with board-level recommendations",
        "Design and implementation of a future-ready governance framework for trust operations"
      ],
      outcome: null
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
              Success 
              <span className="text-accent-600 dark:text-accent-500"> Stories</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Discover how UABC has delivered exceptional value to clients across diverse industries and geographies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                  aria-expanded={openAccordion === index}
                >
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white pr-4 leading-tight">
                    {story.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: openAccordion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="pt-6">
                          {/* Description */}
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                            {story.description}
                          </p>
                          
                          {/* Key Outcomes */}
                          {story.details && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                Key outcomes:
                              </h4>
                              <ul className="space-y-2">
                                {story.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-accent-600 dark:bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                      {detail}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Additional Outcome */}
                          {story.outcome && (
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                {story.outcome}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Create Your Success Story?</h3>
              <p className="text-accent-100 mb-6 max-w-2xl mx-auto">
                Join the growing list of satisfied clients who have transformed their actuarial and benefits operations with UABC's expertise.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-accent-600 px-8 py-3 rounded-xl font-semibold hover:bg-accent-50 transition-all duration-200"
              >
                Get Started Today
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};