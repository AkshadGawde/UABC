import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { insightsService } from '../../admin/services/insightsService';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * Navigation Bar
 */
export const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [insightCategories, setInsightCategories] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch insight categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await insightsService.getPublicInsights({
          limit: 1000,
          sort: 'newest'
        });
        
        if (response && response.insights) {
          const uniqueCategories = [...new Set(response.insights.map((insight: any) => insight.category))];
          setInsightCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  // Helper function to convert category name to URL slug
  const categoryToSlug = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };

  const navLinks = [
    { 
      name: 'Home', 
      path: '/' 
    },
    { 
      name: 'About Us', 
      path: '/about',
      dropdown: [
        { name: 'Overview', path: '/about' },
        { name: 'Our Approach', path: '/about/approach' },
        { name: 'Management', path: '/about/management' },
        { name: 'Success Stories', path: '/about/success-stories' }
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Employee Benefits', path: '/services/employee-benefits' },
        { name: 'Insurance Consulting', path: '/services/insurance-consulting' },
        { name: 'Retirement Consulting', path: '/services/retirement-consulting' },
        { name: 'Benefit Consulting', path: '/services/benefit-consulting' }
      ]
    },
    { 
      name: 'Insights', 
      path: '/insights',
      dropdown: insightCategories.length > 0 
        ? insightCategories.map(category => ({
            name: category,
            path: `/insights/${categoryToSlug(category)}`
          }))
        : []
    },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 bg-white dark:bg-dark-bg ${isScrolled 
          ? 'py-3 shadow-md shadow-black/5' 
          : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <Logo className="h-8 sm:h-10" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 flex-wrap justify-end">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to={link.path}
                className={`text-xs sm:text-sm lg:text-sm font-medium transition-colors relative group uppercase tracking-wide flex items-center gap-1 ${
                  location.pathname === link.path || (link.dropdown && link.dropdown.some(item => location.pathname === item.path))
                    ? 'text-accent-600 dark:text-accent-500' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500'
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-3 h-3" />}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent-500 transition-all ${
                  location.pathname === link.path || (link.dropdown && link.dropdown.some(item => location.pathname === item.path))
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`} />
              </Link>

              {/* Dropdown Menu */}
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`block px-4 py-3 text-sm transition-colors ${
                            location.pathname === item.path
                              ? 'text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/20'
                              : 'text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />

          <Link 
            to="/contact"
            className="px-6 py-2 bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transform hover:-translate-y-0.5"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          <button 
            className="text-slate-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ transformOrigin: 'top' }}
            className="md:hidden bg-white dark:bg-dark-card border-b border-slate-200 dark:border-white/10 overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col p-4 sm:p-6 gap-3 sm:gap-4">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-1">
                  {link.dropdown ? (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`text-left font-medium uppercase tracking-wide transition-colors flex-1 text-sm sm:text-base ${
                            location.pathname === link.path || (link.dropdown && link.dropdown.some(item => location.pathname === item.path))
                              ? 'text-accent-600 dark:text-accent-500' 
                              : 'text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500'
                          }`}
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => setMobileDropdown(mobileDropdown === link.name ? null : link.name)}
                          className={`p-1 transition-colors ${
                            location.pathname === link.path || (link.dropdown && link.dropdown.some(item => location.pathname === item.path))
                              ? 'text-accent-600 dark:text-accent-500' 
                              : 'text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500'
                          }`}
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {mobileDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-2 pl-4 border-l-2 border-accent-400 dark:border-accent-600 mt-2"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setMobileDropdown(null);
                                }}
                                className={`text-sm sm:text-base transition-colors ${
                                  location.pathname === item.path
                                    ? 'text-accent-600 dark:text-accent-400 font-medium'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400'
                                }`}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link 
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-left font-medium uppercase tracking-wide transition-colors text-sm sm:text-base ${
                        location.pathname === link.path 
                          ? 'text-accent-600 dark:text-accent-500' 
                          : 'text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="border-t border-slate-200 dark:border-white/10 pt-4 mt-2">
                <Link 
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider transition-all text-center block"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
