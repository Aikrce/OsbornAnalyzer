import { AnalysisEngine } from '@huitu/shared';
import type { AnalysisResult } from '@huitu/shared';

class AnalysisService {
  private static instance: AnalysisService;
  
  private constructor() {}
  
  static getInstance(): AnalysisService {
    if (!AnalysisService.instance) {
      AnalysisService.instance = new AnalysisService();
    }
    return AnalysisService.instance;
  }

  /**
   * 执行奥斯本分析
   */
  async analyze(
    topic: string,
    description: string,
    options: { useAI?: boolean } = {}
  ): Promise<AnalysisResult> {
    try {
      const analysisEngine = AnalysisEngine.getInstance();
      const result = await analysisEngine.performFullAnalysis(
        topic,
        description,
        {
          useAI: options.useAI || false,
          enhanceWithAI: false,
          findSimilarCases: false
        }
      );
      
      return result.result;
    } catch (error) {
      console.error('Analysis failed:', error);
      throw new Error('分析失败，请重试');
    }
  }

  /**
   * 快速分析（不使用AI）
   */
  async quickAnalyze(topic: string, description: string): Promise<AnalysisResult> {
    return this.analyze(topic, description, {
      useAI: false
    });
  }

  /**
   * AI增强分析
   */
  async aiAnalyze(topic: string, description: string): Promise<{
    result: AnalysisResult;
    aiAnalysis?: any;
    similarCases?: any[];
  }> {
    const analysisEngine = AnalysisEngine.getInstance();
    return analysisEngine.performFullAnalysis(topic, description, {
      useAI: true,
      enhanceWithAI: true,
      findSimilarCases: true
    });
  }

  /**
   * 生成分析报告
   */
  async generateReport(
    result: AnalysisResult,
    format: 'json' | 'markdown' | 'html' = 'markdown'
  ): Promise<string> {
    // TODO: Implement report generation
    return JSON.stringify(result, null, 2);
  }

  /**
   * 评估分析质量
   */
  assessQuality(result: AnalysisResult) {
    // TODO: Implement quality assessment
    return {
      score: 85,
      level: 'high' as const,
      feedback: '分析质量良好'
    };
  }
}

export default AnalysisService.getInstance();
