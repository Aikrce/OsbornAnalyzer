import { useState, useCallback } from 'react';
import { deepAnalysisEngine, DeepAnalysisResult } from '../services/analysis/deepAnalysisEngine';
import { AnalysisContext } from '../services/analysis/intelligentAnalysisEngine';

export interface UseDeepAnalysisReturn {
  results: DeepAnalysisResult[];
  isLoading: boolean;
  error: string | null;
  analyze: (topic: string, context?: Partial<AnalysisContext>) => Promise<void>;
  clearResults: () => void;
}

export const useDeepAnalysis = (): UseDeepAnalysisReturn => {
  const [results, setResults] = useState<DeepAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (topic: string, context: Partial<AnalysisContext> = {}) => {
    if (!topic.trim()) {
      setError('请输入分析主题');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // 使用深度分析引擎生成分析结果
      const result = await deepAnalysisEngine.generateDeepAnalysis(topic, context);
      setResults(prev => [result, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '深度分析失败，请重试');
      console.error('Deep analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    analyze,
    clearResults
  };
};
