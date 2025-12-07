import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { optimizeImage } from '../utils/imageUtils';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Award, 
  Heart,
  Coffee,
  Briefcase,
  GraduationCap,
  Globe,
  Zap,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

/**
 * Careers Page Component
 */
export const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = ['All', 'Actuarial', 'Data Science', 'Consulting', 'Risk Management', 'Technology'];
  const locations = ['All', 'New York', 'London', 'Singapore', 'Toronto', 'Remote'];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Actuarial Analyst",
      department: "Actuarial",
      location: "New York",
      type: "Full-time",
      experience: "3-5 years",
      salary: "$85k - $120k",
      description: "Lead actuarial modeling and analysis for our insurance clients, focusing on pricing and reserving.",
      requirements: ["FSA or near FSA", "3+ years experience", "Advanced Excel/R skills"],
      featured: true
    },
    {
      id: 2,
      title: "Data Scientist - Risk Analytics",
      department: "Data Science",
      location: "London",
      type: "Full-time",
      experience: "2-4 years",
      salary: "£60k - £85k",
      description: "Develop machine learning models for risk assessment and predictive analytics.",
      requirements: ["Master's in Data Science", "Python/R proficiency", "ML experience"],
      featured: true
    },
    {
      id: 3,
      title: "Actuarial Consultant",
      department: "Consulting",
      location: "Singapore",
      type: "Full-time",
      experience: "5+ years",
      salary: "S$120k - S$160k",
      description: "Provide actuarial consulting services to clients across the Asia-Pacific region.",
      requirements: ["FSA qualification", "Client-facing experience", "Regional expertise"],
      featured: false
    },
    {
      id: 4,
      title: "Risk Management Specialist",
      department: "Risk Management",
      location: "Toronto",
      type: "Full-time",
      experience: "3-6 years",
      salary: "C$90k - C$125k",
      description: "Develop and implement enterprise risk management frameworks for financial institutions.",
      requirements: ["Risk management certification", "Banking experience", "Regulatory knowledge"],
      featured: true
    },
    {
      id: 5,
      title: "Junior Actuarial Analyst",
      department: "Actuarial",
      location: "Remote",
      type: "Full-time",
      experience: "0-2 years",
      salary: "$65k - $80k",
      description: "Entry-level position supporting actuarial analysis and reporting functions.",
      requirements: ["Actuarial degree", "Exam progress", "Strong analytical skills"],
      featured: false
    },
    {
      id: 6,
      title: "Technology Product Manager",
      department: "Technology",
      location: "New York",
      type: "Full-time",
      experience: "4-7 years",
      salary: "$110k - $150k",
      description: "Lead product development for our actuarial technology platform.",
      requirements: ["Product management experience", "Technical background", "Agile methodology"],
      featured: false
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs."
    },
    {
      icon: TrendingUp,
      title: "Professional Growth",
      description: "Continuous learning opportunities, conference attendance, and career advancement paths."
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, and generous vacation time."
    },
    {
      icon: Award,
      title: "Exam Support",
      description: "Full support for actuarial exams including study time, materials, and bonuses."
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Market-leading salaries, performance bonuses, and equity participation."
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Work with international teams and opportunities for global assignments."
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "We believe the best results come from diverse teams working together."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "We encourage creative thinking and embrace new technologies and methodologies."
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning",
      description: "We invest in our people's growth and provide resources for ongoing education."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Our work helps organizations worldwide manage risk and make better decisions."
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesLocation && matchesSearch;
  });

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
              Join Our Team
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Build Your Career in <br />
              <span className="text-accent-600 dark:text-accent-500">Actuarial Excellence</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Join a team of world-class actuaries and data scientists who are shaping the future 
              of risk management and financial modeling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
                Why Universal Actuarials
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                Where Talent Meets <br />
                <span className="text-slate-500">Opportunity</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                At Universal Actuarials, we don't just offer jobs – we provide careers that challenge, 
                inspire, and reward. Our team of experts works on cutting-edge projects that make a 
                real impact in the financial services industry.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-accent-600 dark:text-accent-500 mb-2">150+</div>
                  <div className="text-slate-600 dark:text-slate-400">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 dark:text-accent-500 mb-2">25+</div>
                  <div className="text-slate-600 dark:text-slate-400">Countries</div>
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
                src={optimizeImage("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800", 800)}
                alt="Our team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Company Values */}
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
              What Drives Our Success
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
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Employee Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Comprehensive Benefits Package
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-bg p-6 rounded-xl"
                >
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
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
              Open Positions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Current Opportunities
            </h2>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
            <div className="relative flex-grow max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 ${
                  job.featured ? 'border-accent-500' : 'border-transparent'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                      {job.featured && (
                        <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-500 text-xs font-bold rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <button className="px-6 py-3 bg-accent-600 text-white rounded-lg font-bold hover:bg-accent-700 transition-colors flex items-center gap-2">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No positions found matching your criteria.
              </p>
            </div>
          )}
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
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and let's explore opportunities together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-block px-8 py-4 bg-white text-accent-600 rounded-md font-bold text-lg hover:bg-accent-50 transition-colors shadow-lg text-center">
                Submit Your Resume
              </Link>
              <Link to="/contact" className="inline-block px-8 py-4 border-2 border-white text-white rounded-md font-bold text-lg hover:bg-white hover:text-accent-600 transition-colors text-center">
                Contact HR Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};