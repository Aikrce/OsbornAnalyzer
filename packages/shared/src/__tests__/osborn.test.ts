import { describe, it, expect } from 'vitest';
import { osbornAnalyzer } from '../algorithms/osborn';
import { QuestionCategory } from '../types';

describe('OsbornAnalyzer', () => {
  it('should analyze a topic successfully', async () => {
    const result = await osbornAnalyzer.analyze(
      '智能手机应用',
      '开发一款新的智能手机应用'
    );

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.title).toBe('智能手机应用');
    expect(result.description).toBe('开发一款新的智能手机应用');
    expect(result.questions).toBeDefined();
    
    // 检查是否包含所有9个类别
    const categories = Object.keys(result.questions);
    expect(categories).toHaveLength(9);
    expect(categories).toContain(QuestionCategory.ALTERNATIVE);
    expect(categories).toContain(QuestionCategory.ADAPTATION);
    expect(categories).toContain(QuestionCategory.MODIFICATION);
    expect(categories).toContain(QuestionCategory.MAGNIFICATION);
    expect(categories).toContain(QuestionCategory.MINIFICATION);
    expect(categories).toContain(QuestionCategory.SUBSTITUTION);
    expect(categories).toContain(QuestionCategory.REARRANGEMENT);
    expect(categories).toContain(QuestionCategory.REVERSAL);
    expect(categories).toContain(QuestionCategory.COMBINATION);
    
    // 检查每个类别至少有3个问题
    Object.values(result.questions).forEach(questions => {
      expect(questions.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should generate questions based on creativity level', async () => {
    const conservative = await osbornAnalyzer.analyze(
      '测试主题',
      '测试描述',
      { creativityLevel: 'conservative' }
    );
    
    const innovative = await osbornAnalyzer.analyze(
      '测试主题',
      '测试描述',
      { creativityLevel: 'innovative' }
    );
    
    // 创新级别应该生成更多问题
    const conservativeTotal = Object.values(conservative.questions)
      .reduce((sum, questions) => sum + questions.length, 0);
    const innovativeTotal = Object.values(innovative.questions)
      .reduce((sum, questions) => sum + questions.length, 0);
    
    expect(innovativeTotal).toBeGreaterThanOrEqual(conservativeTotal);
  });

  it('should validate analysis results', async () => {
    const result = await osbornAnalyzer.analyze('有效主题', '有效描述');
    const isValid = osbornAnalyzer.validateResult(result);
    expect(isValid).toBe(true);
  });

  it('should enhance analysis results', async () => {
    const result = await osbornAnalyzer.analyze('测试主题', '测试描述');
    const enhanced = osbornAnalyzer.enhanceResult(result);
    
    // 检查增强后的问题是否包含引导性内容
    Object.values(enhanced.questions).forEach(questions => {
      questions.forEach(question => {
        if (!question.includes('？')) {
          expect(question).toContain('（请具体说明）');
        }
      });
    });
  });
});