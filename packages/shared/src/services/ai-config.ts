import { aiAnalyzer } from '../algorithms/ai';
import { localAIAnalyzer, hybridAIAnalyzer, type LocalAIModelConfig } from '../algorithms/local-ai';

// AI服务配置
export interface AIServiceConfig {
  provider: 'cloud' | 'local' | 'hybrid';
  apiKey?: string;
  localModelConfig?: LocalAIModelConfig;
  fallbackEnabled: boolean;
  cacheEnabled: boolean;
  offlineMode: boolean;
}

// AI服务状态
export interface AIServiceStatus {
  provider: string;
  cloudAvailable: boolean;
  localAvailable: boolean;
  modelLoaded: boolean;
  lastUsed: Date;
  usageCount: number;
}

// AI配置管理器
export class AIConfigManager {
  private config: AIServiceConfig;
  private status: AIServiceStatus;
  
  constructor(initialConfig?: Partial<AIServiceConfig>) {
    this.config = {
      provider: 'hybrid',
      fallbackEnabled: true,
      cacheEnabled: true,
      offlineMode: false,
      ...initialConfig
    };
    
    this.status = {
      provider: this.config.provider,
      cloudAvailable: false,
      localAvailable: false,
      modelLoaded: false,
      lastUsed: new Date(),
      usageCount: 0
    };
    
    this.initialize();
  }

  /**
   * 初始化AI服务
   */
  async initialize(): Promise<void> {
    try {
      // 检查云端API可用性
      if (this.config.apiKey) {
        aiAnalyzer.setApiKey(this.config.apiKey);
        this.status.cloudAvailable = await this.checkCloudAvailability();
      }

      // 检查本地模型可用性
      this.status.localAvailable = await this.checkLocalAvailability();
      
      // 自动选择最优provider
      await this.autoSelectProvider();
      
      console.log('AI服务初始化完成:', this.status);
    } catch (error) {
      console.error('AI服务初始化失败:', error);
    }
  }

  /**
   * 检查云端API可用性
   */
  private async checkCloudAvailability(): Promise<boolean> {
    if (!this.config.apiKey) return false;
    
    try {
      return await aiAnalyzer.checkAPIAvailability();
    } catch (error) {
      console.warn('云端API检查失败:', error);
      return false;
    }
  }

  /**
   * 检查本地模型可用性
   */
  private async checkLocalAvailability(): Promise<boolean> {
    try {
      const modelStatus = localAIAnalyzer.getModelStatus();
      if (!modelStatus.loaded) {
        return await localAIAnalyzer.loadModel();
      }
      return true;
    } catch (error) {
      console.warn('本地模型检查失败:', error);
      return false;
    }
  }

  /**
   * 自动选择最优provider
   */
  private async autoSelectProvider(): Promise<void> {
    if (this.config.offlineMode) {
      this.config.provider = 'local';
      return;
    }

    // 根据可用性自动选择
    if (this.status.cloudAvailable && this.status.localAvailable) {
      this.config.provider = 'hybrid';
    } else if (this.status.cloudAvailable) {
      this.config.provider = 'cloud';
    } else if (this.status.localAvailable) {
      this.config.provider = 'local';
    } else {
      this.config.provider = 'cloud'; // 默认回退
    }
    
    this.status.provider = this.config.provider;
  }

  /**
   * 获取当前AI分析器实例
   */
  getAnalyzer(): any {
    this.status.usageCount++;
    this.status.lastUsed = new Date();
    
    switch (this.config.provider) {
      case 'cloud':
        return aiAnalyzer;
      case 'local':
        return localAIAnalyzer;
      case 'hybrid':
        return hybridAIAnalyzer;
      default:
        return aiAnalyzer;
    }
  }

  /**
   * 更新配置
   */
  updateConfig(newConfig: Partial<AIServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (newConfig.apiKey) {
      aiAnalyzer.setApiKey(newConfig.apiKey);
    }
    
    this.initialize(); // 重新初始化
  }

  /**
   * 设置API密钥
   */
  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
    aiAnalyzer.setApiKey(apiKey);
    this.initialize();
  }

  /**
   * 启用离线模式
   */
  enableOfflineMode(): void {
    this.config.offlineMode = true;
    this.config.provider = 'local';
    this.status.provider = 'local';
  }

  /**
   * 禁用离线模式
   */
  disableOfflineMode(): void {
    this.config.offlineMode = false;
    this.autoSelectProvider();
  }

  /**
   * 下载本地模型
   */
  async downloadModel(): Promise<boolean> {
    try {
      const success = await localAIAnalyzer.downloadModel();
      if (success) {
        this.status.localAvailable = true;
        this.status.modelLoaded = true;
        await this.autoSelectProvider();
      }
      return success;
    } catch (error) {
      console.error('模型下载失败:', error);
      return false;
    }
  }

  /**
   * 获取当前配置
   */
  getConfig(): AIServiceConfig {
    return { ...this.config };
  }

  /**
   * 获取服务状态
   */
  getStatus(): AIServiceStatus {
    return { ...this.status };
  }

  /**
   * 重置使用统计
   */
  resetUsageStats(): void {
    this.status.usageCount = 0;
    this.status.lastUsed = new Date();
  }
}

// 创建默认配置管理器实例
export const aiConfigManager = new AIConfigManager();

// 默认导出
export default aiConfigManager;