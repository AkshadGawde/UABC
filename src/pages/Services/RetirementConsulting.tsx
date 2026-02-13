import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CheckCircle2, 
  Landmark, 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ScrollReveal } from '../../components/PageTransition';

const services = [
  {
    title: 'Governance for Retirement Trusts',
    icon: Landmark,
    color: 'blue',
    items: [
      'Trust deed execution per Income Tax Act 1961 and EPF & Miscellaneous Provisions Act 1952',
      'Trustee board constitution with proper employee representation and voting protocols',
      'Structured meeting agendas, minutes, and record-keeping with integrated MIS',
      'Periodic compliance reviews and audits for trustee board and management',
      'Fund manager oversight, investment guideline compliance, and ALM tracking',
      'Benefit framework design for transfers and withdrawals (including international workers)',
    ],
  },
  {
    title: 'Retirement Income Adequacy',
    icon: Target,
    color: 'green',
    items: [
      'Answer critical questions: "Will I have enough to retire?" and "When can I retire?"',
      'Estimate post-retirement living standards under different contribution scenarios',
      'Leverage analytical tools to design and communicate actionable retirement plans',
      'Empower employees to make informed savings and investment decisions',
    ],
  },
  {
    title: 'Employee Support Services',
    icon: Users,
    color: 'purple',
    items: [
      'Comprehensive analysis of future needs versus projected retirement income',
      'Surplus/shortfall modelling with gap analysis and recommended actions',
      'Personalized retirement readiness assessments and scenario planning',
    ],
  },
  {
    title: 'Employer Advisory',
    icon: TrendingUp,
    color: 'orange',
    items: [
      'Financial wellness sessions to increase employee engagement and awareness',
      'Deep insights into workforce retirement readiness and risk exposure',
      'Strategic support for designing competitive and sustainable retirement programs',
    ],
  },
];

const whyChoose = [
  { 
    icon: Shield, 
    label: 'Regulatory Compliance', 
    desc: 'Navigate complex labor laws and pension regulations with confidence and expertise' 
  },
  { 
    icon: FileText, 
    label: 'Statutory Valuations', 
    desc: 'AS 15, Ind AS 19, and IAS 19 compliant reports for accurate financial reporting' 
  },
  { 
    icon: TrendingUp, 
    label: 'Strategic Planning', 
    desc: 'Long-term retirement and benefit optimization to secure your workforce future' 
  },
];

export const RetirementConsulting: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <main 
      ref={containerRef}
      className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white pt-16"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="container mx-auto px-6">
        
        {/* Hero Section */}
        <section className="-mt-16 py-12 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Expert Retirement Solutions
            </div>
             <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-slate-900 dark:text-white tracking-tight leading-tight">
              Retirement <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-brand-600 to-accent-600">
                Consulting Services
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Delivering innovative solutions for retirement governance and income adequacy so both employers and employees are prepared for the future.
            </p>
          </motion.div>
        </section>

        {/* Why Choose Section */}
        {/* <section className="py-16">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                Why Choose Our Services?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Comprehensive retirement solutions backed by regulatory expertise
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 bg-white dark:bg-dark-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-accent-600 dark:text-accent-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{item.label}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section> */}

        {/* Services Grid */}
        <section className="py-16 bg-slate-50 dark:bg-dark-card -mx-6 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
                  Full-Spectrum Solutions
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Comprehensive Retirement Solutions
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group bg-white dark:bg-dark-bg rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-accent-100 dark:bg-accent-900/30 group-hover:bg-accent-600 dark:group-hover:bg-accent-600 transition-colors">
                      <service.icon className="w-8 h-8 text-accent-600 dark:text-accent-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                  </div>

                  <ul className="space-y-3">
                    {service.items.map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-accent-600 via-accent-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Review Your Retirement Programs?
              </h2>
              <p className="text-xl text-accent-100 mb-10 max-w-2xl mx-auto">
                Get a structured view of your retirement trusts, liabilities, and employee readiness with our focused consulting engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-accent-600 rounded-xl font-bold text-lg hover:bg-accent-50 transition-all shadow-2xl"
                >
                  Schedule Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-accent-600 transition-all"
                >
                  View Our Services
                </motion.button>
              </div>
            </motion.div>
        </div>
      </section>
    </main>
  );
};

export default RetirementConsulting;
