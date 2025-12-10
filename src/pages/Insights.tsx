import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { optimizeImage } from '../utils/imageUtils';
import { insightsService } from '../admin/services/insightsService';

// Extended interface for insights that may include PDF data
interface Insight {
  _id?: string;
  id?: string;
  title: string;
  excerpt: string;
  content?: string;
  author?: string;
  category: string;
  tags?: string[];
  readTime?: number;
  image?: string;
  featuredImage?: string;
  published: boolean;
  featured?: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
  slug?: string;
  // PDF-specific fields
  pdfData?: string;
  pdfFilename?: string;
  pdfSize?: number;
  publishDate?: string;
}
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  FileText, 
  BarChart3,
  Search,
  Filter,
  Eye,
  Download,
  Share2,
  Loader2
} from 'lucide-react';

/**
 * Insights Page Component
 */
export const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic categories based on actual data
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch published insights
      const response = await insightsService.getPublicInsights({
        limit: 50,
        sort: 'newest'
      });
      
      const publishedInsights = response.insights.filter(insight => insight.published);
      setInsights(publishedInsights);
      
      // Extract unique categories from insights
      const uniqueCategories = [...new Set(publishedInsights.map(insight => insight.category))];
      setCategories(uniqueCategories);
      
      // Set first category as default if no category selected
      if (!selectedCategory || selectedCategory === 'All') {
        setSelectedCategory(uniqueCategories[0] || '');
      }
      
    } catch (error) {
      console.error('Failed to load insights:', error);
      setError('Failed to load insights. Please try again later.');
      setInsights([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredInsights = insights.filter(insight => {
    const matchesCategory = !selectedCategory || insight.category === selectedCategory;
    
    // Date filtering
    let matchesDate = true;
    if (dateRange.start || dateRange.end) {
      const insightDate = new Date(insight.publishDate || insight.publishedAt || insight.createdAt);
      if (dateRange.start) {
        const startDate = new Date(dateRange.start);
        matchesDate = matchesDate && insightDate >= startDate;
      }
      if (dateRange.end) {
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Include the entire end date
        matchesDate = matchesDate && insightDate <= endDate;
      }
    }
    
    return matchesCategory && matchesDate;
  });

  const featuredInsights = insights.filter(insight => insight.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatViews = (views: number | undefined) => {
    if (!views) return '0';
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const getReadTime = (insight: Insight) => {
    return insight.readTime ? `${insight.readTime} min read` : '5 min read';
  };

  const getInsightDate = (insight: Insight) => {
    return insight.publishedAt || insight.createdAt;
  };

  const handleInsightClick = (insight: Insight) => {
    // For PDF insights, open the PDF directly
    if (insight.pdfFilename) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      window.open(`${apiUrl}/pdf-insights/${insight._id || insight.id}/pdf`, '_blank');
    } else {
      // For regular insights, navigate to detail page (implement later)
      console.log('Navigate to insight detail:', insight.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent-600" />
          <p className="text-slate-600 dark:text-slate-400">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">Error Loading Insights</h2>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <button 
              onClick={loadInsights}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg relative">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-200/10 rounded-full" />
          <div className="absolute bottom-10 -left-10 w-24 h-24 bg-accent-300/8 rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Insights & Research
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Expert Analysis & <br />
              <span className="text-accent-600 dark:text-accent-500 hover:scale-105 inline-block transition-transform duration-300 cursor-default">
                Market Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Stay ahead with our latest research, market analysis, and thought leadership 
              in actuarial science and risk management.
            </p>
            
            <div className="mt-6 text-accent-600 dark:text-accent-500">
              <span className="text-lg font-medium">{insights.length} insights published</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Insights Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Minimal Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-12"
          >
            {/* Category Filter */}
            {categories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Category:</span>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group ${
                        selectedCategory === category
                          ? 'bg-accent-600 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/10'
                      }`}
                    >
                      <span className="group-hover:scale-105 inline-block transition-transform duration-200">
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Date Range Filter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Date Range:</span>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 hover:border-accent-300 dark:hover:border-accent-600"
                  placeholder="From"
                />
                <span className="text-slate-400">—</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 hover:border-accent-300 dark:hover:border-accent-600"
                  placeholder="To"
                />
                {(dateRange.start || dateRange.end) && (
                  <button
                    onClick={() => setDateRange({ start: '', end: '' })}
                    className="ml-2 px-3 py-2 text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    Clear
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Insights Grid */}
          {filteredInsights.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
              {filteredInsights.map((insight, index) => {
                const isFeatured = insight.featured;
                const isPDF = !!insight.pdfFilename;
                return (
                  <motion.article
                    key={insight._id || insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full flex flex-col relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      isFeatured 
                        ? 'bg-gradient-to-br from-white to-accent-50 dark:from-dark-card dark:to-accent-900/10 border-2 border-accent-200 dark:border-accent-700 lg:col-span-2 xl:col-span-2 2xl:col-span-1 hover:border-accent-300 dark:hover:border-accent-600' 
                        : 'bg-white dark:bg-dark-card border border-slate-100 dark:border-slate-700 hover:border-accent-200 dark:hover:border-accent-800'
                    }`}
                    onClick={() => handleInsightClick(insight)}
                  >
                    <div className="relative overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      
                      <img 
                        src={optimizeImage(insight.image || insight.featuredImage, isFeatured ? 600 : 400)}
                        alt={insight.title}
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                          isFeatured ? 'h-64' : 'h-48'
                        }`}
                      />
                      <div className="absolute top-4 left-4 flex gap-2 z-20">
                        <span className="px-3 py-1 bg-accent-600 text-white text-xs font-bold rounded-full transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                          {insight.category}
                        </span>
                        {isFeatured && (
                          <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1 transform group-hover:scale-110 group-hover:-rotate-1 transition-all duration-300">
                            <TrendingUp className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
                            Featured
                          </span>
                        )}
                      </div>
                      {isPDF && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-full flex items-center gap-1 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                            <FileText className="w-3 h-3 group-hover:scale-125 transition-transform duration-300" />
                            PDF
                          </span>
                        </div>
                      )}
                    </div>
                    <div className={`flex flex-col flex-1 ${isFeatured ? 'p-8' : 'p-6'} relative`}>
                      <h3 className={`font-bold text-slate-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-500 transition-colors duration-300 line-clamp-2 ${
                          isFeatured ? 'text-xl' : 'text-lg'
                        }`}
                      >
                        {insight.title}
                      </h3>
                      
                      <p className={`text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-1 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300 ${
                          isFeatured ? 'text-base' : 'text-sm'
                        }`}
                      >
                        {insight.excerpt}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`text-slate-500 dark:text-slate-400 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                            <span className="font-medium group-hover:text-accent-600 transition-colors duration-300">{insight.author || 'Unknown Author'}</span>
                          </div>
                          <div className={`flex items-center gap-3 text-slate-500 dark:text-slate-400 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                            <div className="flex items-center gap-1 group-hover:text-blue-600 transition-colors duration-300">
                              <Calendar className="w-3 h-3" />
                              {formatDate(insight.publishDate || insight.publishedAt || insight.createdAt)}
                            </div>
                            <div className="flex items-center gap-1 group-hover:text-green-600 transition-colors duration-300">
                              <Eye className="w-3 h-3" />
                              {formatViews(insight.views)}
                            </div>
                          </div>
                        </div>
                        {isFeatured && (
                          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-2 text-accent-600 dark:text-accent-500 font-medium group-hover:gap-3 transition-all duration-300">
                              <span>{isPDF ? 'View PDF' : 'Read More'}</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-white dark:bg-dark-card rounded-2xl p-12 shadow-sm border border-slate-100 dark:border-slate-700">
                <FileText className="w-20 h-20 mx-auto mb-6 text-slate-300 dark:text-slate-600" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {insights.length === 0 ? 'No Insights Available Yet' : 'No Results Found'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
                  {insights.length === 0 
                    ? 'Our research team is working on bringing you the latest insights.' 
                    : 'Try adjusting your date range or category filters.'
                  }
                </p>
                {insights.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-500 text-sm">
                    Check back soon for expert analysis and market intelligence.
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      setDateRange({ start: '', end: '' });
                      setSelectedCategory(categories[0] || '');
                    }}
                    className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -40, 40, 0],
              y: [0, 40, -40, 0],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 right-1/4 w-12 h-12 bg-white/5 rounded-full blur-lg"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            className="bg-gradient-to-r from-accent-600 via-accent-500 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            {/* Inner floating elements */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <FileText className="w-16 h-16 mx-auto mb-6 opacity-90" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  Stay Informed with Our Research
                </motion.span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto"
              >
                Get the latest insights, market analysis, and research updates delivered directly to your inbox.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <motion.input
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3)"
                  }}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
                />
                <motion.button 
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white text-accent-600 rounded-lg font-bold hover:bg-accent-50 transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.span
                    whileHover={{ x: 2 }}
                    className="relative z-10"
                  >
                    Subscribe
                  </motion.span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-accent-100 to-white"
                  />
                </motion.button>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm text-accent-200 mt-4"
              >
                No spam, unsubscribe at any time.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-24 bg-slate-50 dark:bg-dark-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Additional Resources
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Explore More Resources
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "White Papers",
                description: "In-depth research papers on critical actuarial topics.",
                count: "12 Papers"
              },
              {
                icon: BarChart3,
                title: "Market Reports",
                description: "Quarterly market analysis and industry benchmarks.",
                count: "4 Reports"
              },
              {
                icon: TrendingUp,
                title: "Case Studies",
                description: "Real-world applications and success stories.",
                count: "8 Studies"
              }
            ].map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-bg p-8 rounded-xl text-center hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-accent-600 dark:text-accent-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{resource.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{resource.description}</p>
                  <div className="text-accent-600 dark:text-accent-500 font-medium">{resource.count}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};