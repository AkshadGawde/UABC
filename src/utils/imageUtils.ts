export const optimizeImage = (url: string, mobile = false) => {
  try {
    const u = new URL(url);
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
    return url;
  }
};
