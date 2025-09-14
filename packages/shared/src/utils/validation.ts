import { z } from 'zod';

// 分析结果验证模式
export const AnalysisResultSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  questions: z.record(z.string(), z.array(z.string())),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 用户偏好验证模式
export const UserPreferencesSchema = z.object({
  language: z.enum(['zh-CN', 'en-US']),
  theme: z.enum(['light', 'dark', 'auto']),
  autoSave: z.boolean(),
  aiEnabled: z.boolean(),
  apiKey: z.string().optional(),
});

// 导出选项验证模式
export const ExportOptionsSchema = z.object({
  format: z.enum(['png', 'pdf', 'md', 'json']),
  includeMetadata: z.boolean(),
  quality: z.enum(['low', 'medium', 'high']),
});

// 验证函数
export function validateAnalysisResult(data: unknown) {
  return AnalysisResultSchema.parse(data);
}

export function validateUserPreferences(data: unknown) {
  return UserPreferencesSchema.parse(data);
}

export function validateExportOptions(data: unknown) {
  return ExportOptionsSchema.parse(data);
}