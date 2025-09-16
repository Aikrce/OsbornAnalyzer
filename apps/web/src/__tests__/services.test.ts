import { describe, it, beforeEach, vi, expect } from 'vitest';
import aiService from '../services/ai/aiService';

describe('aiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be configured', () => {
    expect(aiService.isConfigured()).toBe(true);
  });
});