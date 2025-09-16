import { useState, useEffect } from 'react';

interface PerformanceMeasurement {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

export const usePerformance = () => {
  const [measurements, setMeasurements] = useState<PerformanceMeasurement[]>([]);

  const startMeasurement = (name: string) => {
    const startTime = performance.now();
    setMeasurements(prev => [...prev, { name, startTime }]);
  };

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
      return () => {}; // 确保所有代码路径都有返回值
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const endMeasurement = (name: string) => {
    const endTime = performance.now();
    setMeasurements(prev => prev.map(measurement => {
      if (measurement.name === name && !measurement.endTime) {
        return {
          ...measurement,
          endTime,
          duration: endTime - measurement.startTime
        };
      }
      return measurement;
    }));
  };

  return { startMeasurement, endMeasurement };
};

export default usePerformance;
