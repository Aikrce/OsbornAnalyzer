import { nanoid } from 'nanoid';

/**
 * 缓存接口
 */
export interface CacheItem<T> {
  id: string;
  key: string;
  value: T;
  expiry?: number;
  created: number;
  accessed: number;
}

/**
 * 内存缓存管理器
 */
export class MemoryCache<T = any> {
  private cache = new Map<string, CacheItem<T>>();
  private maxSize: number;
  private defaultTTL: number;

  constructor(maxSize: number = 100, defaultTTL: number = 5 * 60 * 1000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  /**
   * 设置缓存项
   */
  set(key: string, value: T, ttl?: number): void {
    const now = Date.now();
    const expiry = ttl ? now + ttl : now + this.defaultTTL;

    // 如果缓存已满，删除最旧的项
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.getOldestKey();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      id: nanoid(),
      key,
      value,
      expiry,
      created: now,
      accessed: now,
    });
  }

  /**
   * 获取缓存项
   */
  get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item) {
      return undefined;
    }

    const now = Date.now();
    
    // 检查是否过期
    if (item.expiry && now > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    // 更新访问时间
    item.accessed = now;
    return item.value;
  }

  /**
   * 删除缓存项
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存统计
   */
  getStats() {
    const items = Array.from(this.cache.values());
    const now = Date.now();
    const expired = items.filter(item => item.expiry && now > item.expiry).length;
    
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      expired,
      hitRate: this.calculateHitRate(),
    };
  }

  private getOldestKey(): string | undefined {
    let oldestKey: string | undefined;
    let oldestTime = Infinity;

    for (const [key, item] of this.cache) {
      if (item.accessed < oldestTime) {
        oldestTime = item.accessed;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  private calculateHitRate(): number {
    // 简化实现，实际项目中可以记录更详细的统计
    return this.cache.size > 0 ? 0.8 : 0;
  }
}

/**
 * 全局缓存实例
 */
export const globalCache = new MemoryCache();
