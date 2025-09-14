import { useState, useCallback } from 'react';
import { AnalysisEngine } from '@huitu/shared';
import type { AnalysisResult } from '@huitu/shared';

interface UseAnalysisReturn {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  analyze: (topic: string, description: string, options?: { useAI?: boolean }) => Promise<void>;
  reset: () => void;
}

export default function useAnalysis(): UseAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (
    topic: string, 
    description: string = '', 
    options: { useAI?: boolean } = {}
  ) => {
    if (!topic.trim()) {
      setError('请输入主题');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisEngine = AnalysisEngine.getInstance();
      const analysisResult = await analysisEngine.performFullAnalysis(topic, description, {
        useAI: options.useAI || false,
        enhanceWithAI: false,
        findSimilarCases: false
      });

      setResult(analysisResult.result);
      // TODO: Add success notification
    } catch (err) {
      const message = err instanceof Error ? err.message : '分析失败，请重试';
      setError(message);
      // TODO: Add error notification
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    result,
    loading,
    error,
    analyze,
    reset
  };
}
