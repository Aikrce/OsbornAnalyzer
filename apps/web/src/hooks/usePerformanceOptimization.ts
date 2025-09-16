import { useState, useEffect, useCallback, useRef } from 'react';
import { useResponsive } from './useResponsive';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  networkLatency: number;
  bundleSize: number;
}

interface OptimizationConfig {
  enableVirtualScrolling: boolean;
  enableLazyLoading: boolean;
  enableImageOptimization: boolean;
  enableCodeSplitting: boolean;
  enableServiceWorker: boolean;
  maxConcurrentRequests: number;
  cacheSize: number;
  debounceDelay: number;
  throttleDelay: number;
}

interface UsePerformanceOptimizationReturn {
  metrics: PerformanceMetrics;
  config: OptimizationConfig;
  isLowEndDevice: boolean;
  isSlowNetwork: boolean;
  optimizeForDevice: () => void;
  preloadRoute: (routePath: string) => void;
  prefetchData: (key: string, fetchFn: () => Promise<any>) => void;
  debounce: <T extends (...args: any[]) => any>(fn: T, delay?: number) => T;
  throttle: <T extends (...args: any[]) => any>(fn: T, delay?: number) => T;
  virtualizeList: <T>(items: T[], itemHeight: number, containerHeight: number) => T[];
  optimizeImages: (images: HTMLImageElement[]) => void;
  clearCache: () => void;
  getPerformanceReport: () => any;
}

