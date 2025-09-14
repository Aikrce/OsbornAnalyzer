import { AnalysisResult, AIAnalysisResult } from '../types';

// AI缓存配置
export interface AICacheConfig {
  maxSize: number;
  ttl: number; // 缓存有效期（毫秒）
  storageKey: string;
}

// 缓存项
export interface AICacheItem {
  result: AIAnalysisResult;
  timestamp: number;
  analysisHash: string;
  usageCount: number;
  lastUsed: number;
}

// 智能AI缓存管理器
export class AICacheManager {
  private cache: Map<string, AICacheItem> = new Map();
  private config: AICacheConfig;
  private hits: number = 0;
  private misses: number = 0;

  constructor(config?: Partial<AICacheConfig>) {
    this.config = {
      maxSize: 1000,
      ttl: 7 * 24 * 60 * 60 * 1000, // 7天
      storageKey: 'huitu-ai-cache',
      ...config
    };

    this.loadFromStorage();
  }

  /**
   * 生成分析结果的哈希值
   */
  private generateAnalysisHash(result: AnalysisResult): string {
    // 简化的哈希生成，实际项目中可以使用更复杂的算法
    const content = JSON.stringify({
      title: result.title,
      description: result.description,
      questions: Object.keys(result.questions).sort().map(key => ({
        category: key,
        count: result.questions[key].length
      }))
    });

    return this.hashString(content);
  }

  /**
   * 简单的字符串哈希函数
   */
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  /**
   * 获取缓存的分析结果
   */
  getCachedAnalysis(result: AnalysisResult): AIAnalysisResult | null {
    const hash = this.generateAnalysisHash(result);
    const cachedItem = this.cache.get(hash);

    if (!cachedItem) {
      this.misses++;
      return null;
    }

    // 检查缓存是否过期
    const now = Date.now();
    if (now - cachedItem.timestamp > this.config.ttl) {
      this.cache.delete(hash);
      this.misses++;
      return null;
    }

    // 更新使用统计
    cachedItem.usageCount++;
    cachedItem.lastUsed = now;
    this.hits++;

    return cachedItem.result;
  }

  /**
   * 缓存分析结果
   */
  cacheAnalysis(result: AnalysisResult, analysisResult: AIAnalysisResult): void {
    const hash = this.generateAnalysisHash(result);
    const now = Date.now();

    const cacheItem: AICacheItem = {
      result: analysisResult,
      timestamp: now,
      analysisHash: hash,
      usageCount: 1,
      lastUsed: now
    };

    this.cache.set(hash, cacheItem);

    // 检查缓存大小，如果超过限制则清理最不常用的项目
    if (this.cache.size > this.config.maxSize) {
      this.cleanupCache();
    }

    this.saveToStorage();
  }

  /**
   * 清理缓存
   */
  private cleanupCache(): void {
    const entries = Array.from(this.cache.entries());
    
    // 按使用频率和最后使用时间排序
    entries.sort(([, a], [, b]) => {
      // 优先清理使用次数少且长时间未使用的项目
      const scoreA = a.usageCount / (Date.now() - a.lastUsed + 1);
      const scoreB = b.usageCount / (Date.now() - b.lastUsed + 1);
      return scoreA - scoreB;
    });

    // 删除一半的最不常用项目
    const itemsToRemove = Math.floor(entries.length / 2);
    for (let i = 0; i < itemsToRemove; i++) {
      this.cache.delete(entries[i][0]);
    }
  }

