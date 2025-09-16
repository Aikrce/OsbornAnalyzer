import { useState, useCallback, useEffect } from 'react';
import { 
  WorkspaceState, 
  WorkspaceActions, 
  UseWorkspaceReturn,
  WorkspaceMode,
  AnalysisContext,
  Collaborator,
  AnalysisResult,
  APIState,
  AnalysisFlow,
  SmartSuggestion,
  CaseStudy,
  WorkspaceStateType
} from '@/types/workspace';
import { useAPIState } from './useAPIState';

const initialWorkspaceState: WorkspaceState = {
  mode: 'analysis',
  context: 'osborn',
  state: 'idle',
  currentTopic: '',
  analysisResult: null,
  collaborators: [],
  isOnline: navigator.onLine,
  apiState: {
    isLoading: false,
    isError: false,
    error: null,
    progress: 0,
    retryCount: 0,
    lastUpdated: null,
    currentOperation: ''
  },
  analysisFlow: {
    currentStep: 'input',
    progress: 0,
    steps: [
      { id: 'input', title: '输入主题', description: '输入要分析的主题', status: 'active' },
      { id: 'processing', title: '奥斯本分析', description: '执行九维度分析', status: 'pending' },
      { id: 'review', title: '结果预览', description: '查看分析结果', status: 'pending' },
      { id: 'enhance', title: 'AI增强', description: '使用AI优化结果', status: 'pending' },
      { id: 'export', title: '导出分享', description: '导出或分享结果', status: 'pending' }
    ],
    canGoBack: false,
    canSkip: false,
    suggestions: []
  },
  smartSuggestions: [],
  relatedCases: []
};

export const useWorkspace = (): UseWorkspaceReturn => {
  const [state, setState] = useState<WorkspaceState>(initialWorkspaceState);
  const { state: apiState } = useAPIState();

  // 监听网络状态
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 同步API状态
  useEffect(() => {
    setState(prev => ({ ...prev, apiState }));
  }, [apiState]);

  const actions: WorkspaceActions = {
    setMode: useCallback((mode: WorkspaceMode) => {
      setState(prev => ({ ...prev, mode }));
    }, []),

    setContext: useCallback((context: AnalysisContext) => {
      setState(prev => ({ ...prev, context }));
    }, []),

    setState: useCallback((workspaceState: WorkspaceStateType) => {
      setState(prev => ({ ...prev, state: workspaceState }));
    }, []),

    setCurrentTopic: useCallback((topic: string) => {
      setState(prev => ({ ...prev, currentTopic: topic }));
    }, []),

    setAnalysisResult: useCallback((result: AnalysisResult | null) => {
      setState(prev => ({ ...prev, analysisResult: result }));
    }, []),

    addCollaborator: useCallback((collaborator: Collaborator) => {
      setState(prev => ({
        ...prev,
        collaborators: [...prev.collaborators.filter(c => c.id !== collaborator.id), collaborator]
      }));
    }, []),

    removeCollaborator: useCallback((collaboratorId: string) => {
      setState(prev => ({
        ...prev,
        collaborators: prev.collaborators.filter(c => c.id !== collaboratorId)
      }));
    }, []),

    updateCollaborator: useCallback((collaboratorId: string, updates: Partial<Collaborator>) => {
      setState(prev => ({
        ...prev,
        collaborators: prev.collaborators.map(c => 
          c.id === collaboratorId ? { ...c, ...updates } : c
        )
      }));
    }, []),

    setOnlineStatus: useCallback((isOnline: boolean) => {
      setState(prev => ({ ...prev, isOnline }));
    }, []),

    updateAPIState: useCallback((updates: Partial<APIState>) => {
      setState(prev => ({
        ...prev,
        apiState: { ...prev.apiState, ...updates }
      }));
    }, []),

    updateAnalysisFlow: useCallback((updates: Partial<AnalysisFlow>) => {
      setState(prev => ({
        ...prev,
        analysisFlow: { ...prev.analysisFlow, ...updates }
      }));
    }, []),

    addSmartSuggestion: useCallback((suggestion: SmartSuggestion) => {
      setState(prev => ({
        ...prev,
        smartSuggestions: [...prev.smartSuggestions.filter(s => s.id !== suggestion.id), suggestion]
      }));
    }, []),

    removeSmartSuggestion: useCallback((suggestionId: string) => {
      setState(prev => ({
        ...prev,
        smartSuggestions: prev.smartSuggestions.filter(s => s.id !== suggestionId)
      }));
    }, []),

    setRelatedCases: useCallback((cases: CaseStudy[]) => {
      setState(prev => ({ ...prev, relatedCases: cases }));
    }, [])
  };

  return {
    state,
    actions,
    isReady: true
  };
};

export default useWorkspace;
