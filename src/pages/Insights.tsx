import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { optimizeImage, getInsightImageUrl } from '../utils/imageUtils';
import { insightsService } from '../admin/services/insightsService';
import { ScrollReveal, StaggerReveal } from '../components/PageTransition';

// CSS for smooth scrolling optimization
const scrollOptimizationStyles = {
  scrollBehavior: 'smooth',
  overscrollBehavior: 'contain',
  WebkitOverflowScrolling: 'touch',
  transform: 'translateZ(0)', // Force hardware acceleration
  backfaceVisibility: 'hidden', // Prevent flickering
  perspective: '1000px' // Enable 3D rendering context
} as React.CSSProperties;

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
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon
} from 'lucide-react';

/**
 * Insights Page Component
 */
export const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [showToast, setShowToast] = useState(false);

  // Dynamic categories based on actual data
  const [categories, setCategories] = useState<string[]>([]);

  // Scroll optimization effect
  useEffect(() => {
    // Enable smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overscrollBehavior = 'contain';
    
    // Optimize for mobile
    if ('ontouchstart' in window) {
      document.body.style.WebkitOverflowScrolling = 'touch';
    }
    
    return () => {
      // Cleanup on unmount
      document.documentElement.style.scrollBehavior = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.WebkitOverflowScrolling = '';
    };
  }, []);

  useEffect(() => {
    loadInsights();
  }, [currentPage, selectedCategory]);

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch published insights with pagination and filtering
      const response = await insightsService.getPublicInsights({
        page: currentPage,
        limit: itemsPerPage,
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        sort: 'newest'
      });
      
      if (!response || !response.insights) {
        console.error('Invalid response format:', response);
        setError('Backend returned invalid data format. Please check server logs.');
        setInsights([]);
        setCategories(['All']);
        setLoading(false);
        return;
      }
      
      const publishedInsights = response.insights.filter(insight => insight.published);
      
      if (publishedInsights.length === 0 && currentPage === 1 && selectedCategory === 'All') {
        setError('No published insights available. Add some insights in the admin panel.');
      }
      
      setInsights(publishedInsights);
      setTotalPages(response.pagination?.pages || 1);
      
      // Extract unique categories only on first load
      if (currentPage === 1 && selectedCategory === 'All') {
        const allInsights = await insightsService.getPublicInsights({
          limit: 1000,
          sort: 'newest'
        });
        const uniqueCategories = ['All', ...new Set(allInsights.insights.map((insight: Insight) => insight.category))];
        setCategories(uniqueCategories);
      }
      
    } catch (error: any) {
      console.error('❌ Failed to load insights:', error);
      
      // Provide specific error messages
      let errorMessage = 'Failed to load insights. ';
      
      if (error.name === 'AbortError') {
        errorMessage += 'Request timeout - Backend took too long to respond. It may be waking up (Render cold start).';
      } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        errorMessage += 'Cannot connect to backend. Check if backend is running and CORS is configured.';
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Unknown error occurred. Check browser console for details.';
      }
      
      setError(errorMessage);
      setInsights([]);
      setCategories(['All']);
      setSelectedCategory('All');
    } finally {
      setLoading(false);
    }
  };

  const filteredInsights = insights.filter(insight => {
    const matchesCategory = selectedCategory === 'All' || insight.category === selectedCategory;
    
    // Search filtering
    const matchesSearch = !searchQuery || 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (insight.author && insight.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (insight.tags && insight.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
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
    
    return matchesCategory && matchesSearch && matchesDate;
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
      // Use development URL in dev mode
      const apiUrl = import.meta.env.VITE_API_URL || 'https://uabc.onrender.com/api';
      
      const pdfUrl = `${apiUrl}/pdf-insights/${insight._id || insight.id}/pdf`;
      console.log('Opening PDF:', pdfUrl);
      window.open(pdfUrl, '_blank');
    } else {
      // For regular insights, navigate to detail page (implement later)
      console.log('Navigate to insight detail:', insight.id);
    }
  };

  const copyPdfLink = (e: React.MouseEvent, insight: Insight) => {
    e.stopPropagation();
    // Use deployed backend API URL directly for sharing
    const apiUrl = import.meta.env.VITE_API_URL || 'https://uabc-backend.onrender.com/api';
    const shareableUrl = `${apiUrl}/pdf-insights/${insight._id || insight.id}/pdf`;
    
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }).catch(err => {
      console.error('Failed to copy link:', err);
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
    setSelectedCategory('All');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent-600" />
          <p className="text-slate-600 dark:text-slate-400">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://uabc.onrender.com/api';
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 border border-red-200 dark:border-red-800">
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3">Error Loading Insights</h2>
            <p className="text-red-600 dark:text-red-300 mb-4 text-sm">{error}</p>
            
            <div className="mb-4 p-4 bg-white dark:bg-slate-800 rounded border border-red-300 dark:border-red-700">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-mono">
                <strong>API URL:</strong> {apiUrl}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                <strong>Endpoint:</strong> {apiUrl}/insights
              </p>
            </div>
            
            <div className="flex gap-3 justify-center">
              <button 
                onClick={loadInsights}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.open(`${apiUrl}/health`, '_blank')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Backend
              </button>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              Check browser console (F12) for detailed error logs
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16" style={{ scrollBehavior: 'smooth' }}>
      {/* Hero Section */}
      <section className="-mt-16 py-12 md:py-16 lg:py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg relative will-change-transform">
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
            className="text-center max-w-4xl mx-auto will-change-transform"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
              Expert Analysis & <br />
              <span className="text-accent-600 dark:text-accent-500 hover:scale-105 inline-block transition-transform duration-300 cursor-default">
                Market Intelligence
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Stay ahead with our latest research, market analysis, and thought leadership 
              in actuarial science and risk management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Insights Section */}
      <section className="py-12 will-change-transform">
        <div className="container mx-auto px-6">
          {/* Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12 will-change-transform"
          >
            {/* Search Bar and Date Filter Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-6">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 max-w-2xl"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search insights by title, content, author, or tags..."
                    className="w-full pl-12 pr-12 py-3.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-dark-bg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 hover:border-accent-300 dark:hover:border-accent-600 shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
              
              {/* Date Range Filter */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">Date:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 hover:border-accent-300 dark:hover:border-accent-600"
                    placeholder="From"
                  />
                  <span className="text-slate-400">—</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 hover:border-accent-300 dark:hover:border-accent-600"
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
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Categories:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1); // Reset to first page when category changes
                      }}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group ${
                        selectedCategory === category
                          ? 'bg-accent-600 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/10 border border-slate-200 dark:border-slate-700'
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

            {/* Active Filters Indicator */}
            {(searchQuery || dateRange.start || dateRange.end) && (
              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Active filters: 
                  {searchQuery && <span className="ml-2 px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded">Search</span>}
                  {(dateRange.start || dateRange.end) && <span className="ml-2 px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded">Date Range</span>}
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Insights Grid */}
          {filteredInsights.length > 0 ? (
            <StaggerReveal staggerDelay={0.03} duration={0.3}>
              <div
                className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 auto-rows-fr"
                style={{ containIntrinsicSize: 'auto 600px', contentVisibility: 'auto' }}
              >
                {filteredInsights.map((insight, index) => {
                const isFeatured = insight.featured;
                const isPDF = !!insight.pdfFilename;
                return (
                  <motion.article
                    key={insight._id || insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    whileHover={isPDF ? {
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
                      transition: { duration: 0.4, ease: "easeOut" }
                    } : {}}
                    className={`rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full flex flex-col relative transition-all duration-200 hover:-translate-y-1 hover:shadow-xl will-change-transform ${
                      isFeatured 
                        ? 'bg-gradient-to-br from-white to-accent-50 dark:from-dark-card dark:to-accent-900/10 border-2 border-accent-200 dark:border-accent-700 hover:border-accent-300 dark:hover:border-accent-600' 
                        : 'bg-white dark:bg-dark-card border border-slate-100 dark:border-slate-700 hover:border-accent-200 dark:hover:border-accent-800'
                    }`}
                    onClick={() => handleInsightClick(insight)}
                  >
                    {/* Animated background elements for PDF cards */}
                    {isPDF && (
                      <div className="absolute inset-0 pointer-events-none opacity-20">
                        <motion.div
                          animate={{
                            x: [0, 30, -30, 0],
                            y: [0, -20, 20, 0],
                            rotate: [0, 90, 180, 270, 360]
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute top-4 right-4 w-8 h-8 bg-blue-500/20 rounded-full blur-sm"
                        />
                        <motion.div
                          animate={{
                            x: [0, -20, 20, 0],
                            y: [0, 20, -20, 0],
                            scale: [1, 1.2, 0.8, 1]
                          }}
                          transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute bottom-4 left-4 w-6 h-6 bg-indigo-500/15 rounded-full blur-sm"
                        />
                        <motion.div
                          animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-400/10 rounded-full blur-xl"
                        />
                      </div>
                    )}
                    <div className="relative overflow-hidden will-change-transform">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />
                      
                      <img 
                        src={optimizeImage(getInsightImageUrl(insight))}
                        alt={insight.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const imgSrc = getInsightImageUrl(insight);
                          console.log('Image failed to load:', imgSrc);
                          console.log('Insight data:', { title: insight.title, featuredImage: insight.featuredImage, image: insight.image });
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80';
                        }}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                      />
                      <div className="absolute top-4 left-4 flex gap-2 z-20">
                        <span className="px-3 py-1 bg-accent-600 text-white text-xs font-bold rounded-full transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-200 will-change-transform">
                          {insight.category}
                        </span>
                        {isFeatured && (
                          <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1 transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-200 will-change-transform">
                            <TrendingUp className="w-3 h-3 group-hover:rotate-6 transition-transform duration-200" />
                            Featured
                          </span>
                        )}
                      </div>
                      {isPDF && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-full flex items-center gap-1 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-200 will-change-transform">
                            <motion.div
                              whileHover={{ 
                                rotate: 360,
                                scale: 1.2,
                                transition: { duration: 0.6, ease: "easeOut" }
                              }}
                              animate={{
                                y: [0, -2, 0],
                                rotate: [0, 3, -3, 0]
                              }}
                              transition={{
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                              }}
                            >
                              <FileText className="w-3 h-3" />
                            </motion.div>
                            PDF
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-6 relative min-h-0">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-500 transition-colors duration-200 text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
                        {insight.title}
                      </h3>
                      
                      <div className={`mb-4 flex-1 min-h-[4.5rem] ${isPDF ? 'relative overflow-hidden' : ''}`}>
                        <p className={`text-slate-600 dark:text-slate-400 line-clamp-3 transition-all duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300 text-sm leading-relaxed ${
                          isPDF ? 'group-hover:blur-[2px] group-hover:text-slate-500 group-hover:scale-[0.98]' : ''
                        }`}>
                          {insight.excerpt}
                        </p>
                        {isPDF && (
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 dark:to-dark-card/90 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                        )}
                        {isPDF && (
                          <div className="absolute bottom-0 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-white/95 dark:bg-dark-bg/95 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-blue-200 dark:border-blue-700 animate-pulse">
                              <FileText className="w-3.5 h-3.5 animate-bounce" />
                              🔓 Access Full Research
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-auto space-y-4">
                        {/* Metadata Section */}
                        <div className="flex items-center justify-between">
                          {!isPDF && (
                            <div className="text-slate-500 dark:text-slate-400 text-xs">
                              <span className="font-medium group-hover:text-accent-600 transition-colors duration-200">{insight.author || 'Unknown Author'}</span>
                            </div>
                          )}
                          <div className={`flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs ${isPDF ? 'w-full justify-center' : ''}`}>
                            <div className="flex items-center gap-1 group-hover:text-blue-600 transition-colors duration-200">
                              <Calendar className="w-3 h-3" />
                              {formatDate(insight.publishDate || insight.publishedAt || insight.createdAt)}
                            </div>
                            {!isPDF && (
                              <div className="flex items-center gap-1 group-hover:text-green-600 transition-colors duration-200">
                                <Eye className="w-3 h-3" />
                                {formatViews(insight.views)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Button - Show for all cards */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-2 font-medium group-hover:gap-3 transition-all duration-200 ${
                              isPDF 
                                ? 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300' 
                                : 'text-accent-600 dark:text-accent-500'
                            }`}>
                              <span className="flex items-center gap-1">
                                {isPDF && <FileText className="w-4 h-4" />}
                                {isPDF ? 'View Pdf' : 'Read Full Article'}
                              </span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                            {isPDF && (
                              <button
                                onClick={(e) => copyPdfLink(e, insight)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    copyPdfLink(e as any, insight);
                                  }
                                }}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group/btn focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                                aria-label="Copy shareable PDF link to clipboard"
                                title="Copy shareable link"
                                tabIndex={0}
                              >
                                <LinkIcon className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover/btn:text-accent-600 dark:group-hover/btn:text-accent-400 transition-colors" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
                })}
              </div>
            </StaggerReveal>
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

          {/* Pagination */}
          {totalPages > 1 && insights.length > 0 && (
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Show first page, last page, current page and adjacent pages
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === pageNum
                          ? 'bg-accent-600 text-white shadow-md'
                          : 'border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === currentPage - 2 && currentPage > 3) ||
                  (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={pageNum} className="px-2 text-slate-400 dark:text-slate-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-accent-600 via-accent-500 to-purple-600 rounded-3xl p-12 text-center text-white">
            <FileText className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Informed with Our Research
            </h2>
            <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
              Get the latest insights, market analysis, and research updates delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="px-6 py-3 bg-white text-accent-600 rounded-lg font-bold hover:bg-accent-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-accent-200 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
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

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ 
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 max-w-xs will-change-transform"
          role="alert"
          aria-live="polite"
        >
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <LinkIcon className="w-4 h-4" />
          </div>
          <p className="font-medium text-sm">Link Copied!</p>
        </motion.div>
      )}
    </div>
  );
};