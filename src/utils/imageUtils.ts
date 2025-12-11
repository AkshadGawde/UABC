// Validate and clean base64 data URL
const validateDataUrl = (dataUrl: string): boolean => {
  const regex = /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml);base64,([A-Za-z0-9+/]+=*)$/i;
  return regex.test(dataUrl);
};

export const optimizeImage = (url: string | undefined, mobile = false): string => {
  // Handle undefined/null/empty URLs
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80';
  }
  
  const trimmedUrl = url.trim();
  
  // Handle base64 data URLs (uploaded images)
  if (trimmedUrl.startsWith('data:')) {
    // Validate the data URL format
    if (validateDataUrl(trimmedUrl)) {
      return trimmedUrl;
    } else {
      console.warn('Invalid data URL format:', trimmedUrl.substring(0, 100) + '...');
      return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80';
    }
  }
  
  // Handle blob URLs (temporary file objects)
  if (trimmedUrl.startsWith('blob:')) {
    return trimmedUrl;
  }
  
  try {
    const u = new URL(trimmedUrl);
    // If it's an unsplash- style query with 'w', modify it
    if (u.searchParams.has('w')) {
      const w = mobile ? Math.min(parseInt(u.searchParams.get('w') || '800', 10), 600) : Math.max(parseInt(u.searchParams.get('w') || '800', 10), 800);
      u.searchParams.set('w', String(w));
      return u.toString();
    }
    // Otherwise, append a conservative set of params
    const w = mobile ? 600 : 1200;
    if (u.search) {
      u.search += `&auto=format&fit=crop&q=80&w=${w}`;
    } else {
      u.search = `?auto=format&fit=crop&q=80&w=${w}`;
    }
    return u.toString();
  } catch (e) {
    // Not a URL we can parse; return original
    console.warn('Invalid URL format:', trimmedUrl);
    return trimmedUrl;
  }
};

// Helper function to get image URL from insight object
export const getInsightImageUrl = (insight: any): string => {
  return insight?.featuredImage || insight?.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80';
};
