import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { optimizeImage } from '../utils/imageUtils';
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  Heart,
  BookOpen,
  Building2,
  ChevronDown,
  Star,
  Briefcase,
  Clock,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

/**
 * About Us Page Component with Subpages
 */
export const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'approach', label: 'Our Approach', icon: Target },
    { id: 'management', label: 'Management', icon: Users }
  ];

  const expertiseAreas = [
    "Actuarial valuation of employee benefits schemes under Indian GAAP (AS 15 R / IND AS 19), IFRS (IAS 19), US GAAP (ASC 712, 715), PAS 19, NAS 19, SLAS 19 etc",
    "Employee Stock Options (ESOP) Design and valuation services under IND AS 102 including Share Appreciation Rights (SAR)",
    "Insurance Consulting (Life, General and Health) including Risk management, Planning & Strategic consulting, Financial & statutory reporting etc",
    "Retirement Consulting including Retirement plans set up, Retirement income adequacy check Governance of retirement trusts, Compliance study of Regulatory benefits etc",
    "Benefits Consulting including Benefits design, Redesign, Merger & Acquisitions in benefits, Flexible Benefits design, Benefits utilization, Benefit cost impact analysis and Benefits Audits",
    "Asset Liability Management strategies for Employee Benefits and other relevant areas",
    "Risk Management, Business and investment consulting advisory"
  ];

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

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Company Introduction */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About UABC</h3>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          Universal Actuaries and Benefit Consultants (UABC) is an ISO 27001-2013 certified actuarial and Benefits consulting firm serving multiple clients in India and across the world. We have 80+ years of total experience delivering quality service with a singular objective to enhance client value and experience.
        </p>
        
        <div className="flex items-center gap-4 p-4 bg-accent-50 dark:bg-accent-900/20 rounded-lg">
          <Award className="w-8 h-8 text-accent-600 dark:text-accent-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">ISO 27001-2013 Certified</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Ensuring the highest standards of information security management</p>
          </div>
        </div>
      </div>

      {/* Expertise Areas */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Specific Areas of Expertise</h3>
        <div className="space-y-4">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-500 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{area}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderApproach = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Approach Introduction */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Approach</h3>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
          In today's world, financial risk, market instability and regulatory changes can make it difficult for a company to manage their Life, General or Health Insurance, retirement and benefit programs. This is especially those that align with business goals and optimize results for all stakeholders.
        </p>
        
        <div className="bg-gradient-to-r from-accent-50 to-blue-50 dark:from-accent-900/20 dark:to-blue-900/20 rounded-xl p-6">
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What Makes Us Different</h4>
          <p className="text-slate-700 dark:text-slate-300">Our unique combination of deep expertise, unwavering integrity, client focus, and quality culture sets us apart in the industry.</p>
        </div>
      </div>

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
    </motion.div>
  );

  const renderManagement = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Management Section */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Management</h3>
        
        {/* Chitra Jayasimha Profile */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Photo */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="w-full aspect-square bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30 rounded-2xl flex items-center justify-center">
                <Users className="w-20 h-20 text-accent-600 dark:text-accent-500" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Chitra Jayasimha</h4>
              <p className="text-accent-600 dark:text-accent-500 font-semibold text-lg mb-4">Founder & CEO</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-300">FIA</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-300">FIAI</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-300">FIII</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-medium text-orange-800 dark:text-orange-300">35+ Years</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Chitra is a Senior Consulting Actuary and Founder of Universal Actuaries and Benefit Consultants with 35 plus years of experience in Life Insurance, General Insurance, Health Insurance, Pension, Retirement and Benefits.
              </p>
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                She is a Fellow of the Institute and Faculty of Actuaries, UK (FIA), Fellow of the Institute of Actuaries of India (FIAI) and Fellow of the Insurance Institute of India (FIII). She is a member of the Advisory Group on Pension, Employee Benefits and Social Security Schemes of the Institute of Actuaries of India. She is also the appointed actuary of Samina Life, Nepal.
              </p>
            </div>
          </div>
        </div>
        
        {/* Experience Details */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Professional Experience</h5>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
              <h6 className="font-bold text-slate-900 dark:text-white mb-3">Insurance Expertise</h6>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Extensive work in Life Insurance, General Insurance, Health Insurance & Reinsurance business including costing, pricing, basis for terms of trade & experience analysis, Valuation of Liabilities, Embedded Value calculations, Analysis of surplus, Economic Capital and Life underwriting.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
              <h6 className="font-bold text-slate-900 dark:text-white mb-3">Employee Benefits</h6>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Extensive experience in Employee Benefits in both funding and accounting Actuarial Valuations under Indian GAAP, IFRS, US GAAP & other country Specific local GAAPs for Sri Lanka, Pakistan, Bangladesh, Nepal, Thailand, Indonesia, Middle East, Philippines, Australia & Turkey.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
              <h6 className="font-bold text-slate-900 dark:text-white mb-3">Benefits Consulting</h6>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Worked for large M&A deals, due diligence of statutory and other benefits, Retirement solutions, B-to-B financial wellness, Benefits Design, Redesigns, etc.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
              <h6 className="font-bold text-slate-900 dark:text-white mb-3">Previous Organizations</h6>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Worked in the past for MNC firms including Aon Consulting, Mercer Consulting, Swiss Re India, Paternoster (UK), ING Life and LIC of India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
              About Universal Actuaries and Benefit Consultants
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Excellence in <br />
              <span className="text-accent-600 dark:text-accent-500">Actuarial Consulting</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              ISO 27001-2013 certified firm with 80+ years of combined experience, 
              serving clients across India and worldwide with unwavering commitment to quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white dark:bg-dark-card border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-accent-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-accent-100 dark:hover:bg-accent-900/30'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'approach' && renderApproach()}
          {activeTab === 'management' && renderManagement()}
        </div>
      </section>
    </div>
  );
};