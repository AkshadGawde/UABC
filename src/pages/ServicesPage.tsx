import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { optimizeImage } from '../utils/imageUtils';
import { useIsMobile } from '../utils/useDevice';
import { ScrollReveal, StaggerReveal, MagneticButton } from '../components/PageTransition';
import { 
  Calculator, 
  Shield, 
  TrendingUp, 
  FileText, 
  Users, 
  BarChart3, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Zap
} from 'lucide-react';

/**
 * Services Page Component
 */
export const ServicesPage = () => {
  const isMobile = useIsMobile();
  
  // Refs for parallax sections
  const mainServicesRef = useRef<HTMLDivElement>(null);
  const specializedRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Parallax hooks for each section
  const { scrollYProgress: mainServicesScroll } = useScroll({
    target: mainServicesRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: specializedScroll } = useScroll({
    target: specializedRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: featuresScroll } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - subtle and smooth, disabled on mobile
  const mainServicesX = useTransform(mainServicesScroll, [0, 1], isMobile ? [0, 0] : [-25, 25]);
  const specializedX = useTransform(specializedScroll, [0, 1], isMobile ? [0, 0] : [25, -25]);
  const featuresLeftX = useTransform(featuresScroll, [0, 1], isMobile ? [0, 0] : [-30, 30]);
  const featuresRightX = useTransform(featuresScroll, [0, 1], isMobile ? [0, 0] : [30, -30]);
  
  // Timeline progress transforms
  const timelineProgress = useTransform(processScroll, [0, 1], [0, 100]);
  const leftTimelineX = useTransform(processScroll, [0, 1], isMobile ? [0, 0] : [-100, 0]);
  const rightTimelineX = useTransform(processScroll, [0, 1], isMobile ? [0, 0] : [100, 0]);

  const mainServices = [
    {
      icon: Calculator,
      title: "Employee Benefits",
      description: "Employee Stock Options (ESOP), Design and valuation services under IND AS 102 including Share Appreciation Rights (SAR)",
      features: ["Risk Assessment", "Pricing Models", "Reserving Analysis", "Capital Adequacy"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600",
      link: "/services/employee-benefits"
    },
    {
      icon: Shield,
      title: "Insurance Consulting",
      description: "Insurance Consulting (Life ,General and Health) including Risk management, Planning & Strategic consulting, Financial & statutory reporting etc",
      features: ["Enterprise Risk", "Operational Risk", "Market Risk", "Credit Risk"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=600",
      link: "/services/insurance-consulting"
    },
    {
      icon: TrendingUp,
      title: "Retirement Consulting",
      description: "Retirement Consulting including retirement plans set up, Retirement income adequacy check Governance of retirement trusts, Compliance study of Regulatory benefits etc",
      features: ["Cash Flow Models", "Stochastic Models", "Monte Carlo", "Stress Testing"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      link: "/services/retirement-consulting"
    },
    {
      icon: FileText,
      title: "Benefit Consulting",
      description: "Benefits Consulting including benefits design, Redesign, Merger & Acquisitions in benefits, Flexible Benefits design, Benefits utilization, Benefit cost impact analysis and Benefits Audits",
      features: ["Solvency II", "IFRS 17", "Basel III", "Risk Reporting"],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600",
      link: "/services/benefit-consulting"
    }
  ];

  const specializedServices = [
    {
      icon: Users,
      title: "Actuarial valuation of employee benefits",
      description: "Actuarial valuation of employee benefits schemes under Indian GAAP (AS 15 R/IND AS 19), IFRS (IAS 19), US GAAP (ASC 712, 715) ,PAS 19, NAS 19, SLAS 19 etc"
    },
    {
      icon: BarChart3,
      title: "Employee Stock Options (ESOP)",
      description: "Employee Stock Options (ESOP) Design and valuation services under IND AS 102 including Share Appreciation Rights (SAR)"
    },
    {
      icon: AlertTriangle,
      title: "Insurance Consulting",
      description: "Insurance Consulting (Life ,General and Health) including Risk management, Planning & Strategic consulting, Financial & statutory reporting etc"
    },
    {
      icon: Award,
      title: "Retirement Consulting",
      description: "Retirement Consulting including Retirement plans set up, Retirement income adequacy check Governance of retirement trusts, Compliance study of Regulatory benefits etc"
    },
    {
      icon: Award,
      title: "Benefits Consulting",
      description: "Benefits Consulting including Benefits design, Redesign, Merger & Acquisitions in benefits, Flexible Benefits design, Benefits utilization, Benefit cost impact analysis and Benefits Audits"
    },
    {
      icon: Award,
      title: "Asset Liability Management",
      description: "Asset Liability Management strategies for Employee Benefits and other relevant areas"
    },
    {
      icon: Award,
      title: "Risk Management",
      description: "Risk Management, Business and investment consulting advisory"
    }

  ];

  const processSteps = [
    {
      step: 1,
      icon: Users,
      title: "Consultation",
      description: "We start with understanding your unique challenges and objectives."
    },
    {
      step: 2,
      icon: BarChart3,
      title: "Analysis",
      description: "Deep dive into your data and current risk landscape."
    },
    {
      step: 3,
      icon: FileText,
      title: "Modeling",
      description: "Develop customized models and solutions for your specific needs."
    },
    {
      step: 4,
      icon: CheckCircle2,
      title: "Implementation",
      description: "Deploy solutions with ongoing support and monitoring."
    }
  ];

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
              Comprehensive <br />
              <span className="text-accent-600 dark:text-accent-500">Actuarial Solutions</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              From risk assessment to regulatory compliance, we provide end-to-end actuarial services 
              that drive informed decision-making and sustainable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section ref={mainServicesRef} className="py-12 md:py-16 lg:py-24 bg-light-bg dark:bg-dark-bg">
        <motion.div style={{ x: mainServicesX }}>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12 lg:mb-16"
            >
              <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
                Core Services
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                Expert Solutions for Every Challenge
              </h2>
            </motion.div>

            <StaggerReveal staggerDelay={0.05} duration={0.4}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {mainServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                  >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={optimizeImage(service.image, false)}
                        alt={service.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{service.title}</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-6">{service.description}</p>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link to={service.link} className="flex items-center gap-2 text-accent-600 dark:text-accent-500 font-medium hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
                );
              })}
              </div>
            </StaggerReveal>
          </div>
        </motion.div>
      </section>

      {/* Specialized Services Section */}
      <section ref={specializedRef} className="py-12 md:py-16 lg:py-24 bg-slate-50 dark:bg-dark-card">
        <motion.div style={{ x: specializedX }}>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
                Specialized Services
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                Tailored Expertise
              </h2>
            </motion.div>

            <StaggerReveal staggerDelay={0.04} duration={0.4}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {specializedServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                      className="bg-white dark:bg-dark-bg p-8 rounded-2xl text-center group hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700"
                    >
                      <motion.div 
                        className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.5 } }}
                      >
                        <IconComponent className="w-8 h-8 text-accent-600 dark:text-accent-500" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug">{service.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </StaggerReveal>
          </div>
        </motion.div>
      </section>

      {/* Process Section - Enhanced Timeline with Parallax */}
      <section ref={processRef} className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-4">
              <Clock className="w-4 h-4 text-accent-600 dark:text-accent-400" />
              <span className="text-sm font-bold text-accent-600 dark:text-accent-500 tracking-wide uppercase">
                Our Process
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              How We Work With You
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A streamlined approach that delivers results at every stage
            </p>
          </motion.div>

          {/* Enhanced Timeline */}
          <div className="max-w-6xl mx-auto relative">
            {/* Center Line with Progress */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
              {/* Background line */}
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-full" />
              {/* Animated progress line */}
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent-500 via-blue-500 to-accent-600 rounded-full origin-top shadow-lg shadow-accent-500/50"
                style={{ 
                  scaleY: useTransform(processScroll, [0.2, 0.8], [0, 1]),
                }}
              />
              {/* Glowing effect at the tip */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-accent-500 rounded-full shadow-lg shadow-accent-500/50"
                style={{ 
                  top: timelineProgress.get() + '%',
                  opacity: useTransform(processScroll, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0])
                }}
              />
            </div>
            
            {/* Timeline Steps */}
            <div className="space-y-8 md:space-y-16">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative"
                  >
                    {/* Mobile Timeline Dot */}
                    <div className="md:hidden absolute left-4 top-8 w-3 h-3 bg-accent-500 rounded-full shadow-lg shadow-accent-500/50" />
                    <div className="md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500/50 to-transparent" />

                    <div className={`flex items-center md:gap-8 lg:gap-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Content Card - Left/Right */}
                      <motion.div
                        style={{ 
                          x: isLeft ? leftTimelineX : rightTimelineX,
                        }}
                        className="flex-1 ml-12 md:ml-0"
                      >
                        <motion.div
                          whileHover={{ y: -8, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                          className={`relative group ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                        >
                          <div className="relative bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-700 overflow-hidden">
                            {/* Decorative corner gradient */}
                            <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-32 h-32 bg-gradient-to-br from-accent-500/10 to-transparent rounded-full -translate-y-16 ${isLeft ? 'translate-x-16' : '-translate-x-16'}`} />
                            
                            <div className="relative z-10">
                              {/* Icon and Number Badge */}
                              <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                                <div className="relative">
                                  <div className="absolute inset-0 bg-accent-500/20 rounded-xl blur-md" />
                                  <div className="relative w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <IconComponent className="w-7 h-7 text-white" />
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider">
                                    Step
                                  </span>
                                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center border-2 border-accent-500">
                                    <span className="text-lg font-bold text-accent-600 dark:text-accent-400">
                                      {step.step}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Title */}
                              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                {step.title}
                              </h3>

                              {/* Description */}
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {step.description}
                              </p>

                              {/* Progress indicator */}
                              <div className={`mt-4 flex items-center gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                                <div className="h-1 w-12 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-gradient-to-r from-accent-500 to-blue-500"
                                    initial={{ width: '0%' }}
                                    whileInView={{ width: '100%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                  />
                                </div>
                                <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">
                                  {Math.round((index + 1) / processSteps.length * 100)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Connecting line to center (desktop only) */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${isLeft ? '-right-8 lg:-right-12' : '-left-8 lg:-left-12'} w-8 lg:w-12 h-0.5`}>
                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700" />
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-accent-500 to-blue-500"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: index * 0.2 }}
                              style={{ transformOrigin: isLeft ? 'right' : 'left' }}
                            />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Center Circle (desktop only) */}
                      <div className="hidden md:block flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.15,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="relative"
                        >
                          {/* Outer glow ring */}
                          <div className="absolute inset-0 bg-accent-500/20 rounded-full blur-xl animate-pulse" />
                          
                          {/* Main circle */}
                          <div className="relative w-16 h-16 bg-gradient-to-br from-accent-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-accent-500/30 border-4 border-white dark:border-dark-bg">
                            <span className="text-2xl font-bold text-white">
                              {step.step}
                            </span>
                          </div>

                          {/* Rotating ring effect */}
                          <motion.div
                            className="absolute inset-0 border-2 border-dashed border-accent-400 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      </div>

                      {/* Empty space for alignment (desktop only) */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef}>
        {/* <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
                Why Choose Us
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                Unmatched Expertise, <br />
                <span className="text-slate-500 dark:text-slate-400">Proven Results</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    title: "Fast Turnaround",
                    description: "Quick delivery without compromising quality or accuracy."
                  },
                  {
                    icon: Shield,
                    title: "Regulatory Expertise",
                    description: "Deep knowledge of global regulatory frameworks and compliance."
                  },
                  {
                    icon: Zap,
                    title: "Advanced Technology",
                    description: "Cutting-edge tools and methodologies for superior results."
                  }
                ].map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={feature.title} className="flex gap-4">
                      <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src={optimizeImage("https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800", false)}
                alt="Our expertise"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div> */}
      </section>

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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-accent-100 mb-10 max-w-2xl mx-auto">
              Let's discuss how our actuarial expertise can help solve your business challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-accent-600 rounded-xl font-bold text-lg hover:bg-accent-50 transition-all shadow-2xl"
                >
                  Schedule Consultation
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-accent-600 transition-all"
                >
                  View Our Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};