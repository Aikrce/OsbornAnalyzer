import { useState, useEffect, useCallback, useMemo } from 'react';
import { suggestionEngine, SuggestionContext } from '@/services/smart/suggestionEngine';
import { 
  SmartSuggestion, 
  WorkspaceMode, 
  AnalysisContext, 
  AnalysisResult,
  CaseStudy,
  Collaborator
} from '@/types/workspace';

interface UseSmartSuggestionsProps {
  mode: WorkspaceMode;
  context: AnalysisContext;
  currentTopic: string;
  analysisResult: AnalysisResult | null;
  collaborators: Collaborator[];
  relatedCases: CaseStudy[];
  isOnline: boolean;
}

interface UseSmartSuggestionsReturn {
  suggestions: SmartSuggestion[];
  highPrioritySuggestions: SmartSuggestion[];
  suggestionsByType: Record<string, SmartSuggestion[]>;
  stats: {
    total: number;
    byType: Record<string, number>;
    byPriority: Record<string, number>;
  };
  executeSuggestion: (suggestion: SmartSuggestion) => void;
  dismissSuggestion: (suggestionId: string) => void;
  refreshSuggestions: () => void;
  isLoading: boolean;
}

export const useSmartSuggestions = ({
  mode,
  context,
  currentTopic,
  analysisResult,
  collaborators,
  relatedCases,
  isOnline
}: UseSmartSuggestionsProps): UseSmartSuggestionsReturn => {
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [userHistory, setUserHistory] = useState<string[]>([]);

  // 构建建议上下文
  const suggestionContext: SuggestionContext = useMemo(() => ({
    mode,
    context,
    currentTopic,
    analysisResult,
    collaborators,
    relatedCases,
    userHistory,
    isOnline
  }), [mode, context, currentTopic, analysisResult, collaborators, relatedCases, userHistory, isOnline]);

  // 更新建议引擎上下文
  useEffect(() => {
    suggestionEngine.updateContext(suggestionContext);
  }, [suggestionContext]);

  // 生成建议
  const generateSuggestions = useCallback(() => {
    setIsLoading(true);
    
    try {
      const newSuggestions = suggestionEngine.generateSuggestions();
      
      // 过滤已忽略的建议
      const filteredSuggestions = newSuggestions.filter(
        suggestion => !dismissedSuggestions.has(suggestion.id)
      );
      
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [dismissedSuggestions]);

  // 当上下文变化时重新生成建议
  useEffect(() => {
    generateSuggestions();
  }, [generateSuggestions]);

  // 定期刷新建议（每30秒）
  useEffect(() => {
    const interval = setInterval(() => {
      generateSuggestions();
    }, 30000);

    return () => clearInterval(interval);
  }, [generateSuggestions]);

  // 执行建议
  const executeSuggestion = useCallback((suggestion: SmartSuggestion) => {
    try {
      // 执行建议动作
      suggestion.action();
      
      // 记录用户行为
      suggestionEngine.adjustSuggestionsBasedOnBehavior('suggestion_executed', {
        suggestionId: suggestion.id,
        suggestionType: suggestion.type,
        timestamp: Date.now()
      });
      
      // 如果是模式切换建议，更新历史记录
      if (suggestion.type === 'mode_switch' && suggestion.metadata?.targetMode) {
        setUserHistory(prev => [suggestion.metadata?.targetMode, ...prev.slice(0, 4)]);
      }
      
      // 执行后移除该建议
      setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      
    } catch (error) {
      console.error('Error executing suggestion:', error);
    }
  }, []);

  // 忽略建议
  const dismissSuggestion = useCallback((suggestionId: string) => {
    setDismissedSuggestions(prev => new Set([...prev, suggestionId]));
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    
    // 记录用户行为
    suggestionEngine.adjustSuggestionsBasedOnBehavior('suggestion_dismissed', {
      suggestionId,
      timestamp: Date.now()
    });
  }, []);

  // 刷新建议
  const refreshSuggestions = useCallback(() => {
    generateSuggestions();
  }, [generateSuggestions]);

  // 计算派生状态
  const highPrioritySuggestions = useMemo(() => 
    suggestions.filter(s => s.priority === 'high'),
    [suggestions]
  );

  const suggestionsByType = useMemo(() => 
    suggestions.reduce((acc, suggestion) => {
      if (!acc[suggestion.type]) {
        acc[suggestion.type] = [];
      }
      acc[suggestion.type]?.push(suggestion);
      return acc;
    }, {} as Record<string, SmartSuggestion[]>),
    [suggestions]
  );

  const stats = useMemo(() => 
    suggestionEngine.getSuggestionStats(),
    [suggestions]
  );

  // 监听用户行为，动态调整建议
  useEffect(() => {
    const handleUserActivity = () => {
      suggestionEngine.adjustSuggestionsBasedOnBehavior('user_activity', {
        timestamp: Date.now(),
        mode,
        context
      });
    };

    // 监听用户活动
    const events = ['click', 'keydown', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [mode, context]);

  // 监听分析结果变化，更新历史记录
  useEffect(() => {
    if (analysisResult && currentTopic) {
      setUserHistory(prev => {
        const newHistory = [currentTopic, ...prev.filter(topic => topic !== currentTopic)];
        return newHistory.slice(0, 5); // 保留最近5个主题
      });
    }
  }, [analysisResult, currentTopic]);

  return {
    suggestions,
    highPrioritySuggestions,
    suggestionsByType,
    stats,
    executeSuggestion,
    dismissSuggestion,
    refreshSuggestions,
    isLoading
  };
};

export default useSmartSuggestions;
