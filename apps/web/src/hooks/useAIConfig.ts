import { useState, useEffect, useCallback } from 'react';

// AI配置接口
export interface AIConfig {
  apiKey: string;
  model: 'deepseek-coder' | 'deepseek-chat';
  temperature: number;
  maxTokens: number;
}

// 多API配置接口
export interface APIConfig {
  id: string;
  name: string;
  provider: 'deepseek' | 'openai' | 'claude' | 'custom';
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = 'huitu-ai-config';
const MULTI_API_STORAGE_KEY = 'huitu-multi-api-configs';

const defaultConfig: AIConfig = {
  apiKey: '',
  model: 'deepseek-chat',
  temperature: 0.7,
  maxTokens: 2000,
};

export const useAIConfig = () => {
  const [config, setConfig] = useState<AIConfig>(defaultConfig);
  const [apiConfigs, setApiConfigs] = useState<APIConfig[]>([]);

  // 从本地存储加载配置
  const loadConfig = useCallback(() => {
    try {
      console.log('🔍 正在加载AI配置...');
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log('📦 从localStorage读取:', STORAGE_KEY, '=', stored ? '有数据' : '无数据');
      
      if (stored) {
        const parsedConfig = JSON.parse(stored);
        console.log('📋 解析的配置:', parsedConfig);
        const mergedConfig = { ...defaultConfig, ...parsedConfig };
        console.log('🔄 合并后的配置:', mergedConfig);
        setConfig(mergedConfig);
        console.log('✅ AI配置加载完成');
      } else {
        console.log('⚠️ 未找到保存的AI配置，使用默认配置');
      }
    } catch (error) {
      console.error('❌ Failed to load AI config:', error);
    }
  }, []);

  // 从本地存储加载多API配置
  const loadApiConfigs = useCallback(() => {
    try {
      const stored = localStorage.getItem(MULTI_API_STORAGE_KEY);
      if (stored) {
        const parsedConfigs = JSON.parse(stored);
        setApiConfigs(parsedConfigs.map((config: any) => ({
          ...config,
          createdAt: new Date(config.createdAt),
          updatedAt: new Date(config.updatedAt)
        })));
      }
    } catch (error) {
      console.error('Failed to load API configs:', error);
    }
  }, []);

  // 保存配置到本地存储
  const saveConfig = useCallback((newConfig: Partial<AIConfig>) => {
    try {
      console.log('💾 正在保存AI配置...');
      console.log('📝 当前配置:', config);
      console.log('🔄 新配置:', newConfig);
      
      const updatedConfig = { ...config, ...newConfig };
      console.log('🔄 合并后的配置:', updatedConfig);
      
      const configString = JSON.stringify(updatedConfig);
      console.log('📦 保存到localStorage:', STORAGE_KEY, '=', configString);
      
      localStorage.setItem(STORAGE_KEY, configString);
      setConfig(updatedConfig);
      
      console.log('✅ AI配置保存完成');
    } catch (error) {
      console.error('❌ Failed to save AI config:', error);
    }
  }, [config]);

  // 保存多API配置到本地存储
  const saveApiConfigs = useCallback((newConfigs: APIConfig[]) => {
    try {
      localStorage.setItem(MULTI_API_STORAGE_KEY, JSON.stringify(newConfigs));
      setApiConfigs(newConfigs);
    } catch (error) {
      console.error('Failed to save API configs:', error);
    }
  }, []);

  // 更新配置
  const updateConfig = useCallback((newConfig: Partial<AIConfig>) => {
    saveConfig(newConfig);
    
    // 同时更新AI服务配置
    if (newConfig.apiKey) {
      const updatedConfig = { ...config, ...newConfig };
      import('../services/ai/aiService').then(({ default: aiService }) => {
        aiService.configure(updatedConfig);
        console.log('AI服务配置已更新');
      });
    }
  }, [saveConfig, config]);

  // 重置配置
  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 检查是否已配置API密钥 - 同时检查基础配置和多API配置
  const isConfigured = useCallback(() => {
    // 检查基础配置
    if (config.apiKey.trim().length > 0) {
      return true;
    }
    
    // 检查多API配置中的活跃配置
    const activeApiConfig = apiConfigs.find(c => c.isActive);
    if (activeApiConfig && activeApiConfig.apiKey.trim().length > 0) {
      return true;
    }
    
    return false;
  }, [config.apiKey, apiConfigs]);

  // 添加新的API配置
  const addApiConfig = useCallback((newConfig: Omit<APIConfig, 'id' | 'createdAt' | 'updatedAt'>) => {
    const configWithId: APIConfig = {
      ...newConfig,
      id: `api-config-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedConfigs = [...apiConfigs, configWithId];
    saveApiConfigs(updatedConfigs);
    return configWithId;
  }, [apiConfigs, saveApiConfigs]);

  // 更新API配置
  const updateApiConfig = useCallback((id: string, updates: Partial<APIConfig>) => {
    const updatedConfigs = apiConfigs.map(config => 
      config.id === id 
        ? { ...config, ...updates, updatedAt: new Date() }
        : config
    );
    saveApiConfigs(updatedConfigs);
  }, [apiConfigs, saveApiConfigs]);

  // 删除API配置
  const deleteApiConfig = useCallback((id: string) => {
    const updatedConfigs = apiConfigs.filter(config => config.id !== id);
    saveApiConfigs(updatedConfigs);
  }, [apiConfigs, saveApiConfigs]);

  // 设置活跃的API配置
  const setActiveApiConfig = useCallback((id: string) => {
    const updatedConfigs = apiConfigs.map(config => ({
      ...config,
      isActive: config.id === id
    }));
    saveApiConfigs(updatedConfigs);
    
    // 同时更新AI服务配置
    const activeConfig = updatedConfigs.find(config => config.isActive);
    if (activeConfig && activeConfig.apiKey) {
      import('../services/ai/aiService').then(({ default: aiService }) => {
        aiService.configure({
          apiKey: activeConfig.apiKey,
          model: activeConfig.model as 'deepseek-chat' | 'deepseek-coder',
          temperature: activeConfig.temperature,
          maxTokens: activeConfig.maxTokens
        });
        console.log('AI服务已切换到活跃配置:', activeConfig.name);
      });
    }
  }, [apiConfigs, saveApiConfigs]);

  // 获取当前活跃的API配置
  const getActiveApiConfig = useCallback(() => {
    return apiConfigs.find(config => config.isActive) || apiConfigs[0];
  }, [apiConfigs]);

  // 获取当前有效的配置（基础配置或多API配置）
  const getEffectiveConfig = useCallback(() => {
    const activeApiConfig = apiConfigs.find(c => c.isActive);
    if (activeApiConfig && activeApiConfig.apiKey.trim().length > 0) {
      return {
        apiKey: activeApiConfig.apiKey,
        model: activeApiConfig.model as 'deepseek-chat' | 'deepseek-coder',
        temperature: activeApiConfig.temperature,
        maxTokens: activeApiConfig.maxTokens,
        source: 'multi-api' as const
      };
    }
    
    if (config.apiKey.trim().length > 0) {
      return {
        ...config,
        source: 'basic' as const
      };
    }
    
    return null;
  }, [config, apiConfigs]);

  // 初始化加载
  useEffect(() => {
    loadConfig();
    loadApiConfigs();
  }, [loadConfig, loadApiConfigs]);

  return {
    config,
    updateConfig,
    resetConfig,
    isConfigured: isConfigured(),
    getEffectiveConfig,
    // 多API配置相关
    apiConfigs,
    addApiConfig,
    updateApiConfig,
    deleteApiConfig,
    setActiveApiConfig,
    getActiveApiConfig,
  };
};
