/**
 * AI服务诊断工具
 * 用于检查AI配置、网络连接和API调用状态
 */

import { getApiKeyString } from './apiKeyManager';

export interface DiagnosticResult {
  configStatus: {
    hasConfig: boolean;
    hasApiKey: boolean;
    apiKeyLength: number;
    model: string;
    temperature: number;
    maxTokens: number;
  };
  networkStatus: {
    canReachAPI: boolean;
    responseTime?: number;
    error?: string;
  };
  localStorageStatus: {
    hasStoredConfig: boolean;
    hasMultiConfig: boolean;
    activeConfigId?: string;
  };
  recommendations: string[];
}

export class AIDiagnostics {
  private static readonly API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';
  private static readonly TEST_PROMPT = '{"test": "connection"}';

  /**
   * 执行完整的AI服务诊断
   */
  static async runFullDiagnostics(): Promise<DiagnosticResult> {
    console.log('🔍 开始AI服务诊断...');
    
    const result: DiagnosticResult = {
      configStatus: await this.checkConfigStatus(),
      networkStatus: await this.checkNetworkStatus(),
      localStorageStatus: this.checkLocalStorageStatus(),
      recommendations: []
    };

    // 生成建议
    result.recommendations = this.generateRecommendations(result);
    
    console.log('✅ AI服务诊断完成:', result);
    return result;
  }

  /**
   * 检查AI配置状态
   */
  private static async checkConfigStatus() {
    try {
      // 动态导入AI服务
      const aiServiceModule = await import('../services/ai/aiService');
      const aiService = aiServiceModule.default;
      
      const isConfigured = aiService.isConfigured();
      const config = (aiService as any).config;
      
      return {
        hasConfig: !!config,
        hasApiKey: !!(config?.apiKey),
        apiKeyLength: config?.apiKey?.length || 0,
        model: config?.model || 'unknown',
        temperature: config?.temperature || 0,
        maxTokens: config?.maxTokens || 0
      };
    } catch (error) {
      console.error('检查配置状态失败:', error);
      return {
        hasConfig: false,
        hasApiKey: false,
        apiKeyLength: 0,
        model: 'unknown',
        temperature: 0,
        maxTokens: 0
      };
    }
  }

