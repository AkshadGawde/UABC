import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Heart, Star } from 'lucide-react';

/**
 * About Us - Our Approach Page
 */
export const AboutApproach = () => {
  const differentiators = [
    {
      title: "Competency",
      points: [
        "Total experience of 80+ years",
        "Knowledgeable in all areas",
        "24 * 7 availability",
        "Cost efficient servicing",
        "Deeply Resourced"
      ],
      icon: Award,
      color: "text-blue-500"
    },
    {
      title: "Integrity",
      points: [
        "Maintain high ethical and Moral standards",
        "Every employee is Accountable",
        "Deliver results as promised",
        "Uncompromised professionalism",
        "No Short cuts"
      ],
      icon: Shield,
      color: "text-green-500"
    },
    {
      title: "Client Deliverables",
      points: [
        "Listening to the client needs",
        "Building lasting relationships",
        "Creating value to client",
        "Not Transactional"
      ],
      icon: Heart,
      color: "text-red-500"
    },
    {
      title: "Quality & Culture",
      points: [
        "Open and honest work culture",
        "Maintaining confidentially at any cost",
        "Adopting best practices with quality",
        "Working as a team",
        "Building future leaders"
      ],
      icon: Star,
      color: "text-purple-500"
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
            {/* <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              About Universal Actuaries and Benefit Consultants
            </div> */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Our 
              <span className="text-accent-600 dark:text-accent-500"> Approach</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              What makes us different in delivering innovative solutions and client-focused strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {/* Approach Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Approach</h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                In today's world, financial risk, market instability and regulatory changes can make it difficult for a company to manage their Life, General or Health Insurance, retirement and benefit programs. This is especially those that align with business goals and optimize results for all stakeholders.
              </p>
              
              <div className="bg-gradient-to-r from-accent-50 to-blue-50 dark:from-accent-900/20 dark:to-blue-900/20 rounded-xl p-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What Makes Us Different</h4>
                <p className="text-slate-700 dark:text-slate-300">Our unique combination of deep expertise, unwavering integrity, client focus, and quality culture sets us apart in the industry.</p>
              </div>
            </motion.div>

            {/* Differentiators Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((diff, index) => {
                const IconComponent = diff.icon;
                return (
                  <motion.div
                    key={diff.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`w-6 h-6 ${diff.color}`} />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">{diff.title}</h4>
                    </div>
                    <ul className="space-y-3">
                      {diff.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-slate-700 dark:text-slate-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};