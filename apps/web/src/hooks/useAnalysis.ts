import { useState, useCallback } from 'react';
import { AnalysisResult } from '@huitu/shared/types';
import { performOsbornAnalysis } from '@huitu/shared/algorithms';

export interface UseAnalysisReturn {
  results: AnalysisResult[];
  isLoading: boolean;
  error: string | null;
  analyze: (topic: string) => Promise<void>;
  clearResults: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (topic: string) => {
    if (!topic) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const analysisResult = performOsbornAnalysis(topic, {});
      setResults([analysisResult]);
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
}