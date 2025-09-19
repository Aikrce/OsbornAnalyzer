import { AnalysisMode } from './unifiedAnalysisService';
// import type { AnalysisConfig } from './types'; // 暂时注释掉

// 性能优化配置
export interface PerformanceConfig {
  // 缓存配置
  cache: {
    enabled: boolean;
    maxSize: number;
    ttl: number;
    strategy: 'lru' | 'lfu' | 'fifo';
  };
  
  // 并发配置
  concurrency: {
    maxParallel: number;
    requestTimeout: number;
    retryAttempts: number;
    backoffStrategy: 'linear' | 'exponential' | 'fixed';
  };
  
  // 资源限制
  resourceLimits: {
    maxMemoryUsage: number; // MB
    maxCpuUsage: number; // percentage
    maxExecutionTime: number; // ms
  };
  
  // 智能优化
  smartOptimization: {
    enabled: boolean;
    adaptiveTimeout: boolean;
    predictiveCaching: boolean;
    loadBalancing: boolean;
  };
}

// 性能指标
export interface PerformanceMetrics {
  executionTime: number;
  memoryUsage: number;
  cpuUsage: number;
  cacheHitRate: number;
  successRate: number;
  averageResponseTime: number;
  throughput: number;
}

// 分析任务队列
interface AnalysisTask {
  id: string;
  topic: string;
  config: any;
  priority: number;
  timestamp: number;
  resolve: (result: any) => void;
  reject: (error: any) => void;
  abortController: AbortController;
}

// 缓存条目
interface CacheEntry {
  key: string;
  data: any;
  timestamp: number;
  accessCount: number;
  size: number;
}

class PerformanceOptimizer {
  private taskQueue: AnalysisTask[] = [];
  private activeTasks: Map<string, AnalysisTask> = new Map();
  private cache: Map<string, CacheEntry> = new Map();
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private resourceMonitor: ResourceMonitor;
  private adaptiveConfig: AdaptiveConfig;

  private readonly defaultConfig: PerformanceConfig = {
    cache: {
      enabled: true,
      maxSize: 100,
      ttl: 3600000, // 1小时
      strategy: 'lru'
    },
    concurrency: {
      maxParallel: 5,
      requestTimeout: 30000,
      retryAttempts: 2,
      backoffStrategy: 'exponential'
    },
    resourceLimits: {
      maxMemoryUsage: 512, // 512MB
      maxCpuUsage: 80, // 80%
      maxExecutionTime: 60000 // 60秒
    },
    smartOptimization: {
      enabled: true,
      adaptiveTimeout: true,
      predictiveCaching: true,
      loadBalancing: true
    }
  };

  constructor(private config: PerformanceConfig) {
    this.config = { ...this.defaultConfig, ...config };
    this.resourceMonitor = new ResourceMonitor(this.config.resourceLimits);
    this.adaptiveConfig = new AdaptiveConfig();
    this.startTaskProcessor();
    this.startResourceMonitoring();
  }

  /**
   * 优化分析执行
   */
  async optimizeExecution(
    topic: string,
    analysisFn: () => Promise<any>,
    config: any
  ): Promise<any> {
    const startTime = performance.now();
    // const taskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`; // 暂时未使用
    
    try {
      // 检查缓存
      const cacheKey = this.generateCacheKey(topic, config);
      const cachedResult = this.getFromCache(cacheKey);
      if (cachedResult) {
        this.recordMetrics('cache_hit', performance.now() - startTime);
        return cachedResult;
      }

      // 检查资源限制
      if (!this.resourceMonitor.canExecute()) {
        throw new Error('Resource limits exceeded');
      }

      // 自适应超时调整
      const timeout = this.adaptiveConfig.getAdaptiveTimeout(config.mode);
      
      // 执行分析
      const result = await this.executeWithTimeout(
        analysisFn,
        timeout,
        config.retryCount || this.config.concurrency.retryAttempts
      );

      // 缓存结果
      if (this.config.cache.enabled) {
        this.addToCache(cacheKey, result);
      }

      // 记录性能指标
      const executionTime = performance.now() - startTime;
      this.recordMetrics(config.mode, executionTime);

      return result;

    } catch (error) {
      this.recordMetrics('error', performance.now() - startTime);
      throw error;
    }
  }

