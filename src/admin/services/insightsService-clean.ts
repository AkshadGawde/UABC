import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'https://uabc.onrender.com/api';
const API_URL_FALLBACK = 'https://uabc.onrender.com/api';

export interface Insight {
  _id?: string;
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: 'Technology' | 'Business' | 'Innovation' | 'Industry' | 'Research' | 'Analysis';
  tags: string[];
  readTime: number;
  image: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface InsightFilters {
  page?: number;
  limit?: number;
  status?: 'all' | 'published' | 'draft';
  category?: string;
  search?: string;
  sort?: 'newest' | 'oldest' | 'updated' | 'popular';
}

export interface PaginationInfo {
  current: number;
  pages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface InsightsResponse {
  insights: Insight[];
  pagination: PaginationInfo;
}

class InsightsService {
  // Get all insights (public)
  async getPublicInsights(filters: InsightFilters = {}): Promise<InsightsResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      
      const response = await fetch(`${API_URL}/insights?${params}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch insights');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching public insights:', error);
      return {
        insights: [],
        pagination: {
          current: 1,
          pages: 0,
          total: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  }

  // Get all insights (admin)
  async getInsights(filters: InsightFilters = {}): Promise<InsightsResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.status && filters.status !== 'all') {
        params.append('status', filters.status);
      }
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      
      const response = await authService.makeAuthenticatedRequest(
        `${API_URL}/insights/admin?${params}`
      );
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch insights');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching insights:', error);
      return {
        insights: [],
        pagination: {
          current: 1,
          pages: 0,
          total: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  }

  // Get single insight by ID
  async getInsight(id: string, preview: boolean = false): Promise<Insight | null> {
    try {
      const url = preview 
        ? `${API_URL}/insights/${id}?preview=true`
        : `${API_URL}/insights/${id}`;
      
      const response = preview 
        ? await authService.makeAuthenticatedRequest(url)
        : await fetch(url);
      
      const data = await response.json();
      
      if (!data.success) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(data.message || 'Failed to fetch insight');
      }
      
      // Normalize the ID field
      const insight = data.data;
      if (insight._id && !insight.id) {
        insight.id = insight._id;
      }
      
      return insight;
    } catch (error) {
      console.error('Error fetching insight:', error);
      return null;
    }
  }

  // Create new insight
  async createInsight(data: Omit<Insight, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'readTime'>): Promise<{ success: boolean; message: string; insight?: Insight }> {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `${API_URL}/insights`,
        {
          method: 'POST',
          body: JSON.stringify(data)
        }
      );
      
      const result = await response.json();
      
      if (!result.success) {
        return {
          success: false,
          message: result.message || 'Failed to create insight'
        };
      }
      
      // Normalize the ID field
      const insight = result.data;
      if (insight._id && !insight.id) {
        insight.id = insight._id;
      }
      
      return {
        success: true,
        message: result.message,
        insight: insight
      };
    } catch (error) {
      console.error('Error creating insight:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  // Update existing insight
  async updateInsight(id: string, data: Partial<Omit<Insight, '_id' | 'id' | 'createdAt'>>): Promise<{ success: boolean; message: string; insight?: Insight }> {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `${API_URL}/insights/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(data)
        }
      );
      
      const result = await response.json();
      
      if (!result.success) {
        return {
          success: false,
          message: result.message || 'Failed to update insight'
        };
      }
      
      // Normalize the ID field
      const insight = result.data;
      if (insight._id && !insight.id) {
        insight.id = insight._id;
      }
      
      return {
        success: true,
        message: result.message,
        insight: insight
      };
    } catch (error) {
      console.error('Error updating insight:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  // Delete insight
  async deleteInsight(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `${API_URL}/insights/${id}`,
        {
          method: 'DELETE'
        }
      );
      
      const result = await response.json();
      
      return {
        success: result.success,
        message: result.message || (result.success ? 'Insight deleted successfully' : 'Failed to delete insight')
      };
    } catch (error) {
      console.error('Error deleting insight:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  // Toggle publish status
  async togglePublish(id: string, published: boolean): Promise<{ success: boolean; message: string; insight?: Insight }> {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `${API_URL}/insights/${id}/publish`,
        {
          method: 'PATCH',
          body: JSON.stringify({ published })
        }
      );
      
      const result = await response.json();
      
      if (!result.success) {
        return {
          success: false,
          message: result.message || 'Failed to update publish status'
        };
      }
      
      // Normalize the ID field
      const insight = result.data;
      if (insight._id && !insight.id) {
        insight.id = insight._id;
      }
      
      return {
        success: true,
        message: result.message,
        insight: insight
      };
    } catch (error) {
      console.error('Error toggling publish status:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  // Get insights statistics
  async getInsightsStats(): Promise<{
    total: number;
    published: number;
    drafts: number;
    totalViews: number;
    totalLikes: number;
  }> {
    try {
      // Get all insights for stats
      const response = await this.getInsights({ limit: 1000 });
      const insights = response.insights;
      
      return {
        total: insights.length,
        published: insights.filter(i => i.published).length,
        drafts: insights.filter(i => !i.published).length,
        totalViews: insights.reduce((sum, i) => sum + (i.views || 0), 0),
        totalLikes: insights.reduce((sum, i) => sum + (i.likes || 0), 0)
      };
    } catch (error) {
      console.error('Error getting insights stats:', error);
      return {
        total: 0,
        published: 0,
        drafts: 0,
        totalViews: 0,
        totalLikes: 0
      };
    }
  }

  // Calculate read time
  calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }
}

export const insightsService = new InsightsService();