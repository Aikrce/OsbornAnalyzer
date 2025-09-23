import type { AnalysisResult, AnalysisOptions } from '../types';
import { QuestionCategory } from '../types';
import { generateId } from '../utils/date';
import osbornQuestions from '../data/questions';
import categories from '../data/categories';

// 奥斯本检核表分析器
export default class OsbornAnalyzer {
  private static instance: OsbornAnalyzer;
  
  private constructor() {}
  
  public static getInstance(): OsbornAnalyzer {
    if (!OsbornAnalyzer.instance) {
      OsbornAnalyzer.instance = new OsbornAnalyzer();
    }
    return OsbornAnalyzer.instance;
  }

  public async analyze(topic: string, options?: AnalysisOptions): Promise<AnalysisResult> {
    const questions = this.generateQuestions(topic, options);
    
    // 生成基础分析结果
    const result: AnalysisResult = {
      id: generateId(),
      title: topic,
      description: `奥斯本检核表分析：${topic}`,
      questions: questions,
      summary: "奥斯本检核表分析结果",
      totalScore: this.calculateScore(questions),
      quality: "high",
      createdAt: new Date(),
      updatedAt: new Date(),
      timestamp: new Date(),
      question: topic,
      analysis: "奥斯本检核表分析结果",
      suggestions: this.generateSuggestions(topic, questions)
    };

    // 如果启用AI增强，使用AI进行深度分析
    if (options?.useAI) {
      try {
        // AI增强功能将在后续版本中实现
        // const enhancedResult = await aiAnalyzer.enhanceAnalysis(result);
        // return enhancedResult;
        return result;
      } catch (error) {
        // 返回基础结果
        return result;
      }
    }

    return result;
  }

  private generateQuestions(topic: string, _options?: AnalysisOptions): Record<QuestionCategory, string[]> {
    const questions: Record<QuestionCategory, string[]> = {
      [QuestionCategory.ALTERNATIVE]: [],
      [QuestionCategory.ADAPTATION]: [],
      [QuestionCategory.MODIFICATION]: [],
      [QuestionCategory.MAGNIFICATION]: [],
      [QuestionCategory.MINIFICATION]: [],
      [QuestionCategory.SUBSTITUTION]: [],
      [QuestionCategory.REARRANGEMENT]: [],
      [QuestionCategory.REVERSAL]: [],
      [QuestionCategory.COMBINATION]: []
    };

    // 使用实际的问题数据
    osbornQuestions.forEach(question => {
      const categoryQuestions = questions[question.category];
      if (categoryQuestions) {
        categoryQuestions.push(question.text);
      }
    });

    return questions;
  }

  /**
   * 计算分析结果评分
   */
  private calculateScore(questions: Record<QuestionCategory, string[]>): number {
    const totalQuestions = Object.values(questions).reduce((sum, categoryQuestions) => sum + categoryQuestions.length, 0);
    const answeredQuestions = totalQuestions; // 假设所有问题都已回答
    
    if (totalQuestions === 0) return 0;
    
    // 基础评分算法：根据问题数量和回答质量计算
    const baseScore = Math.min(100, (answeredQuestions / totalQuestions) * 100);
    
    // 根据问题多样性调整评分
    const categoryCount = Object.values(questions).filter(categoryQuestions => categoryQuestions.length > 0).length;
    const diversityBonus = (categoryCount / 9) * 10; // 最多10分奖励
    
    return Math.round(Math.min(100, baseScore + diversityBonus));
  }

  /**
   * 生成建议
   */
  private generateSuggestions(topic: string, questions: Record<QuestionCategory, string[]>): string[] {
    const suggestions: string[] = [];
    
    // 基于问题类别生成建议
    Object.entries(questions).forEach(([category, categoryQuestions]) => {
      if (categoryQuestions.length > 0) {
        const categoryInfo = categories.find(cat => cat.id === category);
        if (categoryInfo) {
          suggestions.push(`考虑${categoryInfo.title}：${categoryInfo.description}`);
        }
      }
    });

    // 添加通用建议
    suggestions.push(`深入分析"${topic}"的创新可能性`);
    suggestions.push('结合多个维度进行综合思考');
    suggestions.push('记录和分析每个维度的想法');

    return suggestions;
  }
}

// 导出单例实例
export const osbornAnalyzer = OsbornAnalyzer.getInstance();

// 导出便捷函数
export function performOsbornAnalysis(topic: string, options?: AnalysisOptions): Promise<AnalysisResult> {
  return osbornAnalyzer.analyze(topic, options || {});
}