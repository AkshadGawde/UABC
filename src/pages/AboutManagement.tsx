import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock } from 'lucide-react';

/**
 * About Us - Management Page
 */
export const AboutManagement = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Leadership & 
              <span className="text-accent-600 dark:text-accent-500"> Management</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Meet the experienced leadership driving UABC's vision and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {/* Management Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Management</h3>
              
              {/* Chitra Jayasimha Profile */}
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Photo */}
                <div className="lg:col-span-1">
                  <div className="relative">
                    <div className="w-full aspect-square bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30 rounded-2xl flex items-center justify-center">
                      <Users className="w-20 h-20 text-accent-600 dark:text-accent-500" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Chitra Jayasimha</h4>
                    <p className="text-accent-600 dark:text-accent-500 font-semibold text-lg mb-4">Founder & CEO</p>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-300">FIA</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-300">FIAI</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-purple-800 dark:text-purple-300">FIII</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-medium text-orange-800 dark:text-orange-300">35+ Years</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Chitra is a Senior Consulting Actuary and Founder of Universal Actuaries and Benefit Consultants with 35 plus years of experience in Life Insurance, General Insurance, Health Insurance, Pension, Retirement and Benefits.
                    </p>
                    
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      She is a Fellow of the Institute and Faculty of Actuaries, UK (FIA), Fellow of the Institute of Actuaries of India (FIAI) and Fellow of the Insurance Institute of India (FIII). She is a member of the Advisory Group on Pension, Employee Benefits and Social Security Schemes of the Institute of Actuaries of India. She is also the appointed actuary of Samina Life, Nepal.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Experience Details */}
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Professional Experience</h5>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                    <h6 className="font-bold text-slate-900 dark:text-white mb-3">Insurance Expertise</h6>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      Extensive work in Life Insurance, General Insurance, Health Insurance & Reinsurance business including costing, pricing, basis for terms of trade & experience analysis, Valuation of Liabilities, Embedded Value calculations, Analysis of surplus, Economic Capital and Life underwriting.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                    <h6 className="font-bold text-slate-900 dark:text-white mb-3">Employee Benefits</h6>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      Extensive experience in Employee Benefits in both funding and accounting Actuarial Valuations under Indian GAAP, IFRS, US GAAP & other country Specific local GAAPs for Sri Lanka, Pakistan, Bangladesh, Nepal, Thailand, Indonesia, Middle East, Philippines, Australia & Turkey.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                    <h6 className="font-bold text-slate-900 dark:text-white mb-3">Benefits Consulting</h6>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      Worked for large M&A deals, due diligence of statutory and other benefits, Retirement solutions, B-to-B financial wellness, Benefits Design, Redesigns, etc.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                    <h6 className="font-bold text-slate-900 dark:text-white mb-3">Previous Organizations</h6>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      Worked in the past for MNC firms including Aon Consulting, Mercer Consulting, Swiss Re India, Paternoster (UK), ING Life and LIC of India.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};