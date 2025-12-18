import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { optimizeImage } from '../utils/imageUtils';
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

  // Parallax transforms - subtle and smooth
  const mainServicesX = useTransform(mainServicesScroll, [0, 1], [-25, 25]);
  const specializedX = useTransform(specializedScroll, [0, 1], [25, -25]);
  const processX = useTransform(processScroll, [0, 1], [-20, 20]);
  const featuresLeftX = useTransform(featuresScroll, [0, 1], [-30, 30]);
  const featuresRightX = useTransform(featuresScroll, [0, 1], [30, -30]);

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
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Our Services
            </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specializedServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-dark-bg p-8 rounded-2xl text-center group hover:shadow-lg hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700"
                  >
                    <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-accent-600 dark:text-accent-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-12 md:py-16 lg:py-24 bg-light-bg dark:bg-dark-bg">
        <motion.div style={{ x: processX }}>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
                Our Process
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                How We Work With You
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center relative"
                  >
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-accent-200 dark:bg-accent-800 -translate-x-4"></div>
                    )}
                    <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="font-bold">{step.step}</span>
                    </div>
                    <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg">
        <motion.div style={{ x: featuresLeftX }}>
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
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
              style={{ x: featuresRightX }}
            >
              <img 
                src={optimizeImage("https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800", false)}
                alt="Our expertise"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-accent-600 to-accent-500">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our actuarial expertise can help solve your business challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-block px-8 py-4 bg-white text-accent-600 rounded-lg font-bold text-lg hover:bg-accent-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-center">
                Get a Quote
              </Link>
              <Link to="/contact" className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-accent-600 transition-all text-center">
                Schedule Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};