  /**
   * 检查网络连接状态
   */
  private static async checkNetworkStatus() {
    try {
      console.log('🌐 测试网络连接...');
      const startTime = Date.now();
      
      // 获取用户API密钥
      const userApiKey = getApiKeyString();
      
      if (!userApiKey) {
        return {
          canReachAPI: false,
          error: '未找到API密钥，无法测试API连接'
        };
      }
      
      console.log('🔑 使用用户API密钥进行网络测试');
      
      // 测试API端点可达性
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userApiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'test' }],
          max_tokens: 10
        })
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          canReachAPI: true,
          responseTime
        };
      } else if (response.status === 401) {
        return {
          canReachAPI: true,
          responseTime,
          error: 'API端点可达，但API密钥无效'
        };
      } else if (response.status === 403) {
        return {
          canReachAPI: true,
          responseTime,
          error: 'API端点可达，但API密钥权限不足'
        };
      } else {
        return {
          canReachAPI: false,
          responseTime,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }
    } catch (error) {
      console.error('网络连接测试失败:', error);
      return {
        canReachAPI: false,
        error: error instanceof Error ? error.message : '未知网络错误'
      };
    }
  }


  /**
   * 检查localStorage状态
   */
  private static checkLocalStorageStatus() {
    try {
      const storedConfig = localStorage.getItem('huitu-ai-config');
      const storedMultiConfig = localStorage.getItem('huitu-multi-api-configs');
      
      let activeConfigId: string | undefined;
      if (storedMultiConfig) {
        try {
          const multiConfigs = JSON.parse(storedMultiConfig);
          const activeConfig = multiConfigs.find((config: any) => config.isActive);
          activeConfigId = activeConfig?.id;
        } catch (e) {
          console.warn('解析多API配置失败:', e);
        }
      }
      
      const result: any = {
        hasStoredConfig: !!storedConfig,
        hasMultiConfig: !!storedMultiConfig
      };
      
      if (activeConfigId) {
        result.activeConfigId = activeConfigId;
      }
      
      return result;
    } catch (error) {
      console.error('检查localStorage失败:', error);
      return {
        hasStoredConfig: false,
        hasMultiConfig: false
      };
    }
  }

  /**
   * 生成诊断建议
   */
  private static generateRecommendations(result: DiagnosticResult): string[] {
    const recommendations: string[] = [];
    
    // 配置相关建议
    if (!result.configStatus.hasConfig) {
      recommendations.push('❌ AI服务未配置，请前往设置页面配置API密钥');
    } else if (!result.configStatus.hasApiKey) {
      recommendations.push('❌ API密钥未设置，请检查配置');
    } else if (result.configStatus.apiKeyLength < 10) {
      recommendations.push('⚠️ API密钥长度异常，请检查密钥是否正确');
    }
    
    // 网络相关建议
    if (!result.networkStatus.canReachAPI) {
      recommendations.push('❌ 无法连接到DeepSeek API，请检查网络连接');
      if (result.networkStatus.error) {
        recommendations.push(`   错误详情: ${result.networkStatus.error}`);
      }
    } else {
      recommendations.push('✅ 网络连接正常');
      if (result.networkStatus.responseTime) {
        recommendations.push(`   响应时间: ${result.networkStatus.responseTime}ms`);
      }
    }
    
    // 存储相关建议
    if (!result.localStorageStatus.hasStoredConfig && !result.localStorageStatus.hasMultiConfig) {
      recommendations.push('⚠️ 未找到存储的AI配置，请重新配置');
    }
    
    // 综合建议
    if (result.configStatus.hasApiKey && result.networkStatus.canReachAPI) {
      recommendations.push('✅ 配置和网络都正常，如果仍有问题，可能是API密钥无效或配额不足');
    }
    
    return recommendations;
  }

  /**
   * 测试实际的API调用
   */
  static async testAPICall(): Promise<{ success: boolean; error?: string; response?: any }> {
    try {
      console.log('🧪 测试实际API调用...');
      
      const aiServiceModule = await import('../services/ai/aiService');
      const aiService = aiServiceModule.default;
      
      if (!aiService.isConfigured()) {
        return { success: false, error: 'AI服务未配置' };
      }
      
      const testRequest = {
        topic: '测试主题',
        context: '这是一个测试请求',
        previousResults: []
      };
      
      const response = await aiService.performEnhancedAnalysis(testRequest);
      
      return { success: true, response };
    } catch (error) {
      console.error('API调用测试失败:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      };
    }
  }

  /**
   * 打印诊断报告
   */
  static printDiagnosticReport(result: DiagnosticResult) {
    console.log('\n📊 AI服务诊断报告');
    console.log('='.repeat(50));
    
    console.log('\n🔧 配置状态:');
    console.log(`  配置存在: ${result.configStatus.hasConfig ? '✅' : '❌'}`);
    console.log(`  API密钥: ${result.configStatus.hasApiKey ? '✅' : '❌'} (长度: ${result.configStatus.apiKeyLength})`);
    console.log(`  模型: ${result.configStatus.model}`);
    console.log(`  温度: ${result.configStatus.temperature}`);
    console.log(`  最大令牌: ${result.configStatus.maxTokens}`);
    
    console.log('\n🌐 网络状态:');
    console.log(`  API可达: ${result.networkStatus.canReachAPI ? '✅' : '❌'}`);
    if (result.networkStatus.responseTime) {
      console.log(`  响应时间: ${result.networkStatus.responseTime}ms`);
    }
    if (result.networkStatus.error) {
      console.log(`  错误: ${result.networkStatus.error}`);
    }
    
    console.log('\n💾 存储状态:');
    console.log(`  基础配置: ${result.localStorageStatus.hasStoredConfig ? '✅' : '❌'}`);
    console.log(`  多API配置: ${result.localStorageStatus.hasMultiConfig ? '✅' : '❌'}`);
    if (result.localStorageStatus.activeConfigId) {
      console.log(`  活跃配置ID: ${result.localStorageStatus.activeConfigId}`);
    }
    
    console.log('\n💡 建议:');
    result.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
    
    console.log('\n' + '='.repeat(50));
  }
}

// 导出便捷函数
export const runAIDiagnostics = AIDiagnostics.runFullDiagnostics;
export const testAPICall = AIDiagnostics.testAPICall;
export const printDiagnosticReport = AIDiagnostics.printDiagnosticReport;
