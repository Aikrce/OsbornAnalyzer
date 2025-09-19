import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 统一导航Hook，解决路由导航不一致问题
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  
  const goHome = useCallback(() => navigate('/'), [navigate]);
  
  // goToAnalysis 已移除，统一使用 /analysis-detail?id=xxx 跳转
  
  const goToCaseLibrary = useCallback(() => navigate('/case-library'), [navigate]);
  
  const goToOsbornAnalysis = useCallback((topic?: string) => {
    const url = topic ? `/osborn-analysis?topic=${encodeURIComponent(topic)}` : '/osborn-analysis';
    navigate(url);
  }, [navigate]);
  
  const goToDeepAnalysis = useCallback((topic?: string) => {
    const url = topic ? `/deep-analysis?topic=${encodeURIComponent(topic)}` : '/deep-analysis';
    navigate(url);
  }, [navigate]);
  
  const goToAnalysisProgress = useCallback((topic: string, type: 'local' | 'api' = 'local') => {
    const url = `/analysis-progress?topic=${encodeURIComponent(topic)}&type=${type}`;
    navigate(url);
  }, [navigate]);
  
  const goToSettings = useCallback(() => navigate('/settings'), [navigate]);
  
  const goToCollaboration = useCallback(() => navigate('/collaboration'), [navigate]);
  
  return {
    goHome,
    goToCaseLibrary,
    goToOsbornAnalysis,
    goToDeepAnalysis,
    goToAnalysisProgress,
    goToSettings,
    goToCollaboration
  };
};
