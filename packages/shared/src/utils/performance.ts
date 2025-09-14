import { nanoid } from 'nanoid';

/**
 * 性能监控工具
 */
export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map();
  private static metrics: Array<{
    id: string;
    name: string;
    duration: number;
    timestamp: number;
  }> = [];

  /**
   * 开始计时
   */
  static start(name: string): string {
    const id = nanoid();
    this.timers.set(id, performance.now());
    return id;
  }

  /**
   * 结束计时
   */
  static end(id: string, name: string): number {
    const startTime = this.timers.get(id);
    if (!startTime) {
      console.warn(`Timer ${id} not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(id);
    
    this.metrics.push({
      id,
      name,
      duration,
      timestamp: Date.now(),
    });

    return duration;
  }

  /**
   * 获取性能指标
   */
  static getMetrics() {
    return [...this.metrics];
  }

  /**
   * 清空指标
   */
  static clear() {
    this.metrics.length = 0;
    this.timers.clear();
  }
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
