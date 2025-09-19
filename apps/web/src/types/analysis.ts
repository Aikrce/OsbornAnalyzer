/**
 * 统一的分析类型定义
 * 解决 useDualAnalysis 和 unifiedAnalysisService 类型不一致问题
 */

// 分析类型枚举
export enum AnalysisType {
  LOCAL = 'local',
  API = 'api',
  DUAL = 'dual'
}

// 分析类型字符串联合类型
export type AnalysisTypeString = 'local' | 'api' | 'dual';

// 分析模式枚举
export enum AnalysisMode {
  QUICK = 'quick',
  STANDARD = 'standard',
  DUAL = 'deep'
}

// 分析上下文接口
export interface AnalysisContext {
  topic: string;
  industry?: string;
  targetAudience?: string;
  businessModel?: string;
  goals?: string[];
  constraints?: string[];
  aiEnhanced?: boolean;
}

// 分析选项接口
export interface AnalysisOptions {
  enableParallel?: boolean;
  timeout?: number;
  cacheResults?: boolean;
  includeSimilarCases?: boolean;
  generateVisualizations?: boolean;
}

// 统一分析请求接口
export interface UnifiedAnalysisRequest {
  topic: string;
  type: AnalysisType;
  mode: AnalysisMode;
  context?: Partial<AnalysisContext>;
  options?: AnalysisOptions;
}

// 双重分析结果接口
export interface DualAnalysisResult {
  osbornAnalysis: any; // 奥斯本分析结果
  deepAnalysis: any;   // 深度分析结果
  topic: string;
  timestamp: Date;
  analysisId: string;
}

// 分析状态枚举
export enum AnalysisStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// 类型转换工具函数
export const convertAnalysisType = (type: AnalysisTypeString): AnalysisType => {
  switch (type) {
    case 'local':
      return AnalysisType.LOCAL;
    case 'api':
      return AnalysisType.API;
    case 'dual':
      return AnalysisType.DUAL;
    default:
      return AnalysisType.LOCAL;
  }
};

export const convertAnalysisTypeToString = (type: AnalysisType): AnalysisTypeString => {
  switch (type) {
    case AnalysisType.LOCAL:
      return 'local';
    case AnalysisType.API:
      return 'api';
    case AnalysisType.DUAL:
      return 'dual';
    default:
      return 'local';
  }
};
