import { describe, it, expect, vi } from 'vitest';
import aiService from '../services/ai/aiService';

describe('AI Service', () => {
  it('should configure AI service', () => {
    const config = {
      apiKey: 'test-key',
      model: 'deepseek-chat',
      temperature: 0.7,
      maxTokens: 2000,
    };
    
    aiService.configure(config);
    expect(aiService.isConfigured()).toBe(true);
  });
});
