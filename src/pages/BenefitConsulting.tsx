import React from 'react';
import { motion } from 'framer-motion';

const sectionAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1] // cubic-bezier for easeOut
    }
  })
};

const benefitAuditList = [
  'Mitigating Compliance Risk',
  'Mitigating Financial Risk',
  'Mitigating Reputation Risk',
];

const whatIsAuditList = [
  'Employee Provident fund under EPF and Miscellaneous Provisions Act, 1952',
  'Gratuity under Payments of Gratuity Act 1972',
  'Leaves as per Shops and Establishment Act',
  'Payment of Bonus under payment of Bonus (Amendment ) Act , 2015',
  'Employee Insurance under Employees\' State Insurance Act, 1948 and The Workmen’s Compensation Act, 1923',
  'Employee Agreements including contractual and fixed term employees',
  'Actuarial Valuation Reports',
  'Trust Documents and Governance',
  'Any other relevant areas – Maternity Benefit (Amendment ) Act 2017, Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 ,Handbook Review etc',
];

const howSteps = [
  { title: 'Gather Data', desc: 'Gather benefits inventory and data' },
  { title: 'Review', desc: 'Review Policies, Calculations, Coverage and Documentation' },
  { title: 'Identify', desc: 'Identify areas of Non-compliance and those having potential for financial risk' },
  { title: 'Recommend', desc: 'Action Plan to mitigate risk' },
];

const genericConsultingList = [
  'Designing New Employee Benefits/Redesigning Existing Benefits',
  'Benefits Cost Review',
  'Benefits Utilization Review',
  'Employee Benefits Perception Surveys',
];

export default function BenefitConsulting() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-slate-900 dark:text-white pt-20 pb-10 px-2 sm:px-0">
      <div className="max-w-3xl mx-auto space-y-12">
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={sectionAnim} custom={0} className="space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-accent-600">Benefits Audit & Consulting</h1>
          <h2 className="text-lg sm:text-xl font-semibold">Why Benefits Audit?</h2>
          <ul className="list-disc ml-6 space-y-1">
            {benefitAuditList.map((item, i) => (
              <motion.li key={item} custom={i} variants={sectionAnim} className="text-base sm:text-lg">{item}</motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={sectionAnim} custom={1} className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">What is Benefits Audit?</h2>
          <ul className="list-disc ml-6 space-y-1">
            {whatIsAuditList.map((item, i) => (
              <motion.li key={item} custom={i} variants={sectionAnim} className="text-base sm:text-lg">{item}</motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={sectionAnim} custom={2} className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">How Benefits Audit - 4 Step Approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {howSteps.map((step, i) => (
              <motion.div key={step.title} custom={i} variants={sectionAnim} className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 shadow-md border border-slate-100 dark:border-slate-700">
                <div className="font-bold text-accent-600 mb-1">{step.title}</div>
                <div className="text-sm sm:text-base">{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={sectionAnim} custom={3} className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Generic Benefit Consulting</h2>
          <p className="text-base sm:text-lg">With rising employee benefits costs and falling employee perception on benefits, more and more Employers are reviewing their Employee Benefits. It becomes increasingly important for employers to design benefit plans in a manner that they meet the needs and preferences of diverse Employee profiles while keeping in mind constraints of tight benefits budgets.<br/>To support Employers in this Quest we offer:-</p>
          <ul className="list-disc ml-6 space-y-1">
            {genericConsultingList.map((item, i) => (
              <motion.li key={item} custom={i} variants={sectionAnim} className="text-base sm:text-lg">{item}</motion.li>
            ))}
          </ul>
        </motion.section>
      </div>
    </main>
  );
}