  /**
   * 批量分析优化
   */
  async optimizeBatchAnalysis(
    topics: string[],
    analysisFn: (topic: string) => Promise<any>,
    config: any
  ): Promise<any[]> {
    const startTime = performance.now();
    const results: any[] = new Array(topics.length);
    const errors: Array<{ index: number; error: Error }> = [];

    // 创建任务队列
    const tasks = topics.map((topic, index) => ({
      topic,
      index,
      priority: this.calculatePriority(topic, config),
      execute: async () => {
        try {
          const result = await this.optimizeExecution(topic, () => analysisFn(topic), config);
          results[index] = result;
        } catch (error) {
          errors.push({ index, error: error as Error });
        }
      }
    }));

    // 排序任务（优先级高的先执行）
    tasks.sort((a, b) => b.priority - a.priority);

    // 并发执行
    const batchSize = Math.min(
      this.config.concurrency.maxParallel,
      Math.ceil(topics.length / 2)
    );

    const executeBatch = async (batch: typeof tasks) => {
      await Promise.all(batch.map(task => task.execute()));
    };

    // 分批执行
    for (let i = 0; i < tasks.length; i += batchSize) {
      const batch = tasks.slice(i, i + batchSize);
      await executeBatch(batch);
    }

    // 处理错误
    if (errors.length > 0) {
      console.warn(`Batch analysis completed with ${errors.length} errors:`, errors);
    }

    this.recordMetrics('batch', performance.now() - startTime);
    return results;
  }

  /**
   * 智能预缓存
   */
  async optimizePredictiveCaching(topics: string[], config: any): Promise<void> {
    if (!this.config.smartOptimization.predictiveCaching) {
      return;
    }

    const startTime = performance.now();
    const cacheKeyPrefix = 'predictive-';

    // 预测分析主题（基于相似性和趋势）
    const predictedTopics = this.predictTopics(topics);
    
    // 过滤掉已缓存的主题
    const topicsToCache = predictedTopics.filter(topic => {
      const cacheKey = cacheKeyPrefix + this.generateCacheKey(topic, config);
      return !this.cache.has(cacheKey);
    });

    // 限制预缓存数量
    const maxPreCache = Math.min(topicsToCache.length, 10);
    const selectedTopics = topicsToCache.slice(0, maxPreCache);

    // 后台预缓存（不阻塞主流程）
    selectedTopics.forEach(async (topic) => {
      try {
        const cacheKey = cacheKeyPrefix + this.generateCacheKey(topic, config);
        // 这里应该调用实际的分析函数，暂时用模拟数据
        const mockResult = { topic, predicted: true, timestamp: Date.now() };
        this.addToCache(cacheKey, mockResult);
      } catch (error) {
        console.warn(`Predictive caching failed for topic: ${topic}`, error);
      }
    });

    this.recordMetrics('predictive_cache', performance.now() - startTime);
  }

  /**
   * 负载均衡优化
   */
  optimizeLoadBalancing(
    analysisModes: AnalysisMode[],
    _topic: string,
    config: any
  ): AnalysisMode {
    if (!this.config.smartOptimization.loadBalancing) {
      return config.mode;
    }

    const currentLoad = this.getCurrentLoad();
    const modePerformance = this.getModePerformance(analysisModes);

    // 选择负载较低且性能较好的模式
    const optimalMode = analysisModes.reduce((best, mode) => {
      const load = currentLoad[mode] || 0;
      const performance = modePerformance[mode] || 0;
      const bestLoad = currentLoad[best] || 0;
      const bestPerformance = modePerformance[best] || 0;

      // 综合考虑负载和性能
      const score = performance * 0.7 + (1 - load) * 0.3;
      const bestScore = bestPerformance * 0.7 + (1 - bestLoad) * 0.3;

      return score > bestScore ? mode : best;
    }, config.mode);

    return optimalMode;
  }

