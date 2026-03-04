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
  const featuresRef = useRef<HTMLDivElement>(null);

  // Parallax hooks for each section
  const { scrollYProgress: mainServicesScroll } = useScroll({
    target: mainServicesRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: featuresScroll } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - subtle and smooth, disabled on mobile
  const mainServicesX = useTransform(mainServicesScroll, [0, 1], isMobile ? [0, 0] : [-25, 25]);
  const featuresLeftX = useTransform(featuresScroll, [0, 1], isMobile ? [0, 0] : [-30, 30]);
  const featuresRightX = useTransform(featuresScroll, [0, 1], isMobile ? [0, 0] : [30, -30]);

  const mainServices = [
    {
      icon: Calculator,
      title: "Employee Benefits",
      description: "Employee benefits services include actuarial valuations, peer-reviewed reporting, and collaboration with auditors to ensure clear understanding and compliance.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600",
      link: "/services/employee-benefits"
    },
    {
      icon: TrendingUp,
      title: "Retirement Consulting",
      description: "Expert actuarial guidance for pension and retirement plans, ensuring compliance, risk management, and sustainable funding",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      link: "/services/retirement-consulting"
    },
    {
      icon: Shield,
      title: "Insurance Consulting",
      description: "Insurance Consulting (Life, General and Health) including Risk management, Planning & Strategic consulting, Financial & statutory reporting etc",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=600",
      link: "/services/insurance-consulting"
    },
    {
      icon: FileText,
      title: "Benefit Consulting",
      description: "Benefits Consulting including benefits design, Redesign, Merger & Acquisitions in benefits, Flexible Benefits design, Benefits utilization, Benefit cost impact analysis and Benefits Audits",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600",
      link: "/services/benefit-consulting"
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16">
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