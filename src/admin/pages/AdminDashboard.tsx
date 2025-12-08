import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Edit, Trash2, Star, Globe, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { insightsService, Insight } from '../services/insightsService';

export const AdminDashboard = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'all' | 'published' | 'drafts'>('all');
  const { user, logout } = useAuth();

  const loadInsights = async () => {
    try {
      setLoading(true);
      const data = await insightsService.getAllInsights();
      setInsights(data);
    } catch (error) {
      console.error('Failed to load insights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const handleTogglePublished = async (id: string) => {
    try {
      await insightsService.togglePublished(id);
      loadInsights();
    } catch (error) {
      console.error('Failed to toggle published status:', error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await insightsService.toggleFeatured(id);
      loadInsights();
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this insight?')) {
      try {
        await insightsService.deleteInsight(id);
        loadInsights();
      } catch (error) {
        console.error('Failed to delete insight:', error);
      }
    }
  };

  const filteredInsights = insights.filter(insight => {
    switch (selectedTab) {
      case 'published':
        return insight.published;
      case 'drafts':
        return !insight.published;
      default:
        return true;
    }
  });

  const stats = {
    total: insights.length,
    published: insights.filter(i => i.published).length,
    drafts: insights.filter(i => !i.published).length,
    featured: insights.filter(i => i.featured).length
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Insights CMS</h1>
              <p className="text-slate-600 dark:text-slate-400">Welcome back, {user?.username}</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/admin/insights/new"
                className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Insight
              </a>
              <button
                onClick={logout}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Insights', value: stats.total, color: 'bg-blue-500' },
            { label: 'Published', value: stats.published, color: 'bg-green-500' },
            { label: 'Drafts', value: stats.drafts, color: 'bg-yellow-500' },
            { label: 'Featured', value: stats.featured, color: 'bg-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg opacity-20`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'all', label: 'All' },
            { key: 'published', label: 'Published' },
            { key: 'drafts', label: 'Drafts' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === tab.key
                  ? 'bg-accent-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Insights List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {insight.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        insight.category === 'Market Analysis' ? 'bg-blue-100 text-blue-800' :
                        insight.category === 'Technology' ? 'bg-green-100 text-green-800' :
                        insight.category === 'Regulatory' ? 'bg-purple-100 text-purple-800' :
                        insight.category === 'Risk Management' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {insight.category}
                      </span>
                      {insight.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      {insight.published ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <Globe className="w-4 h-4" />
                          <span className="text-xs">Published</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">Draft</span>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                      {insight.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span>By {insight.author}</span>
                      <span>{insight.readTime}</span>
                      <span>{insight.views} views</span>
                      <span>{new Date(insight.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <a
                      href={`/admin/insights/${insight.id}/preview`}
                      className="p-2 text-slate-400 hover:text-accent-600 transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <a
                      href={`/admin/insights/${insight.id}/edit`}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleToggleFeatured(insight.id)}
                      className={`p-2 transition-colors ${
                        insight.featured 
                          ? 'text-yellow-500 hover:text-yellow-600' 
                          : 'text-slate-400 hover:text-yellow-500'
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className={`w-4 h-4 ${insight.featured ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleTogglePublished(insight.id)}
                      className={`p-2 transition-colors ${
                        insight.published 
                          ? 'text-green-600 hover:text-green-700' 
                          : 'text-slate-400 hover:text-green-600'
                      }`}
                      title={insight.published ? 'Unpublish' : 'Publish'}
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(insight.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredInsights.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedTab === 'all' ? 'No insights found' : 
                   selectedTab === 'published' ? 'No published insights' : 'No drafts found'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};