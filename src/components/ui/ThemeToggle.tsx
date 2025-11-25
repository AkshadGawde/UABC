import React from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * Theme Toggle Component
 */
export const ThemeToggle = ({ isDark, toggle }: { isDark: boolean, toggle: () => void }) => {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-all text-slate-700 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-accent-500"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
