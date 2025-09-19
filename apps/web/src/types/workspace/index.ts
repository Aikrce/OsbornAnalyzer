// 工作台核心类型定义
import { AnalysisResult, CaseStudy } from '@huitu/shared';

// 工作台模式
export type WorkspaceMode = 'analysis' | 'collaboration' | 'library' | 'settings';

// 分析上下文
export type AnalysisContext = 'osborn' | 'ai' | 'hybrid';

// 工作台状态类型
export type WorkspaceStateType = 'idle' | 'analyzing' | 'editing' | 'sharing';

// 协作者信息
export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'online' | 'offline' | 'away';
  color: string;
  cursorPosition?: CursorPosition;
  lastActiveAt: Date;
}

// 光标位置
export interface CursorPosition {
  x: number;
  y: number;
  elementId?: string;
}

// 智能建议
export interface SmartSuggestion {
  id: string;
  type: 'mode_switch' | 'action' | 'optimization' | 'collaboration';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: () => void;
  icon?: string;
  metadata?: Record<string, any>;
}

// 分析流程步骤
export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  duration?: number;
  result?: any;
  canSkip?: boolean;
  canGoBack?: boolean;
}

// 分析流程状态
export interface AnalysisFlow {
  currentStep: 'input' | 'processing' | 'review' | 'enhance' | 'export';
  progress: number;
  steps: AnalysisStep[];
  canGoBack: boolean;
  canSkip: boolean;
  suggestions: string[];
}

// API状态
export interface APIState {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  progress: number;
  retryCount: number;
  lastUpdated: Date | null;
  currentOperation: string;
}

// 工作台状态
export interface WorkspaceState {
  mode: WorkspaceMode;
  context: AnalysisContext;
  state: WorkspaceStateType;
  currentTopic: string;
  analysisResult: AnalysisResult | null;
  collaborators: Collaborator[];
  isOnline: boolean;
  apiState: APIState;
  analysisFlow: AnalysisFlow;
  smartSuggestions: SmartSuggestion[];
  relatedCases: CaseStudy[];
}

// 工作台操作
export interface WorkspaceActions {
  setMode: (mode: WorkspaceMode) => void;
  setContext: (context: AnalysisContext) => void;
  setState: (state: WorkspaceStateType) => void;
  setCurrentTopic: (topic: string) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  addCollaborator: (collaborator: Collaborator) => void;
  removeCollaborator: (collaboratorId: string) => void;
  updateCollaborator: (collaboratorId: string, updates: Partial<Collaborator>) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  updateAPIState: (updates: Partial<APIState>) => void;
  updateAnalysisFlow: (updates: Partial<AnalysisFlow>) => void;
  addSmartSuggestion: (suggestion: SmartSuggestion) => void;
  removeSmartSuggestion: (suggestionId: string) => void;
  setRelatedCases: (cases: CaseStudy[]) => void;
}

// 工作台Hook返回类型
export interface UseWorkspaceReturn {
  state: WorkspaceState;
  actions: WorkspaceActions;
  isReady: boolean;
}

// 模式配置
export interface ModeConfig {
  id: WorkspaceMode;
  label: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  requirements?: string[];
}

// 上下文配置
export interface ContextConfig {
  id: AnalysisContext;
  label: string;
  description: string;
  icon: string;
  color: string;
  capabilities: string[];
  limitations?: string[];
}

// 工作台配置
export interface WorkspaceConfig {
  modes: ModeConfig[];
  contexts: ContextConfig[];
  defaultMode: WorkspaceMode;
  defaultContext: AnalysisContext;
  enableCollaboration: boolean;
  enableSmartSuggestions: boolean;
  enableOfflineMode: boolean;
}

// 重新导出共享类型
export type { AnalysisResult, CaseStudy } from '@huitu/shared';
