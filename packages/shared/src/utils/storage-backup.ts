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
  private accessLog: string[] = [];
  private readonly MAX_LOG_SIZE = 100;
  
  // 注意：API密钥现在委托给AI配置系统管理
  
  private constructor() {}
  
  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  // 环境检测
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private safeLocalStorage(): Storage | null {
    return this.isBrowser() ? localStorage : null;
  }

  // 添加访问日志
  private addAccessLog(operation: string, details?: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${operation}${details ? ` - ${details}` : ''}`;
    
    this.accessLog.push(logEntry);
    
    // 保持日志大小在限制内
    if (this.accessLog.length > this.MAX_LOG_SIZE) {
      this.accessLog.shift();
    }
    
    // 在开发环境下输出日志
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 StorageManager: ${logEntry}`);
    }
  }

  // 获取访问日志
  getAccessLog(): string[] {
    return [...this.accessLog];
  }

  // 清理访问日志
  clearAccessLog(): void {
    this.accessLog = [];
  }

  // 与AI配置系统交互的方法
  private saveToAIConfig(apiKey: string): void {
    try {
      // 检查是否存在AI配置
      const existingConfig = localStorage.getItem('huitu-ai-config');
      if (existingConfig) {
        const config = JSON.parse(existingConfig);
        config.apiKey = apiKey;
        localStorage.setItem('huitu-ai-config', JSON.stringify(config));
        this.addAccessLog('API密钥保存到AI配置', '单API配置');
      } else {
        // 创建新的AI配置
        const newConfig = {
          apiKey: apiKey,
          model: 'deepseek-chat',
          temperature: 0.7,
          maxTokens: 2000
        };
        localStorage.setItem('huitu-ai-config', JSON.stringify(newConfig));
        this.addAccessLog('API密钥保存到AI配置', '新建单API配置');
      }
    } catch (error) {
      this.addAccessLog('保存到AI配置失败', (error as Error).message);
      throw error;
    }
  }

  private getFromAIConfig(): string | null {
    try {
      // 优先从多API配置获取
      const multiConfig = localStorage.getItem('huitu-multi-api-configs');
      if (multiConfig) {
        const configs = JSON.parse(multiConfig);
        const activeConfig = configs.find((c: any) => c.isActive);
        if (activeConfig && activeConfig.apiKey && activeConfig.apiKey.trim().length > 0) {
          this.addAccessLog('从AI配置获取API密钥', '多API配置');
          return activeConfig.apiKey;
        }
      }

      // 然后从单API配置获取
      const singleConfig = localStorage.getItem('huitu-ai-config');
      if (singleConfig) {
        const config = JSON.parse(singleConfig);
        if (config.apiKey && config.apiKey.trim().length > 0) {
          this.addAccessLog('从AI配置获取API密钥', '单API配置');
          return config.apiKey;
        }
      }

      return null;
    } catch (error) {
      this.addAccessLog('从AI配置获取失败', (error as Error).message);
      return null;
    }
  }

  // 注意：加密功能已移除，API密钥现在使用AI配置系统的存储方式
  
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
        language: 'zh',
        theme: 'auto',
        notifications: true,
        autoSave: true,
        aiSuggestions: true,
        aiEnabled: false,
        defaultAnalysisMode: 'local',
      };
      return data ? { ...defaultPreferences, ...JSON.parse(data) } : defaultPreferences;
    } catch (error) {
      console.error('读取用户偏好失败:', error);
      return {
        language: 'zh',
        theme: 'auto',
        notifications: true,
        autoSave: true,
        aiSuggestions: true,
        aiEnabled: false,
        defaultAnalysisMode: 'local',
      };
    }
  }
  
  // API密钥存储（兼容模式 - 委托给AI配置系统）
  saveApiKey(apiKey: string): void {
    try {
      this.addAccessLog('保存API密钥', `长度: ${apiKey.length}`);
      
      // 委托给AI配置系统保存
      this.saveToAIConfig(apiKey);
      
      this.addAccessLog('API密钥保存成功', '委托给AI配置系统');
    } catch (error) {
      this.addAccessLog('API密钥保存失败', (error as Error).message);
      console.error('保存API密钥失败:', error);
      throw new Error('保存失败');
    }
  }
  
  getApiKey(): string | null {
    try {
      this.addAccessLog('读取API密钥');
      
      // 从AI配置系统获取API密钥
      const apiKey = this.getFromAIConfig();
      
      if (apiKey) {
        this.addAccessLog('API密钥读取完成', `长度: ${apiKey.length}, AI配置系统`);
        return apiKey;
      }
      
      this.addAccessLog('API密钥读取完成', '无密钥');
      return null;
      
    } catch (error) {
      this.addAccessLog('API密钥读取失败', (error as Error).message);
      console.error('读取API密钥失败:', error);
      return null;
    }
  }
  
  clearApiKey(): void {
    this.addAccessLog('清除API密钥');
    
    // 清理AI配置系统中的API密钥
    try {
      // 清理单API配置
      const singleConfig = localStorage.getItem('huitu-ai-config');
      if (singleConfig) {
        const config = JSON.parse(singleConfig);
        config.apiKey = '';
        localStorage.setItem('huitu-ai-config', JSON.stringify(config));
      }

      // 清理多API配置中的活跃配置
      const multiConfig = localStorage.getItem('huitu-multi-api-configs');
      if (multiConfig) {
        const configs = JSON.parse(multiConfig);
        const updatedConfigs = configs.map((config: any) => ({
          ...config,
          apiKey: config.isActive ? '' : config.apiKey
        }));
        localStorage.setItem('huitu-multi-api-configs', JSON.stringify(updatedConfigs));
      }

      this.addAccessLog('API密钥清除完成', 'AI配置系统已清理');
    } catch (error) {
      this.addAccessLog('API密钥清除失败', (error as Error).message);
      console.error('清除API密钥失败:', error);
    }
  }

  // 检查API密钥状态
  getApiKeyStatus(): {
    hasKey: boolean;
    source: 'ai-config-single' | 'ai-config-multi' | 'none';
    expiresAt: number | null;
    isExpired: boolean;
  } {
    try {
      // 检查多API配置
      const multiConfig = localStorage.getItem('huitu-multi-api-configs');
      if (multiConfig) {
        const configs = JSON.parse(multiConfig);
        const activeConfig = configs.find((c: any) => c.isActive);
        if (activeConfig && activeConfig.apiKey && activeConfig.apiKey.trim().length > 0) {
          return {
            hasKey: true,
            source: 'ai-config-multi',
            expiresAt: null,
            isExpired: false
          };
        }
      }

      // 检查单API配置
      const singleConfig = localStorage.getItem('huitu-ai-config');
      if (singleConfig) {
        const config = JSON.parse(singleConfig);
        if (config.apiKey && config.apiKey.trim().length > 0) {
          return {
            hasKey: true,
            source: 'ai-config-single',
            expiresAt: null,
            isExpired: false
          };
        }
      }

      return {
        hasKey: false,
        source: 'none',
        expiresAt: null,
        isExpired: false
      };
    } catch (error) {
      this.addAccessLog('检查API密钥状态失败', (error as Error).message);
      return {
        hasKey: false,
        source: 'none',
        expiresAt: null,
        isExpired: false
      };
    }
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