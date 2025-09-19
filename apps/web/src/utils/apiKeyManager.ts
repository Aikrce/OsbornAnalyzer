/**
 * API密钥管理工具
 * 统一管理API密钥的获取和验证逻辑
 */

export interface ApiKeyInfo {
  apiKey: string;
  source: 'basic' | 'multi-api';
  configName?: string;
}

/**
 * 获取用户配置的API密钥
 * @returns API密钥信息，如果没有找到则返回null
 */
export function getUserApiKey(): ApiKeyInfo | null {
  try {
    // 检查单API配置
    const singleConfig = localStorage.getItem('huitu-ai-config');
    if (singleConfig) {
      const config = JSON.parse(singleConfig);
      if (config.apiKey && config.apiKey.trim().length > 0) {
        console.log('🔑 找到单API配置中的密钥');
        return {
          apiKey: config.apiKey,
          source: 'basic'
        };
      }
    }
    
    // 检查多API配置
    const multiConfig = localStorage.getItem('huitu-multi-api-configs');
    if (multiConfig) {
      const configs = JSON.parse(multiConfig);
      const activeConfig = configs.find((c: any) => c.isActive);
      if (activeConfig && activeConfig.apiKey && activeConfig.apiKey.trim().length > 0) {
        console.log('🔑 找到多API配置中的活跃密钥');
        return {
          apiKey: activeConfig.apiKey,
          source: 'multi-api',
          configName: activeConfig.name
        };
      }
    }
    
    console.log('⚠️ 未找到用户配置的API密钥');
    return null;
  } catch (error) {
    console.error('❌ 获取用户API密钥失败:', error);
    return null;
  }
}

/**
 * 获取API密钥字符串（向后兼容）
 * @returns API密钥字符串，如果没有找到则返回null
 */
export function getApiKeyString(): string | null {
  const keyInfo = getUserApiKey();
  return keyInfo?.apiKey || null;
}

/**
 * 验证API密钥格式
 * @param apiKey API密钥
 * @returns 是否有效
 */
export function validateApiKeyFormat(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }
  
  // DeepSeek API密钥通常以sk-开头，长度约35-50字符
  if (apiKey.startsWith('sk-') && apiKey.length >= 30 && apiKey.length <= 60) {
    return true;
  }
  
  // 其他格式的API密钥
  if (apiKey.length >= 20 && apiKey.length <= 100) {
    return true;
  }
  
  return false;
}

/**
 * 获取API密钥的显示信息（用于调试）
 * @param apiKey API密钥
 * @returns 显示信息
 */
export function getApiKeyDisplayInfo(apiKey: string): string {
  if (!apiKey) {
    return 'null';
  }
  
  if (apiKey.length < 10) {
    return `*** (${apiKey.length}字符)`;
  }
  
  return `***${apiKey.slice(-4)} (${apiKey.length}字符)`;
}

/**
 * 检查是否有有效的API密钥配置
 * @returns 是否有有效配置
 */
export function hasValidApiKey(): boolean {
  const keyInfo = getUserApiKey();
  return keyInfo !== null && validateApiKeyFormat(keyInfo.apiKey);
}
