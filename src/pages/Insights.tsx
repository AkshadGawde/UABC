import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { optimizeImage } from '../utils/imageUtils';
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
  Share2
} from 'lucide-react';

/**
 * Insights Page Component
 */
export const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Market Analysis', 'Risk Management', 'Regulatory', 'Technology', 'Industry Trends'];

  const insights = [
    {
      id: 1,
      category: "Market Analysis",
      title: "Navigating Volatility in 2024 Global Markets",
      excerpt: "An in-depth analysis of market volatility patterns and risk mitigation strategies for the current economic climate.",
      image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=800",
      date: "2024-12-05",
      readTime: "8 min read",
      author: "Sarah Chen",
      views: "1.2k",
      featured: true
    },
    {
      id: 2,
      category: "Technology",
      title: "The Algorithmic Future of Insurance Underwriting",
      excerpt: "How AI and machine learning are revolutionizing risk assessment and pricing in the insurance industry.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      date: "2024-11-28",
      readTime: "12 min read",
      author: "Michael Rodriguez",
      views: "2.1k",
      featured: true
    },
    {
      id: 3,
      category: "Regulatory",
      title: "IFRS 17 Implementation: Key Challenges and Solutions",
      excerpt: "A comprehensive guide to navigating the complexities of IFRS 17 implementation for insurance companies.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
      date: "2024-11-20",
      readTime: "15 min read",
      author: "Emily Johnson",
      views: "1.8k",
      featured: false
    },
    {
      id: 4,
      category: "Risk Management",
      title: "Climate Risk Modeling: A New Frontier",
      excerpt: "Understanding and quantifying climate-related risks in actuarial models and business strategies.",
      image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800",
      date: "2024-11-15",
      readTime: "10 min read",
      author: "David Kim",
      views: "1.5k",
      featured: true
    },
    {
      id: 5,
      category: "Industry Trends",
      title: "The Rise of Parametric Insurance Products",
      excerpt: "Exploring the growing trend of parametric insurance and its impact on traditional actuarial practices.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
      date: "2024-11-10",
      readTime: "7 min read",
      author: "Sarah Chen",
      views: "980",
      featured: false
    },
    {
      id: 6,
      category: "Market Analysis",
      title: "Emerging Markets: Opportunities and Risks",
      excerpt: "A strategic analysis of actuarial opportunities in emerging markets and associated risk factors.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
      date: "2024-11-05",
      readTime: "11 min read",
      author: "Michael Rodriguez",
      views: "1.3k",
      featured: false
    }
  ];

  const filteredInsights = insights.filter(insight => {
    const matchesCategory = selectedCategory === 'All' || insight.category === selectedCategory;
    const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insight.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredInsights = insights.filter(insight => insight.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Insights & Research
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Expert Analysis & <br />
              <span className="text-accent-600 dark:text-accent-500">Market Intelligence</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Stay ahead with our latest research, market analysis, and thought leadership 
              in actuarial science and risk management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-accent-600 dark:text-accent-500 font-bold tracking-widest uppercase mb-4 text-sm">
              Featured Articles
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Latest Research & Analysis
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredInsights.slice(0, 2).map((insight, index) => (
              <motion.article
                key={insight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={optimizeImage(insight.image, 600)}
                    alt={insight.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent-600 text-white text-xs font-bold rounded-full">
                      {insight.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-500 transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{insight.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(insight.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {insight.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {insight.views}
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-accent-600 dark:text-accent-500 font-medium hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16 bg-slate-50 dark:bg-dark-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative flex-grow max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-dark-bg text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent-600 text-white'
                      : 'bg-white dark:bg-dark-bg text-slate-600 dark:text-slate-400 hover:bg-accent-50 dark:hover:bg-accent-900/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredInsights.map((insight, index) => (
              <motion.article
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white dark:bg-dark-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={optimizeImage(insight.image, 400)}
                    alt={insight.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-accent-600 text-white text-xs font-bold rounded">
                      {insight.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-500 transition-colors line-clamp-2">
                    {insight.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">{insight.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{insight.author}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {insight.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {insight.views}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredInsights.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No insights found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-accent-600 to-accent-500 rounded-2xl p-12 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <FileText className="w-16 h-16 mx-auto mb-6 opacity-80" />
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
            </motion.div>
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
    </div>
  );
};