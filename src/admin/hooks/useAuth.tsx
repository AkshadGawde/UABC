import { useState, useEffect, createContext, useContext } from 'react';
import { authService, User, AuthState } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const state = authService.getAuthState();
    setAuthState(state);
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await authService.login(username, password);
      if (result.success && result.user) {
        const newState = authService.getAuthState();
        setAuthState(newState);
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null
    });
  };

  const value: AuthContextType = {
    ...authState,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};