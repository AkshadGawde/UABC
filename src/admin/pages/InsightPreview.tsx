import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Eye, Edit } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { insightsService, Insight } from '../services/insightsService';
import { optimizeImage } from '../../utils/imageUtils';

export const InsightPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsight();
  }, [id]);

  const loadInsight = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'https://uabc-backend.onrender.com/api';
      const token = localStorage.getItem('token');
      
      // First try to fetch as a PDF insight
      try {
        const pdfResponse = await fetch(`${apiUrl}/pdf-insights/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (pdfResponse.ok) {
          const pdfData = await pdfResponse.json();
          if (pdfData.success && pdfData.data) {
            // This is a PDF insight - open it directly
            window.open(`${apiUrl}/pdf-insights/${id}/pdf`, '_blank');
            navigate('/admin');
            return;
          }
        }
      } catch (pdfError) {
        // Not a PDF insight, try regular insight
        console.log('Not a PDF insight, trying regular insight...');
      }
      
      // Try to fetch as regular insight
      const data = await insightsService.getInsight(id, true);
      setInsight(data);
    } catch (error) {
      console.error('Failed to load insight:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Insight not found</h2>
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white py-3">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="text-sm">
                <span className="text-slate-400">Preview Mode</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${insight.published ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                  <span className="text-xs">
                    {insight.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`/admin/insights/${insight.id}/edit`}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                Edit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                insight.category === 'Market Analysis' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                insight.category === 'Technology' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                insight.category === 'Regulatory' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                insight.category === 'Risk Management' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
              }`}>
                {insight.category}
              </span>
              {insight.featured && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {insight.title}
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {insight.excerpt}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(insight.date)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {insight.readTime}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {insight.views} views
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {insight.image && (
            <div className="mb-8">
              <img
                src={optimizeImage(insight.image, 1200)}
                alt={insight.title}
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-strong:text-slate-900 dark:prose-strong:text-white prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-ol:text-slate-700 dark:prose-ol:text-slate-300">
            <div dangerouslySetInnerHTML={{ __html: insight.content }} />
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {insight.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {insight.author}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Universal Actuarials Expert
                </p>
              </div>
            </div>
          </div>

          {/* Metadata for Admin */}
          <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Admin Info</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <span className="font-medium">ID:</span> {insight.id}
              </div>
              <div>
                <span className="font-medium">Status:</span> {insight.published ? 'Published' : 'Draft'}
              </div>
              <div>
                <span className="font-medium">Featured:</span> {insight.featured ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-medium">Created:</span> {formatDate(insight.createdAt)}
              </div>
              <div>
                <span className="font-medium">Updated:</span> {formatDate(insight.updatedAt)}
              </div>
              <div>
                <span className="font-medium">Views:</span> {insight.views}
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};