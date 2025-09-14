import type { AnalysisResult, UserPreferences } from '../types';

// 本地存储键名
const STORAGE_KEYS = {
  ANALYSIS_RESULTS: 'huitu_analysis_results',
  USER_PREFERENCES: 'huitu_user_preferences',
  API_KEY: 'huitu_api_key',
  THEME: 'huitu_theme',
  LANGUAGE: 'huitu_language',
} as const;

// 存储管理器
export class StorageManager {
  private static instance: StorageManager;
  
  private constructor() {}
  
  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }
  
  // 分析结果存储
  saveAnalysisResult(result: AnalysisResult): void {
    try {
      const results = this.getAnalysisResults();
      results.push(result);
      localStorage.setItem(STORAGE_KEYS.ANALYSIS_RESULTS, JSON.stringify(results));
    } catch (error) {
      console.error('保存分析结果失败:', error);
      throw new Error('保存失败，请检查存储空间');
    }
  }
  
  getAnalysisResults(): AnalysisResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYSIS_RESULTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('读取分析结果失败:', error);
      return [];
    }
  }
  
  deleteAnalysisResult(id: string): void {
    try {
      const results = this.getAnalysisResults();
      const filtered = results.filter(result => result.id !== id);
      localStorage.setItem(STORAGE_KEYS.ANALYSIS_RESULTS, JSON.stringify(filtered));
    } catch (error) {
      console.error('删除分析结果失败:', error);
      throw new Error('删除失败');
    }
  }
  
  // 用户偏好存储
  saveUserPreferences(preferences: UserPreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('保存用户偏好失败:', error);
      throw new Error('保存失败');
    }
  }
  
  getUserPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      const defaultPreferences: UserPreferences = {
        language: 'zh-CN',
        theme: 'auto',
        notifications: true,
        autoSave: true,
        aiSuggestions: true,
        aiEnabled: false,
      };
      return data ? { ...defaultPreferences, ...JSON.parse(data) } : defaultPreferences;
    } catch (error) {
      console.error('读取用户偏好失败:', error);
      return {
        language: 'zh-CN',
        theme: 'auto',
        notifications: true,
        autoSave: true,
        aiSuggestions: true,
        aiEnabled: false,
      };
    }
  }
  
  // API密钥存储（加密存储）
  saveApiKey(apiKey: string): void {
    try {
      // 简单的base64编码，生产环境应使用更安全的加密方式
      const encoded = btoa(apiKey);
      localStorage.setItem(STORAGE_KEYS.API_KEY, encoded);
    } catch (error) {
      console.error('保存API密钥失败:', error);
      throw new Error('保存失败');
    }
  }
  
  getApiKey(): string | null {
    try {
      const encoded = localStorage.getItem(STORAGE_KEYS.API_KEY);
      return encoded ? atob(encoded) : null;
    } catch (error) {
      console.error('读取API密钥失败:', error);
      return null;
    }
  }
  
  clearApiKey(): void {
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
  }
  
  // 清除所有数据
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
  
  // 导出数据
  exportData(): string {
    const data = {
      results: this.getAnalysisResults(),
      preferences: this.getUserPreferences(),
      exportTime: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }
  
  // 导入数据
  importData(jsonString: string): void {
    try {
      const data = JSON.parse(jsonString);
      if (data.results) {
        localStorage.setItem(STORAGE_KEYS.ANALYSIS_RESULTS, JSON.stringify(data.results));
      }
      if (data.preferences) {
        this.saveUserPreferences(data.preferences);
      }
    } catch (error) {
      console.error('导入数据失败:', error);
      throw new Error('导入失败，请检查文件格式');
    }
  }
}

// 导出单例实例
export const storage = StorageManager.getInstance();