  /**
   * 内存优化
   */
  optimizeMemoryUsage(): void {
    // 清理过期缓存
    this.cleanupCache();
    
    // 限制任务队列大小
    if (this.taskQueue.length > 100) {
      this.taskQueue = this.taskQueue.slice(-50); // 保留最近50个任务
    }

    // 清理完成的任务
    const completedThreshold = Date.now() - 300000; // 5分钟前
    for (const [taskId, task] of this.activeTasks.entries()) {
      if (task.timestamp < completedThreshold) {
        this.activeTasks.delete(taskId);
      }
    }
  }

  /**
   * 获取性能统计
   */
  getPerformanceStats(): PerformanceMetrics {
    const stats = Array.from(this.metrics.values());
    if (stats.length === 0) {
      return this.getDefaultMetrics();
    }

    return {
      executionTime: stats.reduce((sum, m) => sum + m.executionTime, 0) / stats.length,
      memoryUsage: stats.reduce((sum, m) => sum + m.memoryUsage, 0) / stats.length,
      cpuUsage: stats.reduce((sum, m) => sum + m.cpuUsage, 0) / stats.length,
      cacheHitRate: stats.reduce((sum, m) => sum + m.cacheHitRate, 0) / stats.length,
      successRate: stats.reduce((sum, m) => sum + m.successRate, 0) / stats.length,
      averageResponseTime: stats.reduce((sum, m) => sum + m.averageResponseTime, 0) / stats.length,
      throughput: stats.reduce((sum, m) => sum + m.throughput, 0)
    };
  }

