import { useState, useEffect, useCallback } from 'react';
import { isMobile, isIOS, isAndroid, getScreenSize, getNetworkInfo, getPerformanceConfig } from '../utils/mobileOptimization';

/**
 * 移动端Hook
 * 提供移动端相关的状态和功能
 */
export const useMobile = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const [networkInfo, setNetworkInfo] = useState(getNetworkInfo());
  const [performanceConfig, setPerformanceConfig] = useState(getPerformanceConfig());
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );

  // 监听屏幕尺寸变化
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 监听网络变化
  useEffect(() => {
    const connection = (navigator as any).connection;
    if (connection) {
      const handleConnectionChange = () => {
        setNetworkInfo(getNetworkInfo());
        setPerformanceConfig(getPerformanceConfig());
      };

      connection.addEventListener('change', handleConnectionChange);
      return () => connection.removeEventListener('change', handleConnectionChange);
    }
  }, []);

  // 监听键盘状态
  useEffect(() => {
    const handleFocusIn = () => {
      setIsKeyboardOpen(true);
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // 震动反馈
  const vibrate = useCallback((pattern: number | number[] = 50) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  // 复制到剪贴板
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        vibrate(25);
        return true;
      } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        vibrate(25);
        return true;
      }
    } catch (error) {
      console.error('复制失败:', error);
      return false;
    }
  }, [vibrate]);

  // 分享功能
  const share = useCallback(async (data: { title?: string; text?: string; url?: string }) => {
    if (navigator.share) {
      try {
        await navigator.share(data);
        return true;
      } catch (error) {
        console.error('分享失败:', error);
        return false;
      }
    }
    return false;
  }, []);

  return {
    // 设备信息
    isMobile: isMobile(),
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    screenSize,
    orientation,
    
    // 网络信息
    networkInfo,
    isSlowNetwork: networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g',
    isFastNetwork: networkInfo.effectiveType === '4g',
    
    // 性能配置
    performanceConfig,
    
    // 状态
    isKeyboardOpen,
    
    // 功能
    vibrate,
    copyToClipboard,
    share
  };
};

/**
 * 移动端响应式Hook
 * 提供响应式断点检测
 */
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBreakpoint('sm');
      } else if (width < 768) {
        setBreakpoint('md');
      } else if (width < 1024) {
        setBreakpoint('lg');
      } else {
        setBreakpoint('xl');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
    isSmall: breakpoint === 'sm',
    isMedium: breakpoint === 'md',
    isLarge: breakpoint === 'lg',
    isXLarge: breakpoint === 'xl'
  };
};

/**
 * 移动端触摸Hook
 * 提供触摸手势检测
 */
export const useTouch = () => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    return {
      isLeftSwipe,
      isRightSwipe,
      isUpSwipe,
      isDownSwipe,
      distanceX,
      distanceY
    };
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};

export default useMobile;
