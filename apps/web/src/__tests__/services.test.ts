import { describe, it, beforeEach, vi, expect } from 'vitest';
import aiService from '../services/ai/aiService';

describe('aiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 清除之前的配置
    aiService.clearConfig();
  });

  it('should be configured after setup', () => {
    // 初始状态应该是未配置的
    expect(aiService.isConfigured()).toBe(false);
    
    // 配置AI服务
    aiService.configure({
      apiKey: 'test-api-key',
      model: 'test-model',
      temperature: 0.7,
      maxTokens: 1000
    });
    
    // 配置后应该返回true
    expect(aiService.isConfigured()).toBe(true);
  });

  it('should not be configured without apiKey', () => {
    aiService.configure({
      apiKey: '',
      model: 'test-model',
      temperature: 0.7,
      maxTokens: 1000
    });
    
    expect(aiService.isConfigured()).toBe(false);
  });
});