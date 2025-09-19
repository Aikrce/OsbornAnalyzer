// AI服务诊断工具

import { getApiKeyString, getUserApiKey } from './apiKeyManager';
export interface DiagnosticResult {
  category: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
  suggestions?: string[];
}

export class AIDiagnosticTool {
  private results: DiagnosticResult[] = [];

  // 运行完整诊断
  async runFullDiagnostic(): Promise<DiagnosticResult[]> {
    this.results = [];
    
    console.log('🔍 开始AI服务完整诊断...');
    
    // 1. 检查AI配置
    await this.checkAIConfiguration();
    
    // 2. 检查网络连接
    await this.checkNetworkConnectivity();
    
    // 3. 检查API端点
    await this.checkAPIEndpoint();
    
    // 4. 测试实际API调用
    await this.testAPICall();
    
    // 5. 检查错误处理
    await this.checkErrorHandling();
    
    console.log('✅ 诊断完成，共检查', this.results.length, '项');
    return this.results;
  }

  // 检查AI配置
  private async checkAIConfiguration(): Promise<void> {
    console.log('📋 检查AI配置...');
    
    try {
      // 检查localStorage中的配置
      const configs = [
        'huitu-ai-config',
        'huitu-multi-api-configs'
      ];
      
      let hasConfig = false;
      let hasValidKey = false;
      let foundApiKey = '';
      
      for (const key of configs) {
        const stored = localStorage.getItem(key);
        console.log(`🔍 检查配置键: ${key}`, stored ? '有数据' : '无数据');
        
        if (stored) {
          hasConfig = true;
          try {
            const config = JSON.parse(stored);
            console.log(`📋 解析配置:`, config);
            
            if (Array.isArray(config)) {
              // 多API配置
              const activeConfig = config.find((c: any) => c.isActive);
              console.log(`🔍 活跃配置:`, activeConfig);
              
              if (activeConfig && activeConfig.apiKey && activeConfig.apiKey.trim().length > 0) {
                hasValidKey = true;
                foundApiKey = activeConfig.apiKey;
                this.addResult('success', 'AI配置', `找到活跃的API配置: ${activeConfig.name}`, `提供商: ${activeConfig.provider}, 模型: ${activeConfig.model}, 密钥长度: ${activeConfig.apiKey.length}`);
                break;
              }
            } else if (config.apiKey && config.apiKey.trim().length > 0) {
              // 单API配置
              hasValidKey = true;
              foundApiKey = config.apiKey;
              this.addResult('success', 'AI配置', '找到有效的API密钥配置', `模型: ${config.model || 'deepseek-chat'}, 密钥长度: ${config.apiKey.length}`);
              break;
            } else {
              console.log(`⚠️ 配置存在但API密钥为空:`, config);
            }
          } catch (e) {
            console.error(`❌ 配置解析失败: ${key}`, e);
            this.addResult('error', 'AI配置', `配置解析失败: ${key}`, (e as Error).message);
          }
        }
      }
      
      console.log(`📊 配置检查结果:`, { hasConfig, hasValidKey, foundApiKeyLength: foundApiKey.length });
      
      if (!hasConfig) {
        this.addResult('warning', 'AI配置', '未找到AI配置', '请在AI配置页面设置API密钥', [
          '访问AI配置页面',
          '添加DeepSeek API密钥',
          '保存配置'
        ]);
      } else if (!hasValidKey) {
        this.addResult('error', 'AI配置', `API密钥无效或为空 (找到长度: ${foundApiKey.length})`, '请检查API密钥是否正确设置', [
          '检查API密钥是否完整',
          '确认密钥格式正确',
          '重新保存配置',
          '检查localStorage中的配置数据'
        ]);
      }
      
    } catch (error) {
      this.addResult('error', 'AI配置', '配置检查失败', (error as Error).message);
    }
  }

  // 检查网络连接
  private async checkNetworkConnectivity(): Promise<void> {
    console.log('🌐 检查网络连接...');
    
    try {
      // 测试基本网络连接（避免CORS问题）
      const testUrls = [
        { url: 'https://api.deepseek.com', name: 'DeepSeek API' }
      ];
      
      for (const test of testUrls) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          const response = await fetch(test.url, {
            method: 'HEAD',
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          this.addResult('success', '网络连接', `${test.name}连接正常`, `状态码: ${response.status}`);
          
        } catch (error) {
          if ((error as any).name === 'AbortError') {
            this.addResult('warning', '网络连接', `${test.name}连接超时`, '可能是网络较慢或防火墙阻止');
          } else {
            this.addResult('error', '网络连接', `${test.name}连接失败`, (error as Error).message, [
              '检查网络连接',
              '尝试使用VPN',
              '检查防火墙设置'
            ]);
          }
        }
      }
      
    } catch (error) {
      this.addResult('error', '网络连接', '网络连接检查失败', (error as Error).message);
    }
  }

