import { useEffect, useRef, useCallback } from 'react';

export const usePerformance = () => {
  const startTimeRef = useRef<number>(0);

  const startMeasurement = useCallback(() => {
    startTimeRef.current = performance.now();
  }, []);

  const endMeasurement = useCallback((metricName: string) => {
    if (startTimeRef.current > 0) {
      const duration = performance.now() - startTimeRef.current;
      console.log(`Performance Metric - ${metricName}: ${duration}ms`);
      startTimeRef.current = 0;
    }
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        console.log('Page load time:', loadTime);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return { startMeasurement, endMeasurement };
};

export default usePerformance;
