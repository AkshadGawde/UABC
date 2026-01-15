import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { optimizeImage } from '../../utils/imageUtils';
import {
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Shield,
  Target,
  Award,
  Heart,
} from 'lucide-react';

const sections = [
  {
    title: "Planning & Strategy",
    description: [
      "Business Planning",
      "New Market metrics assessment",
      "Competitor Product analysis & Benchmarking",
      "Management & Shareholder reporting metrics",
      "Solvency and embedded value projections",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    icon: TrendingUp,
  },
  {
    title: "Product Consulting",
    description: [
      "Product Idea development",
      "Product pricing (traditional & linked)",
      "Profit testing",
      "Reinsurance Pricing",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    icon: BarChart3,
  },
  {
    title: "Financial Reporting",
    description: [
      "Statutory Valuation",
      "Solvency testing",
      "IFRS reporting",
      "Embedded value reporting",
      "Appointed Actuary services",
    ],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    icon: Shield,
  },
  {
    title: "Pricing and Product Development",
    description: [
      "Development of New product models",
      "Premium rating and loss ratio analysis for non-life and health products",
    ],
    image: "https://images.unsplash.com/photo-1554224154-260327c0d14d?auto=format&fit=crop&q=80&w=800",
    icon: Target,
  },
];

const InsuranceConsulting = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 font-sans text-slate-900 dark:text-slate-100"
    >
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-50 via-white to-blue-50 dark:from-dark-bg dark:via-slate-950 dark:to-dark-bg"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] opacity-20 dark:opacity-5 bg-gradient-to-br from-accent-300 to-brand-300 rounded-full blur-3xl pointer-events-none"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-slate-900 dark:text-white tracking-tight leading-tight">
              Insurance Consulting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-brand-600 to-accent-600">
                Expertise & Innovation
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8"
            >
              Delivering tailored solutions for the insurance industry with a focus on strategy, product development, and financial reporting.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="order-2 md:order-1"
                >
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                    {section.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="order-1 md:order-2"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video md:aspect-auto md:h-64 group">
                    <img
                      src={optimizeImage(section.image, false)}
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-900/50 to-transparent opacity-60"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              Ready to Elevate Your Insurance Strategy?
            </h2>
            <p className="text-xl text-accent-100 mb-10 max-w-2xl mx-auto">
              Let's discuss how our insurance consulting expertise can help achieve your risk management goals.
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
    </div>
  );
};

export default InsuranceConsulting;