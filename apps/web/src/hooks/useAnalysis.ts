import { useState, useCallback } from 'react';
import { AnalysisResult } from '@huitu/shared/types';
import { performOsbornAnalysis } from '@huitu/shared/algorithms';

export const useAnalysis = () => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (topic: string) => {
    if (!topic.trim()) {
      setError('请输入分析主题');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const analysisResults = await performOsbornAnalysis(topic.trim());
      setResults(analysisResults);
    } catch (err) {
      setError('分析过程中出现错误，请重试');
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
    clearResults,
  };
};

export default useAnalysis;
