import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { optimizeImage, getInsightImageUrl } from '../utils/imageUtils';
import { insightsService } from '../admin/services/insightsService';
import { ScrollReveal, StaggerReveal } from '../components/PageTransition';
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  FileText, 
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowLeft,
  Link as LinkIcon
} from 'lucide-react';

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
  pdfData?: string;
  pdfFilename?: string;
  pdfSize?: number;
  publishDate?: string;
}

export const InsightsCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 15;
  const [showToast, setShowToast] = useState(false);

  // Convert URL slug to display category name
  const getCategoryName = (slug: string | undefined) => {
    if (!slug) return 'All Insights';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const categoryName = getCategoryName(category);

  useEffect(() => {
    loadInsights();
  }, [category, currentPage]);

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await insightsService.getPublicInsights({
        page: currentPage,
        limit: itemsPerPage,
        category: categoryName,
        sort: 'newest'
      });
      
      if (!response || !response.insights) {
        setError('No insights available at the moment.');
        setInsights([]);
        return;
      }
      
      const publishedInsights = response.insights.filter(insight => insight.published);
      setInsights(publishedInsights);
      setTotalPages(response.pagination?.pages || 1);
      
    } catch (error) {
      console.error('Failed to load insights:', error);
      setError('Failed to load insights. Please try again later.');
      setInsights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInsightClick = (insight: Insight) => {
    // For PDF insights, open the PDF directly
    if (insight.pdfFilename) {
      // Use development URL in dev mode
      const isDev = import.meta.env.DEV;
      const apiUrl = isDev 
        ? (import.meta.env.VITE_API_URL_DEV || 'http://localhost:5000/api')
        : import.meta.env.VITE_API_URL;
      
      const pdfUrl = `${apiUrl}/pdf-insights/${insight._id || insight.id}/pdf`;
      console.log('Opening PDF:', pdfUrl);
      window.open(pdfUrl, '_blank');
    } else {
      // For regular insights, navigate to detail page
      navigate(`/insights/${insight.slug || insight._id}`);
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

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent-600" />
          <p className="text-slate-600 dark:text-slate-400">Loading {categoryName}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 border border-red-200 dark:border-red-800">
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3">Error Loading Insights</h2>
            <p className="text-red-600 dark:text-red-300 mb-4 text-sm">{error}</p>
            <button 
              onClick={loadInsights}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16">
      {/* Hero Section */}
      <section className="-mt-16 py-12 md:py-16 lg:py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-accent-200 dark:bg-accent-900/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.button
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 mb-6 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Insights
          </motion.button>

          <ScrollReveal>
            <div className="text-center">
              {/* <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FileText className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
                  {categoryName}
                </span>
              </motion.div> */}

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {categoryName}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Explore our collection of {categoryName.toLowerCase()}
              </motion.p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {insights.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                No insights found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                There are no published insights in this category yet.
              </p>
            </div>
          ) : (
            <StaggerReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {insights.map((insight, index) => (
                  <motion.article
                    key={insight._id || insight.id || index}
                    className="group bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleInsightClick(insight)}
                    whileHover={{ y: -8, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={optimizeImage(
                          getInsightImageUrl(insight),
                          { width: 400, height: 300, quality: 85 }
                        )}
                        alt={insight.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent-600 text-white text-xs font-medium rounded-full">
                          {insight.category}
                        </span>
                      </div>

                      {/* PDF Badge */}
                      {insight.pdfData && (
                        <div className="absolute top-4 right-4">
                          <div className="p-2 bg-white/90 dark:bg-dark-card/90 rounded-full backdrop-blur-sm">
                            <FileText className="w-4 h-4 text-red-600" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(insight.publishDate || insight.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        {insight.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {insight.readTime} min
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                        {insight.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                        {insight.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-accent-600 dark:text-accent-400 font-medium group-hover:gap-3 transition-all">
                          <span>{insight.pdfData ? 'Open PDF' : 'Read More'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        {insight.pdfData && (
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
                  </motion.article>
                ))}
              </div>
            </StaggerReveal>
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
                onClick={() => goToPage(currentPage - 1)}
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
                      onClick={() => goToPage(pageNum)}
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
                onClick={() => goToPage(currentPage + 1)}
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

export default InsightsCategory;
