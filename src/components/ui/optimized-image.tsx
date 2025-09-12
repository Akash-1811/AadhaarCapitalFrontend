import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  getOptimizedImageSrc,
  trackImagePerformance,
  getImageQualityBasedOnConnection
} from '@/utils/imageOptimization';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  lazy?: boolean;
  className?: string;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  lazy = true,
  className,
  fallback,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number>(0);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (loadStartTime.current > 0) {
      trackImagePerformance(src, loadStartTime.current);
    }
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Start performance tracking when image loading begins
  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      loadStartTime.current = performance.now();
    }
  }, [isInView, isLoaded, hasError]);

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Error fallback */}
      {hasError && fallback && (
        <img
          src={fallback}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={handleLoad}
        />
      )}

      {/* Main image */}
      {isInView && !hasError && (
        <img
          src={getOptimizedImageSrc(src)}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={priority ? "high" : "auto"}
          data-lcp={priority ? "true" : undefined}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