  // 检查API端点
  private async checkAPIEndpoint(): Promise<void> {
    console.log('🔗 检查API端点...');
    
    try {
      // 获取用户实际配置的API密钥
      const userApiKey = getApiKeyString();
      
      if (!userApiKey) {
        this.addResult('warning', 'API端点', '跳过API端点测试', '未找到用户配置的API密钥');
        return;
      }
      
      console.log('🔑 使用用户配置的API密钥进行测试');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userApiKey}`,
          'User-Agent': 'HuiTu-Diagnostic/1.0'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'test' }],
          max_tokens: 10
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.status === 200) {
        this.addResult('success', 'API端点', 'DeepSeek API端点正常', '使用用户API密钥测试成功');
      } else if (response.status === 401) {
        this.addResult('error', 'API端点', 'API密钥无效', '用户配置的API密钥认证失败', [
          '检查API密钥是否正确',
          '确认密钥未过期',
          '重新获取API密钥'
        ]);
      } else if (response.status === 403) {
        this.addResult('error', 'API端点', 'API密钥权限不足', '用户配置的API密钥权限不足', [
          '检查API密钥权限',
          '确认账户状态正常',
          '联系API提供商'
        ]);
      } else if (response.status === 429) {
        this.addResult('warning', 'API端点', 'API调用频率过高', '用户API密钥有效但请求频率过高', [
          '稍后重试',
          '检查API使用限制'
        ]);
      } else {
        this.addResult('warning', 'API端点', `API端点返回异常状态码: ${response.status}`, '请检查API服务状态');
      }
      
    } catch (error) {
      if ((error as any).name === 'AbortError') {
        this.addResult('error', 'API端点', 'API端点连接超时', '请求在10秒内未完成', [
          '检查网络连接',
          '尝试稍后重试',
          '检查API服务状态'
        ]);
      } else if ((error as Error).message.includes('Load failed')) {
        this.addResult('error', 'API端点', 'API端点连接失败', '网络请求失败', [
          '检查网络连接',
          '检查防火墙设置',
          '尝试使用VPN'
        ]);
      } else {
        this.addResult('error', 'API端点', 'API端点检查失败', (error as Error).message);
      }
    }
  }


  // 测试实际API调用
  private async testAPICall(): Promise<void> {
    console.log('🧪 测试实际API调用...');
    
    try {
      // 使用与AIDiagnosticsPage相同的逻辑获取有效配置
      const apiKey = getApiKeyString();
      
      if (!apiKey) {
        this.addResult('warning', 'API调用测试', '跳过API调用测试', '未找到有效的API密钥');
        return;
      }
      
      console.log('🔑 使用API密钥进行测试:', apiKey ? `***${apiKey.slice(-4)}` : 'null');
      console.log('🔑 API密钥长度:', apiKey.length);
      console.log('🔑 API密钥前缀:', apiKey.substring(0, 10));
      
      // 测试API调用
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      console.log('📡 发送API请求到DeepSeek...');
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'HuiTu-Web/1.0'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'Hello, this is a test message.' }],
          max_tokens: 50
        }),
        signal: controller.signal
      });
      
      console.log('📡 API响应状态:', response.status, response.statusText);
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        this.addResult('success', 'API调用测试', 'API调用成功', `收到响应，token数量: ${data.usage?.total_tokens || '未知'}`);
      } else {
        const errorData = await response.text();
        console.log('❌ API调用失败:', response.status, response.statusText);
        console.log('❌ 错误详情:', errorData);
        
        if (response.status === 401) {
          this.addResult('error', 'API调用测试', 'API密钥无效 (401)', 'API密钥可能已过期或无效', [
            '检查API密钥是否正确',
            '确认API密钥未过期',
            '检查API密钥权限',
            '尝试重新生成API密钥'
          ]);
        } else if (response.status === 403) {
          this.addResult('error', 'API调用测试', 'API权限不足 (403)', 'API密钥权限不足或账户状态异常', [
            '检查账户状态',
            '确认API使用权限',
            '检查账户余额'
          ]);
        } else {
          this.addResult('error', 'API调用测试', `API调用失败 (${response.status})`, errorData, [
            '检查API密钥是否正确',
            '确认账户余额充足',
            '检查API使用限制'
          ]);
        }
      }
      
    } catch (error) {
      if ((error as any).name === 'AbortError') {
        this.addResult('error', 'API调用测试', 'API调用超时', '请求在30秒内未完成', [
          '检查网络连接',
          '尝试稍后重试',
          '检查API服务状态'
        ]);
      } else if ((error as Error).message.includes('Load failed')) {
        this.addResult('error', 'API调用测试', 'API调用网络失败', '网络请求失败', [
          '检查网络连接',
          '检查防火墙设置',
          '尝试使用VPN'
        ]);
      } else {
        this.addResult('error', 'API调用测试', 'API调用异常', (error as Error).message);
      }
    }
  }

  // 检查错误处理
  private async checkErrorHandling(): Promise<void> {
    console.log('🛠️ 检查错误处理...');
    
    try {
      // 检查AI服务是否正确导入
      const aiServiceModule = await import('../services/ai/aiService');
      if (aiServiceModule.default) {
        this.addResult('success', '错误处理', 'AI服务模块加载正常', 'aiService已正确导入');
      } else {
        this.addResult('error', '错误处理', 'AI服务模块加载失败', '无法导入aiService');
      }
      
      // 检查错误处理函数是否存在
      const aiService = aiServiceModule.default;
      if (typeof aiService.configure === 'function') {
        this.addResult('success', '错误处理', 'AI服务配置函数正常', 'configure方法可用');
      } else {
        this.addResult('error', '错误处理', 'AI服务配置函数缺失', 'configure方法不可用');
      }
      
      // 检查AI服务的实际配置状态
      if (typeof aiService.isConfigured === 'function') {
        const isConfigured = aiService.isConfigured();
        if (isConfigured) {
          this.addResult('success', 'AI服务配置', 'AI服务已正确配置', 'isConfigured返回true');
        } else {
          this.addResult('error', 'AI服务配置', 'AI服务未配置', 'isConfigured返回false，这可能是401错误的根本原因');
        }
      } else {
        this.addResult('error', 'AI服务配置', '无法检查AI服务配置状态', 'isConfigured方法不可用');
      }
      
    } catch (error) {
      this.addResult('error', '错误处理', '错误处理检查失败', (error as Error).message);
    }
  }

  // 添加诊断结果
  private addResult(
    status: 'success' | 'warning' | 'error',
    category: string,
    message: string,
    details?: string,
    suggestions?: string[]
  ): void {
    const result: DiagnosticResult = {
      category,
      status,
      message
    };
    
    if (details !== undefined) {
      result.details = details;
    }
    
    if (suggestions !== undefined) {
      result.suggestions = suggestions;
    }
    
    this.results.push(result);
  }

  // 生成诊断报告
  generateReport(): string {
    const successCount = this.results.filter(r => r.status === 'success').length;
    const warningCount = this.results.filter(r => r.status === 'warning').length;
    const errorCount = this.results.filter(r => r.status === 'error').length;
    
    let report = `# AI服务诊断报告\n\n`;
    report += `## 总体状态\n`;
    report += `- ✅ 成功: ${successCount}项\n`;
    report += `- ⚠️ 警告: ${warningCount}项\n`;
    report += `- ❌ 错误: ${errorCount}项\n\n`;
    
    // 按类别分组
    const categories = [...new Set(this.results.map(r => r.category))];
    
    categories.forEach(category => {
      const categoryResults = this.results.filter(r => r.category === category);
      report += `## ${category}\n\n`;
      
      categoryResults.forEach(result => {
        const icon = result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
        report += `### ${icon} ${result.message}\n`;
        
        if (result.details) {
          report += `**详情:** ${result.details}\n\n`;
        }
        
        if (result.suggestions && result.suggestions.length > 0) {
          report += `**建议:**\n`;
          result.suggestions.forEach((suggestion, index) => {
            report += `${index + 1}. ${suggestion}\n`;
          });
          report += `\n`;
        }
      });
    });
    
    return report;
  }
}

// 导出诊断工具实例
export const aiDiagnosticTool = new AIDiagnosticTool();
