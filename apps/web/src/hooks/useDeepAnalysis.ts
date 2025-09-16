import { useState, useCallback } from 'react';
import { deepAnalysisEngine, DeepAnalysisResult } from '../services/analysis/deepAnalysisEngine';

export const useDeepAnalysis = () => {
  const [results, setResults] = useState<DeepAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (topic: string, context: any = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 使用深度分析引擎生成分析结果
      const result = deepAnalysisEngine.generateDeepAnalysis(topic, context);
      setResults([result]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败');
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
