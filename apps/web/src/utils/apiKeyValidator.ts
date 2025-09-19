// API密钥验证工具
export interface APIKeyValidationResult {
  isValid: boolean;
  error?: string;
  keyLength: number;
  keyPrefix: string;
  provider: string;
  testResult?: {
    status: number;
    message: string;
    responseTime: number;
  };
}

export class APIKeyValidator {
  private static readonly PROVIDERS = {
    deepseek: {
      prefix: 'sk-',
      minLength: 20,
      maxLength: 100,
      testEndpoint: 'https://api.deepseek.com/v1/chat/completions'
    },
    openai: {
      prefix: 'sk-',
      minLength: 20,
      maxLength: 100,
      testEndpoint: 'https://api.openai.com/v1/chat/completions'
    },
    claude: {
      prefix: 'sk-ant-',
      minLength: 30,
      maxLength: 100,
      testEndpoint: 'https://api.anthropic.com/v1/messages'
    }
  };

  // 验证API密钥格式
  static validateFormat(apiKey: string, provider: string = 'deepseek'): APIKeyValidationResult {
    const result: APIKeyValidationResult = {
      isValid: false,
      keyLength: apiKey.length,
      keyPrefix: apiKey.substring(0, 5) + '...',
      provider
    };

    // 基本检查
    if (!apiKey || typeof apiKey !== 'string') {
      result.error = 'API密钥不能为空';
      return result;
    }

    if (apiKey.trim().length === 0) {
      result.error = 'API密钥不能只包含空格';
      return result;
    }

    // 获取提供商配置
    const providerConfig = this.PROVIDERS[provider as keyof typeof this.PROVIDERS];
    if (!providerConfig) {
      result.error = `不支持的提供商: ${provider}`;
      return result;
    }

    // 长度检查
    if (apiKey.length < providerConfig.minLength) {
      result.error = `API密钥太短，至少需要${providerConfig.minLength}个字符`;
      return result;
    }

    if (apiKey.length > providerConfig.maxLength) {
      result.error = `API密钥太长，最多${providerConfig.maxLength}个字符`;
      return result;
    }

    // 前缀检查
    if (!apiKey.startsWith(providerConfig.prefix)) {
      result.error = `${provider} API密钥应该以"${providerConfig.prefix}"开头`;
      return result;
    }

    // 格式检查（基本字符验证）
    if (!/^[a-zA-Z0-9_-]+$/.test(apiKey)) {
      result.error = 'API密钥包含无效字符，只能包含字母、数字、下划线和连字符';
      return result;
    }

    result.isValid = true;
    return result;
  }

  // 测试API密钥是否有效
  static async testAPIKey(apiKey: string, provider: string = 'deepseek'): Promise<APIKeyValidationResult> {
    console.log(`🧪 开始测试${provider} API密钥...`);
    
    const formatResult = this.validateFormat(apiKey, provider);
    if (!formatResult.isValid) {
      console.log(`❌ 格式验证失败: ${formatResult.error}`);
      return formatResult;
    }

    const providerConfig = this.PROVIDERS[provider as keyof typeof this.PROVIDERS];
    if (!providerConfig) {
      formatResult.error = `不支持的提供商: ${provider}`;
      return formatResult;
    }

    try {
      const startTime = Date.now();
      
      // 构建测试请求
      const testRequest = this.buildTestRequest(apiKey, provider);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时

      console.log(`📡 发送测试请求到: ${providerConfig.testEndpoint}`);
      
      const response = await fetch(providerConfig.testEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'HuiTu-API-Validator/1.0'
        },
        body: JSON.stringify(testRequest.body),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;

      console.log(`📊 响应状态: ${response.status}, 响应时间: ${responseTime}ms`);

      // 分析响应
      if (response.status === 200 || response.status === 201) {
        formatResult.isValid = true;
        formatResult.testResult = {
          status: response.status,
          message: 'API密钥有效，测试成功',
          responseTime
        };
        console.log(`✅ API密钥测试成功`);
      } else if (response.status === 401) {
        formatResult.isValid = false;
        formatResult.error = 'API密钥无效或已过期';
        formatResult.testResult = {
          status: response.status,
          message: '认证失败',
          responseTime
        };
        console.log(`❌ API密钥无效 (401)`);
      } else if (response.status === 403) {
        formatResult.isValid = false;
        formatResult.error = 'API密钥权限不足';
        formatResult.testResult = {
          status: response.status,
          message: '权限不足',
          responseTime
        };
        console.log(`❌ API密钥权限不足 (403)`);
      } else if (response.status === 429) {
        formatResult.isValid = true; // 格式正确，只是限流
        formatResult.testResult = {
          status: response.status,
          message: 'API密钥有效但请求频率过高',
          responseTime
        };
        console.log(`⚠️ API密钥有效但请求频率过高 (429)`);
      } else {
        formatResult.isValid = false;
        formatResult.error = `API调用失败，状态码: ${response.status}`;
        formatResult.testResult = {
          status: response.status,
          message: `未知错误: ${response.status}`,
          responseTime
        };
        console.log(`❌ API调用失败: ${response.status}`);
      }

      // 尝试读取错误详情
      if (!formatResult.isValid && response.status >= 400) {
        try {
          const errorData = await response.text();
          console.log(`📋 错误详情:`, errorData);
          if (errorData) {
            formatResult.testResult!.message += ` - ${errorData.substring(0, 200)}`;
          }
        } catch (e) {
          console.warn('无法读取错误详情:', e);
        }
      }

    } catch (error) {
      console.error(`❌ API测试异常:`, error);
      
      if ((error as any).name === 'AbortError') {
        formatResult.isValid = false;
        formatResult.error = 'API测试超时，请检查网络连接';
        formatResult.testResult = {
          status: 0,
          message: '请求超时',
          responseTime: 15000
        };
      } else if ((error as Error).message.includes('Load failed')) {
        formatResult.isValid = false;
        formatResult.error = '网络连接失败，请检查网络设置';
        formatResult.testResult = {
          status: 0,
          message: '网络连接失败',
          responseTime: 0
        };
      } else {
        formatResult.isValid = false;
        formatResult.error = `API测试失败: ${(error as Error).message}`;
        formatResult.testResult = {
          status: 0,
          message: (error as Error).message,
          responseTime: 0
        };
      }
    }

    return formatResult;
  }

