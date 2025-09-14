import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../utils/storage';
import type { AnalysisResult } from '../types';

describe('StorageManager', () => {
  beforeEach(() => {
    // 清除localStorage
    localStorage.clear();
  });

  it('should save and retrieve analysis results', () => {
    const mockResult: AnalysisResult = {
      id: 'test-123',
      title: '测试分析',
      description: '这是一个测试分析',
      questions: {
        alternative: ['问题1', '问题2'],
        adaptation: ['问题3', '问题4'],
        modification: ['问题5', '问题6'],
        magnification: ['问题7', '问题8'],
        minification: ['问题9', '问题10'],
        substitution: ['问题11', '问题12'],
        rearrangement: ['问题13', '问题14'],
        reversal: ['问题15', '问题16'],
        combination: ['问题17', '问题18'],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 保存结果
    storage.saveAnalysisResult(mockResult);

    // 获取结果
    const results = storage.getAnalysisResults();
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('test-123');
    expect(results[0].title).toBe('测试分析');
  });

  it('should save and retrieve user preferences', () => {
    const preferences = {
      language: 'en-US' as const,
      theme: 'dark' as const,
      autoSave: false,
      aiEnabled: true,
      apiKey: 'test-key',
    };

    storage.saveUserPreferences(preferences);
    const retrieved = storage.getUserPreferences();

    expect(retrieved.language).toBe('en-US');
    expect(retrieved.theme).toBe('dark');
    expect(retrieved.autoSave).toBe(false);
    expect(retrieved.aiEnabled).toBe(true);
  });

  it('should save and retrieve API key', () => {
    const apiKey = 'test-api-key-123';
    storage.saveApiKey(apiKey);

    const retrieved = storage.getApiKey();
    expect(retrieved).toBe(apiKey);
  });

  it('should clear API key', () => {
    storage.saveApiKey('test-key');
    storage.clearApiKey();

    const retrieved = storage.getApiKey();
    expect(retrieved).toBeNull();
  });

  it('should delete specific analysis result', () => {
    const result1: AnalysisResult = {
      id: 'test-1',
      title: '分析1',
      description: '描述1',
      questions: {} as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result2: AnalysisResult = {
      id: 'test-2',
      title: '分析2',
      description: '描述2',
      questions: {} as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    storage.saveAnalysisResult(result1);
    storage.saveAnalysisResult(result2);

    let results = storage.getAnalysisResults();
    expect(results).toHaveLength(2);

    storage.deleteAnalysisResult('test-1');
    results = storage.getAnalysisResults();
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('test-2');
  });

  it('should export and import data', () => {
    const result: AnalysisResult = {
      id: 'test-export',
      title: '导出测试',
      description: '导出描述',
      questions: {} as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const preferences = {
      language: 'zh-CN' as const,
      theme: 'auto' as const,
      autoSave: true,
      aiEnabled: false,
    };

    storage.saveAnalysisResult(result);
    storage.saveUserPreferences(preferences);

    // 导出数据
    const exportedData = storage.exportData();
    expect(exportedData).toContain('导出测试');

    // 清除数据
    localStorage.clear();

    // 导入数据
    storage.importData(exportedData);
    const results = storage.getAnalysisResults();
    const retrievedPreferences = storage.getUserPreferences();

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('导出测试');
    expect(retrievedPreferences.language).toBe('zh-CN');
  });
});