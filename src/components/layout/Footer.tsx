import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { insightsService } from '../../admin/services/insightsService';

/**
 * Footer
 */
export const Footer = () => {
  const [insightCategories, setInsightCategories] = useState<string[]>([]);

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
  return (
    <footer id="footer" className="bg-slate-950 text-white py-6 sm:py-10 lg:py-16 border-t border-white/10 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-10 lg:mb-12">
           <div className="col-span-2 sm:col-span-1 hidden sm:block">
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
           
           {/* <div>
             <h4 className="text-white font-bold mb-2 sm:mb-6 text-xs sm:text-base">Main</h4>
             <ul className="space-y-1 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
               <li><Link to="/" className="hover:text-accent-500 transition-colors">Home</Link></li>
               <li><Link to="/about" className="hover:text-accent-500 transition-colors">About Us</Link></li>
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Services</Link></li>
               <li><Link to="/insights" className="hover:text-accent-500 transition-colors">Insights</Link></li>
               <li><Link to="/careers" className="hover:text-accent-500 transition-colors">Careers</Link></li>
             </ul>
           </div> */}
           
           <div>
             <h4 className="text-white font-bold mb-2 sm:mb-6 text-xs sm:text-base">About</h4>
             <ul className="space-y-1 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
               <li><Link to="/about" className="hover:text-accent-500 transition-colors">Overview</Link></li>
               <li><Link to="/about" className="hover:text-accent-500 transition-colors">Our Approach</Link></li>
               <li><Link to="/about" className="hover:text-accent-500 transition-colors">Management</Link></li>
               <li><Link to="/about" className="hover:text-accent-500 transition-colors">Success Stories</Link></li>
             </ul>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-2 sm:mb-6 text-xs sm:text-base">Services</h4>
             <ul className="space-y-1 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Employee Benefits</Link></li>
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Insurance Consulting</Link></li>
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Retirement Consulting</Link></li>
               <li><Link to="/services" className="hover:text-accent-500 transition-colors">Benefit Consulting</Link></li>
             </ul>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-2 sm:mb-6 text-xs sm:text-base">Insights</h4>
             <ul className="space-y-1 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
               <li><Link to="/insights" className="hover:text-accent-500 transition-colors">All Insights</Link></li>
               {insightCategories.length > 0 ? (
                 insightCategories.map((category) => (
                   <li key={category}>
                     <Link to={`/insights/${categoryToSlug(category)}`} className="hover:text-accent-500 transition-colors">
                       {category}
                     </Link>
                   </li>
                 ))
               ) : (
                 <>
                   <li><Link to="/insights" className="hover:text-accent-500 transition-colors">Market Updates</Link></li>
                   <li><Link to="/insights" className="hover:text-accent-500 transition-colors">Trends & Analysis</Link></li>
                   <li><Link to="/insights" className="hover:text-accent-500 transition-colors">Case Studies</Link></li>
                 </>
               )}
             </ul>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-2 sm:mb-6 text-xs sm:text-base">Newsletter</h4>
             <p className="text-slate-500 text-xs sm:text-sm mb-2 sm:mb-4">Subscribe to our newsletter for the latest updates.</p>
             <div className="flex flex-col gap-2">
               <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-md px-2 sm:px-4 py-2 w-full text-xs sm:text-sm text-white focus:outline-none focus:border-accent-500" />
               <button className="bg-accent-600 hover:bg-accent-500 px-2 sm:px-4 py-2 rounded-md transition-colors text-white flex items-center justify-center text-sm sm:text-base">
                 <ArrowRight className="w-4 h-4" />
               </button>
             </div>
           </div>
        </div>
        
        <div className="border-t border-white/10 pt-4 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs text-slate-600">
          <div className="text-center sm:text-left">
            © 2018 Universal Actuaries. All rights reserved.
          </div>
          <div className="flex gap-2 sm:gap-6 text-center sm:text-right text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
