/**
 * Central API Configuration
 * Ensures consistent API URL handling across dev and production
 */

export const getApiUrl = (): string => {
  // Use environment variable directly from Vite (already knows about .env files)
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (!apiUrl) {
    console.error(
      '⚠️ VITE_API_URL not set. Configure in .env or .env.local'
    );
    // Fallback based on environment
    return import.meta.env.PROD
      ? 'https://api.uabc.co.in/api'
      : 'http://localhost:5000/api';
  }

  console.log('✅ Using API URL:', apiUrl);
  return apiUrl;
};

export const API_CONFIG = {
  baseUrl: getApiUrl(),
  timeout: 30000,
  retries: 3,
};

export default API_CONFIG;
