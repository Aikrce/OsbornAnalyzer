import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDualAnalysis } from './useDualAnalysis';
import { useLocalCases } from './useLocalCases';

export interface AnalysisNavigationState {
  currentTopic: string | null;
  analysisType: 'local' | 'api' | null;
  hasResults: boolean;
  isAnalyzing: boolean;
}

export const useAnalysisNavigation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { results, isLoading } = useDualAnalysis();
  const { createCaseFromAnalysis } = useLocalCases();
  
  const [navigationState, setNavigationState] = useState<AnalysisNavigationState>({
    currentTopic: null,
    analysisType: null,
    hasResults: false,
    isAnalyzing: false
  });

  // 更新导航状态
  useEffect(() => {
    const topic = searchParams.get('topic');
    const type = searchParams.get('type') as 'local' | 'api' | null;
    
    setNavigationState(prev => ({
      ...prev,
      currentTopic: topic,
      analysisType: type,
      hasResults: results.length > 0,
      isAnalyzing: isLoading
    }));
  }, [searchParams, results.length, isLoading]);

  // 切换到奥斯本分析
  const switchToOsbornAnalysis = useCallback(() => {
    if (navigationState.currentTopic && navigationState.analysisType) {
      navigate(`/osborn-analysis?topic=${encodeURIComponent(navigationState.currentTopic)}&type=${navigationState.analysisType}`);
    }
  }, [navigate, navigationState.currentTopic, navigationState.analysisType]);

  // 切换到深度分析
  const switchToDeepAnalysis = useCallback(() => {
    if (navigationState.currentTopic && navigationState.analysisType) {
      navigate(`/deep-analysis?topic=${encodeURIComponent(navigationState.currentTopic)}&type=${navigationState.analysisType}`);
    }
  }, [navigate, navigationState.currentTopic, navigationState.analysisType]);

  // 返回首页并清空分析结果
  const goHomeAndClear = useCallback(() => {
    // 自动保存当前分析结果到案例库
    if (results.length > 0 && navigationState.currentTopic) {
      const dualResult = results[0];
      if (dualResult?.osbornAnalysis) {
        createCaseFromAnalysis(navigationState.currentTopic, dualResult.osbornAnalysis, {
          description: `基于奥斯本九问的${navigationState.currentTopic}创新分析`,
          industry: '创新分析',
          company: '用户分析',
          tags: ['奥斯本分析', '创新思维', navigationState.currentTopic]
        }).catch(console.error);
      }
    }
    
    // 清空分析结果并返回首页
    navigate('/');
  }, [navigate, results, navigationState.currentTopic, createCaseFromAnalysis]);

  // 检查是否在分析页面
  const isInAnalysisPage = useCallback(() => {
    const path = window.location.pathname;
    return path.includes('/osborn-analysis') || path.includes('/deep-analysis');
  }, []);

  return {
    navigationState,
    switchToOsbornAnalysis,
    switchToDeepAnalysis,
    goHomeAndClear,
    isInAnalysisPage
  };
};
