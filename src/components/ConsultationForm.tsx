import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Mail, Phone, User, Building2, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

/**
 * Schedule Consultation Form Component
 * Sends consultation requests via EmailJS to universalactuaries@uabc.co.in
 */
export const ConsultationForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_number: '',
    company_name: '',
    message: '',
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send email via EmailJS
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.contact_number.trim() || !formData.message.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    // Validate phone format (basic)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(formData.contact_number) || formData.contact_number.replace(/\D/g, '').length < 7) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a valid phone number.'
      });
      return;
    }

    setFormStatus({ type: 'loading', message: 'Sending your request...' });

    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      // Success
      setFormStatus({
        type: 'success',
        message: 'Consultation request sent successfully! We\'ll get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        contact_number: '',
        company_name: '',
        message: '',
      });

      // Reset form ref
      if (formRef.current) {
        formRef.current.reset();
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: 'idle', message: '' });
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus({
        type: 'error',
        message: 'Failed to send request. Please try again or contact us directly.'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Schedule a Consultation
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Let's discuss how we can help your organization achieve its goals.
          </p>
        </div>

        {/* Status Messages */}
        {formStatus.type !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 p-4 sm:p-5 rounded-lg flex items-start gap-3 ${
              formStatus.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : formStatus.type === 'error'
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
            }`}
          >
            {formStatus.type === 'success' && (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            )}
            {formStatus.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            )}
            {formStatus.type === 'loading' && (
              <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5 animate-spin" />
            )}
            <p
              className={`text-sm sm:text-base ${
                formStatus.type === 'success'
                  ? 'text-green-800 dark:text-green-200'
                  : formStatus.type === 'error'
                  ? 'text-red-800 dark:text-red-200'
                  : 'text-blue-800 dark:text-blue-200'
              }`}
            >
              {formStatus.message}
            </p>
          </motion.div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={sendEmail} className="space-y-5 sm:space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="contact_number" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="tel"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              required
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
            />
          </div>

          {/* Company (Optional) */}
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company <span className="text-slate-400">(Optional)</span>
              </span>
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Your company name"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message <span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your consultation needs..."
              rows={5}
              required
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={formStatus.type === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-6 py-3 sm:py-4 font-bold text-white rounded-lg text-base sm:text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              formStatus.type === 'loading'
                ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]'
            }`}
          >
            {formStatus.type === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Schedule Consultation'
            )}
          </motion.button>

          {/* Required Fields Note */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
            <span className="text-red-500">*</span> Indicates required fields
          </p>
        </form>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center">
            We respect your privacy. Your information will only be used to contact you about your consultation request.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
