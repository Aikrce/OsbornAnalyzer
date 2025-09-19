import { useState, useCallback, useEffect } from 'react';
import { AnalysisResult } from '@huitu/shared';
import { DeepAnalysisResult } from '../services/analysis/deepAnalysisEngine';
import { useLocalCases } from './useLocalCases';
import { AnalysisTypeString, AnalysisContext as UnifiedAnalysisContext, AnalysisType, AnalysisMode } from '../types/analysis';
import { unifiedDataManager } from '../services/data/unifiedDataManager';
import { ErrorHandler } from '../services/error/errorHandler';
import { analysisCache } from '../services/cache/analysisCache';
import { unifiedAnalysisService } from '../services/analysis/unifiedAnalysisService';

export interface DualAnalysisResult {
  osbornAnalysis: AnalysisResult;
  deepAnalysis: DeepAnalysisResult;
  topic: string;
  timestamp: Date;
  analysisId: string;
}

export interface UseDualAnalysisReturn {
  results: DualAnalysisResult[];
  isLoading: boolean;
  error: string | null;
  analyze: (topic: string, context?: Partial<UnifiedAnalysisContext & { analysisType?: AnalysisTypeString }>) => Promise<void>;
  clearResults: () => void;
  progress: {
    osborn: number;
    deep: number;
    overall: number;
  };
}

export const useDualAnalysis = (): UseDualAnalysisReturn => {
  const [results, setResults] = useState<DualAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({
    osborn: 0,
    deep: 0,
    overall: 0
  });
  
  // 集成本地案例服务
  const { createCaseFromAnalysis } = useLocalCases();

  // 安全地加载初始数据
  useEffect(() => {
    try {
      const initialResults = unifiedDataManager.getDualResults();
      setResults(initialResults);
    } catch (error) {
      console.warn('加载初始分析结果失败:', error);
      setResults([]);
    }
  }, []);

  // 保存结果到 localStorage
  const saveResults = useCallback((newResults: DualAnalysisResult[]) => {
    setResults(newResults);
    // 统一数据管理器会自动处理存储逻辑
  }, []);

  const analyze = useCallback(async (topic: string, context: Partial<UnifiedAnalysisContext & { analysisType?: AnalysisTypeString }> = {}) => {
    if (!topic.trim()) {
      setError('请输入分析主题');
      return;
    }

    const analysisType = context.analysisType || 'local';
    const cacheKey = analysisCache.generateKey(topic, analysisType === 'local' ? AnalysisType.LOCAL : AnalysisType.API, context);

    // 检查缓存
    const cachedResult = analysisCache.get<DualAnalysisResult>(cacheKey);
    if (cachedResult) {
      console.log('从缓存中获取分析结果:', cachedResult);
      setResults(prev => [cachedResult, ...prev]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setProgress({ osborn: 0, deep: 0, overall: 0 });

      // 使用统一分析服务执行分析
      console.log('开始统一分析:', { topic, analysisType, context });
      
      const unifiedResult = await unifiedAnalysisService.analyze({
        topic,
        type: analysisType === 'local' ? AnalysisType.LOCAL : AnalysisType.API,
        mode: AnalysisMode.STANDARD,
        context: context,
        options: {
          enableParallel: true,
          cacheResults: true,
          includeSimilarCases: true
        }
      });

      console.log('统一分析完成:', unifiedResult);

      // 转换为DualAnalysisResult格式
      // 确保奥斯本分析和深度分析都有结果
      const osbornAnalysis = unifiedResult.results.local || unifiedResult.results.ai?.osbornAnalysis || {} as AnalysisResult;
      const deepAnalysis = unifiedResult.results.ai || unifiedResult.results.local?.deepAnalysis || {} as DeepAnalysisResult;
      
      const dualResult: DualAnalysisResult = {
        osbornAnalysis,
        deepAnalysis,
        topic,
        timestamp: unifiedResult.timestamp,
        analysisId: unifiedResult.id
      };

      // 使用统一数据管理器保存结果
      await unifiedDataManager.saveAnalysisResult(dualResult);
      
      // 缓存结果
      analysisCache.set(cacheKey, dualResult);
      
      setResults(prev => [dualResult, ...prev]);
      setProgress({ osborn: 100, deep: 100, overall: 100 });

    } catch (err) {
      const userMessage = ErrorHandler.handleAnalysisError(err, {
        component: 'useDualAnalysis',
        action: 'analyze',
        additionalData: { topic, analysisType }
      });
      setError(userMessage);
      ErrorHandler.logError(err, {
        component: 'useDualAnalysis',
        action: 'analyze',
        additionalData: { topic, analysisType }
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    unifiedDataManager.clearAllData();
    analysisCache.clear();
    setResults([]);
    setError(null);
    setProgress({ osborn: 0, deep: 0, overall: 0 });
  }, []);

  return {
    results,
    isLoading,
    error,
    analyze,
    clearResults,
    progress
  };
};

export default useDualAnalysis;