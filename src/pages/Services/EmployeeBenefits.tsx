import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { optimizeImage } from '../../utils/imageUtils';
import {
  CheckCircle2,
  Users,
  TrendingUp,
  BarChart3,
  Shield,
  Zap,
  Target,
  Award,
  Clock,
  Globe,
  Heart,
  ChevronDown,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// --- Components ---

const AnimatedCounter = ({ target, suffix = "" }: { target: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const incrementTime = 30; // faster updates for smoothness
      const steps = duration / incrementTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const offsetY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 100 }}
      style={{ y: offsetY, rotate }}
      className="h-80 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 150, damping: 25 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02, translateY: -8 }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between overflow-hidden backdrop-blur-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Animated background gradient */}
          <motion.div
            animate={{ 
              background: [
                `radial-gradient(circle at 0% 0%, ${service.bgColor}15 0%, transparent 50%)`,
                `radial-gradient(circle at 100% 100%, ${service.bgColor}15 0%, transparent 50%)`,
                `radial-gradient(circle at 0% 0%, ${service.bgColor}15 0%, transparent 50%)`
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-50"
          />
          
          <div className="relative z-10">
            <motion.div 
              className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-4 shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <service.icon className={`w-7 h-7 ${service.text}`} />
            </motion.div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-tight">
              {service.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-accent-600 dark:text-accent-400">
            <span>Hover to explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute w-full h-full rounded-2xl p-6 shadow-2xl flex flex-col justify-center overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            rotateY: 180,
            background: `linear-gradient(135deg, ${service.bgColor} 0%, ${service.bgColorDark} 100%)`
          }}
        >
          {/* Floating circles background */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
          />
          
          <div className="relative z-10 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">{service.title}</h3>
            </div>
            
            <ul className="space-y-3">
              {service.benefits?.map((benefit: string, i: number) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-white/90 leading-relaxed">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- Data ---

const accountingStandards = [
  "AS 15 R (India)",
  "IND AS 19 (India)",
  "FAS 87/158 (US GAAP)",
  "AS 19 (Philippines)",
  "IAS 19 R (IFRS)",
  "NAS 19 (Nepal)",
  "LKS 19 (Sri Lanka)",
  "TAS 19 (Thailand)",
  "And many more..."
];

const servicesOffered = [
  {
    title: "Actuarial Valuation",
    description: "Comprehensive retirement and long-term benefit plan valuations in accordance with accounting standards.",
    icon: BarChart3,
    color: "accent",
    gradient: "from-accent-500 to-accent-400",
    bg: "bg-accent-50 dark:bg-accent-900/20",
    text: "text-accent-600 dark:text-accent-500",
    bgColor: "#3B82F6",
    bgColorDark: "#1E40AF",
    benefits: [
      "Liability Assessment & Projections",
      "Discount Rate Optimization",
      "Mortality & Longevity Analysis"
    ]
  },
  {
    title: "Funding Strategy",
    description: "Develop and implement sustainable funding strategies with thorough valuation assessments.",
    icon: TrendingUp,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-500",
    bgColor: "#10B981",
    bgColorDark: "#059669",
    benefits: [
      "Cash Flow Projections",
      "Contribution Scheduling",
      "Cost Reduction Analysis"
    ]
  },
  {
    title: "Benefit Plan Design",
    description: "Expert advice in designing and optimizing defined benefit plans for maximum value.",
    icon: Target,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-500",
    bgColor: "#0EA5E9",
    bgColorDark: "#0284C7",
    benefits: [
      "Formula Optimization",
      "Coverage Maximization",
      "Compliance Review"
    ]
  },
  {
    title: "De-risking Strategies",
    description: "Comprehensive guidance on de-risking strategies, plan modifications, and transition support.",
    icon: Shield,
    color: "orange",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-500",
    bgColor: "#F97316",
    bgColorDark: "#EA580C",
    benefits: [
      "Pension Risk Transfer",
      "Asset-Liability Matching",
      "Transition Support"
    ]
  },
  {
    title: "ESOP & Incentives",
    description: "Black-Scholes methodology valuations for ESOPs and long-term incentive plans.",
    icon: Award,
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-500",
    bgColor: "#A855F7",
    bgColorDark: "#7E22CE",
    benefits: [
      "Valuation Services",
      "Black-Scholes Modeling",
      "Employee Education"
    ]
  },
  {
    title: "Loyalty Programs",
    description: "Actuarial valuations for customer loyalty programs, warranties, and special schemes.",
    icon: Heart,
    color: "rose",
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    text: "text-rose-600 dark:text-rose-500",
    bgColor: "#EF4444",
    bgColorDark: "#DC2626",
    benefits: [
      "Program Strategy",
      "Warranty Planning",
      "Special Schemes"
    ]
  }
];

const stats = [
  { value: 30, label: "Years of Experience", icon: Clock },
  { value: 86, label: "Consultants", icon: Users },
  { value: 17, label: "Branches", icon: Globe },
  { value: 1000, label: "Clients", icon: Heart }
];

const steps = [
  {
    number: "01",
    title: "Validation",
    subtitle: "Data Validation & Analysis",
    description: "We start by thoroughly assessing and validating all benefit plan data to ensure a solid foundation for analysis.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    points: ["Scheme rules analysis", "Member data verification", "Historical data comparison", "Error rectification"]
  },
  {
    number: "02",
    title: "Assumptions",
    subtitle: "Setting Key Assumptions",
    description: "Precise setting of actuarial assumptions based on regulatory guidelines and your company's historical data.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    points: ["Discount rate setting", "Salary escalation analysis", "Attrition rate study", "Mortality & morbidity rates"]
  },
  {
    number: "03",
    title: "Valuation",
    subtitle: "Valuation & Results",
    description: "We perform detailed calculations using advanced actuarial models and validate the results through peer review.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    points: ["Liability computation", "Service cost analysis", "Variance analysis", "Internal peer review"]
  },
  {
    number: "04",
    title: "Reporting",
    subtitle: "Comprehensive Reporting",
    description: "Delivery of detailed reports compliant with accounting standards, followed by stakeholder presentations.",
    image: "https://images.unsplash.com/photo-1554224154-260327c0d14d?auto=format&fit=crop&q=80&w=800",
    points: ["Accounting disclosures", "Management reporting", "Auditor support", "Executive presentation"]
  }
];

export const EmployeeBenefits = () => {
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Shared scroll progress for optimization
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax transforms - memoized for performance
  const statsX = useMemo(() => useTransform(scrollYProgress, [0, 1], [-60, 60]), [scrollYProgress]);
  const servicesX = useMemo(() => useTransform(scrollYProgress, [0, 1], [60, -60]), [scrollYProgress]);
  const stepsX = useMemo(() => useTransform(scrollYProgress, [0, 1], [-50, 50]), [scrollYProgress]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 font-sans text-slate-900 dark:text-slate-100">
      
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-slate-900 dark:text-white tracking-tight leading-tight">
              Employee Benefits <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-brand-600 to-accent-600">
                Valuation & Strategy
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8"
            >
              Empowering organizations with precise actuarial solutions. We turn complex data into sustainable growth strategies and compliant reporting.
            </motion.p>
            

          </motion.div>
        </div>
      </section>

      {/* Stats Section (Scroll Triggered) */}
      <section ref={statsRef} className="py-8 md:py-10 lg:py-12 bg-light-bg dark:bg-dark-bg border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const { scrollYProgress } = useScroll({
                target: statsRef,
                offset: ["start end", "end start"]
              });
              const offsetX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -30 : 30, index % 2 === 0 ? 30 : -30]);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  style={{ x: offsetX }}
                  className="text-center group"
                >
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-accent-50 dark:bg-accent-900/20 rounded-2xl group-hover:rotate-6 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                      <AnimatedCounter target={stat.value} suffix={index === 3 ? "+" : ""} />
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
      </section>

      {/* Services Grid (Lively) */}
      <section ref={servicesRef} className="py-12 md:py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Floating Background Elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            x: [0, -30, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-96 h-96 bg-brand-400/10 dark:bg-brand-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, -50, 0],
            x: [0, 25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl"
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Comprehensive Services
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-accent-600 to-brand-500 rounded-full mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {servicesOffered.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
      </section>

      {/* Step-by-Step Accordion Section */}
      <section ref={stepsRef} className="py-12 md:py-16 lg:py-24 bg-light-bg dark:bg-dark-bg overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
               <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-accent-600 uppercase bg-accent-50 dark:bg-accent-900/20 dark:text-accent-400 rounded-full">
                 Our Process
               </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Step-by-Step Approach
              </h2>
              <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-base">
                A systematic and transparent methodology ensuring accuracy, compliance, and strategic value at every stage.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              {steps.map((step, index) => {
                const isOpen = activeStep === index;
                return (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1 }}
                    className={`mb-6 rounded-3xl border transition-all duration-500 overflow-hidden ${
                      isOpen 
                        ? 'bg-slate-50 dark:bg-slate-800/50 border-accent-200 dark:border-accent-900 shadow-lg' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-accent-100'
                    }`}
                  >
                    <button
                      onClick={() => setActiveStep(isOpen ? null : index)}
                      className="w-full text-left p-4 md:p-6 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl md:text-3xl font-black transition-colors duration-300 ${isOpen ? 'text-accent-600' : 'text-slate-200 dark:text-slate-700'}`}>
                          {step.number}
                        </span>
                        <div>
                          <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                            {step.title}
                          </h3>
                          {!isOpen && <p className="text-sm text-slate-400 mt-1 hidden md:block">{step.subtitle}</p>}
                        </div>
                      </div>
                      <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-accent-600 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    <AnimatePresence mode="wait">
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-6 pb-6 pt-2">
                            <div className="grid md:grid-cols-2 gap-6 items-center">
                              <div className="space-y-3 order-2 md:order-1">
                                <h4 className="text-base font-bold text-accent-600 dark:text-accent-400">{step.subtitle}</h4>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                                  {step.description}
                                </p>
                                <div className="pt-4 grid grid-cols-1 gap-3">
                                  {step.points.map((point, i) => (
                                    <motion.div 
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 + (i * 0.1) }}
                                      className="flex items-center gap-3"
                                    >
                                      <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0" />
                                      <span className="text-slate-700 dark:text-slate-400 font-medium">{point}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="order-1 md:order-2"
                              >
                                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video md:aspect-auto md:h-64 group">
                                  <img 
                                    src={optimizeImage(step.image, false)} 
                                    alt={step.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-accent-900/50 to-transparent opacity-60"></div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
      </section>

      {/* Ticker Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-slate-900 overflow-hidden border-t border-slate-800">
        <div className="container mx-auto px-6 mb-8 text-center">
           <h3 className="text-xl font-bold text-white mb-2">Expertise in Global Accounting Standards</h3>
        </div>
        <div className="flex gap-8 whitespace-nowrap overflow-hidden mask-linear-gradient">
          <motion.div 
            className="flex gap-8"
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...accountingStandards, ...accountingStandards, ...accountingStandards].map((std, i) => (
              <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-accent-500 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-accent-400" />
                <span className="font-medium">{std}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-r from-accent-600 to-brand-600 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Benefits Strategy?
            </h2>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-accent-600 font-bold rounded-full text-base shadow-xl transition-all hover:shadow-2xl dark:text-accent-600"
            >
              Schedule a Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default EmployeeBenefits;
