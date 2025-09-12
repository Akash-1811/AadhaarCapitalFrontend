import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (!import.meta.env.DEV && !import.meta.env.VITE_ENABLE_PERF_MONITOR) {
      return;
    }

    const metrics: PerformanceMetrics = {};

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            renderTime?: number;
            loadTime?: number;
          };
          
          if (lastEntry) {
            metrics.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;

            if (import.meta.env.DEV) {
              console.log('🎯 LCP:', metrics.lcp.toFixed(2), 'ms');

              // Alert if LCP is poor (> 2500ms)
              if (metrics.lcp > 2500) {
                console.warn('⚠️ Poor LCP detected:', metrics.lcp.toFixed(2), 'ms');
              } else if (metrics.lcp <= 2500) {
                console.log('✅ Good LCP:', metrics.lcp.toFixed(2), 'ms');
              }
            }
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('LCP observation not supported');
      }
    };

    // First Contentful Paint (FCP)
    const observeFCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
              if (import.meta.env.DEV) {
                console.log('🎨 FCP:', metrics.fcp.toFixed(2), 'ms');
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.warn('FCP observation not supported');
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          metrics.cls = clsValue;
          if (import.meta.env.DEV) {
            console.log('📐 CLS:', metrics.cls.toFixed(4));
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('CLS observation not supported');
      }
    };

    // Time to First Byte (TTFB)
    const measureTTFB = () => {
      try {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          if (import.meta.env.DEV) {
            console.log('⚡ TTFB:', metrics.ttfb.toFixed(2), 'ms');
          }
        }
      } catch (error) {
        console.warn('TTFB measurement not supported');
      }
    };

    // Resource loading performance
    const analyzeResources = () => {
      try {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const images = resources.filter(resource => 
          resource.name.includes('.jpg') || 
          resource.name.includes('.png') || 
          resource.name.includes('.webp') ||
          resource.name.includes('.avif')
        );

        if (import.meta.env.DEV) {
          console.group('📊 Resource Performance');
          images.forEach(img => {
            const loadTime = img.responseEnd - img.requestStart;
            console.log(`🖼️ ${img.name.split('/').pop()}: ${loadTime.toFixed(2)}ms`);

            if (loadTime > 1000) {
              console.warn(`⚠️ Slow image load: ${img.name.split('/').pop()}`);
            }
          });
          console.groupEnd();
        }
      } catch (error) {
        console.warn('Resource analysis not supported');
      }
    };

    // Initialize observers
    observeLCP();
    observeFCP();
    observeCLS();
    measureTTFB();

    // Analyze resources after page load
    const analyzeAfterLoad = () => {
      setTimeout(() => {
        analyzeResources();
        
        // Summary report
        if (import.meta.env.DEV) {
          console.group('📈 Performance Summary');
          console.log('LCP:', metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'Not measured');
          console.log('FCP:', metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'Not measured');
          console.log('CLS:', metrics.cls ? metrics.cls.toFixed(4) : 'Not measured');
          console.log('TTFB:', metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'Not measured');
          console.groupEnd();
        }
      }, 3000);
    };

    if (document.readyState === 'complete') {
      analyzeAfterLoad();
    } else {
      window.addEventListener('load', analyzeAfterLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', analyzeAfterLoad);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
