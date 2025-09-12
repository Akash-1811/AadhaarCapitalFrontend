// Image optimization utilities

/**
 * Creates a WebP version of an image URL if supported by the browser
 * Falls back to original format if WebP is not supported
 */
export const getOptimizedImageSrc = (originalSrc: string): string => {
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  if (!supportsWebP) {
    return originalSrc;
  }

  // For now, return original src. In production, you would:
  // 1. Use a CDN service like Cloudinary, ImageKit, or AWS CloudFront
  // 2. Or implement server-side image optimization
  // 3. Or use a build-time image optimization tool
  
  // Example with Cloudinary:
  // return originalSrc.replace('/upload/', '/upload/f_auto,q_auto/');
  
  return originalSrc;
};

/**
 * Generates responsive image sources for different screen sizes
 */
export const getResponsiveImageSources = (originalSrc: string) => {
  const sizes = [320, 640, 768, 1024, 1280, 1920];
  
  return sizes.map(size => ({
    src: getOptimizedImageSrc(originalSrc),
    width: size,
    media: `(max-width: ${size}px)`,
  }));
};

/**
 * Preloads critical images for better LCP
 */
export const preloadCriticalImages = (imageSrcs: string[]) => {
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImageSrc(src);
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer
 */
export const createImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
};

/**
 * Optimizes image loading based on connection speed
 */
export const getImageQualityBasedOnConnection = (): 'high' | 'medium' | 'low' => {
  // @ts-ignore - navigator.connection is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) return 'high';
  
  const { effectiveType, downlink } = connection;
  
  // Slow connection - load lower quality images
  if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 1) {
    return 'low';
  }
  
  // Medium connection
  if (effectiveType === '3g' || downlink < 5) {
    return 'medium';
  }
  
  // Fast connection
  return 'high';
};

/**
 * Converts image to WebP format using Canvas API (client-side)
 * Useful for user-uploaded images
 */
export const convertToWebP = (
  file: File,
  quality: number = 0.8
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, 'image/webp', quality);
      } else {
        resolve(null);
      }
    };
    
    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Calculates optimal image dimensions based on container size and device pixel ratio
 */
export const getOptimalImageDimensions = (
  containerWidth: number,
  containerHeight: number,
  maxWidth: number = 1920
) => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  const optimalWidth = Math.min(
    Math.ceil(containerWidth * devicePixelRatio),
    maxWidth
  );
  
  const optimalHeight = Math.ceil(containerHeight * devicePixelRatio);
  
  return {
    width: optimalWidth,
    height: optimalHeight,
    pixelRatio: devicePixelRatio,
  };
};

/**
 * Performance monitoring for image loading
 */
export const trackImagePerformance = (imageSrc: string, startTime: number) => {
  const endTime = performance.now();
  const loadTime = endTime - startTime;

  // Only log in development mode
  if (import.meta.env.DEV) {
    // Log performance metrics
    console.log(`Image loaded: ${imageSrc.split('/').pop()} in ${loadTime.toFixed(2)}ms`);

    // Track slow loading images
    if (loadTime > 1000) {
      console.warn(`Slow image load detected: ${imageSrc.split('/').pop()} took ${loadTime.toFixed(2)}ms`);
    }
  }

  return loadTime;
};
