import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Footer
 */
export const Footer = () => {
  return (
    <footer className="snap-start bg-slate-950 text-white py-16 border-t border-white/10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
           <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-6 select-none grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all">
                {/* Simplified Logo for Footer */}
                <div className="relative h-8 w-auto aspect-[4/5] flex items-center justify-center">
                  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
                    <path d="M20 0 V60 C20 85 35 100 60 100 C75 100 85 92 92 80 L75 80 C70 88 65 85 60 85 C50 85 40 75 40 60 V0 H20 Z" fill="#6366f1"/>
                    <path d="M80 0 V60 H100 V0 H80 Z" fill="#6366f1"/>
                    <path d="M10 90 L40 50 L65 50 L25 105 Z" fill="#ef4444"/>
                    <path d="M50 40 L80 0 L100 0 L60 55 Z" fill="#ef4444"/>
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-widest uppercase">UA</span>
             </div>
             <p className="text-slate-500 text-sm leading-relaxed">
               Universal Acutrials is a premier consulting firm dedicated to providing top-tier actuarial and strategic solutions globally.
             </p>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-6">Services</h4>
             <ul className="space-y-3 text-slate-400 text-sm">
               <li><a href="#" className="hover:text-accent-500 transition-colors">Risk Management</a></li>
               <li><a href="#" className="hover:text-accent-500 transition-colors">Financial Advisory</a></li>
               <li><a href="#" className="hover:text-accent-500 transition-colors">Digital Strategy</a></li>
               <li><a href="#" className="hover:text-accent-500 transition-colors">Cyber Security</a></li>
             </ul>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-6">Company</h4>
             <ul className="space-y-3 text-slate-400 text-sm">
               <li><a href="#" className="hover:text-accent-500 transition-colors">About Us</a></li>
               <li><a href="#" className="hover:text-accent-500 transition-colors">Careers</a></li>
               <li><a href="#" className="hover:text-accent-500 transition-colors">News & Insights</a></li>
               <li><a href="#" className="hover:text-accent-500 transition-colors">Contact</a></li>
             </ul>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-6">Newsletter</h4>
             <p className="text-slate-500 text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
             <div className="flex">
               <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-l-md px-4 py-2 w-full text-sm text-white focus:outline-none focus:border-accent-500" />
               <button className="bg-accent-600 hover:bg-accent-500 px-4 py-2 rounded-r-md transition-colors text-white">
                 <ArrowRight className="w-4 h-4" />
               </button>
             </div>
           </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <div>
            © {new Date().getFullYear()} Universal Acutrials. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
