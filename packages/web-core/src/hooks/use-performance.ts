import { useCallback, useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkStatus: 'online' | 'offline';
}

interface UsePerformanceReturn {
  metrics: PerformanceMetrics;
  preloadRoute: (routePath: string) => void;
  prefetchData: (key: string, fetchFn: () => Promise<any>) => void;
  isLowEndDevice: boolean;
  optimizeForDevice: () => void;
}

export const usePerformance = (): UsePerformanceReturn => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkStatus: navigator.onLine ? 'online' : 'offline'
  });
  
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const metricsRef = useRef<Map<string, any>>(new Map());
  const preloadedRoutes = useRef<Set<string>>(new Set());

  // 检测设备性能
  useEffect(() => { return;
    const checkDevicePerformance = () => {
      const connection = (navigator as any).connection;
      const memory = (performance as any).memory;
      
      let deviceScore = 0;
      
      // CPU性能检测（简单的计算密集型任务）
      const start = performance.now();
      for (let i = 0; i < 100000; i++) {
        Math.random() * Math.random();
      }
      const cpuTime = performance.now() - start;
      
      if (cpuTime > 50) deviceScore += 2;
      else if (cpuTime > 20) deviceScore += 1;
      
      // 内存检测
      if (memory) {
        const memoryGB = memory.jsHeapSizeLimit / (1024 * 1024 * 1024);
        if (memoryGB < 2) deviceScore += 2;
        else if (memoryGB < 4) deviceScore += 1;
      }
      
      // 网络连接检测
      if (connection) {
        if (connection.effectiveType === '2g' || connection.effectiveType === '3g') {
          deviceScore += 2;
        }
      }
      
      setIsLowEndDevice(deviceScore >= 3);
    };

    checkDevicePerformance();
  }, []);

  // 网络状态监听
  useEffect(() => { return;
    const handleOnline = () => setMetrics(prev => ({ ...prev, networkStatus: 'online' }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, networkStatus: 'offline' }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 性能指标收集
  useEffect(() => { return;
    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const memory = (performance as any).memory;

      setMetrics(prev => ({
        ...prev,
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        renderTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        memoryUsage: memory ? memory.usedJSHeapSize / (1024 * 1024) : 0
      }));
    };

    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
      return () => window.removeEventListener('load', collectMetrics);
    }
  }, []);

  // 路由预加载
  const preloadRoute = useCallback((routePath: string) => {
    if (preloadedRoutes.current.has(routePath) || isLowEndDevice) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = routePath;
    document.head.appendChild(link);
    
    preloadedRoutes.current.add(routePath);
    
    // 清理
    setTimeout(() => {
      document.head.removeChild(link);
    }, 10000);
  }, [isLowEndDevice]);

  // 数据预取
  const prefetchData = useCallback(async (key: string, fetchFn: () => Promise<any>) => {
    if (metricsRef.current.has(key) || metrics.networkStatus === 'offline' || isLowEndDevice) {
      return;
    }

    try {
      const data = await fetchFn();
      metricsRef.current.set(key, {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + 5 * 60 * 1000 // 5分钟过期
      });
    } catch (error) {
      console.warn(`Failed to prefetch data for ${key}:`, error);
    }
  }, [metrics.networkStatus, isLowEndDevice]);

  // 设备优化
  const optimizeForDevice = useCallback(() => {
    if (isLowEndDevice) {
      // 减少动画
      document.documentElement.style.setProperty('--animation-duration', '0s');
      
      // 减少视觉效果
      document.documentElement.classList.add('reduce-motion');
      
      // 延迟非关键资源加载
      const images = document.querySelectorAll('img[data-src]');
      images.forEach((img, index) => {
        setTimeout(() => {
          const src = img.getAttribute('data-src');
          if (src) {
            img.setAttribute('src', src);
          }
        }, index * 100);
      });
    }
  }, [isLowEndDevice]);

  return {
    metrics,
    preloadRoute,
    prefetchData,
    isLowEndDevice,
    optimizeForDevice
  };
};

export default usePerformance;
