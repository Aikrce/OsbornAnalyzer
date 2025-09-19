// 详细诊断工具 - 专门用于检查 401 错误
export interface DetailedDiagnosticResult {
  timestamp: string;
  localStorage: {
    hasBasicConfig: boolean;
    hasMultiConfig: boolean;
    basicConfigContent?: any;
    multiConfigContent?: any;
    activeConfig?: any;
  };
  apiKey: {
    found: boolean;
    length: number;
    prefix: string;
    suffix: string;
    formatValid: boolean;
    source: 'basic' | 'multi' | 'none';
  };
  network: {
    canReachAPI: boolean;
    responseStatus?: number;
    responseTime?: number;
    errorMessage?: string;
    detailedError?: any;
  };
  recommendations: string[];
}

export class DetailedDiagnostic {
  static async runDiagnostic(): Promise<DetailedDiagnosticResult> {
    const result: DetailedDiagnosticResult = {
      timestamp: new Date().toISOString(),
      localStorage: {
        hasBasicConfig: false,
        hasMultiConfig: false
      },
      apiKey: {
        found: false,
        length: 0,
        prefix: '',
        suffix: '',
        formatValid: false,
        source: 'none'
      },
      network: {
        canReachAPI: false
      },
      recommendations: []
    };

    console.log('🔍 开始详细诊断...');

    // 1. 检查 localStorage
    await this.checkLocalStorage(result);

    // 2. 检查 API 密钥
    this.checkApiKey(result);

    // 3. 测试网络连接
    await this.testNetworkConnection(result);

    // 4. 生成建议
    this.generateRecommendations(result);

    console.log('✅ 详细诊断完成:', result);
    return result;
  }

  private static async checkLocalStorage(result: DetailedDiagnosticResult): Promise<void> {
    console.log('📋 检查 localStorage...');

    // 检查基础配置
    const basicConfig = localStorage.getItem('huitu-ai-config');
    if (basicConfig) {
      result.localStorage.hasBasicConfig = true;
      try {
        result.localStorage.basicConfigContent = JSON.parse(basicConfig);
        console.log('✅ 找到基础配置:', result.localStorage.basicConfigContent);
      } catch (e) {
        console.error('❌ 基础配置解析失败:', e);
        result.localStorage.basicConfigContent = { error: '解析失败' };
      }
    }

    // 检查多API配置
    const multiConfig = localStorage.getItem('huitu-multi-api-configs');
    if (multiConfig) {
      result.localStorage.hasMultiConfig = true;
      try {
        result.localStorage.multiConfigContent = JSON.parse(multiConfig);
        console.log('✅ 找到多API配置:', result.localStorage.multiConfigContent);
        
        // 查找活跃配置
        if (Array.isArray(result.localStorage.multiConfigContent)) {
          result.localStorage.activeConfig = result.localStorage.multiConfigContent.find((c: any) => c.isActive);
          if (result.localStorage.activeConfig) {
            console.log('✅ 找到活跃配置:', result.localStorage.activeConfig);
          }
        }
      } catch (e) {
        console.error('❌ 多API配置解析失败:', e);
        result.localStorage.multiConfigContent = { error: '解析失败' };
      }
    }

    if (!result.localStorage.hasBasicConfig && !result.localStorage.hasMultiConfig) {
      console.log('❌ 未找到任何配置');
    }
  }

  private static checkApiKey(result: DetailedDiagnosticResult): void {
    console.log('🔑 检查 API 密钥...');

    let apiKey = '';

    // 优先检查多API配置中的活跃配置
    if (result.localStorage.activeConfig && result.localStorage.activeConfig.apiKey) {
      apiKey = result.localStorage.activeConfig.apiKey;
      result.apiKey.source = 'multi';
      console.log('✅ 从多API配置中找到密钥');
    }
    // 然后检查基础配置
    else if (result.localStorage.basicConfigContent && result.localStorage.basicConfigContent.apiKey) {
      apiKey = result.localStorage.basicConfigContent.apiKey;
      result.apiKey.source = 'basic';
      console.log('✅ 从基础配置中找到密钥');
    }

    if (apiKey) {
      result.apiKey.found = true;
      result.apiKey.length = apiKey.length;
      result.apiKey.prefix = apiKey.substring(0, 10);
      result.apiKey.suffix = apiKey.substring(apiKey.length - 4);
      
      // 检查格式
      result.apiKey.formatValid = apiKey.startsWith('sk-') && 
                                 apiKey.length >= 20 && 
                                 apiKey.length <= 100 &&
                                 /^[a-zA-Z0-9_-]+$/.test(apiKey);
      
      console.log(`🔑 API密钥信息:`, {
        length: result.apiKey.length,
        prefix: result.apiKey.prefix,
        suffix: result.apiKey.suffix,
        formatValid: result.apiKey.formatValid,
        source: result.apiKey.source
      });
    } else {
      console.log('❌ 未找到 API 密钥');
    }
  }

