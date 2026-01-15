import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, FileText, Users, CheckCircle, TrendingUp, 
  ArrowRight, Activity, ClipboardCheck, Layout 
} from 'lucide-react';

const benefitAuditList = [
  { text: "Mitigating Compliance Risk", icon: Shield, desc: "Stay aligned with evolving labor laws." },
  { text: "Mitigating Financial Risk", icon: TrendingUp, desc: "Optimize costs and prevent leakages." },
  { text: "Mitigating Reputation Risk", icon: Users, desc: "Protect your brand as an employer of choice." },
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  })
};

export default function BenefitConsulting() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* --- HERO SECTION --- */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, s: 0.9 }} 
            animate={{ opacity: 1, s: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-accent-600"
          >
            Benefits Audit & Consulting
          </motion.h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Ensure your employee benefits are compliant, cost-effective, and aligned with employee needs. 
            We help you mitigate risks and optimize programs for a modern workforce.
          </p>
        </section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Why Benefits Audit?</h2>

  {/* --- WHAT IS AUDIT (SCOPE) --- */}
        <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 dark:border-slate-700">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Scope of Audit</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Our comprehensive audit covers every legal and structural aspect of your benefits package to ensure 100% compliance with Indian Labor Laws.
              </p>
              <button className="bg-accent-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-700 transition-colors flex items-center gap-2">
                Download Brochure <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whatIsAuditList.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- WHY AUDIT GRID --- */}
        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitAuditList.map((item, i) => (
              <motion.div
                key={item.text}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow group"
              >
                <item.icon className="w-12 h-12 text-accent-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{item.text}</h3>
                <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      

        {/* --- 4 STEP PROCESS --- */}
        <section className="space-y-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Our 4-Step Approach</h2>
          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {howSteps.map((step, i) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-600 text-white flex items-center justify-center shadow-lg">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 w-full">
                    <h4 className="font-bold text-lg text-accent-600">{step.title}</h4>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="bg-accent-600 rounded-3xl p-10 text-center text-white space-y-6">
          <h2 className="text-3xl font-bold">Ready to Optimize Your Benefits?</h2>
          <p className="max-w-2xl mx-auto opacity-90 text-lg">
            Join leading organizations in redesigning employee benefits that meet diverse preferences while staying within budget.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-accent-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
              Get Started
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
