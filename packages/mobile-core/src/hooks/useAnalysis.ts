import { useState, useCallback } from 'react';
import { AnalysisResult } from '@osborn/shared';
import { performOsbornAnalysis } from '@osborn/shared';

export interface UseAnalysisReturn {
  results: AnalysisResult[];
  isLoading: boolean;
  error: string | null;
  analyze: (topic: string) => Promise<void>;
  clearResults: () => void;
}

export default function useAnalysis(): UseAnalysisReturn {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (topic: string) => {
    if (!topic) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const analysisResult = await performOsbornAnalysis(topic, {});
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