export const usePerformanceOptimization = (): UsePerformanceOptimizationReturn => {
  const { deviceType, width, height } = useResponsive();
  
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 60,
    networkLatency: 0,
    bundleSize: 0
  });

  const [config, setConfig] = useState<OptimizationConfig>({
    enableVirtualScrolling: true,
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableCodeSplitting: true,
    enableServiceWorker: true,
    maxConcurrentRequests: 6,
    cacheSize: 50 * 1024 * 1024, // 50MB
    debounceDelay: 300,
    throttleDelay: 100
  });

  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  const cacheRef = useRef<Map<string, { data: any; timestamp: number; expiry: number }>>(new Map());
  const preloadedRoutesRef = useRef<Set<string>>(new Set());
  // const performanceObserverRef = useRef<PerformanceObserver | null>(null);
  const fpsCounterRef = useRef<{ frames: number; lastTime: number }>({ frames: 0, lastTime: 0 });

  // 设备性能检测
  useEffect(() => {
    const detectDevicePerformance = () => {
      const connection = (navigator as any).connection;
      const memory = (performance as any).memory;
      
      let deviceScore = 0;
      
      // CPU性能检测
      const start = performance.now();
      for (let i = 0; i < 100000; i++) {
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
          setIsSlowNetwork(true);
        } else {
          setIsSlowNetwork(false);
        }
      }
      
      // 设备类型检测
      if (deviceType === 'mobile') deviceScore += 1;
      
      setIsLowEndDevice(deviceScore >= 3);
    };

    detectDevicePerformance();
  }, [deviceType]);

  // 性能指标收集
  useEffect(() => {
    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const memory = (performance as any).memory;
      const resources = performance.getEntriesByType('resource');

      // 计算网络延迟
      const networkLatency = navigation ? navigation.responseStart - navigation.requestStart : 0;
      
      // 计算包大小
      const bundleSize = resources
        .filter((resource: any) => resource.name.includes('.js') || resource.name.includes('.css'))
        .reduce((total: number, resource: any) => total + (resource.transferSize || 0), 0);

      setMetrics(prev => ({
        ...prev,
        loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        renderTime: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
        memoryUsage: memory ? memory.usedJSHeapSize / (1024 * 1024) : 0,
        networkLatency,
        bundleSize
      }));
    };

    if (document.readyState === 'complete') {
      collectMetrics();
      return () => {}; // 确保所有代码路径都有返回值
    } else {
      window.addEventListener('load', collectMetrics);
      return () => window.removeEventListener('load', collectMetrics);
    }
  }, []);

  // FPS监控
  useEffect(() => {
    const measureFPS = () => {
      const now = performance.now();
      fpsCounterRef.current.frames++;
      
      if (now - fpsCounterRef.current.lastTime >= 1000) {
        const fps = Math.round((fpsCounterRef.current.frames * 1000) / (now - fpsCounterRef.current.lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        fpsCounterRef.current.frames = 0;
        fpsCounterRef.current.lastTime = now;
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }, []);

  // 设备优化
  const optimizeForDevice = useCallback(() => {
    if (isLowEndDevice) {
      setConfig(prev => ({
        ...prev,
        enableVirtualScrolling: true,
        enableLazyLoading: true,
        enableImageOptimization: true,
        maxConcurrentRequests: 3,
        debounceDelay: 500,
        throttleDelay: 200
      }));

      // 减少动画
      document.documentElement.style.setProperty('--animation-duration', '0s');
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
    } else {
      setConfig(prev => ({
        ...prev,
        enableVirtualScrolling: false,
        enableLazyLoading: false,
        enableImageOptimization: false,
        maxConcurrentRequests: 10,
        debounceDelay: 100,
        throttleDelay: 50
      }));

      document.documentElement.style.setProperty('--animation-duration', '0.3s');
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [isLowEndDevice]);

  // 路由预加载
  const preloadRoute = useCallback((routePath: string) => {
    if (preloadedRoutesRef.current.has(routePath) || isLowEndDevice) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = routePath;
    document.head.appendChild(link);
    
    preloadedRoutesRef.current.add(routePath);
    
    // 清理
    setTimeout(() => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }, 10000);
  }, [isLowEndDevice]);

  // 数据预取
  const prefetchData = useCallback(async (key: string, fetchFn: () => Promise<any>) => {
    if (cacheRef.current.has(key) || isSlowNetwork || isLowEndDevice) {
      return;
    }

    try {
      const data = await fetchFn();
      cacheRef.current.set(key, {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + 5 * 60 * 1000 // 5分钟过期
      });
    } catch (error) {
      console.warn(`Failed to prefetch data for ${key}:`, error);
    }
  }, [isSlowNetwork, isLowEndDevice]);

  // 防抖函数
  const debounce = useCallback(<T extends (...args: any[]) => any>(fn: T, delay?: number): T => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const actualDelay = delay || config.debounceDelay;
    
    return ((...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => fn(...args), actualDelay);
    }) as T;
  }, [config.debounceDelay]);

  // 节流函数
  const throttle = useCallback(<T extends (...args: any[]) => any>(fn: T, delay?: number): T => {
    const lastCallRef = useRef<number>(0);
    const actualDelay = delay || config.throttleDelay;
    
    return ((...args: any[]) => {
      const now = Date.now();
      if (now - lastCallRef.current >= actualDelay) {
        lastCallRef.current = now;
        fn(...args);
      }
    }) as T;
  }, [config.throttleDelay]);

  // 虚拟滚动
  const virtualizeList = useCallback(<T>(items: T[], itemHeight: number, containerHeight: number): T[] => {
    if (!config.enableVirtualScrolling || items.length < 100) {
      return items;
    }

    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const buffer = Math.min(10, Math.floor(visibleCount / 2));
    
    // 这里简化实现，实际项目中需要更复杂的虚拟滚动逻辑
    return items.slice(0, visibleCount + buffer);
  }, [config.enableVirtualScrolling]);

  // 图片优化
  const optimizeImages = useCallback((images: HTMLImageElement[]) => {
    if (!config.enableImageOptimization) return;

    images.forEach(img => {
      // 懒加载
      if (config.enableLazyLoading && !img.loading) {
        img.loading = 'lazy';
      }

      // 响应式图片
      if (img.srcset) {
        const sizes = isLowEndDevice ? '100vw' : '50vw';
        img.sizes = sizes;
      }

      // 压缩质量
      if (isLowEndDevice && img.src.includes('data:image')) {
        // 降低图片质量
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width * 0.8;
          canvas.height = img.height * 0.8;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          img.src = canvas.toDataURL('image/jpeg', 0.7);
        }
      }
    });
  }, [config.enableImageOptimization, config.enableLazyLoading, isLowEndDevice]);

  // 清除缓存
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
    preloadedRoutesRef.current.clear();
    
    // 清除Service Worker缓存
    if ('serviceWorker' in navigator && config.enableServiceWorker) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
  }, [config.enableServiceWorker]);

  // 获取性能报告
  const getPerformanceReport = useCallback(() => {
    const report = {
      metrics,
      config,
      deviceInfo: {
        type: deviceType,
        isLowEndDevice,
        isSlowNetwork,
        screenSize: { width, height }
      },
      cacheInfo: {
        size: cacheRef.current.size,
        preloadedRoutes: preloadedRoutesRef.current.size
      },
      recommendations: [] as string[]
    };

    // 生成优化建议
    if (metrics.fps < 30) {
      report.recommendations.push('启用虚拟滚动和懒加载');
    }
    if (metrics.memoryUsage > 100) {
      report.recommendations.push('减少内存使用，清理缓存');
    }
    if (metrics.networkLatency > 1000) {
      report.recommendations.push('优化网络请求，启用缓存');
    }
    if (isLowEndDevice) {
      report.recommendations.push('启用设备优化模式');
    }

    return report;
  }, [metrics, config, deviceType, isLowEndDevice, isSlowNetwork, width, height]);

  // 自动优化
  useEffect(() => {
    optimizeForDevice();
  }, [optimizeForDevice]);

  return {
    metrics,
    config,
    isLowEndDevice,
    isSlowNetwork,
    optimizeForDevice,
    preloadRoute,
    prefetchData,
    debounce,
    throttle,
    virtualizeList,
    optimizeImages,
    clearCache,
    getPerformanceReport
  };
};

export default usePerformanceOptimization;
