import { intelligentAnalysisEngine, AnalysisContext, IntelligentAnalysisResult } from './intelligentAnalysisEngine';
import { deepAnalysisEngine, DeepAnalysisResult } from './deepAnalysisEngine';
// import { localCaseService } from '../localCaseService'; // 暂时未使用
// import aiService from '../ai/aiService'; // 暂时未使用
import { AnalysisType, AnalysisMode, UnifiedAnalysisRequest } from '../../types/analysis';

// 重新导出统一类型定义
export type { AnalysisType, AnalysisMode, UnifiedAnalysisRequest } from '../../types/analysis';

// 统一分析结果接口
export interface UnifiedAnalysisResult {
  id: string;
  topic: string;
  type: AnalysisType;
  mode: AnalysisMode;
  timestamp: Date;
  duration: number;
  results: {
    local?: IntelligentAnalysisResult;
    ai?: DeepAnalysisResult;
    combined?: CombinedAnalysisResult;
  };
  metadata: {
    cacheHit?: boolean;
    parallelExecution?: boolean;
    errors?: string[];
    warnings?: string[];
    performance: {
      localDuration?: number;
      aiDuration?: number;
      totalDuration: number;
    };
  };
}

// 组合分析结果
export interface CombinedAnalysisResult {
  summary: string;
  mergedInsights: string[];
  conflicts: AnalysisConflict[];
  recommendations: MergedRecommendation[];
  confidence: number;
  bestPractices: string[];
}

// 分析冲突
export interface AnalysisConflict {
  dimension: string;
  localResult: string;
  aiResult: string;
  severity: 'low' | 'medium' | 'high';
  resolution?: string;
}

// 合并推荐
export interface MergedRecommendation {
  id: string;
  text: string;
  source: 'local' | 'ai' | 'both';
  priority: 'high' | 'medium' | 'low';
  timeframe: 'short' | 'medium' | 'long';
  confidence: number;
}

// 分析状态
export enum AnalysisStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// 缓存管理器
class AnalysisCacheManager {
  private cache: Map<string, { result: UnifiedAnalysisResult; expiry: number }> = new Map();
  private readonly defaultTTL = 1000 * 60 * 60; // 1小时

  generateKey(request: UnifiedAnalysisRequest): string {
    const keyData = {
      topic: request.topic,
      type: request.type,
      mode: request.mode,
      context: request.context
    };
    return JSON.stringify(keyData);
  }

  get(key: string): UnifiedAnalysisResult | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.result;
  }

  set(key: string, result: UnifiedAnalysisResult, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { result, expiry });
  }

  clear(): void {
    this.cache.clear();
  }
}

// 统一分析服务
class UnifiedAnalysisService {
  private cacheManager = new AnalysisCacheManager();
  private activeAnalyses: Map<string, AbortController> = new Map();