  private static async testNetworkConnection(result: DetailedDiagnosticResult): Promise<void> {
    console.log('🌐 测试网络连接...');

    if (!result.apiKey.found) {
      result.network.errorMessage = '无API密钥，无法测试';
      result.recommendations.push('请先配置API密钥');
      return;
    }

    if (!result.apiKey.formatValid) {
      result.network.errorMessage = 'API密钥格式无效';
      result.recommendations.push('请检查API密钥格式，应该以"sk-"开头，长度20-100字符');
      return;
    }

    try {
      const startTime = Date.now();
      
      // 获取API密钥
      let apiKey = '';
      if (result.apiKey.source === 'multi' && result.localStorage.activeConfig) {
        apiKey = result.localStorage.activeConfig.apiKey;
      } else if (result.apiKey.source === 'basic' && result.localStorage.basicConfigContent) {
        apiKey = result.localStorage.basicConfigContent.apiKey;
      }

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'HuiTu-Diagnostic/1.0'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'test' }],
          max_tokens: 10
        })
      });

      result.network.responseTime = Date.now() - startTime;
      result.network.responseStatus = response.status;

      console.log(`📊 网络测试结果:`, {
        status: response.status,
        responseTime: result.network.responseTime
      });

      if (response.ok) {
        result.network.canReachAPI = true;
        console.log('✅ API连接正常');
      } else {
        result.network.canReachAPI = false;
        
        // 尝试读取错误详情
        try {
          const errorData = await response.text();
          result.network.detailedError = errorData;
          console.log('❌ API错误详情:', errorData);
        } catch (e) {
          console.log('❌ 无法读取错误详情');
        }

        // 根据状态码提供具体错误信息
        switch (response.status) {
          case 401:
            result.network.errorMessage = 'API密钥无效或已过期 (401)';
            result.recommendations.push('检查API密钥是否正确');
            result.recommendations.push('确认API密钥未过期');
            result.recommendations.push('尝试重新生成API密钥');
            break;
          case 403:
            result.network.errorMessage = 'API权限不足 (403)';
            result.recommendations.push('检查账户状态');
            result.recommendations.push('确认API使用权限');
            result.recommendations.push('检查账户余额');
            break;
          case 429:
            result.network.errorMessage = '请求频率过高 (429)';
            result.recommendations.push('稍后重试');
            result.recommendations.push('检查API使用限制');
            break;
          default:
            result.network.errorMessage = `API调用失败 (${response.status})`;
            result.recommendations.push('检查网络连接');
            result.recommendations.push('确认API服务状态');
        }
      }

    } catch (error) {
      result.network.canReachAPI = false;
      result.network.errorMessage = `网络错误: ${(error as Error).message}`;
      console.error('❌ 网络测试失败:', error);
      
      if ((error as Error).message.includes('fetch')) {
        result.recommendations.push('检查网络连接');
        result.recommendations.push('检查防火墙设置');
        result.recommendations.push('确认可以访问api.deepseek.com');
      }
    }
  }

  private static generateRecommendations(result: DetailedDiagnosticResult): void {
    console.log('💡 生成修复建议...');

    // 基于诊断结果生成建议
    if (!result.localStorage.hasBasicConfig && !result.localStorage.hasMultiConfig) {
      result.recommendations.unshift('访问AI配置页面设置API密钥');
    }

    if (result.apiKey.found && !result.apiKey.formatValid) {
      result.recommendations.unshift('API密钥格式不正确，请重新输入');
    }

    if (result.network.responseStatus === 401) {
      result.recommendations.unshift('这是401错误的根本原因：API密钥无效');
    }

    // 添加通用建议
    if (result.recommendations.length === 0) {
      result.recommendations.push('清除浏览器缓存后重新配置');
      result.recommendations.push('检查DeepSeek账户状态');
    }
  }

  // 生成诊断报告
  static generateReport(result: DetailedDiagnosticResult): string {
    let report = `# HuiTu AI 服务诊断报告\n\n`;
    report += `**诊断时间:** ${new Date(result.timestamp).toLocaleString()}\n\n`;

    report += `## 📋 配置状态\n`;
    report += `- 基础配置: ${result.localStorage.hasBasicConfig ? '✅ 存在' : '❌ 不存在'}\n`;
    report += `- 多API配置: ${result.localStorage.hasMultiConfig ? '✅ 存在' : '❌ 不存在'}\n`;
    if (result.localStorage.activeConfig) {
      report += `- 活跃配置: ✅ ${result.localStorage.activeConfig.name}\n`;
    }

    report += `\n## 🔑 API密钥状态\n`;
    report += `- 密钥存在: ${result.apiKey.found ? '✅ 是' : '❌ 否'}\n`;
    if (result.apiKey.found) {
      report += `- 密钥长度: ${result.apiKey.length} 字符\n`;
      report += `- 密钥前缀: ${result.apiKey.prefix}...\n`;
      report += `- 密钥后缀: ...${result.apiKey.suffix}\n`;
      report += `- 格式有效: ${result.apiKey.formatValid ? '✅ 是' : '❌ 否'}\n`;
      report += `- 配置来源: ${result.apiKey.source}\n`;
    }

    report += `\n## 🌐 网络连接状态\n`;
    report += `- API可达: ${result.network.canReachAPI ? '✅ 是' : '❌ 否'}\n`;
    if (result.network.responseStatus) {
      report += `- 响应状态: ${result.network.responseStatus}\n`;
    }
    if (result.network.responseTime) {
      report += `- 响应时间: ${result.network.responseTime}ms\n`;
    }
    if (result.network.errorMessage) {
      report += `- 错误信息: ${result.network.errorMessage}\n`;
    }

    report += `\n## 💡 修复建议\n`;
    result.recommendations.forEach((rec, index) => {
      report += `${index + 1}. ${rec}\n`;
    });

    return report;
  }
}
