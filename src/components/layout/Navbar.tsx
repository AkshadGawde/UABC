import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';

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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Insights', path: '/insights' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark-bg/80 md:backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-3 shadow-lg shadow-brand-900/5 dark:shadow-brand-900/10' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 group">
          <Logo className="h-10" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-colors relative group uppercase tracking-wide ${
                location.pathname === link.path 
                  ? 'text-accent-600 dark:text-accent-500' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent-500 transition-all ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
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
            className="md:hidden bg-white dark:bg-dark-card border-b border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left font-medium uppercase tracking-wide transition-colors ${
                    location.pathname === link.path 
                      ? 'text-accent-600 dark:text-accent-500' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