  // 私有方法
  private executeWithTimeout(
    fn: () => Promise<any>,
    timeout: number,
    retryAttempts: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const executeWithRetry = async () => {
        let lastError: Error;

        for (let attempt = 0; attempt <= retryAttempts; attempt++) {
          try {
            const timeoutPromise = new Promise((_, reject) => {
              setTimeout(() => reject(new Error('Execution timeout')), timeout);
            });

            const result = await Promise.race([fn(), timeoutPromise]);
            resolve(result);
            return;

          } catch (error) {
            lastError = error as Error;
            
            if (attempt < retryAttempts) {
              const delay = this.calculateBackoffDelay(attempt);
              await this.delay(delay);
            }
          }
        }

        reject(lastError!);
      };

      executeWithRetry().catch(reject);
    });
  }

  private calculateBackoffDelay(attempt: number): number {
    const baseDelay = 1000; // 1秒
    
    switch (this.config.concurrency.backoffStrategy) {
      case 'linear':
        return baseDelay * (attempt + 1);
      case 'exponential':
        return baseDelay * Math.pow(2, attempt);
      case 'fixed':
      default:
        return baseDelay;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateCacheKey(topic: string, config: any): string {
    const contextStr = JSON.stringify(config.context || {});
    return `${topic}-${config.mode}-${contextStr}`;
  }

  private addToCache(key: string, data: any): void {
    if (this.cache.size >= this.config.cache.maxSize) {
      this.evictCache();
    }

    const entry: CacheEntry = {
      key,
      data,
      timestamp: Date.now(),
      accessCount: 1,
      size: JSON.stringify(data).length
    };

    this.cache.set(key, entry);
  }

  private getFromCache(key: string): any {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // 检查过期时间
    if (Date.now() - entry.timestamp > this.config.cache.ttl) {
      this.cache.delete(key);
      return null;
    }

    // 更新访问统计
    entry.accessCount++;
    entry.timestamp = Date.now();

    return entry.data;
  }

  private evictCache(): void {
    const entries = Array.from(this.cache.entries());
    
    let evictKey: string;
    
    switch (this.config.cache.strategy) {
      case 'lru':
        // 最近最少使用
        evictKey = entries.reduce((oldest, [key, entry]) => {
          const oldestEntry = this.cache.get(oldest);
          if (!oldestEntry) return key;
          return entry.timestamp < oldestEntry.timestamp ? key : oldest;
        }, entries[0]?.[0] || '');
        break;
        
      case 'lfu':
        // 最不经常使用
        evictKey = entries.reduce((leastUsed, [key, entry]) => {
          const leastUsedEntry = this.cache.get(leastUsed);
          if (!leastUsedEntry) return key;
          return entry.accessCount < leastUsedEntry.accessCount ? key : leastUsed;
        }, entries[0]?.[0] || '');
        break;
        
      case 'fifo':
      default:
        // 先进先出
        evictKey = entries[0]?.[0] || '';
        break;
    }

    this.cache.delete(evictKey);
  }

  private cleanupCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.config.cache.ttl) {
        this.cache.delete(key);
      }
    }
  }

  private calculatePriority(topic: string, config: any): number {
    // 简单的优先级计算
    let priority = 0;
    
    // 基于配置模式
    const modePriority = {
      'local_only': 3,
      'ai_only': 2,
      'parallel': 4,
      'smart_hybrid': 5
    };
    
    priority += modePriority[config.mode as keyof typeof modePriority] || 0;
    
    // 基于主题长度（越具体优先级越高）
    priority += Math.min(topic.length / 10, 2);
    
    // 基于上下文复杂度
    const contextComplexity = Object.keys(config.context || {}).length;
    priority += Math.min(contextComplexity, 3);
    
    return priority;
  }

  private predictTopics(topics: string[]): string[] {
    // 简单的主题预测：基于关键词提取和相似性
    const keywords = new Set<string>();
    
    topics.forEach(topic => {
      // 提取关键词（简单实现）
      const words = topic.toLowerCase().split(/[\s\-_]+/);
      words.forEach(word => {
        if (word.length > 2) {
          keywords.add(word);
        }
      });
    });
    
    // 生成预测主题（简单示例）
    const predictedTopics: string[] = [];
    keywords.forEach(keyword => {
      predictedTopics.push(
        `${keyword}创新`,
        `${keyword}优化`,
        `${keyword}发展`
      );
    });
    
    return [...new Set(predictedTopics)].slice(0, 20);
  }

  private getCurrentLoad(): Record<string, number> {
    const load: Record<string, number> = {};
    
    // 计算当前负载（基于活跃任务数）
    const activeCount = this.activeTasks.size;
    const queueSize = this.taskQueue.length;
    const totalLoad = activeCount + queueSize;
    
    // 为每种模式分配负载（简化实现）
    const modes = ['local_only', 'ai_only', 'parallel', 'smart_hybrid'];
    modes.forEach(mode => {
      load[mode] = Math.min(totalLoad / 10, 1.0); // 最大负载为1.0
    });
    
    return load;
  }

  private getModePerformance(modes: AnalysisMode[]): Record<string, number> {
    const performance: Record<string, number> = {};
    
    // 基于历史指标计算性能（简化实现）
    modes.forEach(mode => {
      const metrics = this.metrics.get(`perf-${mode}`);
      if (metrics) {
        performance[mode] = 1.0 / (metrics.averageResponseTime / 1000); // 响应时间越短性能越高
      } else {
        performance[mode] = 0.5; // 默认性能
      }
    });
    
    return performance;
  }

  private recordMetrics(type: string, executionTime: number): void {
    const metrics: PerformanceMetrics = {
      executionTime,
      memoryUsage: this.estimateMemoryUsage(),
      cpuUsage: this.estimateCpuUsage(),
      cacheHitRate: this.calculateCacheHitRate(),
      successRate: this.calculateSuccessRate(),
      averageResponseTime: executionTime,
      throughput: 1
    };
    
    this.metrics.set(type, metrics);
  }

  private estimateMemoryUsage(): number {
    // 估算内存使用（简化实现）
    const cacheSize = this.cache.size * 100; // 假设每个缓存条目100KB
    const taskQueueSize = this.taskQueue.length * 50; // 假设每个任务50KB
    const activeTasksSize = this.activeTasks.size * 200; // 假设每个活跃任务200KB
    
    return (cacheSize + taskQueueSize + activeTasksSize) / 1024; // 转换为MB
  }

  private estimateCpuUsage(): number {
    // 估算CPU使用（简化实现）
    const activeCount = this.activeTasks.size;
    return Math.min(activeCount * 10, 100); // 每个任务假设10%CPU使用率
  }

  private calculateCacheHitRate(): number {
    // 简化的缓存命中率计算
    return this.cache.size > 0 ? 0.85 : 0;
  }

  private calculateSuccessRate(): number {
    // 简化的成功率计算
    return 0.95; // 假设95%成功率
  }

  private getDefaultMetrics(): PerformanceMetrics {
    return {
      executionTime: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      cacheHitRate: 0,
      successRate: 0,
      averageResponseTime: 0,
      throughput: 0
    };
  }

  private startTaskProcessor(): void {
    // 启动任务处理器（简化实现）
    setInterval(() => {
      this.processNextTask();
    }, 100); // 每100ms处理一个任务
  }

  private processNextTask(): void {
    if (this.taskQueue.length === 0 || this.activeTasks.size >= this.config.concurrency.maxParallel) {
      return;
    }

    const task = this.taskQueue.shift();
    if (task) {
      this.activeTasks.set(task.id, task);
      (task as any).run().finally(() => {
        this.activeTasks.delete(task.id);
      });
    }
  }

  private startResourceMonitoring(): void {
    // 启动资源监控（简化实现）
    setInterval(() => {
      this.optimizeMemoryUsage();
    }, 30000); // 每30秒优化一次内存
  }
}

