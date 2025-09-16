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

  public analyze(topic: string, options?: AnalysisOptions): AnalysisResult {
    const questions = this.generateQuestions(topic, options);
    
    const result: AnalysisResult = {
      id: generateId(),
      title: topic,
      description: `奥斯本检核表分析：${topic}`,
      questions: questions,
      summary: "奥斯本检核表分析结果",
      totalScore: 85,
      quality: "high",
      createdAt: new Date(),
      updatedAt: new Date(),
      timestamp: new Date(),
      question: topic,
      analysis: "奥斯本检核表分析结果",
      suggestions: []
    };

    return result;
  }

  private generateQuestions(topic: string, options?: AnalysisOptions): Record<QuestionCategory, string[]> {
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

    // 生成问题
    Object.keys(questions).forEach(category => {
      questions[category as QuestionCategory] = [
        `关于"${topic}"的${category}问题1`,
        `关于"${topic}"的${category}问题2`,
        `关于"${topic}"的${category}问题3`
      ];
    });

    return questions;
  }
}

// 导出单例实例
export const osbornAnalyzer = OsbornAnalyzer.getInstance();

// 导出便捷函数
export function performOsbornAnalysis(topic: string, options?: AnalysisOptions): AnalysisResult {
  return osbornAnalyzer.analyze(topic, options || {});
}