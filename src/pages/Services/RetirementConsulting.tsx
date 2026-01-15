import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Landmark, 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  FileText,
  ArrowRight 
} from 'lucide-react';

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
  { icon: Shield, label: 'Regulatory Compliance', desc: 'Navigate complex labor laws and pension regulations' },
  { icon: FileText, label: 'Statutory Valuations', desc: 'AS 15, Ind AS 19, and IAS 19 compliant reports' },
  { icon: TrendingUp, label: 'Strategic Planning', desc: 'Long-term retirement and benefit optimization' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export const RetirementConsulting: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-dark-bg dark:via-slate-900 dark:to-dark-bg text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-accent-600 via-accent-500 to-accent-700 bg-clip-text text-transparent mb-6">
              Retirement Consulting
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Delivering innovative solutions for retirement governance and income adequacy so both employers and employees are prepared for the future.
            </p>
          </motion.div>

          {/* Why Choose Section */}
          <div className="grid md:grid-cols-3 gap-6 pt-12 max-w-5xl mx-auto">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <item.icon className="w-10 h-10 text-accent-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16"
          >
            Comprehensive Retirement Solutions
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-accent-600/10 group-hover:bg-accent-600 transition-colors">
                    <service.icon className="w-8 h-8 text-accent-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  </div>
                </div>

                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-accent-600 shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-3xl p-10 sm:p-14 text-center text-white shadow-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to review your retirement programs?
            </h2>
            <p className="text-lg sm:text-xl opacity-95 mb-8 max-w-2xl mx-auto">
              Get a structured view of your retirement trusts, liabilities, and employee readiness with our focused consulting engagement.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent-600 rounded-full font-bold text-lg hover:bg-slate-100 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Talk to an Actuary
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default RetirementConsulting;