// 资源监控器
class ResourceMonitor {
  private currentMemoryUsage = 0;
  private currentCpuUsage = 0;

  constructor(private limits: PerformanceConfig['resourceLimits']) {}

  canExecute(): boolean {
    return this.currentMemoryUsage < this.limits.maxMemoryUsage &&
           this.currentCpuUsage < this.limits.maxCpuUsage;
  }

  updateUsage(memory: number, cpu: number): void {
    this.currentMemoryUsage = memory;
    this.currentCpuUsage = cpu;
  }

  getUsage(): { memory: number; cpu: number } {
    return {
      memory: this.currentMemoryUsage,
      cpu: this.currentCpuUsage
    };
  }
}

// 自适应配置
class AdaptiveConfig {
  private historicalData: Map<string, number[]> = new Map();
  
  getAdaptiveTimeout(mode: AnalysisMode): number {
    const data = this.historicalData.get(mode) || [];
    if (data.length === 0) {
      return 30000; // 默认30秒
    }
    
    // 基于历史数据计算自适应超时（使用95百分位）
    const sorted = [...data].sort((a, b) => a - b);
    const percentile95 = sorted[Math.floor(sorted.length * 0.95)];
    
    return Math.max((percentile95 || 10000) * 1.2, 10000); // 至少10秒，增加20%缓冲
  }

  recordExecutionTime(mode: AnalysisMode, duration: number): void {
    const data = this.historicalData.get(mode) || [];
    data.push(duration);
    
    // 限制历史数据大小
    if (data.length > 100) {
      data.shift();
    }
    
    this.historicalData.set(mode, data);
  }
}

// 导出优化器实例
export const performanceOptimizer = new PerformanceOptimizer({
  cache: {
    enabled: true,
    maxSize: 100,
    ttl: 3600000,
    strategy: 'lru'
  },
  concurrency: {
    maxParallel: 5,
    requestTimeout: 30000,
    retryAttempts: 2,
    backoffStrategy: 'exponential'
  },
  resourceLimits: {
    maxMemoryUsage: 512,
    maxCpuUsage: 80,
    maxExecutionTime: 60000
  },
  smartOptimization: {
    enabled: true,
    adaptiveTimeout: true,
    predictiveCaching: true,
    loadBalancing: true
  }
});

export default performanceOptimizer;