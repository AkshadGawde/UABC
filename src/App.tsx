import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Stats } from './components/sections/Stats';
import { Contact } from './components/sections/Contact';

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
    <div className="antialiased min-h-screen font-sans selection:bg-accent-500/30 selection:text-accent-900 dark:selection:text-white">
      <ScrollProgress />
      <Navbar isDark={theme === 'dark'} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