  /**
   * 执行统一分析
   */
  async analyze(request: UnifiedAnalysisRequest): Promise<UnifiedAnalysisResult> {
    // const startTime = Date.now(); // 暂时未使用
    const analysisId = `${request.type}-analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // 检查缓存
    if (request.options?.cacheResults !== false) {
      const cacheKey = this.cacheManager.generateKey(request);
      const cachedResult = this.cacheManager.get(cacheKey);
      if (cachedResult) {
        return {
          ...cachedResult,
          metadata: {
            ...cachedResult.metadata,
            cacheHit: true
          }
        };
      }
    }

    const abortController = new AbortController();
    this.activeAnalyses.set(analysisId, abortController);

    try {
      let result: UnifiedAnalysisResult;

      switch (request.type) {
        case AnalysisType.LOCAL:
          result = await this.performLocalAnalysis(request, analysisId, abortController.signal);
          break;
        case AnalysisType.API:
          result = await this.performAIAnalysis(request, analysisId, abortController.signal);
          break;
        case AnalysisType.DUAL:
          result = await this.performDualAnalysis(request, analysisId, abortController.signal);
          break;
        default:
          throw new Error(`Unsupported analysis type: ${request.type}`);
      }

      // 缓存结果
      if (request.options?.cacheResults !== false) {
        const cacheKey = this.cacheManager.generateKey(request);
        this.cacheManager.set(cacheKey, result);
      }

      return result;
    } finally {
      this.activeAnalyses.delete(analysisId);
    }
  }

  /**
   * 执行本地分析
   */
  private async performLocalAnalysis(
    request: UnifiedAnalysisRequest,
    analysisId: string,
    signal: AbortSignal
  ): Promise<UnifiedAnalysisResult> {
    const startTime = Date.now();
    
    try {
      // 根据模式调整分析深度
      const context = this.buildAnalysisContext(request);
      
      const localResult = await Promise.race([
        intelligentAnalysisEngine.generateEnhancedAnalysis(request.topic, context),
        new Promise<never>((_, reject) => {
          signal.addEventListener('abort', () => reject(new Error('Analysis cancelled')));
        })
      ]);

      const duration = Date.now() - startTime;

      return {
        id: analysisId,
        topic: request.topic,
        type: AnalysisType.LOCAL,
        mode: request.mode,
        timestamp: new Date(),
        duration,
        results: {
          local: localResult
        },
        metadata: {
          parallelExecution: false,
          performance: {
            localDuration: duration,
            totalDuration: duration
          }
        }
      };
    } catch (error) {
      throw new Error(`Local analysis failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 执行AI分析
   */
  private async performAIAnalysis(
    request: UnifiedAnalysisRequest,
    analysisId: string,
    signal: AbortSignal
  ): Promise<UnifiedAnalysisResult> {
    const startTime = Date.now();
    
    try {
      // 构建分析上下文，确保useAI标志正确设置
      const context = this.buildAnalysisContext(request);
      
      // 并行执行奥斯本分析和深度分析，确保API分析也包含奥斯本分析结果
      const [osbornPromise, deepPromise] = [
        intelligentAnalysisEngine.generateEnhancedAnalysis(request.topic, context),
        deepAnalysisEngine.generateDeepAnalysis(request.topic, context)
      ];

      const [osbornResult, deepResult] = await Promise.allSettled([
        Promise.race([
          osbornPromise,
          new Promise<never>((_, reject) => {
            signal.addEventListener('abort', () => reject(new Error('Analysis cancelled')));
          })
        ]),
        Promise.race([
          deepPromise,
          new Promise<never>((_, reject) => {
            signal.addEventListener('abort', () => reject(new Error('Analysis cancelled')));
          })
        ])
      ]);

      const duration = Date.now() - startTime;

      const results: UnifiedAnalysisResult['results'] = {};
      const errors: string[] = [];
      const warnings: string[] = [];

      // 处理奥斯本分析结果
      if (osbornResult.status === 'fulfilled') {
        results.local = osbornResult.value;
      } else {
        errors.push(`Osborn analysis failed: ${osbornResult.reason?.message || 'Unknown error'}`);
        warnings.push('奥斯本分析失败，结果可能不完整');
      }

      // 处理深度分析结果
      if (deepResult.status === 'fulfilled') {
        results.ai = deepResult.value;
      } else {
        errors.push(`Deep analysis failed: ${deepResult.reason?.message || 'Unknown error'}`);
        warnings.push('深度分析失败，结果可能不完整');
      }

      return {
        id: analysisId,
        topic: request.topic,
        type: AnalysisType.API,
        mode: request.mode,
        timestamp: new Date(),
        duration,
        results,
        metadata: {
          parallelExecution: true,
          ...(errors.length > 0 && { errors }),
          ...(warnings.length > 0 && { warnings }),
          performance: {
            ...(osbornResult.status === 'fulfilled' && { localDuration: duration / 2 }),
            ...(deepResult.status === 'fulfilled' && { aiDuration: duration / 2 }),
            totalDuration: duration
          }
        }
      };
    } catch (error) {
      throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 执行双重分析（并行优化）
   */
  private async performDualAnalysis(
    request: UnifiedAnalysisRequest,
    analysisId: string,
    signal: AbortSignal
  ): Promise<UnifiedAnalysisResult> {
    const startTime = Date.now();
    const context = this.buildAnalysisContext(request);

    try {
      // 创建奥斯本分析上下文（使用AI）
      const osbornContext = { ...context, useAI: true };
      // 创建深度分析上下文（使用AI）
      const deepContext = { ...context, useAI: true };
      
      // 并行执行奥斯本分析和深度分析，都使用AI
      const [osbornPromise, deepPromise] = [
        intelligentAnalysisEngine.generateEnhancedAnalysis(request.topic, osbornContext),
        deepAnalysisEngine.generateDeepAnalysis(request.topic, deepContext)
      ];

      // 使用Promise.race处理取消信号
      const racePromises = [osbornPromise, deepPromise].map(promise =>
        Promise.race([
          promise,
          new Promise<never>((_, reject) => {
            signal.addEventListener('abort', () => reject(new Error('Analysis cancelled')));
          })
        ])
      );

      // 并行执行并记录时间
      const osbornStart = Date.now();
      const deepStart = Date.now();

      const [osbornResult, deepResult] = await Promise.allSettled(racePromises);

      const osbornDuration = Date.now() - osbornStart;
      const deepDuration = Date.now() - deepStart;
      const totalDuration = Date.now() - startTime;

      const results: UnifiedAnalysisResult['results'] = {};
      const errors: string[] = [];
      const warnings: string[] = [];

      // 处理奥斯本分析结果
      if (osbornResult && osbornResult.status === 'fulfilled') {
        results.local = osbornResult.value as IntelligentAnalysisResult;
      } else if (osbornResult) {
        errors.push(`Osborn analysis failed: ${osbornResult.reason?.message || 'Unknown error'}`);
        warnings.push('奥斯本分析失败，结果可能不完整');
      }

      // 处理深度分析结果
      if (deepResult && deepResult.status === 'fulfilled') {
        results.ai = deepResult.value as DeepAnalysisResult;
      } else if (deepResult) {
        errors.push(`Deep analysis failed: ${deepResult.reason?.message || 'Unknown error'}`);
        warnings.push('深度分析失败，结果可能不完整');
      }

      // 合并分析结果
      if (results.local && results.ai) {
        results.combined = this.mergeAnalysisResults(results.local, results.ai);
      }

      return {
        id: analysisId,
        topic: request.topic,
        type: AnalysisType.DUAL,
        mode: request.mode,
        timestamp: new Date(),
        duration: totalDuration,
        results,
        metadata: {
          parallelExecution: true,
          errors: errors.length > 0 ? errors : [],
          warnings: warnings.length > 0 ? warnings : [],
          performance: {
            localDuration: osbornDuration,
            aiDuration: deepDuration,
            totalDuration
          }
        }
      };
    } catch (error) {
      throw new Error(`Dual analysis failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 构建分析上下文
   */
  private buildAnalysisContext(request: UnifiedAnalysisRequest): AnalysisContext {
    const baseContext: AnalysisContext = {
      topic: request.topic,
      ...request.context
    };

    // 根据分析类型设置useAI标志
    switch (request.type) {
      case AnalysisType.LOCAL:
        baseContext.useAI = false; // 本地分析不使用AI
        break;
      case AnalysisType.API:
        baseContext.useAI = true; // API分析使用AI
        break;
      case AnalysisType.DUAL:
        baseContext.useAI = true; // 双模式分析使用AI
        break;
    }

    // 根据模式添加特定上下文
    switch (request.mode) {
      case AnalysisMode.QUICK:
        baseContext.goals = ['快速识别创新机会'];
        baseContext.constraints = ['时间有限', '资源有限'];
        break;
      case AnalysisMode.STANDARD:
        baseContext.goals = ['全面分析创新可能性', '制定实施计划'];
        break;
      case 'deep' as AnalysisMode:
        baseContext.goals = ['深度挖掘创新潜力', '识别所有可能性', '制定详细路线图'];
        break;
    }

    return baseContext;
  }

  /**
   * 合并分析结果
   */
  private mergeAnalysisResults(
    localResult: IntelligentAnalysisResult,
    aiResult: DeepAnalysisResult
  ): CombinedAnalysisResult {
    // 提取并合并洞察
    const mergedInsights = this.mergeInsights(localResult, aiResult);
    
    // 识别冲突
    const conflicts = this.identifyConflicts(localResult, aiResult);
    
    // 合并推荐
    const recommendations = this.mergeRecommendations(localResult, aiResult);
    
    // 计算置信度
    const confidence = this.calculateCombinedConfidence(localResult, aiResult);
    
    // 生成最佳实践
    const bestPractices = this.generateBestPractices(localResult, aiResult);

    return {
      summary: this.generateCombinedSummary(localResult, aiResult, mergedInsights),
      mergedInsights,
      conflicts,
      recommendations,
      confidence,
      bestPractices
    };
  }

  /**
   * 合并洞察
   */
  private mergeInsights(
    localResult: IntelligentAnalysisResult,
    aiResult: DeepAnalysisResult
  ): string[] {
    const insights = new Set<string>();
    
    // 添加本地分析洞察
    localResult.insights.keyOpportunities.forEach(opp => insights.add(opp));
    localResult.insights.competitiveAdvantages.forEach(advantage => insights.add(advantage));
    
    // 添加AI分析洞察
    if (aiResult.insights && Array.isArray(aiResult.insights)) {
      aiResult.insights.forEach((insight: string) => insights.add(insight));
    }
    
    // 添加跨行业洞察
    if (localResult.detailedAnalysis?.crossIndustryInsights) {
      localResult.detailedAnalysis.crossIndustryInsights.forEach(insight => insights.add(insight));
    }
    
    return Array.from(insights);
  }

  /**
   * 识别冲突
   */
  private identifyConflicts(
    localResult: IntelligentAnalysisResult,
    aiResult: DeepAnalysisResult
  ): AnalysisConflict[] {
    const conflicts: AnalysisConflict[] = [];
    
    // 比较关键洞察
    const localOpportunities = new Set(localResult.insights.keyOpportunities);
    const aiOpportunities = new Set(Array.isArray(aiResult.insights) ? aiResult.insights.filter((i: string) => i.includes('机会')) : []);
    
    // 识别潜在冲突（简化示例）
    if (localOpportunities.size > 0 && aiOpportunities.size > 0) {
      const intersection = new Set([...localOpportunities].filter(x => aiOpportunities.has(x)));
      const conflictRate = 1 - (intersection.size / Math.max(localOpportunities.size, aiOpportunities.size));
      
      if (conflictRate > 0.5) {
        conflicts.push({
          dimension: '关键机会',
          localResult: `本地识别了${localOpportunities.size}个机会`,
          aiResult: `AI识别了${aiOpportunities.size}个机会`,
          severity: conflictRate > 0.7 ? 'high' : 'medium'
        });
      }
    }
    
    return conflicts;
  }

  /**
   * 合并推荐
   */
  private mergeRecommendations(
    localResult: IntelligentAnalysisResult,
    _aiResult: DeepAnalysisResult
  ): MergedRecommendation[] {
    const recommendations: MergedRecommendation[] = [];
    
    // 合并短期推荐
    localResult.recommendations.shortTerm.forEach(rec => {
      recommendations.push({
        id: `local-short-${Math.random().toString(36).substr(2, 9)}`,
        text: rec,
        source: 'local',
        priority: 'high',
        timeframe: 'short',
        confidence: localResult.confidence
      });
    });
    
    // 合并中期推荐
    localResult.recommendations.mediumTerm.forEach(rec => {
      recommendations.push({
        id: `local-medium-${Math.random().toString(36).substr(2, 9)}`,
        text: rec,
        source: 'local',
        priority: 'medium',
        timeframe: 'medium',
        confidence: localResult.confidence
      });
    });
    
    // 合并长期推荐
    localResult.recommendations.longTerm.forEach(rec => {
      recommendations.push({
        id: `local-long-${Math.random().toString(36).substr(2, 9)}`,
        text: rec,
        source: 'local',
        priority: 'low',
        timeframe: 'long',
        confidence: localResult.confidence
      });
    });
    
    // 去重并排序
    return this.deduplicateRecommendations(recommendations);
  }

  /**
   * 去重推荐
   */
  private deduplicateRecommendations(recommendations: MergedRecommendation[]): MergedRecommendation[] {
    const seen = new Set<string>();
    return recommendations.filter(rec => {
      const key = rec.text.toLowerCase().trim();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    }).sort((a, b) => {
      // 按优先级和时间框架排序
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const timeframeOrder = { short: 3, medium: 2, long: 1 };
      
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      return timeframeOrder[b.timeframe] - timeframeOrder[a.timeframe];
    });
  }

  /**
   * 计算组合置信度
   */
  private calculateCombinedConfidence(
    localResult: IntelligentAnalysisResult,
    aiResult: DeepAnalysisResult
  ): number {
    // 简单平均（可以根据需要调整权重）
    return (localResult.confidence + (aiResult.confidence || 0.5)) / 2;
  }

  /**
   * 生成最佳实践
   */
  private generateBestPractices(
    localResult: IntelligentAnalysisResult,
    aiResult: DeepAnalysisResult
  ): string[] {
    const bestPractices: string[] = [];
    
    // 从本地结果中提取
    if (localResult.detailedAnalysis?.osbornDimensions) {
      localResult.detailedAnalysis.osbornDimensions.forEach(dim => {
        if (dim.score >= 80) {
          bestPractices.push(`${dim.dimension}维度表现优秀，建议继续保持`);
        }
      });
    }
    
    // 从AI结果中提取
    if (aiResult.bestPractices) {
      bestPractices.push(...aiResult.bestPractices);
    }
    
    // 通用最佳实践
    bestPractices.push(
      '持续收集用户反馈并迭代优化',
      '关注行业动态和竞争对手动向',
      '建立可量化的成功指标'
    );
    
    return [...new Set(bestPractices)];
  }

  /**
   * 生成组合总结
   */
  private generateCombinedSummary(
    localResult: IntelligentAnalysisResult,
    aiResult: DeepAnalysisResult,
    mergedInsights: string[]
  ): string {
    return `综合分析完成：本地分析识别了${localResult.insights.keyOpportunities.length}个关键机会，AI分析提供了${Array.isArray(aiResult.insights) ? aiResult.insights.length : 0}个额外洞察，合并后共产生${mergedInsights.length}个核心洞察，为${localResult.question}提供了全面的创新分析视角。`;
  }

  /**
   * 取消分析
   */
  cancelAnalysis(analysisId: string): void {
    const controller = this.activeAnalyses.get(analysisId);
    if (controller) {
      controller.abort();
      this.activeAnalyses.delete(analysisId);
    }
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cacheManager.clear();
  }
}

// 创建单例实例
export const unifiedAnalysisService = new UnifiedAnalysisService();

// 便捷函数
export const analyze = (request: UnifiedAnalysisRequest) => unifiedAnalysisService.analyze(request);
export const quickAnalysis = (topic: string, context?: Partial<AnalysisContext>) =>
  unifiedAnalysisService.analyze({
    topic,
    type: AnalysisType.DUAL,
    mode: AnalysisMode.QUICK,
    context: context || {}
  });

export const deepAnalysis = (topic: string, context?: Partial<AnalysisContext>) =>
  unifiedAnalysisService.analyze({
    topic,
    type: AnalysisType.DUAL,
    mode: 'deep' as AnalysisMode,
    context: context || {}
  });

export default unifiedAnalysisService;