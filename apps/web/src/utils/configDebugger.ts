// 配置调试工具 - 专门用于诊断配置矛盾问题
export interface ConfigDebugInfo {
  timestamp: string;
  basicConfig: {
    exists: boolean;
    content?: any;
    apiKeyLength: number;
    apiKeyPrefix?: string;
  };
  multiConfig: {
    exists: boolean;
    content?: any;
    activeConfig?: any;
    activeApiKeyLength: number;
    activeApiKeyPrefix?: string;
  };
  effectiveConfig: {
    source: 'basic' | 'multi' | 'none';
    apiKeyLength: number;
    apiKeyPrefix?: string;
    model?: string;
  };
  isConfiguredResult: boolean;
  contradictions: string[];
}

export class ConfigDebugger {
  static debugConfig(): ConfigDebugInfo {
    const debugInfo: ConfigDebugInfo = {
      timestamp: new Date().toISOString(),
      basicConfig: { exists: false, apiKeyLength: 0 },
      multiConfig: { exists: false, activeApiKeyLength: 0 },
      effectiveConfig: { source: 'none', apiKeyLength: 0 },
      isConfiguredResult: false,
      contradictions: [],
    };

    console.log('🔍 开始配置调试...');

    // 1. 检查基础配置
    const basicConfigStr = localStorage.getItem('huitu-ai-config');
    if (basicConfigStr) {
      debugInfo.basicConfig.exists = true;
      try {
        const basicConfig = JSON.parse(basicConfigStr);
        debugInfo.basicConfig.content = basicConfig;
        debugInfo.basicConfig.apiKeyLength = basicConfig.apiKey?.length || 0;
        debugInfo.basicConfig.apiKeyPrefix = basicConfig.apiKey?.substring(
          0,
          10
        );
        console.log('✅ 基础配置存在:', {
          apiKeyLength: debugInfo.basicConfig.apiKeyLength,
          prefix: debugInfo.basicConfig.apiKeyPrefix,
        });
      } catch (e) {
        console.error('❌ 基础配置解析失败:', e);
      }
    } else {
      console.log('❌ 基础配置不存在');
    }

    // 2. 检查多API配置
    const multiConfigStr = localStorage.getItem('huitu-multi-api-configs');
    if (multiConfigStr) {
      debugInfo.multiConfig.exists = true;
      try {
        const multiConfigs = JSON.parse(multiConfigStr);
        debugInfo.multiConfig.content = multiConfigs;

        if (Array.isArray(multiConfigs)) {
          const activeConfig = multiConfigs.find((c: any) => c.isActive);
          if (activeConfig) {
            debugInfo.multiConfig.activeConfig = activeConfig;
            debugInfo.multiConfig.activeApiKeyLength =
              activeConfig.apiKey?.length || 0;
            debugInfo.multiConfig.activeApiKeyPrefix =
              activeConfig.apiKey?.substring(0, 10);
            console.log('✅ 活跃配置存在:', {
              name: activeConfig.name,
              apiKeyLength: debugInfo.multiConfig.activeApiKeyLength,
              prefix: debugInfo.multiConfig.activeApiKeyPrefix,
            });
          } else {
            console.log('⚠️ 多API配置存在但无活跃配置');
          }
        }
      } catch (e) {
        console.error('❌ 多API配置解析失败:', e);
      }
    } else {
      console.log('❌ 多API配置不存在');
    }

    // 3. 模拟 getEffectiveConfig 逻辑
    if (
      debugInfo.multiConfig.activeConfig &&
      debugInfo.multiConfig.activeApiKeyLength > 0
    ) {
      debugInfo.effectiveConfig.source = 'multi';
      debugInfo.effectiveConfig.apiKeyLength =
        debugInfo.multiConfig.activeApiKeyLength;
      if (debugInfo.multiConfig.activeApiKeyPrefix) {
        debugInfo.effectiveConfig.apiKeyPrefix =
          debugInfo.multiConfig.activeApiKeyPrefix;
      }
      if (debugInfo.multiConfig.activeConfig.model) {
        debugInfo.effectiveConfig.model =
          debugInfo.multiConfig.activeConfig.model;
      }
      console.log('✅ 有效配置来源: 多API配置');
    } else if (debugInfo.basicConfig.apiKeyLength > 0) {
      debugInfo.effectiveConfig.source = 'basic';
      debugInfo.effectiveConfig.apiKeyLength =
        debugInfo.basicConfig.apiKeyLength;
      if (debugInfo.basicConfig.apiKeyPrefix) {
        debugInfo.effectiveConfig.apiKeyPrefix =
          debugInfo.basicConfig.apiKeyPrefix;
      }
      console.log('✅ 有效配置来源: 基础配置');
    } else {
      debugInfo.effectiveConfig.source = 'none';
      console.log('❌ 无有效配置');
    }

    // 4. 模拟 isConfigured 逻辑
    debugInfo.isConfiguredResult =
      debugInfo.basicConfig.apiKeyLength > 0 ||
      debugInfo.multiConfig.activeApiKeyLength > 0;

    // 5. 检查矛盾
    if (
      debugInfo.basicConfig.apiKeyLength > 0 &&
      debugInfo.effectiveConfig.apiKeyLength === 0
    ) {
      debugInfo.contradictions.push('基础配置有API密钥但有效配置为空');
    }

    if (
      debugInfo.multiConfig.activeApiKeyLength > 0 &&
      debugInfo.effectiveConfig.apiKeyLength === 0
    ) {
      debugInfo.contradictions.push('多API配置有活跃密钥但有效配置为空');
    }

    if (
      debugInfo.isConfiguredResult &&
      debugInfo.effectiveConfig.apiKeyLength === 0
    ) {
      debugInfo.contradictions.push('isConfigured返回true但有效配置为空');
    }

    if (
      debugInfo.effectiveConfig.source === 'multi' &&
      debugInfo.basicConfig.apiKeyLength > 0
    ) {
      debugInfo.contradictions.push('有效配置来自多API但基础配置也有密钥');
    }

    console.log('📊 配置调试结果:', debugInfo);

    if (debugInfo.contradictions.length > 0) {
      console.log('🚨 发现矛盾:', debugInfo.contradictions);
    } else {
      console.log('✅ 配置状态一致');
    }

    return debugInfo;
  }

