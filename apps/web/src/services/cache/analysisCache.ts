/**
 * 分析缓存服务
 * 提供智能缓存策略，避免重复分析相同主题
 */

import { AnalysisType } from '../../types/analysis';
import { ErrorHandler } from '../error/errorHandler';

interface CacheEntry<T> {
  data: T;
  expiry: number;
  accessCount: number;
  lastAccessed: number;
  size: number;
}

interface CacheStats {
  hitRate: number;
  totalHits: number;
  totalMisses: number;
  totalSize: number;
  entryCount: number;
}

class AnalysisCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 1000 * 60 * 60; // 1小时
  private readonly MAX_SIZE = 50 * 1024 * 1024; // 50MB
  private readonly MAX_ENTRIES = 100;
  
  private stats = {
    hits: 0,
    misses: 0,
    totalSize: 0
  };

  /**
   * 生成缓存键
   */
  generateKey(topic: string, type: AnalysisType, context?: any): string {
    const keyData = {
      topic: topic.toLowerCase().trim(),
      type,
      context: context ? this.normalizeContext(context) : undefined
    };
    return JSON.stringify(keyData);
  }

  /**
   * 标准化上下文对象
   */
  private normalizeContext(context: any): any {
    if (!context || typeof context !== 'object') {
      return context;
    }

    const normalized: any = {};
    const keys = Object.keys(context).sort();
    
    for (const key of keys) {
      const value = context[key];
      if (value !== undefined && value !== null) {
        normalized[key] = typeof value === 'string' ? value.toLowerCase().trim() : value;
      }
    }
    
    return normalized;
  }

  /**
   * 获取缓存数据
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }
    
    // 检查是否过期
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      this.stats.misses++;
      this.stats.totalSize -= entry.size;
      return null;
    }
    
    // 更新访问统计
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    
    this.stats.hits++;
    return entry.data;
  }

  /**
   * 设置缓存数据
   */
  set<T>(key: string, data: T, ttl?: number): void {
    try {
      const expiry = Date.now() + (ttl || this.DEFAULT_TTL);
      const serialized = JSON.stringify(data);
      const size = new Blob([serialized]).size;
      
      // 检查存储限制
      if (size > this.MAX_SIZE) {
        console.warn('缓存数据过大，跳过缓存:', key);
        return;
      }
      
      // 如果缓存已满，清理最旧的条目
      if (this.cache.size >= this.MAX_ENTRIES) {
        this.evictOldest();
      }
      
      // 如果总大小超过限制，清理最少使用的条目
      if (this.stats.totalSize + size > this.MAX_SIZE) {
        this.evictLeastUsed();
      }
      
      const entry: CacheEntry<T> = {
        data,
        expiry,
        accessCount: 1,
        lastAccessed: Date.now(),
        size
      };
      
      // 如果键已存在，先减去旧的大小
      const existing = this.cache.get(key);
      if (existing) {
        this.stats.totalSize -= existing.size;
      }
      
      this.cache.set(key, entry);
      this.stats.totalSize += size;
      
    } catch (error) {
      ErrorHandler.logError(error, {
        component: 'AnalysisCache',
        action: 'set',
        additionalData: { key, ttl }
      });
    }
  }

  /**
   * 删除缓存条目
   */
  delete(key: string): boolean {
    const entry = this.cache.get(key);
    if (entry) {
      this.cache.delete(key);
      this.stats.totalSize -= entry.size;
      return true;
    }
    return false;
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear();
    this.stats.totalSize = 0;
    this.stats.hits = 0;
    this.stats.misses = 0;
  }

  /**
   * 清理过期条目
   */
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => this.delete(key));
  }

  /**
   * 驱逐最旧的条目
   */
  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  /**
   * 驱逐最少使用的条目
   */
  private evictLeastUsed(): void {
    let leastUsedKey = '';
    let leastAccessCount = Infinity;
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.accessCount < leastAccessCount) {
        leastAccessCount = entry.accessCount;
        leastUsedKey = key;
      }
    }
    
    if (leastUsedKey) {
      this.delete(leastUsedKey);
    }
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): CacheStats {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;
    
    return {
      hitRate: Math.round(hitRate * 100) / 100,
      totalHits: this.stats.hits,
      totalMisses: this.stats.misses,
      totalSize: this.stats.totalSize,
      entryCount: this.cache.size
    };
  }

  /**
   * 预热缓存
   */
  async warmup(commonTopics: string[]): Promise<void> {
    // 这里可以实现缓存预热逻辑
    // 例如：预加载常见主题的分析结果
    console.log('缓存预热开始，常见主题:', commonTopics);
  }

  /**
   * 检查缓存健康状态
   */
  getHealthStatus(): {
    isHealthy: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    const stats = this.getStats();
    
    // 检查命中率
    if (stats.hitRate < 0.3) {
      issues.push('缓存命中率过低');
      recommendations.push('考虑调整缓存策略或增加缓存时间');
    }
    
    // 检查存储使用率
    const sizeUsagePercent = (stats.totalSize / this.MAX_SIZE) * 100;
    if (sizeUsagePercent > 80) {
      issues.push('缓存存储使用率过高');
      recommendations.push('考虑清理缓存或增加存储限制');
    }
    
    // 检查条目数量
    if (stats.entryCount > this.MAX_ENTRIES * 0.9) {
      issues.push('缓存条目数量接近上限');
      recommendations.push('考虑清理过期条目');
    }
    
    return {
      isHealthy: issues.length === 0,
      issues,
      recommendations
    };
  }
}

// 创建单例实例
export const analysisCache = new AnalysisCache();

// 定期清理过期条目
setInterval(() => {
  analysisCache.cleanup();
}, 1000 * 60 * 10); // 每10分钟清理一次

export default analysisCache;