  // 构建测试请求
  private static buildTestRequest(apiKey: string, provider: string) {
    switch (provider) {
      case 'deepseek':
        return {
          body: {
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: 'Hello, this is a test message.' }],
            max_tokens: 10
          }
        };
      case 'openai':
        return {
          body: {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Hello, this is a test message.' }],
            max_tokens: 10
          }
        };
      case 'claude':
        return {
          body: {
            model: 'claude-3-haiku-20240307',
            max_tokens: 10,
            messages: [{ role: 'user', content: 'Hello, this is a test message.' }]
          }
        };
      default:
        throw new Error(`不支持的提供商: ${provider}`);
    }
  }

  // 批量验证多个API密钥
  static async validateMultipleKeys(keys: Array<{key: string, provider: string}>): Promise<APIKeyValidationResult[]> {
    console.log(`🔍 开始批量验证${keys.length}个API密钥...`);
    
    const results: APIKeyValidationResult[] = [];
    
    for (const { key, provider } of keys) {
      console.log(`\n📋 验证${provider}密钥: ${key.substring(0, 10)}...`);
      const result = await this.testAPIKey(key, provider);
      results.push(result);
      
      // 避免请求过于频繁
      if (results.length < keys.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`✅ 批量验证完成，成功: ${results.filter(r => r.isValid).length}/${results.length}`);
    return results;
  }

  // 生成验证报告
  static generateValidationReport(results: APIKeyValidationResult[]): string {
    const validCount = results.filter(r => r.isValid).length;
    const totalCount = results.length;
    
    let report = `# API密钥验证报告\n\n`;
    report += `## 总体状态\n`;
    report += `- 总数量: ${totalCount}\n`;
    report += `- 有效: ${validCount}\n`;
    report += `- 无效: ${totalCount - validCount}\n`;
    report += `- 成功率: ${totalCount > 0 ? Math.round((validCount / totalCount) * 100) : 0}%\n\n`;
    
    results.forEach((result, index) => {
      const status = result.isValid ? '✅' : '❌';
      report += `## ${status} 密钥 ${index + 1}\n`;
      report += `- 提供商: ${result.provider}\n`;
      report += `- 长度: ${result.keyLength}字符\n`;
      report += `- 前缀: ${result.keyPrefix}\n`;
      
      if (result.testResult) {
        report += `- 测试状态: ${result.testResult.status}\n`;
        report += `- 响应时间: ${result.testResult.responseTime}ms\n`;
        report += `- 消息: ${result.testResult.message}\n`;
      }
      
      if (result.error) {
        report += `- 错误: ${result.error}\n`;
      }
      
      report += `\n`;
    });
    
    return report;
  }

  // 快速检查localStorage中的配置
  static checkStoredConfigs(): {configs: any[], summary: string} {
    console.log('🔍 检查localStorage中的API配置...');
    
    const configs: any[] = [];
    const keys = ['huitu-ai-config', 'huitu-multi-api-configs'];
    
    keys.forEach(key => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const config = JSON.parse(stored);
          configs.push({ key, config });
          console.log(`📋 找到配置: ${key}`, config);
        } catch (e) {
          console.error(`❌ 配置解析失败: ${key}`, e);
        }
      }
    });
    
    const summary = `找到${configs.length}个配置，包含${configs.reduce((count, c) => {
      if (Array.isArray(c.config)) {
        return count + c.config.length;
      } else if (c.config.apiKey) {
        return count + 1;
      }
      return count;
    }, 0)}个API密钥`;
    
    console.log(`📊 ${summary}`);
    return { configs, summary };
  }
}

// 导出验证工具实例
export const apiKeyValidator = new APIKeyValidator();