  // 生成修复建议
  static generateFixSuggestions(debugInfo: ConfigDebugInfo): string[] {
    const suggestions: string[] = [];

    if (debugInfo.contradictions.length > 0) {
      suggestions.push('发现配置矛盾，需要修复配置状态');
    }

    if (debugInfo.effectiveConfig.source === 'none') {
      suggestions.push('无有效配置，请设置API密钥');
    }

    if (debugInfo.multiConfig.exists && !debugInfo.multiConfig.activeConfig) {
      suggestions.push('多API配置存在但无活跃配置，请设置活跃配置');
    }

    if (debugInfo.basicConfig.exists && debugInfo.multiConfig.exists) {
      suggestions.push('同时存在基础配置和多API配置，建议统一使用一种配置方式');
    }

    if (
      debugInfo.effectiveConfig.apiKeyLength > 0 &&
      debugInfo.effectiveConfig.apiKeyLength < 20
    ) {
      suggestions.push('API密钥长度异常，请检查密钥格式');
    }

    return suggestions;
  }

  // 修复配置矛盾
  static fixConfigContradictions(): void {
    console.log('🔧 开始修复配置矛盾...');

    const basicConfigStr = localStorage.getItem('huitu-ai-config');
    const multiConfigStr = localStorage.getItem('huitu-multi-api-configs');

    let hasBasicKey = false;
    let hasActiveMultiKey = false;

    // 检查基础配置
    if (basicConfigStr) {
      try {
        const basicConfig = JSON.parse(basicConfigStr);
        hasBasicKey =
          basicConfig.apiKey && basicConfig.apiKey.trim().length > 0;
      } catch (e) {
        console.error('基础配置解析失败:', e);
      }
    }

    // 检查多API配置
    if (multiConfigStr) {
      try {
        const multiConfigs = JSON.parse(multiConfigStr);
        if (Array.isArray(multiConfigs)) {
          const activeConfig = multiConfigs.find((c: any) => c.isActive);
          hasActiveMultiKey =
            activeConfig &&
            activeConfig.apiKey &&
            activeConfig.apiKey.trim().length > 0;
        }
      } catch (e) {
        console.error('多API配置解析失败:', e);
      }
    }

    // 如果同时有基础配置和多API配置，优先使用多API配置
    if (hasBasicKey && hasActiveMultiKey) {
      console.log('🔧 同时存在基础配置和多API配置，清除基础配置');
      localStorage.removeItem('huitu-ai-config');
    }

    // 如果只有基础配置，转换为多API配置
    if (hasBasicKey && !hasActiveMultiKey) {
      console.log('🔧 只有基础配置，转换为多API配置');
      try {
        const basicConfig = JSON.parse(basicConfigStr!);
        const multiConfig = [
          {
            id: `api-config-${Date.now()}`,
            name: '默认配置',
            provider: 'deepseek',
            model: basicConfig.model || 'deepseek-chat',
            apiKey: basicConfig.apiKey,
            temperature: basicConfig.temperature || 0.7,
            maxTokens: basicConfig.maxTokens || 2000,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        localStorage.setItem(
          'huitu-multi-api-configs',
          JSON.stringify(multiConfig)
        );
        localStorage.removeItem('huitu-ai-config');
        console.log('✅ 配置转换完成');
      } catch (e) {
        console.error('❌ 配置转换失败:', e);
      }
    }

    console.log('✅ 配置矛盾修复完成');
  }
}
