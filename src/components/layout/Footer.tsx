import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { insightsService } from '../../admin/services/insightsService';

/**
 * Footer
 */
export const Footer = () => {
  const [insightCategories, setInsightCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await insightsService.getPublicInsights({
          limit: 1000,
          sort: 'newest'
        });

        if (response && response.insights) {
          const uniqueCategories = [
            ...new Set(response.insights.map((insight: any) => insight.category))
          ];
          setInsightCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryToSlug = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <footer
      id="footer"
      className="bg-slate-950 text-white py-6 sm:py-10 lg:py-16 border-t border-white/10 relative z-10"
    >
      {/* MAIN CONTAINER FIXED */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* GRID FIXED */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10 mb-10">

          {/* LOGO */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-3 mb-6 select-none">
              <img
                src="/UABC Logo.png"
                alt="UABC Logo"
                className="h-14 object-contain"
              />
            </div>

            <p className="text-slate-500 text-sm leading-relaxed">
              Universal Actuaries is a premier consulting firm dedicated to providing
              top-tier actuarial and strategic solutions globally.
            </p>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">About</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/about" className="hover:text-accent-500">Overview</Link></li>
              <li><Link to="/about" className="hover:text-accent-500">Our Approach</Link></li>
              <li><Link to="/about" className="hover:text-accent-500">Management</Link></li>
              <li><Link to="/about" className="hover:text-accent-500">Success Stories</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Services</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/services" className="hover:text-accent-500">Employee Benefits</Link></li>
              <li><Link to="/services" className="hover:text-accent-500">Insurance Consulting</Link></li>
              <li><Link to="/services" className="hover:text-accent-500">Retirement Consulting</Link></li>
              <li><Link to="/services" className="hover:text-accent-500">Benefit Consulting</Link></li>
            </ul>
          </div>

          {/* INSIGHTS */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Insights</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link to="/insights" className="hover:text-accent-500">
                  All Insights
                </Link>
              </li>

              {insightCategories.length > 0 ? (
                insightCategories.map((category) => (
                  <li key={category}>
                    <Link
                      to={`/insights/${categoryToSlug(category)}`}
                      className="hover:text-accent-500"
                    >
                      {category}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/insights">Market Updates</Link></li>
                  <li><Link to="/insights">Trends & Analysis</Link></li>
                  <li><Link to="/insights">Case Studies</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Newsletter</h4>

            <p className="text-slate-500 text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>

            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
              />

              <button className="bg-accent-600 hover:bg-accent-500 px-4 py-2 rounded-md transition-colors text-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>© 2018 Universal Actuaries. All rights reserved.</div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};