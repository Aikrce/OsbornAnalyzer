import { useState, useEffect, useCallback } from 'react';

// AI配置接口
export interface AIConfig {
  apiKey: string;
  model: 'deepseek-coder' | 'deepseek-chat';
  temperature: number;
  maxTokens: number;
}

const STORAGE_KEY = 'huitu-ai-config';

const defaultConfig: AIConfig = {
  apiKey: '',
  model: 'deepseek-chat',
  temperature: 0.7,
  maxTokens: 2000,
};

export const useAIConfig = () => {
  const [config, setConfig] = useState<AIConfig>(defaultConfig);

  // 从本地存储加载配置
  const loadConfig = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedConfig = JSON.parse(stored);
        setConfig({ ...defaultConfig, ...parsedConfig });
      }
    } catch (error) {
      console.error('Failed to load AI config:', error);
    }
  }, []);

  // 保存配置到本地存储
  const saveConfig = useCallback((newConfig: Partial<AIConfig>) => {
    try {
      const updatedConfig = { ...config, ...newConfig };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfig));
      setConfig(updatedConfig);
    } catch (error) {
      console.error('Failed to save AI config:', error);
    }
  }, [config]);

  // 更新配置
  const updateConfig = useCallback((newConfig: Partial<AIConfig>) => {
    saveConfig(newConfig);
  }, [saveConfig]);

  // 重置配置
  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 检查是否已配置API密钥
  const isConfigured = useCallback(() => {
    return config.apiKey.trim().length > 0;
  }, [config.apiKey]);

  // 初始化加载
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return {
    config,
    updateConfig,
    resetConfig,
    isConfigured: isConfigured(),
  };
};