  /**
   * 从本地存储加载缓存
   */
  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(this.config.storageKey);
        if (stored) {
          const data = JSON.parse(stored);
          
          // 只加载未过期的缓存项
          const now = Date.now();
          Object.entries(data).forEach(([hash, item]: [string, any]) => {
            if (now - item.timestamp < this.config.ttl) {
              this.cache.set(hash, {
                ...item,
                timestamp: item.timestamp,
                lastUsed: item.lastUsed || item.timestamp
              });
            }
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load AI cache from storage:', error);
    }
  }

  /**
   * 保存缓存到本地存储
   */
  private saveToStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const data: Record<string, any> = {};
        this.cache.forEach((item, hash) => {
          data[hash] = {
            result: item.result,
            timestamp: item.timestamp,
            analysisHash: item.analysisHash,
            usageCount: item.usageCount,
            lastUsed: item.lastUsed
          };
        });

        localStorage.setItem(this.config.storageKey, JSON.stringify(data));
      }
    } catch (error) {
      console.warn('Failed to save AI cache to storage:', error);
    }
  }

  /**
   * 清除所有缓存
   */
  clearCache(): void {
    this.cache.clear();
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.config.storageKey);
      }
    } catch (error) {
      console.warn('Failed to clear AI cache from storage:', error);
    }
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): {
    size: number;
    hits: number;
    misses: number;
    hitRate: number;
    oldestItemAge: number;
    mostUsedCount: number;
  } {
    const now = Date.now();
    let oldestAge = 0;
    let mostUsed = 0;

    this.cache.forEach(item => {
      const age = now - item.timestamp;
      if (age > oldestAge) oldestAge = age;
      if (item.usageCount > mostUsed) mostUsed = item.usageCount;
    });

    const total = this.hits + this.misses;
    const hitRate = total > 0 ? (this.hits / total) * 100 : 0;

    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: Math.round(hitRate * 100) / 100,
      oldestItemAge: Math.floor(oldestAge / (60 * 60 * 1000)), // 小时
      mostUsedCount: mostUsed
    };
  }

  /**
   * 预加载常用分析模式
   */
  preloadCommonPatterns(commonResults: Array<{result: AnalysisResult, analysis: AIAnalysisResult}>): void {
    commonResults.forEach(({result, analysis}) => {
      this.cacheAnalysis(result, analysis);
    });
  }

  /**
   * 导出缓存数据（用于备份或迁移）
   */
  exportCache(): string {
    const data: Record<string, any> = {};
    this.cache.forEach((item, hash) => {
      data[hash] = {
        result: item.result,
        timestamp: item.timestamp,
        analysisHash: item.analysisHash,
        usageCount: item.usageCount,
        lastUsed: item.lastUsed
      };
    });

    return JSON.stringify({
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        itemCount: this.cache.size
      },
      data
    }, null, 2);
  }

  /**
   * 导入缓存数据
   */
  importCache(data: string): number {
    try {
      const parsed = JSON.parse(data);
      let importedCount = 0;

      if (parsed.data && typeof parsed.data === 'object') {
        Object.entries(parsed.data).forEach(([hash, itemData]: [string, any]) => {
          this.cache.set(hash, {
            result: itemData.result,
            timestamp: itemData.timestamp,
            analysisHash: itemData.analysisHash,
            usageCount: itemData.usageCount || 1,
            lastUsed: itemData.lastUsed || itemData.timestamp
          });
          importedCount++;
        });
      }

      return importedCount;
    } catch (error) {
      console.error('Failed to import cache data:', error);
      return 0;
    }
  }
}

// 创建默认缓存管理器实例
export const aiCacheManager = new AICacheManager();

// 缓存相关的工具函数
export const cacheUtils = {
  /**
   * 检查是否应该使用缓存（基于网络状态和分析复杂度）
   */
  shouldUseCache(result: AnalysisResult, isOnline: boolean): boolean {
    if (!isOnline) return true;

    // 在线时，只对复杂分析使用缓存
    const totalQuestions = Object.values(result.questions).reduce(
      (sum, questions) => sum + questions.length, 0
    );

    return totalQuestions > 20; // 超过20个问题使用缓存
  },

  /**
   * 生成缓存键（供外部使用）
   */
  generateCacheKey(result: AnalysisResult): string {
    const manager = new AICacheManager();
    return manager['generateAnalysisHash'](result);
  },

  /**
   * 清理过期的缓存项
   */
  cleanupExpiredCache(): number {
    const manager = new AICacheManager();
    const originalSize = manager['cache'].size;
    
    const now = Date.now();
    manager['cache'].forEach((item, hash) => {
      if (now - item.timestamp > manager['config'].ttl) {
        manager['cache'].delete(hash);
      }
    });

    manager['saveToStorage']();
    return originalSize - manager['cache'].size;
  }
};