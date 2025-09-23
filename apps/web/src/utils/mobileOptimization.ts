/**
 * 移动端优化工具
 * 提供移动端性能优化、用户体验增强等功能
 */

// 检测设备类型
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};

// 检测屏幕尺寸
export const getScreenSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isSmall: window.innerWidth < 480,
    isMedium: window.innerWidth >= 480 && window.innerWidth < 768,
    isLarge: window.innerWidth >= 768
  };
};

// 检测网络连接
export const getNetworkInfo = () => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  return {
    effectiveType: connection?.effectiveType || 'unknown',
    downlink: connection?.downlink || 0,
    rtt: connection?.rtt || 0,
    saveData: connection?.saveData || false
  };
};

// 性能优化配置
export const getPerformanceConfig = () => {
  const networkInfo = getNetworkInfo();
  const screenSize = getScreenSize();
  
  // 根据网络状况调整配置
  const isSlowNetwork = networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g';
  const isFastNetwork = networkInfo.effectiveType === '4g';
  
  return {
    // 图片质量
    imageQuality: isSlowNetwork ? 0.7 : isFastNetwork ? 1.0 : 0.8,
    
    // 动画设置
    enableAnimations: !isSlowNetwork,
    
    // 预加载设置
    enablePreloading: isFastNetwork,
    
    // 懒加载设置
    enableLazyLoading: isSlowNetwork || screenSize.isSmall,
    
    // 缓存设置
    cacheStrategy: isSlowNetwork ? 'aggressive' : 'normal'
  };
};

// 触摸事件优化
export const optimizeTouchEvents = () => {
  // 防止双击缩放
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // 优化滚动性能
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });
};

// 图片懒加载
export const setupLazyLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// 预加载关键资源
export const preloadCriticalResources = () => {
  const config = getPerformanceConfig();
  
  if (!config.enablePreloading) return;

  // 预加载关键CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.href = '/src/styles/mobile.css';
  criticalCSS.as = 'style';
  document.head.appendChild(criticalCSS);

  // 预加载关键字体
  const font = document.createElement('link');
  font.rel = 'preload';
  font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  font.as = 'style';
  document.head.appendChild(font);
};

// 移动端特定的错误处理
export const setupMobileErrorHandling = () => {
  // 处理内存不足错误
  window.addEventListener('error', (event) => {
    if (event.error?.name === 'QuotaExceededError') {
      console.warn('存储空间不足，清理缓存...');
      // 清理localStorage
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        console.error('清理缓存失败:', e);
      }
    }
  });

  // 处理网络错误
  window.addEventListener('online', () => {
    console.log('网络已连接');
    // 可以在这里触发数据同步
  });

  window.addEventListener('offline', () => {
    console.log('网络已断开');
    // 可以在这里显示离线提示
  });
};

// 移动端键盘处理
export const handleMobileKeyboard = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  
  if (!viewport) return;

  const originalContent = viewport.getAttribute('content');
  
  // 监听输入框焦点
  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      // 键盘弹出时调整viewport
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  });

  document.addEventListener('focusout', () => {
    // 键盘收起时恢复viewport
    if (originalContent) {
      viewport.setAttribute('content', originalContent);
    }
  });
};

// 移动端滚动优化
export const optimizeScrolling = () => {
  // 添加滚动容器类
  const scrollContainers = document.querySelectorAll('.scroll-container');
  scrollContainers.forEach(container => {
    container.classList.add('mobile-scroll-optimized');
  });

  // 防止橡皮筋效果（iOS）
  document.addEventListener('touchmove', (event) => {
    const target = event.target as HTMLElement;
    const scrollableParent = target.closest('.scroll-container');
    
    if (!scrollableParent) {
      event.preventDefault();
    }
  }, { passive: false });
};

// 移动端初始化
export const initMobileOptimizations = () => {
  if (!isMobile()) return;

  console.log('初始化移动端优化...');
  
  // 应用性能配置
  const config = getPerformanceConfig();
  document.documentElement.style.setProperty('--animation-duration', config.enableAnimations ? '0.3s' : '0s');
  
  // 设置优化
  optimizeTouchEvents();
  setupLazyLoading();
  preloadCriticalResources();
  setupMobileErrorHandling();
  handleMobileKeyboard();
  optimizeScrolling();
  
  console.log('移动端优化完成');
};

// 移动端特定的工具函数
export const mobileUtils = {
  // 震动反馈
  vibrate: (pattern: number | number[] = 50) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  },

  // 复制到剪贴板
  copyToClipboard: async (text: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        mobileUtils.vibrate(25);
        return true;
      } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        mobileUtils.vibrate(25);
        return true;
      }
    } catch (error) {
      console.error('复制失败:', error);
      return false;
    }
  },

  // 分享功能
  share: async (data: { title?: string; text?: string; url?: string }) => {
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
  },

  // 获取设备信息
  getDeviceInfo: () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      isMobile: isMobile(),
      isIOS: isIOS(),
      isAndroid: isAndroid(),
      screenSize: getScreenSize(),
      networkInfo: getNetworkInfo()
    };
  }
};

// 导出默认配置
export default {
  initMobileOptimizations,
  mobileUtils,
  isMobile,
  isIOS,
  isAndroid,
  getScreenSize,
  getNetworkInfo,
  getPerformanceConfig
};
