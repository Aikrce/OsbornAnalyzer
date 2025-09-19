/**
 * 网络诊断工具
 * 用于测试网络连接和API可访问性
 */

import { getApiKeyString } from './apiKeyManager';

export interface NetworkTestResult {
  success: boolean;
  error?: string;
  responseTime?: number;
  status?: number;
  details?: any;
}

export class NetworkDiagnostics {
  private static readonly API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';
  private static readonly TEST_TIMEOUT = 10000; // 10秒超时

  /**
   * 测试基本网络连接
   */
  static async testBasicConnectivity(): Promise<NetworkTestResult> {
    try {
      console.log('🌐 测试基本网络连接...');
      const startTime = Date.now();
      
      // 测试一个简单的HTTP请求
      const response = await fetch('https://httpbin.org/get', {
        method: 'GET',
        signal: AbortSignal.timeout(this.TEST_TIMEOUT)
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          success: true,
          responseTime,
          status: response.status,
          details: '基本网络连接正常'
        };
      } else {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          responseTime,
          status: response.status
        };
      }
    } catch (error) {
      console.error('基本网络连接测试失败:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知网络错误',
        details: this.getErrorDetails(error)
      };
    }
  }

  /**
   * 测试DeepSeek API连接
   */
  static async testDeepSeekAPI(apiKey?: string): Promise<NetworkTestResult> {
    try {
      console.log('🔗 测试DeepSeek API连接...');
      const startTime = Date.now();
      
      // 获取用户API密钥
      const userApiKey = apiKey || getApiKeyString();
      
      if (!userApiKey) {
        return {
          success: false,
          error: '未找到API密钥',
          details: '请先配置API密钥'
        };
      }
      
      console.log('🔑 使用用户API密钥进行测试');
      
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userApiKey}`,
          'User-Agent': 'HuiTu-WebApp/1.0'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'test' }],
          max_tokens: 10
        }),
        signal: AbortSignal.timeout(this.TEST_TIMEOUT)
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          success: true,
          responseTime,
          status: response.status,
          details: 'API连接正常，密钥有效'
        };
      } else if (response.status === 401) {
        return {
          success: false,
          error: 'API密钥无效',
          responseTime,
          status: response.status,
          details: 'API端点可达，但API密钥无效或已过期'
        };
      } else if (response.status === 403) {
        return {
          success: false,
          error: 'API密钥权限不足',
          responseTime,
          status: response.status,
          details: 'API密钥权限不足或账户状态异常'
        };
      } else {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          responseTime,
          status: response.status
        };
      }
    } catch (error) {
      console.error('DeepSeek API连接测试失败:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知API错误',
        details: this.getErrorDetails(error)
      };
    }
  }


  /**
   * 测试DNS解析
   */
  static async testDNSResolution(): Promise<NetworkTestResult> {
    try {
      console.log('🔍 测试DNS解析...');
      const startTime = Date.now();
      
      // 尝试解析DeepSeek API域名
      const response = await fetch('https://api.deepseek.com', {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
      
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        responseTime,
        status: response.status,
        details: 'DNS解析正常'
      };
    } catch (error) {
      console.error('DNS解析测试失败:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'DNS解析失败',
        details: this.getErrorDetails(error)
      };
    }
  }

  /**
   * 综合网络诊断
   */
  static async runFullDiagnostics(): Promise<{
    basicConnectivity: NetworkTestResult;
    dnsResolution: NetworkTestResult;
    deepSeekAPI: NetworkTestResult;
    summary: string;
    recommendations: string[];
  }> {
    console.log('🔧 开始综合网络诊断...');
    
    const [basicConnectivity, dnsResolution, deepSeekAPI] = await Promise.allSettled([
      this.testBasicConnectivity(),
      this.testDNSResolution(),
      this.testDeepSeekAPI()
    ]);

    const results = {
      basicConnectivity: basicConnectivity.status === 'fulfilled' ? basicConnectivity.value : { success: false, error: '测试失败' },
      dnsResolution: dnsResolution.status === 'fulfilled' ? dnsResolution.value : { success: false, error: '测试失败' },
      deepSeekAPI: deepSeekAPI.status === 'fulfilled' ? deepSeekAPI.value : { success: false, error: '测试失败' }
    };

    // 生成诊断摘要
    const successCount = Object.values(results).filter(r => r.success).length;
    const summary = `网络诊断完成: ${successCount}/3 项测试通过`;

    // 生成建议
    const recommendations: string[] = [];
    
    if (!results.basicConnectivity.success) {
      recommendations.push('❌ 基本网络连接失败，请检查网络设置');
    }
    
    if (!results.dnsResolution.success) {
      recommendations.push('❌ DNS解析失败，请检查DNS设置或尝试使用其他DNS服务器');
    }
    
    if (!results.deepSeekAPI.success) {
      if (results.deepSeekAPI.status === 401) {
        recommendations.push('⚠️ API端点可达但需要有效的API密钥');
      } else {
        recommendations.push('❌ DeepSeek API连接失败，请检查网络或防火墙设置');
      }
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ 所有网络测试通过，连接正常');
    }

    console.log('✅ 网络诊断完成:', { summary, recommendations });
    
    return {
      ...results,
      summary,
      recommendations
    };
  }

  /**
   * 获取错误详情
   */
  private static getErrorDetails(error: any): string {
    if (error instanceof TypeError) {
      if (error.message === 'Load failed') {
        return '网络连接失败，可能是DNS解析问题或网络不可达';
      } else if (error.message.includes('fetch')) {
        return 'Fetch API错误，可能是CORS或网络配置问题';
      }
    } else if (error.name === 'AbortError') {
      return '请求超时，网络响应过慢';
    }
    
    return '未知网络错误';
  }

  /**
   * 测试本地网络环境
   */
  static async testLocalEnvironment(): Promise<{
    userAgent: string;
    online: boolean;
    protocol: string;
    host: string;
    cookiesEnabled: boolean;
  }> {
    return {
      userAgent: navigator.userAgent,
      online: navigator.onLine,
      protocol: window.location.protocol,
      host: window.location.host,
      cookiesEnabled: navigator.cookieEnabled
    };
  }
}

// 导出便捷函数
export const testNetwork = NetworkDiagnostics.runFullDiagnostics;
export const testBasicConnectivity = NetworkDiagnostics.testBasicConnectivity;
export const testDeepSeekAPI = NetworkDiagnostics.testDeepSeekAPI;
