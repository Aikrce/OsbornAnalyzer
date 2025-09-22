import type { AnalysisResult, UserPreferences } from '../types';
import CryptoJS from 'crypto-js';

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
  
  // 内存存储API密钥
  private apiKeyCache: string | null = null;
  private apiKeyExpiry: number | null = null;
  private readonly API_KEY_TTL = 24 * 60 * 60 * 1000; // 24小时过期
  
  private constructor() {}
  
  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
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

  // 生成设备密钥
  private getDeviceKey(): string {
    try {
      // 基于设备特征生成密钥
      const deviceInfo = [
        navigator.userAgent,
        navigator.language,
        window.location.hostname,
        navigator.platform,
        screen.width + 'x' + screen.height
      ].join('|');
      
      return CryptoJS.SHA256(deviceInfo).toString();
    } catch (error) {
      // 如果无法获取设备信息，使用默认密钥
      console.warn('无法生成设备密钥，使用默认密钥:', error);
      return CryptoJS.SHA256('default-device-key').toString();
    }
  }

  // 加密数据
  private encryptData(data: string): string {
    try {
      const key = this.getDeviceKey();
      return CryptoJS.AES.encrypt(data, key).toString();
    } catch (error) {
      console.error('数据加密失败:', error);
      throw new Error('加密失败');
    }
  }

  // 解密数据
  private decryptData(encryptedData: string): string | null {
    try {
      const key = this.getDeviceKey();
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
      return decrypted.toString(CryptoJS.enc.Utf8) || null;
    } catch (error) {
      console.error('数据解密失败:', error);
      return null;
    }
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
  
  // API密钥存储（内存存储 + 加密备份）
  saveApiKey(apiKey: string): void {
    try {
      this.addAccessLog('保存API密钥', `长度: ${apiKey.length}`);
      
      // 主要存储：内存缓存
      this.apiKeyCache = apiKey;
      this.apiKeyExpiry = Date.now() + this.API_KEY_TTL;
      
      // 备份存储：AES加密到sessionStorage（会话级别）
      try {
        const encrypted = this.encryptData(apiKey);
        sessionStorage.setItem(STORAGE_KEYS.API_KEY, encrypted);
        this.addAccessLog('API密钥保存成功', '内存存储 + sessionStorage备份');
      } catch (backupError) {
        this.addAccessLog('API密钥备份失败', (backupError as Error).message);
        // 备份失败不影响主要功能
      }
      
      // 清理localStorage中的旧数据
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
      
    } catch (error) {
      this.addAccessLog('API密钥保存失败', (error as Error).message);
      console.error('保存API密钥失败:', error);
      throw new Error('保存失败');
    }
  }
  
  getApiKey(): string | null {
    try {
      this.addAccessLog('读取API密钥');
      
      // 首先检查内存缓存
      if (this.apiKeyCache && this.apiKeyExpiry && Date.now() < this.apiKeyExpiry) {
        this.addAccessLog('API密钥读取完成', `长度: ${this.apiKeyCache.length}, 内存缓存`);
        return this.apiKeyCache;
      }
      
      // 内存缓存过期或不存在，尝试从sessionStorage恢复
      const encrypted = sessionStorage.getItem(STORAGE_KEYS.API_KEY);
      if (encrypted) {
        const result = this.decryptData(encrypted);
        if (result) {
          // 恢复到内存缓存
          this.apiKeyCache = result;
          this.apiKeyExpiry = Date.now() + this.API_KEY_TTL;
          this.addAccessLog('API密钥读取完成', `长度: ${result.length}, sessionStorage恢复`);
          return result;
        }
      }
      
      // 最后尝试localStorage（向后兼容）
      const legacyEncrypted = localStorage.getItem(STORAGE_KEYS.API_KEY);
      if (legacyEncrypted) {
        const result = this.decryptData(legacyEncrypted);
        if (result) {
          // 迁移到新的存储方式
          this.apiKeyCache = result;
          this.apiKeyExpiry = Date.now() + this.API_KEY_TTL;
          this.saveApiKey(result); // 重新保存到新存储
          this.addAccessLog('API密钥读取完成', `长度: ${result.length}, localStorage迁移`);
          return result;
        }
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
    
    // 清理内存缓存
    this.apiKeyCache = null;
    this.apiKeyExpiry = null;
    
    // 清理所有存储位置
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
    sessionStorage.removeItem(STORAGE_KEYS.API_KEY);
    
    this.addAccessLog('API密钥清除完成', '所有存储位置已清理');
  }

  // 检查API密钥状态
  getApiKeyStatus(): {
    hasKey: boolean;
    source: 'memory' | 'session' | 'local' | 'none';
    expiresAt: number | null;
    isExpired: boolean;
  } {
    const now = Date.now();
    
    // 检查内存缓存
    if (this.apiKeyCache && this.apiKeyExpiry && now < this.apiKeyExpiry) {
      return {
        hasKey: true,
        source: 'memory',
        expiresAt: this.apiKeyExpiry,
        isExpired: false
      };
    }
    
    // 检查sessionStorage
    if (sessionStorage.getItem(STORAGE_KEYS.API_KEY)) {
      return {
        hasKey: true,
        source: 'session',
        expiresAt: null,
        isExpired: false
      };
    }
    
    // 检查localStorage
    if (localStorage.getItem(STORAGE_KEYS.API_KEY)) {
      return {
        hasKey: true,
        source: 'local',
        expiresAt: null,
        isExpired: false
      };
    }
    
    return {
      hasKey: false,
      source: 'none',
      expiresAt: null,
      isExpired: false
    };
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