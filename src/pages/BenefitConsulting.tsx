import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, FileText, Users, CheckCircle, TrendingUp, 
  ArrowRight, Activity, ClipboardCheck, Layout, Sparkles 
} from 'lucide-react';
import { ScrollReveal } from '../components/PageTransition';

const benefitAuditList = [
  { 
    text: "Mitigating Compliance Risk", 
    icon: Shield, 
    desc: "Stay aligned with evolving labor laws and regulatory requirements. Our comprehensive audit ensures your benefits program meets all statutory obligations, protecting your organization from legal penalties, audits, and regulatory non-compliance issues." 
  },
  { 
    text: "Mitigating Financial Risk", 
    icon: TrendingUp, 
    desc: "Optimize costs and prevent financial leakages through detailed analysis of benefit expenditures. We identify areas of overspending, inefficiencies, and opportunities for cost optimization while maintaining competitive employee benefits packages." 
  },
  { 
    text: "Mitigating Reputation Risk", 
    icon: Users, 
    desc: "Protect your brand as an employer of choice by ensuring fair, transparent, and well-managed benefits programs. A strong benefits framework enhances employee satisfaction, attracts top talent, and reinforces your position as a responsible employer in the market." 
  },
];

const whatIsAuditList = [
  "Employee Provident fund (EPF Act, 1952)",
  "Gratuity (Payment of Gratuity Act 1972)",
  "Leaves (Shops and Establishment Act)",
  "Bonus (Payment of Bonus Act, 2015)",
  "Employee Insurance (ESIC Act, 1948)",
  "Contractual & Fixed Term Agreements",
  "Actuarial Valuation Reports",
  "Trust Documents & Governance",
  "Maternity Benefit & Posh Act 2013",
  "Handbook & Policy Review"
];

const howSteps = [
  { title: "Gather Data", desc: "Benefits inventory and data collection.", icon: FileText },
  { title: "Review", desc: "Audit policies and documentation.", icon: ClipboardCheck },
  { title: "Identify", desc: "Pinpoint non-compliance and risks.", icon: Activity },
  { title: "Recommend", desc: "Action plan to mitigate risk.", icon: Layout },
];

export default function BenefitConsulting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <main 
      ref={containerRef}
      className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white pt-24"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="container mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <section className="py-12 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Compliance & Optimization
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-slate-900 dark:text-white tracking-tight leading-tight">
              Benefits Audit  <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-brand-600 to-accent-600">
                Consulting Services
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Ensure your employee benefits are compliant, cost-effective, and aligned with employee needs. 
              We help you mitigate risks and optimize programs for a modern workforce.
            </p>
          </motion.div>
        </section>

        {/* --- WHY AUDIT SECTION --- */}
        <section className="py-16">

          {/* --- 4 STEP PROCESS --- */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Our 4-Step Approach
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A systematic methodology to identify and resolve benefits compliance issues
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-accent-200 via-accent-400 to-accent-200 dark:from-accent-700 dark:via-accent-500 dark:to-accent-700" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {howSteps.map((step, i) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 text-white flex items-center justify-center shadow-lg mb-6"
                  >
                    <step.icon className="w-10 h-10" />
                  </motion.div>
                  <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-slate-100 dark:border-slate-700 w-full hover:shadow-lg transition-shadow">
                    <div className="text-xs font-bold text-accent-600 dark:text-accent-400 mb-2">
                      STEP {i + 1}
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                Why Benefits Audit?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Protect your organization from compliance, financial, and reputational risks
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitAuditList.map((item, i) => (
              <motion.div
                key={item.text}
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
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{item.text}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SCOPE OF AUDIT --- */}
        <section className="py-16 bg-slate-50 dark:bg-dark-card -mx-6 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-dark-bg rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-100 dark:border-slate-700"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-4">
                    <Sparkles className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
                      Comprehensive Coverage
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Scope of Audit</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our comprehensive audit covers every legal and structural aspect of your benefits package to ensure 100% compliance with Indian Labor Laws.
                  </p>
                  <button className="bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors flex items-center gap-2 group">
                    Download Brochure 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whatIsAuditList.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-dark-card rounded-xl border border-slate-100 dark:border-slate-700 hover:border-accent-300 dark:hover:border-accent-600 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      
        
      </div>

      {/* --- CTA SECTION --- */}
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
                Ready to Optimize Your Benefits?
              </h2>
              <p className="text-xl text-accent-100 mb-10 max-w-2xl mx-auto">
                Join leading organizations in redesigning employee benefits that meet diverse preferences while staying within budget.
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
}
