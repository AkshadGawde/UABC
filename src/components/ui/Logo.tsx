import React from 'react';

/**
 * Custom Logo Component
 */
export const Logo = ({ className = "h-8" }: { className?: string }) => (
  <div className="flex items-center gap-3 select-none">
    {/* Geometric Icon based on the provided image */}
    <div className={`relative ${className} aspect-[4/5] flex items-center justify-center`}>
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto overflow-visible">
        {/* The Navy "U" shape - adaptive fill */}
        <path 
          d="M20 0 V60 C20 85 35 100 60 100 C75 100 85 92 92 80 L75 80 C70 88 65 85 60 85 C50 85 40 75 40 60 V0 H20 Z" 
          className="fill-brand-900 dark:fill-brand-400 drop-shadow-lg transition-colors duration-300"
        />
        <path 
          d="M80 0 V60 H100 V0 H80 Z" 
          className="fill-brand-900 dark:fill-brand-400 transition-colors duration-300"
        />
        
        {/* The Red Flash/A shape cutting through */}
        <path 
          d="M10 90 L40 50 L65 50 L25 105 Z" 
          fill="#ef4444" 
          className="drop-shadow-md"
        />
        <path 
          d="M50 40 L80 0 L100 0 L60 55 Z" 
          fill="#ef4444" 
        />
      </svg>
    </div>
    
    <div className="flex flex-col justify-center leading-none">
      <span className="text-lg md:text-xl font-bold tracking-widest text-brand-950 dark:text-brand-100 uppercase transition-colors duration-300">
        Universal
      </span>
      <span className="text-sm md:text-base font-bold tracking-[0.2em] text-accent-600 dark:text-accent-500 uppercase transition-colors duration-300">
        Actuaries
      </span>
    </div>
  </div>
);
