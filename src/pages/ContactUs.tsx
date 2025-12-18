import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { optimizeImage } from '../utils/imageUtils';
import { ScrollReveal, MagneticButton } from '../components/PageTransition';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Building2,
  Globe,
  Users,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

/**
 * Contact Us Page Component
 */
export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    service: 'General Inquiry'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const offices = [
    {
      city: "Mumbai",
      address: "Universal Actuaries &amp; Benefit Consultants 1112-A, C Wing, Kailas Business Park, Veer Savarkar Marg, Park Site, Vikhroli (West)",
      postalCode: "Mumbai – 400079 Maharashtra, India",
      phone: "+91 22 49632112",
      email: "universalactuaries@uabc.co.in",
      timezone: "IST",
      image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Reach our Mumbai headquarters",
      contact: "+91 22 49632112",
      availability: "Mon-Fri 9AM-6PM IST"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Corporate enquiries",
      contact: "universalactuaries@uabc.co.in",
      availability: "24/7 Inbox"
    },
    {
      icon: Mail,
      title: "Email (Chitra Jayasimha)",
      description: "Direct contact",
      contact: "chitra.jayasimha@uabc.co.in",
      availability: "Mon-Fri 9AM-6PM IST"
    }
  ];

  const services = [
    'General Inquiry',
    'Actuarial Consulting',
    'Risk Management',
    'Financial Modeling',
    'Regulatory Compliance',
    'Training & Development',
    'Partnership Opportunities'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Message Sent Successfully!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                company: '',
                subject: '',
                message: '',
                service: 'General Inquiry'
              });
            }}
            className="px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition-colors"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

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
              Get In Touch
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
              Let's Start a <br />
              <span className="text-accent-600 dark:text-accent-500">Conversation</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Ready to transform your risk management approach? Our team of experts 
              is here to help you navigate complex actuarial challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
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
              Contact Methods
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Choose Your Preferred Way to Connect
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-card p-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-accent-600 dark:text-accent-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{method.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{method.description}</p>
                  <div className="text-accent-600 dark:text-accent-500 font-medium mb-2">{method.contact}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{method.availability}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form and Info */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Service of Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-accent-600 text-white rounded-lg font-bold hover:bg-accent-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch Directly</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Universal Actuaries and Benefit Consultants.</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Universal Actuaries &amp; Benefit Consultants 1112-A, C Wing, Kailas Business Park, Veer Savarkar Marg, Park Site, Vikhroli (West)<br />
                        Mumbai – 400079 Maharashtra, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h4>
                      <p className="text-slate-600 dark:text-slate-400">+91-9987-769-877 (Chitra Jayasimha)</p>
                      <p className="text-slate-600 dark:text-slate-400">+91 22 49632112</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Email</h4>
                      <p className="text-slate-600 dark:text-slate-400">chitra.jayasimha@uabc.co.in</p>
                      <p className="text-slate-600 dark:text-slate-400">universalactuaries@uabc.co.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent-600 dark:text-accent-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Business Hours</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                        Saturday: 10:00 AM - 2:00 PM IST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Facebook, href: "#", label: "Facebook" }
                  ].map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center hover:bg-accent-600 hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
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
              Global Presence
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Our Office Locations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-bg rounded-xl overflow-hidden shadow-lg"
              >
                <img 
                  src={optimizeImage(office.image, 400)}
                  alt={office.city}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{office.city}</h3>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div>{office.address}</div>
                        <div>{office.postalCode}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Timezone: {office.timezone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Common Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How quickly can you start a project?",
                answer: "We can typically begin most projects within 1-2 weeks of initial consultation, depending on scope and team availability."
              },
              {
                question: "Do you work with international clients?",
                answer: "Yes, we serve clients globally through our offices in New York, London, Singapore, and Toronto, with expertise in local regulations."
              },
              {
                question: "What is your typical project timeline?",
                answer: "Project timelines vary based on complexity, ranging from 2-4 weeks for standard analyses to 3-6 months for comprehensive implementations."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Absolutely. We offer various support packages including ongoing consultation, model updates, and training for your team."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card p-6 rounded-xl mb-4 shadow-lg"
              >
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};