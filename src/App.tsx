import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home, AboutUs, ServicesPage, Insights, Careers, ContactUs } from './pages';

/**
 * Main App Component
 */
const App = () => {
  const [theme, setTheme] = useState(() => {
    // Default to dark mode to match reference, but respect saved preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div className="antialiased min-h-screen font-sans selection:bg-accent-500/30 selection:text-accent-900 dark:selection:text-white">
        <ScrollToTop />
        <ScrollProgress />
        <Navbar 
          isDark={theme === 'dark'} 
          toggleTheme={toggleTheme}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
