import { useState, useCallback } from 'react';
import { AnalysisResult } from '@huitu/shared/types';
import { intelligentAnalysisEngine, AnalysisContext } from '../services/analysis/intelligentAnalysisEngine';

export interface UseAnalysisReturn {
  results: AnalysisResult[];
  isLoading: boolean;
  error: string | null;
  analyze: (topic: string, context?: Partial<AnalysisContext>) => Promise<void>;
  clearResults: () => void;
}

export const useAnalysis = (): UseAnalysisReturn => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
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

      // 使用智能分析引擎生成分析结果
      const analysisResult = intelligentAnalysisEngine.generateAnalysis(topic, context);

      // 将结果添加到结果列表
      setResults(prev => [analysisResult, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败，请重试');
      console.error('Analysis error:', err);
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

export default useAnalysis;
