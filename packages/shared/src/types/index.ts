// 奥斯本检核表分析相关类型定义

/**
 * 奥斯本检核表九大问题类型
 */
export type OsbornQuestionType = 
  | 'putToOtherUses'      // 他用
  | 'adapt'               // 适应
  | 'modify'              // 修改
  | 'magnify'             // 扩大
  | 'minify'              // 缩小
  | 'substitute'          // 代替
  | 'rearrange'           // 重组
  | 'reverse'             // 反转
  | 'combine';            // 组合

/**
 * 奥斯本检核表问题配置
 */
export interface OsbornQuestion {
  id: OsbornQuestionType;
  title: string;
  description: string;
  icon: string;
  examples: string[];
  promptTemplate: string;
}

/**
 * 分析结果项
 */
export interface AnalysisResultItem {
  questionType: OsbornQuestionType;
  question: string;
  answer: string;
  insights: string[];
  score: number; // 0-100分
  confidence: number; // 0-1置信度
}

/**
 * 完整分析结果
 */
export interface AnalysisResult {
  id: string;
  title: string;
  description: string;
  questions: Record<string, string[]>;
  summary: string;
  totalScore: number;
  quality: 'low' | 'medium' | 'high';
  timestamp: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalysisOptions {
  creativityLevel: 'basic' | 'intermediate' | 'advanced' | 'conservative' | 'balanced' | 'innovative';
  language: 'zh' | 'zh-CN' | 'en';
  includeAI: boolean;
  useAI?: boolean;
}

export interface UserPreferences {
  language: 'zh' | 'zh-CN' | 'en';
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  autoSave: boolean;
  aiSuggestions: boolean;
  aiEnabled: boolean;
}

/**
 * AI分析结果
 */
export interface AIAnalysisResult {
  suggestions: string[];
  keywords: string[];
  alternatives: string[];
  confidence: number;
  reasoning: string;
}

/**
 * 案例研究
 */
export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  industry: string;
  company?: string;
  tags: string[];
  analysisResult: AnalysisResult;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: number;
  updatedAt: number;
}

/**
 * 案例库详细分析结果
 */
export interface CaseAnalysisResult {
  id: string;
  title: string;
  description: string;
  topic: string;
  keyword?: string;
  timestamp: number;
  totalScore: number;
  quality: 'low' | 'medium' | 'high';
  summary: string;
  results: AnalysisResultItem[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 案例库项
 */
export interface CaseItem {
  id: string;
  topic: string;
  keyword?: string;
  timestamp: number;
  result: CaseAnalysisResult;
  quality: 'low' | 'medium' | 'high';
  tags: string[];
}

/**
 * 导出格式选项
 */
export interface ExportOptions {
  format: 'pdf' | 'word' | 'excel' | 'markdown';
  includeTimestamp: boolean;
  includeScore: boolean;
  includeInsights: boolean;
  includeMetadata: boolean;
  quality: 'low' | 'medium' | 'high';
  fileName?: string;
}

/**
 * AI分析配置
 */
export interface AIConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

/**
 * 应用配置
 */
export interface AppConfig {
  theme: 'light' | 'dark' | 'auto';
  language: 'zh' | 'en';
  autoSave: boolean;
  autoSaveInterval: number;
  defaultExportFormat: ExportOptions['format'];
  aiConfig: AIConfig;
}

/**
 * 用户分析历史
 */
export interface UserHistory {
  recentTopics: string[];
  recentKeywords: string[];
  favoriteCases: string[];
  analysisCount: number;
  lastAnalysisDate?: number;
}

/**
 * 分析请求参数
 */
export interface AnalysisRequest {
  topic: string;
  keyword: string;
  useAI: boolean;
  config?: Partial<AIConfig>;
}

/**
 * 分析响应
 */
export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
  processingTime?: number;
}

/**
 * 案例库统计
 */
export interface CaseLibraryStats {
  totalCases: number;
  highQualityCases: number;
  mediumQualityCases: number;
  lowQualityCases: number;
  lastUpdated: number;
  mostUsedTopics: string[];
  mostUsedKeywords: string[];
}

/**
 * 通知类型
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

// 工具类型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// 问题分类枚举
export const QuestionCategory = {
  ALTERNATIVE: 'alternative',
  ADAPTATION: 'adaptation',
  MODIFICATION: 'modification',
  MAGNIFICATION: 'magnification',
  MINIFICATION: 'minification',
  SUBSTITUTION: 'substitution',
  REARRANGEMENT: 'rearrangement',
  REVERSAL: 'reversal',
  COMBINATION: 'combination',
} as const;

export type QuestionCategory = typeof QuestionCategory[keyof typeof QuestionCategory];

// 事件类型
export type AppEvent = 
  | { type: 'analysisStarted'; payload: AnalysisRequest }
  | { type: 'analysisCompleted'; payload: AnalysisResult }
  | { type: 'analysisFailed'; payload: { error: string; request: AnalysisRequest } }
  | { type: 'caseSaved'; payload: CaseItem }
  | { type: 'caseDeleted'; payload: string }
  | { type: 'exportStarted'; payload: ExportOptions }
  | { type: 'exportCompleted'; payload: { options: ExportOptions; fileName: string } }
  | { type: 'notificationShown'; payload: Notification }
  | { type: 'configUpdated'; payload: Partial<AppConfig> };

// 响应式断点
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

// API响应格式
export interface APIResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

// 本地存储键名
export const STORAGE_KEYS = {
  APP_CONFIG: 'huitur_app_config',
  USER_HISTORY: 'huitur_user_history',
  CASE_LIBRARY: 'huitur_case_library',
  RECENT_ANALYSES: 'huitur_recent_analyses'
} as const;