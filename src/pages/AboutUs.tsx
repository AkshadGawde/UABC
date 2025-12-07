import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { optimizeImage } from '../utils/imageUtils';
import { CheckCircle2, Building2, Users, Target, Award, Globe } from 'lucide-react';

/**
 * About Us Page Component
 */
export const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      position: "Chief Actuary",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&q=80&w=400",
      experience: "15+ years in actuarial science"
    },
    {
      name: "Michael Rodriguez",
      position: "Risk Management Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      experience: "12+ years in financial risk"
    },
    {
      name: "Emily Johnson",
      position: "Data Analytics Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      experience: "10+ years in data science"
    },
    {
      name: "David Kim",
      position: "Insurance Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      experience: "8+ years in insurance"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every calculation, every model, every recommendation is crafted with meticulous attention to detail."
    },
    {
      icon: Building2,
      title: "Innovation",
      description: "We constantly evolve our methodologies to stay ahead of market trends and regulatory changes."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work as an extension of your team, committed to your long-term success."
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "Our international experience brings world-class insights to local markets."
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              About Universal Actuarials
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Building Tomorrow's <br />
              <span className="text-accent-600 dark:text-accent-500">Financial Security</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              For over a decade, Universal Actuarials has been at the forefront of actuarial science, 
              helping organizations navigate complex risk landscapes with confidence and precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                From Vision to <br />
                <span className="text-slate-500">Market Leadership</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                Founded in 2013 by a team of experienced actuaries, Universal Actuarials emerged from a 
                simple yet powerful vision: to make actuarial science more accessible, accurate, and actionable 
                for businesses of all sizes.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-accent-600 dark:text-accent-500 mb-2">500+</div>
                  <div className="text-slate-600 dark:text-slate-400">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 dark:text-accent-500 mb-2">150+</div>
                  <div className="text-slate-600 dark:text-slate-400">Global Clients</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src={optimizeImage("https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&q=80&w=800", 800)}
                alt="Our team at work"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-dark-card p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-accent-600 dark:text-accent-500" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">ISO 27001</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Certified</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-slate-50 dark:bg-dark-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              What Drives Us Forward
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-accent-600 dark:text-accent-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Meet Our Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Expert Minds, Proven Results
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <img 
                  src={optimizeImage(member.image, 300)}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-accent-600 dark:text-accent-500 text-center font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                  {member.experience}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Risk Management?
            </h2>
            <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of organizations that trust Universal Actuarials for their most critical risk assessments.
            </p>
            <Link to="/contact" className="inline-block px-8 py-4 bg-white text-accent-600 rounded-md font-bold text-lg hover:bg-accent-50 transition-colors shadow-lg">
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};