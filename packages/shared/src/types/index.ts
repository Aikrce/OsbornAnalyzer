// 奥斯本检核表分析相关类型定义

/**
 * 奥斯本检核表九大问题类型
 */
export type OsbornQuestionType = 
  | 'other-uses'          // 其他用途
  | 'adapt'               // 借用
  | 'modify'              // 改变
  | 'magnify'             // 扩大
  | 'minify'              // 缩小
  | 'substitute'          // 替代
  | 'rearrange'           // 重新安排
  | 'reverse'             // 颠倒
  | 'combine';            // 组合

/**
 * 奥斯本检核表问题分类枚举
 */
export enum QuestionCategory {
  ALTERNATIVE = 'alternative',
  ADAPTATION = 'adaptation',
  MODIFICATION = 'modification',
  MAGNIFICATION = 'magnification',
  MINIFICATION = 'minification',
  SUBSTITUTION = 'substitution',
  REARRANGEMENT = 'rearrangement',
  REVERSAL = 'reversal',
  COMBINATION = 'combination'
}

/**
 * 深度分析维度类型
 */
export type DeepAnalysisType = 
  | 'keyword-analysis'        // 关键词分析
  | 'domain-insights'         // 领域洞察
  | 'market-trends'          // 市场趋势
  | 'technology-development' // 技术发展
  | 'user-needs'             // 用户需求
  | 'competition-analysis'    // 竞争分析
  | 'innovation-opportunities' // 创新机会
  | 'risk-assessment'        // 风险评估
  | 'implementation-suggestions'; // 实施建议

/**
 * 分析模式
 */
export type AnalysisMode = 'ai' | 'local';

/**
 * 分析选项
 */
export interface AnalysisOptions {
  useAI?: boolean;
  includeAI?: boolean;
  language?: string;
  creativityLevel?: 'balanced' | 'creative' | 'conservative';
}

/**
 * 分析结果项
 */
export interface AnalysisResultItem {
  type: string;
  id: string;
  title: string;
  description: string;
  insights: string[];
  score: number; // 0-100分
  icon?: string;
}

/**
 * 奥斯本分析结果
 */
export interface AnalysisResult {
  id: string;
  title: string;
  description: string;
  questions: Record<string, string[]>;
  summary: string;
  totalScore: number;
  quality: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  timestamp: Date;
  question: string; // 添加缺失的question属性
  analysis: string; // 添加缺失的analysis属性
  suggestions?: string[]; // 添加缺失的suggestions属性
}

/**
 * AI分析结果
 */
export interface AIAnalysisResult {
  suggestions: string[];
  keywords: string[];
  alternatives: string[];
  confidence: number;
  reasoning?: string;
}

/**
 * 深度分析结果
 */
export interface DeepAnalysisResult {
  topic: string;
  analysisMode: AnalysisMode;
  results: AnalysisResultItem[];
  sourceCases?: CaseReference[];
}

/**
 * 奥斯本分析结果
 */
export interface OsbornAnalysisResult {
  topic: string;
  analysisMode: AnalysisMode;
  results: AnalysisResultItem[];
  sourceCases?: CaseReference[];
}

/**
 * 案例引用
 */
export interface CaseReference {
  id: string;
  topic: string;
  similarity: number;
  matchTypes: string[];
}

/**
 * 案例研究
 */
export interface CaseStudy {
  id: string;
  title: string;
  topic?: string; // 改为可选
  description: string;
  timestamp?: Date; // 改为可选
  analysisMode?: AnalysisMode; // 改为可选
  keywords?: string[]; // 改为可选
  tags?: string[]; // 改为可选
  industry?: string; // 改为可选
  company?: string;
  domain?: string; // 改为可选
  category?: string; // 改为可选
  difficulty?: string;
  createdAt?: Date;
  updatedAt?: Date;
  analysisResult?: AnalysisResult;
  deepAnalysis?: DeepAnalysisResult;
  osbornAnalysis?: OsbornAnalysisResult;
  isPublic?: boolean;
  sourceCases?: CaseReference[];
}

/**
 * 分析配置
 */
export interface AnalysisConfig {
  topic: string;
  apiKey?: string;
  aiModel: string;
  language: string;
  analysisMode: AnalysisMode;
}

/**
 * AI模型配置
 */
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: 'domestic' | 'international';
}

/**
 * 分析请求参数
 */
export interface AnalysisRequest {
  topic: string;
  description?: string;
  useAI: boolean;
  enhanceWithAI?: boolean;
  findSimilarCases?: boolean;
  config?: Partial<AnalysisConfig>;
}

/**
 * 分析响应
 */
