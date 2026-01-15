import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Footer
 */
export const Footer = () => {
  return (
    <footer className="snap-start bg-slate-950 text-white py-8 sm:py-12 lg:py-16 border-t border-white/10 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
           <div className="col-span-1">
             <div className="flex items-center gap-3 mb-4 sm:mb-6 select-none">
                {/* Logo for Footer - Enlarged without effects */}
                <img 
                  src="/UABC Logo.png"
                  alt="UABC Logo"
                  className="h-12 sm:h-16 object-contain"
                />
             </div>
             <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
               Universal Actuaries is a premier consulting firm dedicated to providing top-tier actuarial and strategic solutions globally.
             </p>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-3 sm:mb-6 text-sm sm:text-base">Services</h4>
             <ul className="space-y-2 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Risk Management</Link></li>
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Financial Advisory</Link></li>
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Digital Strategy</Link></li>
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Cyber Security</Link></li>
             </ul>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-3 sm:mb-6 text-sm sm:text-base">Company</h4>
             <ul className="space-y-2 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
               <li><Link to="/about" className="hover:text-accent-500 transition-colors">About Us</Link></li>
               <li><Link to="/careers" className="hover:text-accent-500 transition-colors">Careers</Link></li>
               <li><Link to="/insights" className="hover:text-accent-500 transition-colors">News & Insights</Link></li>
               <li><Link to="/contact" className="hover:text-accent-500 transition-colors">Contact</Link></li>
             </ul>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-3 sm:mb-6 text-sm sm:text-base">Newsletter</h4>
             <p className="text-slate-500 text-xs sm:text-sm mb-3 sm:mb-4">Subscribe to our newsletter for the latest updates.</p>
             <div className="flex flex-col sm:flex-row gap-2">
               <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-md sm:rounded-l-md px-3 sm:px-4 py-2 w-full text-xs sm:text-sm text-white focus:outline-none focus:border-accent-500 order-2 sm:order-1" />
               <button className="bg-accent-600 hover:bg-accent-500 px-3 sm:px-4 py-2 rounded-md sm:rounded-r-md transition-colors text-white order-1 sm:order-2 sm:w-auto w-full flex items-center justify-center">
                 <ArrowRight className="w-4 h-4" />
               </button>
             </div>
           </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-xs text-slate-600">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} Universal Actuaries. All rights reserved.
          </div>
          <div className="flex gap-4 sm:gap-6 text-center sm:text-right">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
