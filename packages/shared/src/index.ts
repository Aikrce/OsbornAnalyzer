// 导出类型定义
export * from './types';

// 导出工具函数
export * from './utils';

// 导出数据
export * from './data';

// 导出算法
export * from './algorithms';

// 导出实例
export { osbornAnalyzer } from './algorithms/osborn';
export { aiAnalyzer } from './algorithms/ai';
export { analysisEngine } from './algorithms/analysis';
export { storage } from './utils/storage';
export { ExportManager, BatchExportManager } from './utils/export';

// 导出默认配置
export const DEFAULT_CONFIG = {
  ANALYSIS_VERSION: '2.0.0',
  MAX_STORAGE_SIZE: 10 * 1024 * 1024, // 10MB
  EXPORT_FORMATS: ['json', 'md', 'png', 'pdf'] as const,
  SUPPORTED_LANGUAGES: ['zh-CN', 'en-US'] as const,
  CREATIVITY_LEVELS: ['conservative', 'balanced', 'innovative'] as const,
} as const;