export interface AnalysisResponse {
  success: boolean;
  data?: {
    deepAnalysis: DeepAnalysisResult;
    osbornAnalysis: OsbornAnalysisResult;
  };
  error?: string;
  processingTime?: number;
}

/**
 * 用户偏好设置
 */
export interface UserPreferences {
  language: 'zh' | 'en';
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  autoSave: boolean;
  aiSuggestions: boolean;
  aiEnabled: boolean; // 添加缺失的aiEnabled属性
  defaultAnalysisMode: AnalysisMode;
}

/**
 * 应用配置
 */
export interface AppConfig {
  theme: 'light' | 'dark' | 'auto';
  language: 'zh' | 'en';
  autoSave: boolean;
  autoSaveInterval: number;
  userPreferences: UserPreferences;
}

/**
 * 案例库统计
 */
export interface CaseLibraryStats {
  totalCases: number;
  aiAnalysisCases: number;
  localAnalysisCases: number;
  lastUpdated: number;
  mostUsedTopics: string[];
  mostUsedDomains: string[];
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

/**
 * 导出格式选项
 */
export interface ExportOptions {
  format: 'pdf' | 'word' | 'excel' | 'markdown' | 'json';
  includeTimestamp: boolean;
  includeScore: boolean;
  includeInsights: boolean;
  includeMetadata: boolean;
  fileName?: string;
}

// 工具类型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// 事件类型
export type AppEvent = 
  | { type: 'analysisStarted'; payload: AnalysisRequest }
  | { type: 'analysisCompleted'; payload: { deepAnalysis: DeepAnalysisResult; osbornAnalysis: OsbornAnalysisResult } }
  | { type: 'analysisFailed'; payload: { error: string; request: AnalysisRequest } }
  | { type: 'caseSaved'; payload: CaseStudy }
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
  USER_PREFERENCES: 'huitur_user_preferences',
  CASE_LIBRARY: 'huitur_case_library',
  RECENT_ANALYSES: 'huitur_recent_analyses',
  ANALYSIS_CONFIG: 'huitur_analysis_config'
} as const;

// AI模型配置
export const AI_MODELS: Record<string, AIModel> = {
  'deepseek': { id: 'deepseek', name: 'DeepSeek', provider: 'deepseek', category: 'domestic' },
  'kimi': { id: 'kimi', name: 'Kimi', provider: 'kimi', category: 'domestic' },
  'zhipu': { id: 'zhipu', name: '智谱AI', provider: 'zhipu', category: 'domestic' },
  'claude': { id: 'claude', name: 'Claude', provider: 'anthropic', category: 'international' },
  'gemini': { id: 'gemini', name: 'Gemini', provider: 'google', category: 'international' }
} as const;

// 深度分析维度配置
export const DEEP_ANALYSIS_DIMENSIONS: Record<DeepAnalysisType, { title: string; description: string; icon: string }> = {
  'keyword-analysis': { title: '关键词分析', description: '核心概念提取', icon: '🔍' },
  'domain-insights': { title: '领域洞察', description: '行业特点分析', icon: '💡' },
  'market-trends': { title: '市场趋势', description: '市场发展趋势', icon: '📈' },
  'technology-development': { title: '技术发展', description: '技术发展趋势', icon: '🔬' },
  'user-needs': { title: '用户需求', description: '用户需求分析', icon: '👥' },
  'competition-analysis': { title: '竞争分析', description: '竞争格局分析', icon: '⚔️' },
  'innovation-opportunities': { title: '创新机会', description: '创新机会识别', icon: '🚀' },
  'risk-assessment': { title: '风险评估', description: '风险识别评估', icon: '⚠️' },
  'implementation-suggestions': { title: '实施建议', description: '实施路径建议', icon: '📋' }
} as const;

// 奥斯本分析维度配置
export const OSBORN_ANALYSIS_DIMENSIONS: Record<OsbornQuestionType, { title: string; description: string; icon: string }> = {
  'other-uses': { title: '其他用途', description: '跨界应用分析', icon: '🔄' },
  'adapt': { title: '借用', description: '借鉴经验分析', icon: '🔧' },
  'modify': { title: '改变', description: '形态改变分析', icon: '🎨' },
  'magnify': { title: '扩大', description: '功能扩展分析', icon: '📈' },
  'minify': { title: '缩小', description: '精简优化分析', icon: '📉' },
  'substitute': { title: '替代', description: '材料替代分析', icon: '🔄' },
  'rearrange': { title: '重新安排', description: '流程重组分析', icon: '🔀' },
  'reverse': { title: '颠倒', description: '反向思考分析', icon: '↩️' },
  'combine': { title: '组合', description: '功能组合分析', icon: '🔗' }
} as const;
