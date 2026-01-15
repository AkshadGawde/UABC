import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { optimizeImage } from '../../utils/imageUtils';
import { ScrollReveal, StaggerReveal, ParallaxScroll, TextReveal } from '../../components/PageTransition';
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

// Separate accordion item component with error handling
const AccordionItem = ({ step, index, isOpen, onToggle }: {
  step: any;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  try {
    return (
      <div
        className={`rounded-3xl border transition-all duration-300 ${
          isOpen 
            ? 'bg-slate-50 dark:bg-slate-800/50 border-accent-300 dark:border-accent-700 shadow-xl' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-accent-200 dark:hover:border-accent-800 hover:shadow-md'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full text-left p-4 md:p-6 flex items-center justify-between gap-4 focus:outline-none"
          type="button"
        >
          <div className="flex items-center gap-4 flex-1">
            <span className={`text-2xl md:text-3xl font-black transition-all duration-300 ${
              isOpen ? 'text-accent-600' : 'text-slate-200 dark:text-slate-700'
            }`}>
              {step.number}
            </span>
            <div className="flex-1">
              <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
              }`}>
                {step.title}
              </h3>
              {!isOpen && (
                <p className="text-sm text-slate-400 mt-1 hidden md:block">
                  {step.subtitle}
                </p>
              )}
            </div>
          </div>
          <div className={`p-2 rounded-full transition-all duration-300 ${
            isOpen 
              ? 'bg-accent-600 text-white rotate-180' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        {isOpen && (
          <div className="px-4 md:px-6 pb-6 pt-2">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3 order-2 md:order-1">
                <h4 className="text-base font-bold text-accent-600 dark:text-accent-400">
                  {step.subtitle}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
                <div className="pt-4 grid grid-cols-1 gap-3">
                  {step.points.map((point: string, i: number) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-400 font-medium text-sm">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video md:aspect-auto md:h-64">
                  <img 
                    src={optimizeImage(step.image, false)} 
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', step.image);
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-900/50 to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('AccordionItem error:', error);
    return <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded">Error rendering accordion item</div>;
  }
};

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
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-72 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 150, damping: 25 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02, translateY: -8 }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-5 shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between overflow-hidden backdrop-blur-sm"
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
            {/* Icon and Title aligned in same line */}
            <div className="flex items-center gap-3 mb-2.5">
              <motion.div 
                className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <service.icon className={`w-6 h-6 ${service.text}`} />
              </motion.div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight m-0">
                {service.title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mt-10">
              {service.description}
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-accent-600 dark:text-accent-400">
            <span>Hover to explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Back Side - Power Blue Color */}
        <motion.div
          className="absolute w-full h-full rounded-2xl p-6 shadow-2xl flex flex-col justify-center overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            rotateY: 180,
            background: "linear-gradient(135deg, #0066CC 0%, #004499 100%)"
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
    description: "Expert valuation of retirement benefits, gratuity, leave encashment, and post-retirement medical benefits under AS 15R, IND AS 19, IAS 19, and US GAAP standards with detailed liability projections.",
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
    description: "Strategic funding recommendations for defined benefit plans including contribution planning, cash flow optimization, and long-term sustainability analysis to minimize volatility and ensure compliance.",
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
    description: "Custom design of competitive benefit structures including DB/DC plans, hybrid schemes, and flexible benefits. We balance cost efficiency with employee attraction and retention goals.",
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
    description: "Pension risk transfer solutions, liability-driven investment strategies, and DB to DC conversions. Expert support in buyouts, buy-ins, and plan freezes with seamless implementation.",
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
    description: "Fair value measurement of stock options, SARs, and RSUs using Black-Scholes and binomial models. Full compliance with IND AS 102/IFRS 2 including expense recognition and disclosure support.",
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
    description: "Actuarial modeling for customer loyalty rewards, extended warranties, gift cards, and promotional schemes. Liability estimation with redemption pattern analysis and breakage rate calculations.",
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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Shared scroll progress for optimization
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax transforms - memoized for performance
  const statsX = useMemo(() => useTransform(scrollYProgress, [0, 1], [-60, 60]), [scrollYProgress]);
  const servicesX = useMemo(() => useTransform(scrollYProgress, [0, 1], [60, -60]), [scrollYProgress]);
  const stepsX = useMemo(() => useTransform(scrollYProgress, [0, 1], [-50, 50]), [scrollYProgress]);

  return (
    <div ref={containerRef} className="min-h-screen bg-powder-50 dark:bg-slate-950 pt-20 font-slate-900 dark:text-slate-100">
      
      {/* Hero Section with Powder Blue */}
      <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-powder-100 via-powder-50 to-white dark:from-dark-bg dark:via-slate-950 dark:to-dark-bg"></div>
        
        
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
              Ready to Transform Your Benefits Strategy?
            </h2>
            <p className="text-xl text-accent-100 mb-10 max-w-2xl mx-auto">
              Let's discuss how our expertise can help achieve your employee benefits goals.
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

export default EmployeeBenefits;
