import {useState, useCallback} from 'react';
import {osbornAnalyzer, AnalysisResult} from '@huitu/shared';

interface UseAnalysisReturn {
  results: AnalysisResult[];
  isLoading: boolean;
  error: string | null;
  analyze: (topic: string) => Promise<void>;
  clearResults: () => void;
}

export const useAnalysis = (): UseAnalysisReturn => {
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
      
      const analysisResult = await osbornAnalyzer.analyze(topic.trim(), '');
      const analysisResults = [analysisResult];
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
