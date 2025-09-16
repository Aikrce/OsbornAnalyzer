import { useState, useEffect } from 'react';

export interface BreakpointConfig {
  xs: number;  // 0px
  sm: number;  // 640px
  md: number;  // 768px
  lg: number;  // 1024px
  xl: number;  // 1280px
  '2xl': number; // 1536px
}

export interface ResponsiveState {
  width: number;
  height: number;
  breakpoint: keyof BreakpointConfig;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  orientation: 'landscape' | 'portrait';
  deviceType: 'mobile' | 'tablet' | 'desktop';
  touchDevice: boolean;
}

const defaultBreakpoints: BreakpointConfig = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const useResponsive = (breakpoints: BreakpointConfig = defaultBreakpoints): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const height = typeof window !== 'undefined' ? window.innerHeight : 768;
    
    return calculateResponsiveState(width, height, breakpoints);
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState(calculateResponsiveState(width, height, breakpoints));
    };

    const handleOrientationChange = () => {
      // 延迟执行，等待屏幕尺寸更新
      setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [breakpoints]);

  return state;
};

function calculateResponsiveState(
  width: number, 
  height: number, 
  breakpoints: BreakpointConfig
): ResponsiveState {
  // 确定当前断点
  let breakpoint: keyof BreakpointConfig = 'xs';
  
  if (width >= breakpoints['2xl']) breakpoint = '2xl';
  else if (width >= breakpoints.xl) breakpoint = 'xl';
  else if (width >= breakpoints.lg) breakpoint = 'lg';
  else if (width >= breakpoints.md) breakpoint = 'md';
  else if (width >= breakpoints.sm) breakpoint = 'sm';

  // 设备类型判断
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;

  // 方向判断
  const isLandscape = width > height;
  const isPortrait = height > width;
  const orientation = isLandscape ? 'landscape' : 'portrait';

  // 设备类型
  let deviceType: 'mobile' | 'tablet' | 'desktop';
  if (isMobile) deviceType = 'mobile';
  else if (isTablet) deviceType = 'tablet';
  else deviceType = 'desktop';

  // 触摸设备检测
  const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return {
    width,
    height,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    isPortrait,
    orientation,
    deviceType,
    touchDevice
  };
}

// 响应式Hook的便捷方法
export const useBreakpoint = (breakpoint: keyof BreakpointConfig, breakpoints: BreakpointConfig = defaultBreakpoints) => {
  const { width } = useResponsive(breakpoints);
  return width >= breakpoints[breakpoint];
};

export const useIsMobile = () => {
  const { isMobile } = useResponsive();
  return isMobile;
};

export const useIsTablet = () => {
  const { isTablet } = useResponsive();
  return isTablet;
};

export const useIsDesktop = () => {
  const { isDesktop } = useResponsive();
  return isDesktop;
};

export const useOrientation = () => {
  const { orientation, isLandscape, isPortrait } = useResponsive();
  return { orientation, isLandscape, isPortrait };
};

export default useResponsive;
