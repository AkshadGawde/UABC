const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface User {
  id: string;
  username: string;
  email?: string;
  role: 'admin' | 'editor' | 'author';
  fullName?: string;
  avatar?: string;
  lastLogin?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

class AuthService {
  private readonly STORAGE_KEY = 'uabc_auth';

  // Get current auth state from localStorage
  getAuthState(): AuthState {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if token is expired
        if (this.isTokenExpired(parsed.token)) {
          this.clearAuth();
          return { isAuthenticated: false, user: null, token: null };
        }
        return {
          isAuthenticated: true,
          user: parsed.user,
          token: parsed.token
        };
      }
    } catch (error) {
      console.error('Error parsing auth state:', error);
      this.clearAuth();
    }
    
    return {
      isAuthenticated: false,
      user: null,
      token: null
    };
  }

  // Login with username and password
  async login(username: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        const authState = {
          user: data.user,
          token: data.token,
          timestamp: Date.now()
        };
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authState));
        
        return {
          success: true,
          message: data.message,
          user: data.user
        };
      }
      
      return {
        success: false,
        message: data.message || 'Login failed'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  // Logout and clear stored data
  logout(): void {
    this.clearAuth();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const state = this.getAuthState();
    return state.isAuthenticated;
  }

  // Get current user
  getCurrentUser(): User | null {
    const state = this.getAuthState();
    return state.user;
  }

  // Get auth token
  getToken(): string | null {
    const state = this.getAuthState();
    return state.token;
  }

  // Check if token is expired
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // Clear authentication data
  private clearAuth(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Make authenticated API request
  async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    // If token expired, clear auth
    if (response.status === 401 && token) {
      this.clearAuth();
      throw new Error('Authentication expired');
    }

    return response;
  }
}

export const authService = new AuthService();